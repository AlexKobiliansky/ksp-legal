var gulp           = require('gulp'), // Подключаем Gulp
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),  //Подключаем Sass пакет,
		browserSync    = require('browser-sync'),  // Подключаем Browser Sync
		concat         = require('gulp-concat'),  // Подключаем gulp-concat (для конкатенации файлов)
		uglify         = require('gulp-uglify'),  // Подключаем gulp-uglify (для сжатия JS)
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),  // Подключаем библиотеку для переименования файлов
		del            = require('del'), // Подключаем библиотеку для удаления файлов и папок
		imagemin       = require('gulp-imagemin'),  // Подключаем библиотеку для работы с изображениями
		cache          = require('gulp-cache'),  // Подключаем библиотеку кеширования
		autoprefixer   = require('gulp-autoprefixer'),  // Подключаем библиотеку для автоматического добавления префиксов
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync');

// Пользовательские скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',  //берем наши скрипты
		])
	.pipe(concat('common.min.js')) //минимизируем их
	.pipe(uglify()) //сжимаем
	.pipe(gulp.dest('app/js')); //выгружаем в папку
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([ // берем все библиотеки
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js')) // минимизируем и соединяем в один файл
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js')) // выгружаем
	.pipe(browserSync.reload({stream: true}));  // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: {  // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false,  // Отключаем уведомления
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')  // Берем источник
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))  // Преобразуем Sass в CSS посредством gulp-sass
	.pipe(rename({suffix: '.min', prefix : ''})) //добавляем суффикс .min
	.pipe(autoprefixer(['last 15 versions', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))  // Выгружаем результата в папку app/css
	.pipe(browserSync.reload({stream: true}));  // Обновляем CSS на странице при изменении
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);  // Наблюдение за sass файлами в папке sass
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']); // Наблюдение за JS файлами в папке js
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')  // Берем все изображения из app
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);

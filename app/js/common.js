$(document).ready(function() {

    $(".toggle-mnu").click(function() {
        $(this).toggleClass("on");
        $(".mobile-mnu").slideToggle();
        return false;
    });


    function heightses() {
        if ($(window).width()>=991) {
            $(".service-control-title").height('auto').equalHeights();
            $(".service-control-desc").height('auto').equalHeights();
        }

        if ($(window).width()>=479) {
            $(".project-item-overlay").height('auto').equalHeights();
        }

        $(".num-item-desc").height('auto').equalHeights();
        $(".consult-col").height('auto').equalHeights();



    }

    $(window).resize(function() {
        heightses();
    });

    heightses();


    /**
     * Services tabs functionality
     */
    $('.service-control').on('click', function (e) {
        e.preventDefault();

        var $controlList = $('.tab-list');
        var $panel = $('.service-panel.active');
        var $tab = $controlList.find('li.active');
        var $link = $(this).parents("li");
        var id = this.hash;


        if (id && !$link.is('.active')) {
            $panel.removeClass('active');
            $tab.removeClass('active');

            $panel = $(id).addClass('active');
            $tab = $link.addClass('active');
        }
    });
    /**
     * End services tabs functionality
     */


    $('.projects-slider').on('afterChange init', function(event, slick, direction){
            // console.log('afterChange/init', event, slick, slick.$slides);
            // remove all prev/next
            slick.$slides.removeClass('prevSlide').removeClass('nextSlide');

            // find current slide
            for (var i = 0; i < slick.$slides.length; i++)
            {
                var $slide = $(slick.$slides[i]);
                if ($slide.hasClass('slick-current')) {
                    // update DOM siblings
                    $slide.prev().addClass('prevSlide');
                    $slide.next().addClass('nextSlide');
                    break;
                }
            }
        }
    )
        .on('beforeChange', function(event, slick) {
            // optional, but cleaner maybe
            // remove all prev/next
            slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
        })
        .slick({
        infinite: true,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '0',
        speed: 500,
        fade: false,
        cssEase: 'linear',
        autoplay: false,
        draggable: false,
        adaptiveHeight: false,
        dots: true,
        prevArrow: "<button type='button' class='more-link slick-prev'>Предыдущий проект</button>",
        nextArrow: "<button type='button' class='more-link slick-next'>Следующий проект</button>",
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        centerMode: true,
                        centerPadding: '0',
                        slidesToShow: 1,
                        fade: true,
                        cssEase: 'linear',
                        speed: 1000
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        centerMode: false,
                        centerPadding: '20px',
                        arrows: false,
                        slidesToShow: 1,
                        draggable: true,
                    }
                },
                {
                    breakpoint: 479,
                    settings: {
                        centerMode: false,
                        centerPadding: '20px',
                        arrows: false,
                        slidesToShow: 1,
                        draggable: true,
                        adaptiveHeight: true,
                        dots: false
                    }
                }
            ]

    });

    $(".project-item-overlay").height('auto').equalHeights();

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });

});

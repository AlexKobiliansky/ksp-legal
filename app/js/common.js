$(document).ready(function() {
    //
    // $(".toggle-mnu").click(function() {
    //     $(this).toggleClass("on");
    //     $(".mobile-mnu").slideToggle();
    //     return false;
    // });



    /**
     * mobile-mnu customization
     */
    var $toggleMenu = $(".toggle-mnu");

    $toggleMenu.click(function() {
        $(this).toggleClass("on");
        // return false;
    });

    var $mmenu = $("#mobile-mnu").mmenu({
        "navbar": {
            "title" : "",
        },
        "extensions": [
            "position-right",
            "theme-dark",
            "pagedim-black",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-content"
        },
    });

    var API = $mmenu.data("mmenu");

    API.bind( "close:start", function() {
        setTimeout(function() {
            $toggleMenu.removeClass( "on" );
        }, 300);
    });


    /**
     * end mobile-mnu customization
     */


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

        $('.serv-col').height('auto').equalHeights();


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


    /**
     * SERV tabs functionality
     */
    $('.serv-controls a').on('click', function(e){
        e.preventDefault()
       var th = $(this),
           parentList = th.parents('li'),
           id = th.attr('href'),
           activeList = $('.serv-controls li.active'),
           activeTab = $('.serv-panel.active');

        if(id && !parentList.is('.active')) {
            activeList.removeClass('active');
            activeTab.removeClass('active');

            parentList.addClass('active');
            $('.serv-panel').each(function(){
                var p = $(this),
                    pid = p.data('id');

                if (id === pid) {
                    p.addClass('active')


                    if ($(window).width()<768) {
                        $('html, body').animate({
                            scrollTop: $('.anchors').offset().top
                        }, 600);
                    }
                }
            });
            heightses();
        }
    });

    /**
     * end SERV tabs functionality
     */




    $('.faq-item:first-child').find('.faq-item-quest').addClass('opened');


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


    /**
     * FAQ custom
     */

    $('.faq-item-quest').on("click", function(){
        var th = $(this);
        var parent = th.parents('.faq-item');


        th.toggleClass('opened');
        th.siblings('.faq-item-ans').slideToggle();

        parent.siblings('.faq-item').each(function(){
           $(this).find('.faq-item-quest').removeClass('opened');
           $(this).find('.faq-item-ans').slideUp();
        });
        // parent.siblings('faq-item').find('.faq-item-quest').removeClass('opened');
        // parent.siblings('faq-item').find('.faq-item-ans').slideUp();


    });
    /**
     * end FAQ custom
     */


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















    // Generated by CoffeeScript 1.12.3
    (function() {
        var Parallax, initMap, throttle;

        window.scrollList = [];

        throttle = function(fn, env, time) {
            if (((time + 30) - Date.now()) < 0) {
                fn.call(env);
                return true;
            } else {
                return false;
            }
        };

        Parallax = (function() {
            function Parallax(node) {
                var top;
                this.node = $(node);
                this.listed = this.node.find(' > *');
                this.coef = [0.1, 0.2, 0.3, 0.4, 0.5];
                top = this.node.offset().top;
                this.top = top + parseInt(this.node.data('totop') ? this.node.data('totop') : 0);
                this.bot = top + this.node.height() + parseInt(this.node.data('tobot') ? this.node.data('tobot') : 0);
                this.reverse = this.node.data('reverse') ? true : false;
                this.horizontal = this.node.data('horizontal') ? true : false;
                this.doc = document.documentElement;
                this.init();
                console.log(this);
            }

            Parallax.prototype.init = function() {
                if (this.reverse) {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.rscroll, this]);
                    } else {
                        console.log('hscroll');
                        return window.scrollList.push([this.hrscroll, this]);
                    }
                } else {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.scroll, this]);
                    } else {
                        console.log('hscroll');
                        return window.scrollList.push([this.hscroll, this]);
                    }
                }
            };

            Parallax.prototype.scroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((P.top - top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.rscroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((top - P.top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.hscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((this.top - top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            Parallax.prototype.hrscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((top - this.top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            return Parallax;

        })();





        $('document').ready(function() {
            var parallaxTime;
            $('[data-node="parallax"]').each(function(index, node) {
                new Parallax(node);
                return true;
            });
            parallaxTime = Date.now();
            $(document).on('scroll', function() {
                var fnwe, j, len, ref, reset;
                reset = false;
                ref = window.scrollList;
                for (j = 0, len = ref.length; j < len; j++) {
                    fnwe = ref[j];
                    if (throttle(fnwe[0], fnwe[1], parallaxTime)) {
                        reset = true;
                    }
                }
                if (reset) {
                    return parallaxTime = Date.now();
                }
            });
            setTimeout(function() {
                return $(document).trigger('scroll');
            }, 100);
        });

    }).call(this);

//# sourceMappingURL=main.js.map






    $('.preloader').fadeOut(600);




});

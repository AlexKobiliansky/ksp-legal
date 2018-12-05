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

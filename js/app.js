$("document").ready(function($) {

    $(window).scroll(function(){
        var position = $(this).scrollTop();
        var main = $(".container-main").innerHeight()-80;
        showheader(position, main);
        if ($(window).width() >= 1000) {
            navactive(position);
        }
    });

    var position = $(this).scrollTop();
    var main = $(".container-main").innerHeight()-80;
    showheader(position, main);
    if ($(window).width() >= 1000) {
        navactive(position);
    }


    function showheader(position, main) {
        if (position > 10) {
            if (!$("#header").hasClass('headermin')) {
                $("#header").addClass('headermin');
                $('#city').hide(300);
            }
        } else {
            if ($("#header").hasClass('headermin')) {
                $("#header").removeClass('headermin');
                $('#city').show(300);
            }
        }
        if (position > main) {
            if (!$("#header").hasClass('black')) {
                $("#header").addClass('black');
            }
        } else {
            if ($("#header").hasClass('black')) {
                $("#header").removeClass('black');
            }
        }
    };

    function navactive(position) {
        $('.container').each(function() {
            var target = $(this).offset().top - 20;
            var id = $(this).attr('id');

            if  (position == $(document).height() - $(window).height()) {
                var id = 'contacts';
            }
            if (id == 'form_2') { id = 'services'; }
            if (id == 'coments') { id = 'device'; }

            if (position+$(window).height()/2 >= target) {
                if ($('#navigation > li > a[href="#' + id + '"]').hasClass('active') == false) {
                    $('#navigation').children('li').children('a').removeClass('active');
                    $('#navigation > li > a[href="#' + id + '"]').addClass('active');
                }
            }

            if (id == 'form_2') {
                var startpos = position + $(window).height();
                target = $(this).offset().top;
                targetend = target + $(this).height();
                calc = startpos - target;
                if (target <= startpos && targetend >= position) {
                    $('#form_2 .paralax').css({"background-position-y" : (120-calc/10) + "px"});
                }
            }
        });
    };


    $(".owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        items: 4,
        responsive: {
            0: {
                items: 1,
            },
            650: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1500 : {
                items: 4,
            },
        }
    });


    $("#navigation").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
        $('#navigation').toggleClass('hide');
        $("#mobile_nav_button").removeClass('active');
    });

    $("#popup_close").on("click", function () {
        $("#popup").hide(100);
    });

    $(".popup_button").on("click", function () {
        $("#popup").show(100);
    });


    $('#mobile_nav_button').click(function(){
        $(this).toggleClass('active');
        $('#navigation').toggleClass('hide');
    });

    //Ajax

    $('form').submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        $form.children('button').attr("disabled", true);
        $('form').each(function() {
            $(this).children('button').attr("disabled", true);
            $(this).children('button').addClass('disabled');
        });
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function(data) {
            if (data != 'Заявка принята, мы вам перезвоним!') {
                $('form').each(function() {
                    $(this).children('button').attr("disabled", false);
                    $(this).children('button').removeClass('disabled');
                });
            }
            $form.children('.form_massage').text(data);
            $form.children('.form_massage').show(200);
        }).fail(function(data) {
            $form.children('.form_massage').text('Ошибка отправки запроса, попробуйте позже!');
            $form.children('.form_massage').show(200);
            $('form').each(function() {
                $(this).children('button').attr("disabled", false);
                $(this).children('button').removeClass('disabled');
            });
        });
    });

    $(".form_phone").mask(" +7 (999) 999-99-99");

});
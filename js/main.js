$(function() {
    function Main() {
        this.hSlider__item = $('.hSlider__item');
        this.hSlider = $('#hSlider');
        this.bunnerOne = $('#bunnerOne');
        this.tMenu = $('.tMenu');
        this.body = $('body');
    }

    Main.prototype.getSliderHeight = function() {
        var _this = this;

        function getHeight() {
            if(window.innerWidth > 768) {
                _this.hSlider__item.css({
                    height: window.innerHeight
                });
            } else {
                _this.hSlider__item.css({
                    height: 'auto'
                });
            }
        }

        getHeight();

        $(window).resize(function() {
            getHeight();
        });
    };

    Main.prototype.getSlider = function() {
        this.hSlider.owlCarousel({
            items: 1,
            navigation: true,
            pagination: false,
            navigationText: ["",""],
            itemsDesktop: [1199,1],
            itemsDesktopSmall: [979,1],
            itemsTablet: [768,1],
            slideSpeed: 1000,
            dragBeforeAnimFinish: false,
            mouseDrag: false,
            touchDrag: false
        });
    };

    Main.prototype.getSliderTwo = function() {
        this.bunnerOne.owlCarousel2({
            items: 1,
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop:true,
            autoplayTimeout: 3000,
            autoplayHoverPause: false,
            mouseDrag: false,
            touchDrag: false
        });
    };

    Main.prototype.getSMenuScroll = function() {
        var menu = this.tMenu,
            menuTopX = menu.offset().top,
            _this = this;

        $(window).scroll(function() {
            var wondowScrollX = $(this).scrollTop();

            if(wondowScrollX >= menuTopX) {
                _this.body.addClass('active');
            } else {
                _this.body.removeClass('active');
            }
        }).trigger('scroll');
    };

    Main.prototype.Init = function() {
        var _this = this;

        this.getSliderHeight();
        this.getSlider();
        this.getSliderTwo();

        $(window).load(function() {
            _this.getSMenuScroll();
        });
    };
    var main = new Main();
    main.Init();
});

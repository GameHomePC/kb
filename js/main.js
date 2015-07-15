function Main() {
    this.hSlider__item = $('.hSlider__item');
    this.hSlider = $('#hSlider');
    this.bunnerOne = $('#bunnerOne');
    this.tMenu = $('.tMenu');
    this.tMenuLink = $('#menu a');
    this.tMenuHeight = $('.tMenu').height();
    this.body = $('body');
}

Main.prototype.getSliderHeight = function() {
    var _this = this;

    function getHeight() {
        if(window.innerWidth > 768) {
            _this.hSlider__item.css({
                height: window.innerHeight
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
        slideSpeed: 1500,
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

Main.prototype.getMenuScroll = function() {
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

Main.prototype.getMenuLinkScroll = function() {
    var menu = this.tMenuLink,
        _this = this;

    menu.on('click', function() {
        var self = $(this),
            href = self.attr('data-id'),
            sectionElement = $('.' + href).offset().top + 2;

        if($(window).scrollTop() == sectionElement) return false;

        menu.removeClass('activeLink');
        self.addClass('activeLink');

        $('html, body').stop().animate({
            scrollTop: sectionElement - _this.tMenuHeight
        }, 1000);

        return false;
    })
};

Main.prototype.getPopup = function() {
    var _this = this;
    this.popup = $('.popup');
    this.popupClose = $('.popup__close');
    this.popupOver = $('.popup__over');

    this.hidePopup = function() {
        _this.popup.fadeOut(300);
        _this.popupOver.fadeOut(300);
    };

    this.showPopup = function() {
        _this.popup.fadeIn(300);
        _this.popupOver.fadeIn(300);
    };

    this.getClickHide = function(elements) {
        elements.on('click', function() {
           _this.hidePopup();

            return false;
        });
    };

    this.getClickShow = function(elements) {
        elements.on('click', function(e) {
            _this.showPopup();

            return false;
        });
    };

    this.getClickHide(this.popupClose);
    this.getClickHide(this.popupOver);
};

Main.prototype.Init = function() {
    var _this = this;
    $(function() {
        _this.getSliderHeight();
        _this.getSlider();
        _this.getSliderTwo();
        _this.getMenuLinkScroll();
        _this.getMenuScroll();
        _this.getPopup();

        _this.getClickShow($('.footer__menu a'));
    });
};
var main = new Main();
main.Init();
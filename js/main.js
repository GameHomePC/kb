function Main() {
    this.hSlider__item = $('.hSlider__item');
    this.hSlider = $('#hSlider');
    this.bunnerOne = $('#bunnerOne');
    this.tMenu = $('.tMenu');
    this.tMenuLink = $('#menu a');
    this.tMenuHeight = $('.tMenu').height();
    this.body = $('body');
    this.footer = $('.footer');
    this.contactUsForm = $("#contactUs_form");
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
    this.callback = function(event) {
        this.$element.find('.owl-item').css({
            height: window.innerHeight
        })
    };

    this.hSlider.owlCarousel2({
        items: 1,
        autoplay: true,
        nav: true,
        navText: ['',''],
        autoplayTimeout: 5000,
        loop: true,
        autoplayHoverPause: false,
        mouseDrag: false,
        touchDrag: false,
        navSpeed: 2000,
        autoplaySpeed: 2000,
        onTranslate: this.callback

    });
};

Main.prototype.getSliderTwo = function() {
    this.bunnerOne.owlCarousel2({
        items: 1,
        autoplay: true,
        animateOut: 'fadeOut',
        loop: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        mouseDrag: false,
        touchDrag: false
    });
};

Main.prototype.getMenuScroll = function() {
    var menu = this.tMenu,
        menuTopX = menu.offset().top,
        _this = this,
        footer = this.footer,
        body = this.body,
        footerTop = footer.offset().top;

    $(window).scroll(function() {
        var windowScrollX = $(this).scrollTop();

        if(windowScrollX + window.innerHeight <= footerTop) {
            body.addClass('active');
        } else {
            body.removeClass('active');
        }

    }).trigger('scroll');
};

Main.prototype.getMenuLinkScroll = function() {
    var menu = this.tMenuLink,
        _this = this;

    menu.on('click', function() {
        var self = $(this),
            href = self.attr('data-id'),
            sectionElement = $('.' + href).offset().top;

        if($(window).scrollTop() == sectionElement) return false;

        menu.removeClass('activeLink');
        self.addClass('activeLink');

        $('html, body').stop().animate({
            scrollTop: sectionElement
        }, 1000);

        return false;
    })
};

Main.prototype.getPopup = function() {
    var _this = this;
    this.popup = $('.popup');
    this.popupTitle = $('.popup h2');
    this.popupDescription = $('.popup p');
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

    this.getShowSend = function(title, description) {
        _this.popupTitle.text(title);
        _this.popupDescription.text(description);
        _this.showPopup();
    };

    this.getClickHide(this.popupClose);
    this.getClickHide(this.popupOver);
};

Main.prototype.getForm = function() {
    var _this = this;

    this.contactUsForm.validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter your message"
        },
        submitHandler: function(form) {
            var name = form.name.value,
                email = form.email.value,
                message = form.message.value;

            $.ajax({
                method: "POST",
                url: "send.php",
                data: { name: name, email: email, message: message },
                dataType: 'json',
                success: function(e) {
                    _this.getShowSend(e.title, e.message);
                }
            })
        }
    });
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
        _this.getForm();

        _this.getClickShow($('.footer__menu a'));
    });
};
var main = new Main();
main.Init();
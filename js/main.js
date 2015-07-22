function Main() {
    this.hSlider__item = $('.hSlider__item');
    this.hSlider = $('#hSlider');
    this.bunnerOne = $('#bunnerOne');
    this.tMenu = $('.tMenu');
    this.tMenuLink = $('#menu a');
    this.tMenuHeight = $('.tMenu').outerHeight(true);
    this.body = $('body');
    this.footer = $('.footer');
    this.contactUsForm = $("#contactUs_form");
}

Main.prototype.getSlider = function() {
    this.callback = function(event) {
        var _this = this,
            resize = this.resize;

        /* video */
        var video = _this.$element.find('.video');

        video.each(function() {
            var self = this;
            self.play();
        });

        /* height */
        var getHeight = function() {
            if(window.innerWidth > 768) {
                _this.$element.find('.owl-item').css({
                    height: window.innerHeight
                });
                _this.$element.find('.hSlider__item').css({
                    height: window.innerHeight
                });
            } else {
                _this.$element.find('.owl-item').css({
                    height:'auto'
                });
                _this.$element.find('.hSlider__item').css({
                    height:'auto'
                });
            }
        };

        getHeight();

        if(!resize) {
            resize = true;

            $(window).resize(function() {
                getHeight();
            }).trigger('resize');
        }
    };

    this.hSlider.owlCarousel2({
        items: 1,
        autoplay: false,
        nav: true,
        navText: ['',''],
        autoplayTimeout: 5000,
        loop: true,
        autoplayHoverPause: false,
        mouseDrag: false,
        touchDrag: false,
        navSpeed: 2000,
        autoplaySpeed: 2000,
        onTranslate: this.callback,
        onInitialized: this.callback

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
    var _this = this,
        scroll = this.scroll,
        menu = _this.tMenu,
        menuHeight = menu.height(),
        footer = _this.footer,
        body = this.body,
        windowHeight = $(window).height();

    if(!scroll) {
        scroll = true;

        $(window).scroll(function() {
            var windowScrollX = $(this).scrollTop(),
                footerTop = footer.offset().top;

            if(windowScrollX + windowHeight <= footerTop) {
                if(window.innerWidth > 768) {
                    if (!(windowScrollX + windowHeight - menuHeight >= windowHeight)) {
                        menu.css({
                            position: 'absolute',
                            top: windowHeight + menuHeight,
                            bottom:'auto'
                        });

                    } else {
                        menu.css({
                            position: 'fixed',
                            top: 'auto',
                            bottom: '0'
                        });
                        body.addClass('active');

                    }
                } else {
                    menu.css({
                        position: 'fixed',
                        top: 'auto',
                        bottom: '0'
                    });
                    body.addClass('active');
                }

            } else {
                menu.css({
                    position: 'relative',
                    top: 'auto',
                    bottom: '0'
                });
                body.removeClass('active');
            }

        }).trigger('scroll');
    }
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
        _this.getSlider();
        _this.getSliderTwo();
        _this.getMenuLinkScroll();
        _this.getPopup();
        _this.getForm();

        _this.getClickShow($('.footer__menu a'));

        $(window).load(function() {
            _this.getMenuScroll();

            $(this).trigger('resize');
        });


        $(window).resize(function() {
            _this.getSlider();
            _this.getMenuScroll();
        });
    });
};
var main = new Main();
main.Init();
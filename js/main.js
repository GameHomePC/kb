$(function() {
    var hSlider = $('#hSlider');

    hSlider.owlCarousel({
        items: 1,
        navigation: true,
        pagination: false,
        navigationText: ["",""],
        itemsDesktop: [1199,1],
        itemsDesktopSmall: [979,1],
        itemsTablet: [768,1]
    });
});
define([
    'jquery',
    'Magento_PageBuilder/js/events',
    'slick'
], function ($, events) {
    'use strict';

    return function (config, sliderElement) {
        var $element = $(sliderElement);

        if ($element.hasClass('slick-initialized')) {
            $element.slick('unslick');
        }

        $element.slick({
            autoplay: $element.data('autoplay'),
            autoplaySpeed: $element.data('autoplay-speed') || 0,
            fade: $element.data('fade'),
            infinite: $element.data('infiniteLoop'),
            arrows: $element.data('show-arrows'),
            dots: $element.data('show-dots'),
            adaptiveHeight: true
        });

        $element.on('afterChange', function (event, slick) {
            var $body = $('body');

            if (slick.$dots && slick.$dots.find('button.focus-overlay-target').length) {
                var $activeDot = slick.$dots.find('.slick-active button');

                $activeDot.focus();

                if ($body.focusOverlay) {
                    $body.focusOverlay('moveFocusBox', $activeDot);
                }
            }
        });

        // Redraw slide after content type gets redrawn
        events.on('contentType:redrawAfter', function (args) {
            if ($element.closest(args.element).length) {
                $element.slick('setPosition');
            }
        });
    };
});

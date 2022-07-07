define([
    'jquery',
    'Magento_PageBuilder/js/events'
], function ($) {
    'use strict';

    return function (config, descriptionBanner) {
        var $trigger = descriptionBanner.find('.js-description-banner-scroll-trigger');
        var $target = $($trigger.attr('href'));

        if (!$target.length) {
            return;
        }

        var top = $target.offset().top;

        $trigger.on('click', function (event) {
            $('html, body').animate({
                scrollTop: top
            }, 800);
            event.preventDefault();
        });
    };
});

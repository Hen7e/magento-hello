define([
    'jquery',
    'Magento_PageBuilder/js/events',
    'accordion'
], function ($) {
    'use strict';

    return function (config, element) {
        var globalConfig = { accordionSelector: '.js-pagebuilder-accordion' },
            $element = $(element),
            accordionElement = $(element).find(globalConfig.accordionSelector),
            accordionData = {};

        if ($element && $element.data()) {
            accordionData = $element.data();
            accordionData.showOn = accordionData.showOn || {};
            accordionData.openByDefault = accordionData.openByDefault || {};

            if (accordionData.openByDefault == '1') {
                accordionElement.addClass('active');
            }

            $(accordionElement).bayan({
                'isContentOpened': accordionData.openByDefault == '1',
                'view': accordionData.showOn,
                'effect': 'opacity'
            });
        }
    };

});

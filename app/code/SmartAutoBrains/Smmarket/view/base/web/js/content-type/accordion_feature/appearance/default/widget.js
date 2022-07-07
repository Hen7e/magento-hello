define([
    'jquery',
    'Magento_PageBuilder/js/events',
    'accordion'
], function ($) {
    'use strict';

    return function (config, element) {
        var globalConfig = {
                accordionSelector: '.js-pagebuilder-feature-accordion',
                contentSelector: '.js-pagebuilder-feature-accordion-content',
                triggerSelector: '.js-pagebuilder-feature-accordion-trigger'
            },
            $element = $(element),
            accordionElement = $(element).find(globalConfig.triggerSelector);

        if ($element && $element.data()) {
            $(accordionElement).bayan({
                'isContentOpened': true,
                'contentSelector': globalConfig.contentSelector,
                'accordionSelector': globalConfig.accordionSelector,
                'effect': 'opacity'
            });
        }
    };

});

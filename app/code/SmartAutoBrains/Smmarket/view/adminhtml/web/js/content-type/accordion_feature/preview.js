define([
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/uploader',
    'Magento_PageBuilder/js/events',
    'Magento_PageBuilder/js/content-type-menu/hide-show-option',
    'accordionAdmin',
    'jquery',
    'jquery/ui'
], function (PreviewBase, Uploader, events, HideShowOption, accordion, $) {

    'use strict';

    var $super;
    var globalConfig = {
        accordionSelector: '.js-pagebuilder-feature-accordion',
        contentSelector: '.js-pagebuilder-feature-accordion-content',
        triggerSelector: '.js-pagebuilder-feature-accordion-trigger'
    };

    function Preview(parent, config, stageId) {
        PreviewBase.call(this, parent, config, stageId);
    }


    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;


    Preview.prototype.setAccordionConfig = function setAccordionConfig(args) {
        if ( args && args.contentType) {

            $(globalConfig.triggerSelector).bayan({
                'isContentOpened': true,
                'effect': 'opacity',
                'contentSelector': globalConfig.contentSelector,
                'accordionSelector': globalConfig.accordionSelector
            });
        }

    };

    Preview.prototype.bindEvents = function bindEvents() {
        $super.bindEvents.call(this);
        events.on("accordion_feature:renderAfter", Preview.prototype.setAccordionConfig );

    };


    return Preview;
});

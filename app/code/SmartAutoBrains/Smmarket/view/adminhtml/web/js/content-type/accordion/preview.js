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
        accordionSelector: '.js-pagebuilder-accordion'
    };

    function Preview(parent, config, stageId) {
        PreviewBase.call(this, parent, config, stageId);
    }


    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        options.hideShow = new HideShowOption({
            preview: this,
            icon: HideShowOption.showIcon,
            title: HideShowOption.showText,
            action: this.onOptionVisibilityToggle,
            classes: ["hide-show-content-type"],
            sort: 40
        });

        return options;
    };

    Preview.prototype.setAccordionConfig = function setAccordionConfig(args) {
        var
            accordionData = {},
            accordionElement = {};

        if ( args && args.contentType && args.contentType.content ) {
            accordionData = args.contentType.content.getData();
            accordionElement = $(args.element).find(globalConfig.accordionSelector);
            accordionData.show_on = accordionData.show_on || {};
            accordionData.opened_default = accordionData.opened_default || {};

            if ( accordionData.opened_default == '1' ) {
                accordionElement.addClass('active');
            }

            $(globalConfig.accordionSelector).bayan({
                'isContentOpened': accordionData.opened_default == '1',
                'view': accordionData.show_on,
                'effect': 'opacity'
            });
        }

    };

    Preview.prototype.bindEvents = function bindEvents() {
        $super.bindEvents.call(this);

        events.on("accordion:renderAfter", Preview.prototype.setAccordionConfig );

    };

    return Preview;
});
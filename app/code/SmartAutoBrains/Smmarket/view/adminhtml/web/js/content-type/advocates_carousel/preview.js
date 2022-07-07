/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2021 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Andrey Bugaev <abugaev@helenoftroy.com>
 */

define([
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/content-type-menu/option',
    'mage/translate',
    'Magento_PageBuilder/js/content-type-factory',
    'Magento_PageBuilder/js/config',
    'Magento_PageBuilder/js/events',
    'Magento_PageBuilder/js/content-type-menu/hide-show-option'
], function (PreviewBase, Option, Translate, ContentTypeFactory, Config, Events, HideShowOption) {
    'use strict';
    var $super;

    function Preview(parent, config, stageId) {
        PreviewBase.call(this, parent, config, stageId);
    }

    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        options.add = new Option({
            preview: this,
            icon: "<i class='icon-pagebuilder-add'></i>",
            title: Translate("Add"),
            action: this.advocatesCarouselItem,
            classes: ["add-child"],
            sort: 10
        });
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

    Preview.prototype.advocatesCarouselItem = function  advocatesCarouselItem() {
        var self = this;

        ContentTypeFactory(Config.getContentTypeConfig("advocates_carousel_item"), self.contentType, self.contentType.stageId)
            .then(function (advocatesCarouselItem) {
                self.contentType.addChild(advocatesCarouselItem, self.contentType.children().length);
            });
    };

    return Preview;
});

define([
    'jquery',
    'jquery/ui',
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/content-type-menu/option',
    'mage/translate',
    'Magento_PageBuilder/js/content-type-factory',
    'Magento_PageBuilder/js/config'
], function ($, UI, PreviewBase, Option, Translate, ContentTypeFactory, Config) {
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
            action: this.addPressItem,
            classes: ["add-child"],
            sort: 10
        });

        delete options.edit;
        return options;
    };

    Preview.prototype.addPressItem = function addPressItem() {
        var self = this;

        ContentTypeFactory(Config.getContentTypeConfig("press_item"), self.contentType, self.contentType.stageId)
            .then(function (pressItem) {
                self.contentType.addChild(pressItem, 0);
            });
    };

    return Preview;
});
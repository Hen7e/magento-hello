/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2021 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Alexey Panchenko <apanchenko@helenoftroy.com>
 */
define([
    'jquery',
    'jquery/ui',
    'ko',
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/content-type-menu/option',
    'mage/translate',
    'Magento_PageBuilder/js/content-type-factory',
    'Magento_PageBuilder/js/config'
], function ($, UI, ko, PreviewBase, Option, Translate, ContentTypeFactory, Config) {
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
            action: this.addPlpEnhancedFeature,
            classes: ["add-child"],
            sort: 10
        });

        return options;
    };

    Preview.prototype.addPlpEnhancedFeature = function addPlpEnhancedFeature() {
        var self = this;

        ContentTypeFactory(Config.getContentTypeConfig("plp_enhanced_feature_item"), self.contentType, self.contentType.stageId)
            .then(function (PlpEnhancedFeature) {
                self.contentType.addChild(PlpEnhancedFeature, self.contentType.children().length);
            });
    };

    return Preview;
});

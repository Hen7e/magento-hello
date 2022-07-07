define([
    'Magento_PageBuilder/js/content-type/preview',
    'Magento_PageBuilder/js/uploader'
], function (PreviewBase, Uploader) {
    'use strict';
    var $super;

    function Preview(parent, config, stageId) {
        PreviewBase.call(this, parent, config, stageId);
    }

    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        return options;
    };

    Preview.prototype.getUploader = function () {
        var initialImageValue = this.contentType.dataStore
            .get(this.config.additional_data.uploaderConfig.dataScope, "");

        return new Uploader(
            "imageuploader_" + this.contentType.id,
            this.config.additional_data.uploaderConfig,
            this.contentType.id,
            this.contentType.dataStore,
            initialImageValue,
        );
    };

    Preview.prototype.isCmsBlock = function () {
        var dataSource = this.contentType.dataStore;
        return typeof dataSource.state.block_id !== 'undefined';
    };

    Preview.prototype.getWrapperClasses = function () {
        var parentWidget = this.contentType.parentContentType;
        if (typeof parentWidget === 'undefined' || parentWidget.config.name != 'tiles') {
            return '';
        }

        return 'pagebuilder-content-type-wrapper pagebuilder-tile-item-wrapper tile-item-wrapper ' + this.contentType.id;
    };

    Preview.prototype.hasTilesWrapper = function () {
        var parentWidget = this.contentType.parentContentType;
        return typeof parentWidget !== 'undefined' && parentWidget.config.name == 'tiles';
    };

    return Preview;
});

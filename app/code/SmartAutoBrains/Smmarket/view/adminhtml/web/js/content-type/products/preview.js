define([
    'jquery',
    'Magento_PageBuilder/js/content-type/products/preview'
], function ($, PreviewBase) {
    'use strict';

    function Preview(parent, config, stageId) {
        PreviewBase.call(
            this, parent, config, stageId
        );
    }

    Preview.prototype = Object.create(
        PreviewBase.prototype
    );

    Preview.prototype.afterRenderHandler = function(element) {
        $(element)
            .trigger('contentUpdated')
            .removeClass('pagebuilder-products-pending')
            .addClass('pagebuilder-products-ready');
    };

    return Preview;
});
/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2021 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Alexey Panchenko <apanchenko@helenoftroy.com>
 */
define([
    'jquery',
    'Magento_PageBuilder/js/content-type/products/preview'
], function ($, PreviewBase) {
    'use strict';
    var $super = PreviewBase.prototype;

    function Preview(parent, config, stageId) {
        PreviewBase.call(
            this, parent, config, stageId
        );
    }

    Preview.prototype = Object.create(
        PreviewBase.prototype
    );

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        delete options.duplicate;
        delete options.hideShow;

        return options;
    };

    Preview.prototype.afterRenderHandler = function (element) {
        $(element)
            .trigger('contentUpdated')
            .removeClass('pagebuilder-products-pending')
            .addClass('pagebuilder-products-ready');

        this.setParentWidthByChildrenLength(element);
    };

    /**
     * Sets width for parent by children length
     *
     * @param element
     */
    Preview.prototype.setParentWidthByChildrenLength = function setParentWidthByChildrenLength(element) {
        const productsChildrenLength = $(element).find('.product-item').length;
        const parent = $(element).parents('.products-container');

        parent.css('width', `${25 * productsChildrenLength}%`);
    };

    return Preview;
});

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

    function Preview(parent, config, stageId) {
        PreviewBase.call(
            this, parent, config, stageId
        );

        // we should not show "add image description button" if there is double image section
        this.contentType.dataStore.subscribe(({data_image_type}) => {
            const addImageDescriptionButton = $('.product-image-description-btn');

            if(data_image_type && addImageDescriptionButton.length > 0) {
                this.contentType.parentContentType.preview.checkButtonVisibility(addImageDescriptionButton, this.contentType.parentContentType);
            }
        }, "data_image_type")
    }

    Preview.prototype = Object.create(PreviewBase.prototype);

    return Preview;
});

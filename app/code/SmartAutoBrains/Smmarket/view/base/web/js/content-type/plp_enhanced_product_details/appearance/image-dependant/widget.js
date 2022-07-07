/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2021 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Alexey Panchenko <apanchenko@helenoftroy.com>
 */

define([
    'jquery',
    'matchMedia',
], function ($, mediaCheck) {
    'use strict';

    function onInitParams() {
        initParams(false);
    }

    mediaCheck({
        media: '(min-width: 1024px)',
        entry: function () {
            initParams(false);
            $(window).on('resize', onInitParams);
        },
        exit: function () {
            $(window).unbind('resize', onInitParams);
            initParams(true);
        }
    });

    function initParams(isRemoved) {
        const productItems = $('.products-listing-grid');
        const imageDependantContainer = $('.pagebuilder-plp-enhanced-product-details_image_dependant');

        if (imageDependantContainer.length > 0) {
            imageDependantContainer.each((index, element) => {
                const children = $(element).children();
                const lastItem = children[children.length - 1];

                if (lastItem && $(lastItem).hasClass('product-detail-image')) {
                    if (isRemoved) {
                        $(element).addClass('image-last-item');
                    } else {
                        $(element).removeClass('image-last-item');
                    }
                }
            });
        }

        if (productItems.length > 0) {
            const setChildrenWidth = (children, childrenLength) => {
                if (children) {
                    children.each((i, item) => {
                        if (!isRemoved) {
                            $(item).css({
                                width: childrenLength === 2 ? `calc(${100 / childrenLength}% - 10px)` : `${100 / childrenLength}%`,
                                flexBasis: childrenLength === 2 ? `calc(${100 / childrenLength}% - 10px)` : `${100 / childrenLength}%`,
                            });
                        } else {
                            $(item).css({
                                width: '',
                                flexBasis: ''
                            });
                        }
                    });
                }
            };

            /**
             *  We should ensure that our images have the same height
             *
             * @param element
             */
            const setItemsWidthByProductHeight = (element) => {
                const parent = $(element).parents('.pagebuilder-plp-enhanced-product-details_image_dependant');
                const productDetailsImage = parent.find('.images-section .product-detail-img--desktop');

                if (!isRemoved) {
                    productDetailsImage.css('height', $(element).height());
                } else {
                    productDetailsImage.css('height', '');
                }
            };

            productItems.each((i, item) => {
                const childrenLength = $(item).children().length;
                const children = $(item).children();
                const parent = $(item).parents('.product-details-section');

                if (childrenLength !== 3) {
                    if (!isRemoved) {
                        parent.css('width', `calc(${25 * childrenLength}% ${childrenLength === 2 ? '- 10px' : '- 14px'})`);
                    } else {
                        parent.css('width', '');
                    }

                    setChildrenWidth(children, childrenLength);
                }

                setItemsWidthByProductHeight(item);
            });
        }
    }
});

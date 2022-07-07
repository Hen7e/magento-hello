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
    'Magento_PageBuilder/js/config',
    "Magento_PageBuilder/js/content-type-menu/hide-show-option",
    "Magento_PageBuilder/js/events"
], function ($, UI, ko, PreviewBase, Option, Translate, ContentTypeFactory, Config, _hideShowOption, events) {
    'use strict';
    var $super;

    function Preview(parent, config, stageId) {
        PreviewBase.call(this, parent, config, stageId);

        // it's needed to re-render children on move event to show an updated version of children array
        events.on('contentType:moveAfter', function ({sourceParent}) {
            const contentType = sourceParent.contentType && sourceParent.contentType.getChildren ? sourceParent.contentType : sourceParent.parentContentType;
            const children = contentType.getChildren()().splice(0);

            contentType.getChildren()([]);
            contentType.getChildren()(children);
        });

    }

    Preview.prototype = Object.create(PreviewBase.prototype);
    $super = PreviewBase.prototype;

    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = $super.retrieveOptions.call(this, arguments);

        options.add = new Option({
            preview: this,
            icon: "<i class='icon-pagebuilder-add'></i>",
            title: Translate("Add"),
            action: this.renderChild,
            classes: ["add-child"],
            sort: 10
        });

        options.hideShow = new _hideShowOption({
            preview: this,
            icon: _hideShowOption.showIcon,
            title: _hideShowOption.showText,
            action: this.onOptionVisibilityToggle,
            classes: ["hide-show-content-type"],
            sort: 40
        });

        this.contentType.children.subscribe(function (contentTypes) {
            const productContentType = contentTypes.filter(contentType => contentType.config.name == "plp_enhanced_product_detail_item")[0];

            if (productContentType) {
                options.add.isDisabled(true);
            } else {
                options.add.isDisabled(false);
            }
        }, this);

        return options;
    };

    /**
     * Extends existing method
     *
     * @param element
     * @param contentTypeCollection
     */
    Preview.prototype.afterChildrenRender = function afterChildrenRender(element, contentTypeCollection) {
        const imageDependantAppearance = contentTypeCollection.preview.appearance() === "image-dependant";
        const nestedChildren = $(element).children();

        if (nestedChildren.length < 1) {
            this.renderChild(); // adds product automatically on first load when there are no children
        }

        if (imageDependantAppearance) {
            this.setChildrenWidthHelper(contentTypeCollection);
        }

        // we should apply this logic when image dependant appearance is specified
        contentTypeCollection.preview.appearance.subscribe(appearance => {
            const imageDependantAppearance = appearance == "image-dependant";

            if (imageDependantAppearance) {
                this.setChildrenWidthHelper(contentTypeCollection);
            }
        });
    };

    Preview.prototype.setChildrenWidthHelper = function setChildrenWidthHelper(contentTypeCollection) {
        this.setChildrenWidth(contentTypeCollection.children(), contentTypeCollection);

        contentTypeCollection.children.subscribe(children => {
            this.setChildrenWidth(children, contentTypeCollection);
        });
    };

    /**
     * Sets width depending on content type collection children length
     *
     * @param children
     * @param contentTypeCollection
     */
    Preview.prototype.setChildrenWidth = function setChildrenWidth(children, contentTypeCollection) {
        const pagebuilderContentTypeWrapper = $(`#${contentTypeCollection.id} .pagebuilder-content-type-wrapper`);
        const pagebuilderDoubleImageContainer = $(`#${contentTypeCollection.id} .pagebuilder-content-type-wrapper.double-image`);

        if (pagebuilderContentTypeWrapper) {
            pagebuilderContentTypeWrapper.each((i, item) => {
                const pagebuilderDoubleImageContainerLength = pagebuilderDoubleImageContainer.length;
                // we should exclude double images length as they are always 50% width
                const childrenLength = pagebuilderDoubleImageContainerLength > 0 ? children.length - pagebuilderDoubleImageContainerLength : children.length;

                $(item).css('width', `${(100 / childrenLength) / 2}%`);
            });
        }
    };

    /**
     * Renders enhanced product detail item
     */
    Preview.prototype.renderChild = function renderChild() {
        var self = this;

        ContentTypeFactory(Config.getContentTypeConfig("plp_enhanced_product_detail_item"), self.contentType, self.contentType.stageId)
            .then(function (plpEnhancedProduct) {
                self.contentType.addChild(plpEnhancedProduct, self.contentType.children().length);
            });
    };

    /**
     * Adds Product Image Description child for right side of content type only
     */
    Preview.prototype.addProductImageDescription = function addProductImageDescription() {
        let self = this;

        ContentTypeFactory(Config.getContentTypeConfig("plp_enhanced_product_detail_item_image"), self.contentType, self.contentType.stageId)
            .then(function (plpEnhancedProductDetailItemImage) {
                self.contentType.addChild(plpEnhancedProductDetailItemImage, self.contentType.children().length);
            });
    };

    /**
     * Changes button visibility depending on children number
     *
     * @param element
     * @param contentTypeCollection
     */
    Preview.prototype.checkButtonVisibility = function checkButtonVisibility(element, contentTypeCollection) {
        // initial state
        this.checkButtonVisibilityHelper(element, contentTypeCollection.children(), contentTypeCollection);

        // on children change
        contentTypeCollection.children.subscribe(items => {
            this.checkButtonVisibilityHelper(element, items, contentTypeCollection);
        });
    };

    /**
     * Helper for checkButtonVisibility method
     *
     * @param element
     * @param items
     * @param contentTypeCollection
     */
    Preview.prototype.checkButtonVisibilityHelper = function checkButtonVisibilityHelper(element, items, contentTypeCollection) {
        const MAX_CHILDREN_ALLOWED = 4;
        const MAX_CHILDREN_WITH_DOUBLE_IMAGE_ALLOWED = 3; // we cannot add more than 3 because double image takes double space
        const MAX_CHILDREN_WIDTH_TWO_DOUBLE_IMAGE_ALLOWED = 2; // if we have only two images and both of the are double - hide the button

        const pagebuilderContentTypeWrapper = $(`#${contentTypeCollection.id} .pagebuilder-content-type-wrapper`);
        const pagebuilderDoubleImageContainer = $(`#${contentTypeCollection.id} .pagebuilder-content-type-wrapper.double-image`);
        const hasDoubleImageContainer = pagebuilderContentTypeWrapper.hasClass('double-image');

        if (!hasDoubleImageContainer) {
            items.length === MAX_CHILDREN_ALLOWED ? $(element).hide() : $(element).show();
        } else {
            if (pagebuilderDoubleImageContainer.length === MAX_CHILDREN_WIDTH_TWO_DOUBLE_IMAGE_ALLOWED
                || items.length === MAX_CHILDREN_WITH_DOUBLE_IMAGE_ALLOWED) {
                $(element).hide();
            } else {
                $(element).show();
            }
        }
    };

    return Preview;
});

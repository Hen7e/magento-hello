define([
    'jquery',
    'mage/translate',
    'mageplaza/core/jquery/popup'
], function ($, _) {
    'use strict';

    var popupTriggerClass = '.pagebuilder-press-item[data-appearance="image"][data-config]',

        /*
        * Generate popup node
        */

        // "Full article" link if required
        popupLink = $('<a/>', {
            'text': _('Full article'),
            'class': 'pagebuilder-press-item-popup-button pagebuilder-press-item-popup-button-read'
        }).hide(),

        // "Back" button
        popupBackButton = $('<button/>', {
            'text': _('Back'),
            'class': 'pagebuilder-press-item-popup-button pagebuilder-press-item-popup-button-back'
        }),

        // Buttons container
        popupControls = $('<div/>', {
            'class': 'pagebuilder-press-item-popup-controls',
            'append': [popupBackButton, popupLink]
        }),

        // Image
        popupImage = $('<img/>', {
            'class': 'pagebuilder-press-item-popup-image'
        }),

        // Content
        popupContent = $('<div/>', {
            'class': 'pagebuilder-press-item-popup-content',
            'append': [popupImage, popupControls]
        }),

        // 1Wrapper
        popupSource = $('<div/>', {
            'class': 'pagebuilder-press-item-popup-container',
            'append': popupContent
        }),



        /*
         * Append data to popup
         *
         */
        fillPopup = function (config) {

            clearPopup();
            popupImage.attr('src', config.image.src);
            popupImage.attr('alt', config.image.alt);

            if (
                config.link &&
                config.link.href
            ) {
                config.link.target && popupLink
                    .attr('target', config.link.target);

                popupLink
                    .attr('href', config.link.href)
                    .show();
            }
        },

        /*
         * Clear popup image and link
         */
        clearPopup = function () {

            popupImage
                .removeAttr('src')
                .removeAttr('alt');

            popupLink
                .removeAttr('href')
                .removeAttr('target')
                .hide();
        },

        /*
         * Mfp configuration
         */
        popupConfig = {
            mainClass: 'pagebuilder-press-item-popup',
            showCloseBtn: false,
            closeOnContentClick: true,
            type: 'inline',
            removalDelay: 300,
            items: {
                src: popupSource
            },
            callbacks: {
                open: function () {
                    setTimeout(function () {
                        document.body.classList.add(
                            'pagebuilder-press-popup-active'
                        );
                    }, 100);
                },
                beforeClose: function () {
                    document.body.classList.remove(
                        'pagebuilder-press-popup-active'
                    );
                }

            }
        },

        /*
         * Config data validator
         */
        getConfig = function (element) {
            var result = null;

            try {
                result = JSON.parse(
                    $(element).attr('data-config')
                );
            } catch (error) {
                console.error(error);
            }

            return result;
        },

        /*
         * Open popup
         */
        openPopup = function () {
            var config = getConfig(this);

            if (config) {
                fillPopup(config);
                $.magnificPopup.open(popupConfig);
            }
        };

    return function (_, element) {
        $(element).on(
            'click', popupTriggerClass, openPopup
        );
    };
});

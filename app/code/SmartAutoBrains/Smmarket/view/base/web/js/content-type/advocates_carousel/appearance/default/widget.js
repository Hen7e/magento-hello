/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2021 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Andrey Bugaev <abugaev@helenoftroy.com>
 */

define([
    'jquery',
    'matchMedia',
    'jquery/ui',
    'bxSlider'
], function ($, mediaCheck) {
    'use strict';

    $.widget('astound.advocatesCarousel', {
        options: {
            slider: {},
            isEnoughSlides: false,
            isInitialized: false,
            mediaM: '(max-width: 768px)',
            gridClassName: 'advocate-slider',
            baseParams: {
                slideWidth: 335,
                infiniteLoop: false,
                hideControlOnEnd: true,
                minSlides: 1.5,
                maxSlides: 4,
                moveSlides: 2,
                pager: false,
                adaptiveHeight: true
            }
        },

        _create: function () {
            this.options.isEnoughSlides = this.element.find("div[data-content-type='advocates_carousel_item']").length > this.options.baseParams.minSlides;
            this._defineEvents();
        },

        _defineEvents: function () {
            if (!this.options.isEnoughSlides) {
                return;
            }

            var self = this;

            mediaCheck({
                media: self.options.mediaM,
                entry: function () {
                    self._removeCarousel();
                },
                exit: function () {
                    self._createCarousel();
                }
            });
        },

        _createCarousel: function () {
            var element = $('.pagebuilder-advocates-carousel-wrapper');

            element.removeClass(this.options.gridClassName);
            this.options.slider = element.bxSlider(this.options.baseParams);
            this.isInitialized = true;
        },

        _removeCarousel: function () {
            if (!this.isInitialized) {
                return;
            }

            var element = $('.pagebuilder-advocates-carousel-wrapper');

            element.addClass(this.options.gridClassName);
            this.options.slider.destroySlider();
            this.isInitialized = false;
        }
    });

    return $.astound.advocatesCarousel;
});

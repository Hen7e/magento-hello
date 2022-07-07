/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2021 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Andrey Bugaev <abugaev@helenoftroy.com>
 */

define([
    'jquery'
], function ($) {
    'use strict';

    return function (config, quoteSlider) {
        const angleLeft = $('.angle-caret-left'),
            angleRight = $('.angle-caret-right'),
            isShownClass = 'hot-show';

        let index = 0,
            quotesCount = $('.quote-slider-item').length - 1;

        $('.quote-slider-item:nth-child(1)').addClass('hot-show');

        angleLeft.on('click', function () {
            index = 0 === index ? quotesCount : index - 1;
            $('.quote-slider-item.hot-show').removeClass(isShownClass);
            $('.quote-slider-item')[index].classList.add(isShownClass);
        });

        angleRight.on('click', function () {
            index = quotesCount === index ? 0 : index + 1;
            $('.quote-slider-item.hot-show').removeClass(isShownClass);
            $('.quote-slider-item')[index].classList.add(isShownClass);
        });

        $('.quote-stars').each(function (index, item) {
            let starsCount = $(item).text();

            $(item).empty();

            for (let i = 0; i < starsCount; i++) {
                $(item).append('<span>★</span>');
            }
        });
    };
});
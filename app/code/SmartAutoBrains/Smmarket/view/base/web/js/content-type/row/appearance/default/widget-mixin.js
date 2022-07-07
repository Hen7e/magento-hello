/**
 * @module      Astound_ContentTypes
 * @copyright   Copyright (c) 2022 Helen of Troy (https://www.helenoftroy.com/)
 * @author      Pavel Kushnerevich <pkushnerevich@helenoftroy.com>
 * @author      Alexey Panchenko <apanchenko@helenoftroy.com>
 */
define([
    'jquery',
    'Magento_PageBuilder/js/widget/video-background',
    'underscore',
    'jarallax'
], function ($, videoBackground, _) {
    'use strict';

    return function (target) {
        function stylesForBackground($element, breakpoints) {
            var backgroundData = $element.data('background-images');
            if (backgroundData && !_.isEmpty(backgroundData)) {
                var backgroundImages = JSON.parse($element.data('background-images').replace(/\\(.)/mg, "$1")),
                    elementClasses = '.' + $element.attr('class').split(' ').join('.'),
                    backgroundCss = '<style type="text/css">',
                    isNeedAddStyle = false;

                if (backgroundImages.desktop_image) {
                    backgroundCss += elementClasses + '{background-image: url(' + backgroundImages.desktop_image + ')}';
                }

                if (backgroundImages.mobile_image) {
                    backgroundCss +=
                        '@media only screen and (max-width: ' + breakpoints.mobile.conditions['max-width'] + ') {' +
                        elementClasses + '{background-image: url(' + backgroundImages['mobile_image'] + ');}' +
                        '}';
                    isNeedAddStyle = true;
                }

                if (backgroundImages.tablet_image) {
                    backgroundCss +=
                        '@media only screen and (max-width: ' + breakpoints.tablet.conditions['max-width'] + ') ' +
                        'and (min-width: ' + breakpoints.tablet.conditions['min-width'] + ') {' +
                        elementClasses + '{background-image: url(' + backgroundImages.tablet_image + ')} ' +
                        '}';
                    isNeedAddStyle = true;
                }

                backgroundCss += '</style>';

                if (isNeedAddStyle) {
                    $element.after(backgroundCss);
                }
            }
        }


        return function (config, element) {
            var $element = $(element);

            if ($element.hasClass('hockey-card-inner') && $element.data('background-images')) {
                var hockeyBreakpoints = {
                        'desktop': {
                            'conditions': {
                                'min-width': '1024px'
                            }
                        }
                    },
                    backgroundImages = JSON.parse($element.data('background-images').replace(/\\(.)/mg, "$1"));

                if (backgroundImages.tablet_image) {
                    hockeyBreakpoints = {
                        ...hockeyBreakpoints,
                        'mobile': {
                            'conditions': {
                                'max-width': '550px'
                            }
                        },
                        'tablet': {
                            'conditions': {
                                'max-width': '1024px',
                                'min-width': '551px'
                            }
                        }
                    };
                } else {
                    hockeyBreakpoints = {
                        ...hockeyBreakpoints,
                        'mobile': {
                            'conditions': {
                                'max-width': '768px'
                            }
                        },
                    };
                }

                stylesForBackground($element, hockeyBreakpoints);
            } else {
                const { breakpoints } = config;
                stylesForBackground($element, breakpoints);
            }
        };
    };
});

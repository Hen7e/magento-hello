define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'youtubePlayer',
    'vimeoPlayer',
    'Magento_PageBuilder/js/events',
    'accordion',
    'socialShare'
], function ($, modal, youtubePlayer, vimeoPlayer) {
    'use strict';

    /* Video Player */
    var $popupTrigger = $('.js-popup-video-trigger'),
        pairs = [];

    var isInit = false;

    if (!isInit) {
        $.each($popupTrigger, function (key, val) {
            var $curIframe = $(val).next('.js-video-frame-wrapper').find('.js-popup-video-frame');
            pairs[key] = $curIframe;
            prepareVideoPopup($curIframe);
        });

        isInit = true;
    }

    $popupTrigger.on('click', function (e) {
        var $iframe = pairs[$popupTrigger.index(this)];

        $iframe.modal('openModal');
    });

    function prepareVideoPopup($el) {
        var youtubeRegEx = new RegExp("^(?:https?:\/\/|\/\/)?(?:www\\.|m\\.)?" + "(?:youtu\\" +
            ".be\/|youtube\\.com\/(?:embed\/|v\/|watch\\?v=|watch\\?.+&v=))([\\w-]{11})(?![\\w-])"),
            vimeoRegEx = new RegExp("https?:\/\/(?:www\\.|player\\.)?vimeo.com\/(?:channels\/" + "(?:\\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\\d+)\/video\/|video\/|)(\\d+)(?:$|\/|\\?)"),
            youtubeParameters = '?enablejsapi=1&mute=1',
            vimeoParameters = '?muted=1',
            $iframe = $el,
            iframeSrc = $iframe.attr('src'),
            player = '',
            videoPlayer = {},
            options = {},
            popup;

        if (youtubeRegEx.test(iframeSrc)) {
            player = 'youtube';
            videoPlayer = youtubePlayer;
            $iframe.attr('src', "https://www.youtube.com/embed/" + youtubeRegEx.exec(iframeSrc)[1] + youtubeParameters);
        } else if (vimeoRegEx.test(iframeSrc)) {
            player = 'vimeo';
            videoPlayer = vimeoPlayer;
            $iframe.attr('src', "https://player.vimeo.com/video/" + vimeoRegEx.exec(iframeSrc)[3] + vimeoParameters);
        }

        options = {
            'type': 'popup',
            'trigger': '',
            'modalClass': 'modal-video',
            'buttons': [],
            'videoType': player,
            'videoPlayer': videoPlayer,
            'isInitial': undefined,
            'player': undefined
        };

        popup = modal(options, $iframe);
    }

    return function (config, element) {
        var globalConfig = {
                /* Accordion */
                accordionSelector: '.js-video-article-toggle-trigger',
                accordionCollapseTrigger: '.js-video-article-collapse-trigger',
                /* Social Share */
                socialShareButton: '.js-social-share'
            },
            $element = $(element),
            /* Accordion */
            accordionElement = $(element).find(globalConfig.accordionSelector),
            accordionCollapseTriggerElement = $(element).find(globalConfig.accordionCollapseTrigger),
            /* Social Share */
            shareButton = $(element).find(globalConfig.socialShareButton);

        /* Accordion */
        if ($element && $element.data()) {
            accordionCollapseTriggerElement.on('click', function (e) {
                e.preventDefault();
                accordionElement.click();
            });

            accordionElement.on('click', function (e) {
                $element.toggleClass('opened');
            });

            $(accordionElement).bayan({
                'isContentOpened': 0,
                'effect': 'opacity'
            });
        }

        /* Social Share */
        if (shareButton.length > 0) {
            for (var i = 0; i < shareButton.length; i++) {
                shareButton[i].dataset.url = window.location.href;
            }
            shareButton.socialshare();
        }
    };
});

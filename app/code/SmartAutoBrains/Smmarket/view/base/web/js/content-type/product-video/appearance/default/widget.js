define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'youtubePlayer',
    'vimeoPlayer'
], function ($, modal, youtubePlayer, vimeoPlayer) {
    'use strict';

    var $popupTrigger = $('.js-product-tab-video-trigger'),
        pairs = [];

    $.each($popupTrigger, function (key, val) {
        var $curIframe = $(val).next('.product-tab-video-frame-wrapper').find('.js-modal-video-frame');

        pairs[key] = $curIframe;
        prepareVideoPopup($curIframe);
    });

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
});

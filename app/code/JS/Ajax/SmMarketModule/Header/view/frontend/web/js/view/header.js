/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
 define([
    'uiComponent',
], function (Component) {
    'use strict';

    return Component.extend({

        initialize: function () {
            this._super();
            console.log('test')
        },       
    });
}); 
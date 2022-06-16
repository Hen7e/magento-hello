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
        },

        getWeather: function() {
            const city = document.getElementById('value')
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=dd1f1ef49731f2019aee68863813b469`
            
            async function getResponse() {
                const response = await fetch(url)
                const content = await response.json()
                const renderData = document.getElementById('weatherData')
                const today = new Date();
                const date = today.getDate();
                const nameOfMonth = new Date().toLocaleString(
                    'default', {month: 'long'}
                );
                const time = today.getHours() + ":" + today.getMinutes();
                const error = document.getElementById('error');
                const removeButton = document.getElementById('removeButton');
                const submitBtn = document.getElementById('submitBtn');

                if (content.name) {
                    error.innerHTML = '';
                } else {
                    error.innerHTML = content.message;
                }
               
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }

                renderData.innerHTML += `
                    <li class="weather" id="removeItem">
                        <span class="orange">${date} ${nameOfMonth}, ${time}</span>
                        <span class="fontSize">${content.name}, ${content.sys.country}</span>
                        <span class="circle" id="circle">${Math.round(content.main.feels_like)} &#176C</span>
                        <span class="fontSizeBold">Feels like: ${Math.round(content.main.feels_like)} &#176C, ${capitalizeFirstLetter(content.weather[0].description)}, ${content.weather[0].main}</span>
                        <div class="direction">
                            <div class="direction__left">
                                <span>&#x2193; ${content.wind.speed} m/s N<span> 
                                <span>Humidity ${content.main.humidity}%</span>
                            </div>
                            <div class="direction__right">
                                <span>Visibility: ${Math.floor(content.visibility / 1000)} km<span>
                            </div>
                        </div>
                    </li>
                `
                const circle = document.getElementById('circle')

                if (Math.round(content.main.feels_like) <= 15) {
                    circle.style.color = 'red'
                } else {
                    circle.style.color = 'green'
                }

                if (renderData) {
                    removeButton.removeAttribute('disabled', 'disabled')
                } 

                submitBtn.setAttribute('disabled', 'disabled')
            }

            city.value = '';

            getResponse()
        },

        clearData: function() {
            const renderData = document.getElementById('removeItem');
            const removeButton = document.getElementById('removeButton');
            removeButton.setAttribute('disabled', 'disabled')
            submitBtn.removeAttribute('disabled', 'disabled')
            renderData.remove()
        }
    });
});

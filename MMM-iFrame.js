/* global Module */

/* Magic Mirror
 * Module: iFrame
 *
 * By Ben Williams http://desertblade.com
 * MIT Licensed.
 */

Module.register("MMM-iFrame",{
		// Default module config.
		defaults: {
                frameWidth: "300",
				width:"100%",
				updateInterval: 0.5 * 60 * 1000,
				url: ["http://magicmirror.builders/"],
				scrolling: "no"
		},

        start: function () {
                const _self = this;
                let count = 0;
                if (this.config.url.length > 0 ) {
						setInterval( function () { 
								_self.updateDom(1000);
								console.log('update' + count++)
                        }, this.config.updateInterval);
                }
		},
		
		getRandomInt: function (min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
		},

		resume: function() {
				console.log("Resuming");
				return this.getDom();
		},

		getStyles: function() {
				return ["MMM-iFrame.css"];
		},

		// Override dom generator.
		getDom: function() {
				const { width, height } = this.config;
				const url = this.config.url[this.getRandomInt(0, this.config.url.length)];
				const hasQueryParams = url.indexOf("?") != -1;
				const src = url + ( hasQueryParams ? "&timestamp=" : "?timestamp=" ) + Date.now();
				
				let wrapper = document.createElement("div");
						
				wrapper.className = "mmm-iframe"
				wrapper.style.width = `${this.config.frameWidth}px`;

				const html = `
						<div class="mmm-iframe-wrapper" style="padding-top: ${100 / (width / height)}%;">
								<iframe
										src="${src}"
										width="${width}"
										height="${height}"
										scrolling="${this.config.scrolling}"
								></iframe>
						</div>
				`;

				wrapper.insertAdjacentHTML("afterbegin", html);

				return wrapper;
		}

});

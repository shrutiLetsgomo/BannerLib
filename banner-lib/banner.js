document.addEventListener("DOMContentLoaded", function(event) { 
	if(Banner_show) {
		var banner = new Banner({
			data:Banner_html_string
		});
		banner.initialize();
	}
});

(function()
{
	this.Banner = function(){
		var defaults = {
			data: Banner_html_string
		}

		if (arguments[0] && typeof arguments[0] === "object") {
	      this.options = extendDefaults(defaults, arguments[0]);
	    }
	}

	Banner.prototype.initialize = function(){
		buildUp.call(this);
	    addBanner.call(this);
		showBanner.call(this);
		initializeEvents.call(this);
	}

	function extendDefaults(source, properties) {
	    var property;
	    for (property in properties) {
	      if (properties.hasOwnProperty(property)) {
	        source[property] = properties[property];
	      }
	    }
	    return source;
	}

	function buildUp(){
		if (typeof this.options.data === "string") {
	      data = this.options.data;
	    } else {
	      data = this.options.data.innerHTML;
	    }

	}

	function initializeEvents(){
	 	window.onscroll = function() {
			showBanner.call(this);
		}
	}

	function addBanner(){

		bannerSection = '<div id="banner_bottom" class="banner_bottom_fixed banner_bottom_hide">'+
							this.options.data
						+'</div>';
		document.body.innerHTML += bannerSection;
	}

	function showBanner(){
		var bannerBottomClassList = document.getElementById('banner_bottom').classList ; 
		if(window.scrollY < 300) {
			bannerBottomClassList.add('banner_bottom_hide');
		} else {
			bannerBottomClassList.remove('banner_bottom_hide');
		}
	}
})();
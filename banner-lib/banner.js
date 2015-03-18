(function()
{
	var bannerSection = '';
	Banner = function(){
		this.data = Banner_html_string;
		bannerSection = '<div id="banner_bottom" class="banner_bottom_fixed banner_bottom_hide">'+this.data+'</div>';
		Banner.addBanner();
	}

	Banner.showBanner = function(){
		var bannerBottomClassList = document.getElementById('banner_bottom').classList ; 
		if(window.scrollY < Banner_show_after_Y) {
			bannerBottomClassList.add('banner_bottom_hide');
		} else {
			bannerBottomClassList.remove('banner_bottom_hide');
		}
	}

	Banner.addBanner = function(){
		document.body.innerHTML += bannerSection;
	}

	if(Banner_show) {
		new Banner();
		Banner.showBanner();
		window.onscroll = function() {
			Banner.showBanner();
		}
	}

})();
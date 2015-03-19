(function() {
    this.Banner = function() {
        var defaults = {
            data: 'This is the default banner will open www.google.com',
            link: "http://www.google.com"
        }
        this.options = defaults;
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = _extendDefaults(defaults, arguments[0]);
        }
    }

    Banner.prototype.initialize = function() {
        _validateProperties.call(this);
        _addBannerToDOM.call(this);
        _showOrHideBannerOnWindowScroll.call(this);
        _initializeEvents.call(this);
    }

    function _extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function _validateProperties() {
        if (typeof this.options.data === "string") {
            data = this.options.data;
        } else {
            data = this.options.data.innerHTML;
        }

    }

    function _initializeEvents() {
        _addScrollEvent();
    }

    function _addScrollEvent() {
        window.onscroll = function() {
            _showOrHideBannerOnWindowScroll.call(this);
        }
    }

    function _addBannerToDOM() {
        bannerSection = '<a' +
            '   href="' + this.options.link + '"' +
            '   id="banner_bottom"  ' +
            '   class="banner_bottom_fixed banner_bottom_hide">  ' +
            this.options.data +
            '</a>';
        document.body.innerHTML += bannerSection;
    }

    function _showOrHideBannerOnWindowScroll() {
        var bannerBottomClassList = document.getElementById('banner_bottom').classList;
        if (window.scrollY < 300) {
            bannerBottomClassList.add('banner_bottom_hide');
        } else {
            bannerBottomClassList.remove('banner_bottom_hide');
        }
    }

    document.onreadystatechange = function() {
        if (document.readyState == "interactive") {
            if (typeof(bannerShow) === 'undefined') {
                throw new Error('bannerShow is not defined in config.js');
            }
            if (bannerShow) {
                var banner;
                if (typeof(bannerHtmlString) !== 'undefined' & typeof(bannerLink) !== 'undefined') {
                    banner = new Banner({
                        data: bannerHtmlString,
                        link: bannerLink
                    });
                } else {
                    banner = new Banner();
                    banner.initialize();
                    throw new Error('bannerHtmlString or link are not defined in config.js');
                }
                banner.initialize();
            }
        }
    }
})();
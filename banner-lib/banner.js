(function() {
    this.Banner = function() {
        var defaults = {
            data: bannerHtmlString,
            link: bannerLink
        }
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
        if (document.readyState == "interactive" & bannerShow) {
            var banner = new Banner({
                data: bannerHtmlString,
                link: bannerLink
            });
            banner.initialize();
        }
    }
})();
(function() {
    // Define our constructor
    this.Banner = function() {
        // Define option defaults
        var defaults = {
            data: 'This is the default banner will open www.google.com',
            link: "http://www.google.com"
        }
        this.options = defaults;
        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = _extendDefaults(defaults, arguments[0]);
        }
    }

    // Public method to initialize banner
    Banner.prototype.initialize = function() {
        _validateProperties.call(this);
        _addBannerToDOM.call(this);
        _showOrHideBannerOnWindowScroll.call(this);
        _initializeEvents.call(this);
    }

    // Utility method to extend defaults with user options
    function _extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    // Validate object properties
    function _validateProperties() {
        /*
         * If content is an HTML string, append the HTML string.
         * If content is a domNode, append its content.
         */
        if (typeof this.options.data === "string") {
            data = this.options.data;
        } else {
            data = this.options.data.innerHTML;
        }

    }

    // Initialize our event listeners
    function _initializeEvents() {
        _addScrollEvent();
    }

    // Add window scroll event 
    function _addScrollEvent() {
        window.onscroll = function() {
            _showOrHideBannerOnWindowScroll.call(this);
        }
    }

    // Add banner to the document object modal
    function _addBannerToDOM() {
        bannerSection = '<a' +
            '   href="' + this.options.link + '"' +
            '   id="banner_bottom"  ' +
            '   class="banner_bottom_fixed banner_bottom_hide">  ' +
            this.options.data +
            '</a>';
        document.body.innerHTML += bannerSection;
    }

    // show the banner when window scrollY more than 300
    function _showOrHideBannerOnWindowScroll() {
        var bannerBottomClassList = document.getElementById('banner_bottom').classList;
        if (window.scrollY < 300) {
            bannerBottomClassList.add('banner_bottom_hide');
        } else {
            bannerBottomClassList.remove('banner_bottom_hide');
        }
    }

    // Banner intialize when document object model loaded
    document.onreadystatechange = function() {
        if (document.readyState == "interactive") {
            // If bannerShow not present in config.js
            if (typeof(bannerShow) === 'undefined') {
                throw new Error('bannerShow is not defined in config.js');
            }
            if (bannerShow) {
                var banner;
                // If bannerHtmlString or bannerLink not present in config.js
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
                // initialize banner
                banner.initialize();
            }
        }
    }
})();
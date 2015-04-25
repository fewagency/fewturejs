Utils = {

  /**
   *
   */
  init: function() {

    this.requestAnimationFrameInitialized = false;
    //this.scrollStatus();
    //this.polyfills.pageYOffset();
    //this.polyfills.placeholder();
    this.initShowTriggers();
    this.initHideTriggers();

  },

  /**
   *
   */
  requestAnimationFrame: function() {

    if(!this.requestAnimationFrameInitialized) {

      // Adapted from https://gist.github.com/paulirish/1579671 which derived from
      // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
      // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

      // requestAnimationFrame polyfill by Erik Möller.
      // Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

      // MIT license

      if (!Date.now) {
        Date.now = function () {
          return new Date().getTime();
        };
      }

      (function () {

        'use strict';

        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
          var vp = vendors[i];
          window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
          window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) { // // iOS6 is buggy
          var lastTime = 0;
          window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
              },
              nextTime - now);
          };
          window.cancelAnimationFrame = clearTimeout;
        }
      }());

    } else {

      this.requestAnimationFrameInitialized = true;

    }

  },

  /**
   *
   */
  isTouchDevice: function() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0)  || (navigator.msMaxTouchPoints > 0));
  },

  /**
   * Adds a hidden string to the dom tellign us which media query the with is currently targeting.
   * This value can then be fetched using javascript.
   * https://gist.github.com/branneman/6366121
   */
    /*

    head {
      font-family: 'xs';
    }

    body:after {
      display: none;
      content: 'xs';
    }

    @media (min-width: @screen-sm-min) {
      head {
        font-family: 'sm';
      }

      body:after {
        content: 'sm';
      }

    }

    @media (min-width: @screen-md-min) {
      head {
        font-family: 'md';
      }

      body:after {
        content: 'md';
      }

    }

    @media (min-width: @screen-lg-min) {
      head {
        font-family: 'lg';
      }
      body:after {
        content: 'lg';
      }
    }

  */
  /**
   * A way to get the name of the current screen size in JS. Make sure that the css represented by the less above is
   * included as well.
   *
   * https://gist.github.com/branneman/6366121
   * @returns {string}
   */
  getResponsiveTag: function() {

    var activeMQ;

    // Fix for Opera issue when using font-family to store value
    if (window.opera) {
      activeMQ = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
    }

    // For all other modern browsers
    else if (window.getComputedStyle) {
      activeMQ = window.getComputedStyle(document.head, null).getPropertyValue('font-family');
    }
    // For oldIE
    else {
      // Use .getCompStyle instead of .getComputedStyle so above check for window.getComputedStyle never fires true for old browsers
      window.getCompStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
          var re = /(\-([a-z]){1})/g;
          if (prop == 'float') prop = 'styleFloat';
          if (re.test(prop)) {
            prop = prop.replace(re, function () {
              return arguments[2].toUpperCase();
            });
          }
          return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
      };
      var compStyle = window.getCompStyle(document.getElementsByTagName('head')[0], '');
      activeMQ = compStyle.getPropertyValue('font-family');
    }

    activeMQ = activeMQ
      .replace(/"/g, '')
      .replace(/'/g, '');

    return activeMQ;

  },

  /**
   *
   * @returns {number}
   */
  isIE: function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
  },

  /**
   *
   */
  scrollStatus: function() {

    $(window).data('isScrolling', 'false');

    console.log($(window).data('isScrolling'));

    $(window).scroll(function() {

      $(this).data('isScrolling', 'true');

      clearTimeout($.data(this, 'scrollTimer'));

      $.data(this, 'scrollTimer', setTimeout(function() {
        // do something
        $(this).data('isScrolling', 'false');
      }, 250));

    });

  },

  /**
   *
   */
  initShowTriggers: function() {

    $('[data-show-element]').on('click', function(event) {

      event.preventDefault();

      $($(this).attr('data-show-element')).show();

    });

  },

  /**
   *
   */
  initHideTriggers: function() {

    $('[data-hide-element]').on('click', function(event) {

      var preventDefault = $(this).attr('data-hide-element-prevent-default');

      if(typeof preventDefault !== 'undefined' && preventDefault === 1) {

        event.preventDefault();

      }

      $($(this).attr('data-hide-element')).hide();

    });

  },

  /**
   * Detect the name of the transition end event
   * http://davidwalsh.name/css-animation-callback
   * @returns {*}
   */
  whichTransitionEndEvent: function() {

    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for(t in transitions){
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }

    return false;

  }

};
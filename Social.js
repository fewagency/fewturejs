/**
 *
 * @type {{init: Function, facebook: Function, twitter: Function, googleplus: Function}}
 */
Social = {

  init: function() {

    this.facebook();
    this.twitter();
    this.googleplus();

  },

  /**
   *
   */
  facebook: function() {

    var $triggers = $("[data-facebook-share-trigger='1']");

    $triggers.on('click', function(event) {

      event.preventDefault();

      Social.windowOpen($(this).attr('href'), 626, 436);

    });

  },

  /**
   *
   */
  twitter: function() {

    var $triggers = $("[data-twitter-share-trigger='1']");

    $triggers.on('click', function(event) {

      event.preventDefault();

      Social.windowOpen($(this).attr('href'), 600, 400);

    });

  },

  /**
   *
   */
  googleplus: function() {


    var $triggers = $("[data-googleplus-share-trigger='1']");

    $triggers.on('click', function(event) {

      event.preventDefault();

      Social.windowOpen($(this).attr('href'), 600, 600);

    });

  },

  /**
   *
   * @param href
   * @param width
   * @param height
   */
  windowOpen: function(href, width, height) {

    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + height + ',width=' + width);

  }

};
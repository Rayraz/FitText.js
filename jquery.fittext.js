/*global jQuery */
/*!
 * fittext.js 1.2
 *
 * Copyright 2014, Ruben Vreeken https://github.com/rayraz
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <Ruben Vreeken> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return
 * ----------------------------------------------------------------------------
 *
 * Straight-up clone of fittext.js by Dave Rupert (http://daverupert.com)
 * Just added a check for $.debounce method.
 * So if you're gunna buy beer, buy one for Dave too pls ;-)
 *
 * Date: Wo May 06 13:37:00 2014 +0200
 */

(function($) {

  $.fn.fitText = function(kompressor, options) {

    // Setup options
    var compressor = kompressor || 1,
      settings = $.extend({
        'minFontSize': Number.NEGATIVE_INFINITY,
        'maxFontSize': Number.POSITIVE_INFINITY
      }, options);

    return this.each(function() {

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function() {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };
      if (typeof _ === 'object' && typeof _.debounce === 'function') {
        resizer = _.debounce(resizer, 50);
      }
      if($.debounce) {
        resizer = $.debounce(resizer, 50);
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})(jQuery);
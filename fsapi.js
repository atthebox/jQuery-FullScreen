/**
 * @name        jQuery FullScreen API Plugin (fsapi)
 * @author      James Nash
 * @version     1.1
 * @url         https://github.com/atthebox/jQuery-FullScreen
 * @license     MIT License
 */

;(function($, doc, scrn){
	"use strict";
  // storage of callbacks
  // & options for each element
  var fsConfig   = {};
  var fsCallback = {};

  // default values for options parameter
  // of constructor
  var defaults = {
    'background'          : '#111',
    'fullscreen_class'    : 'fs-fullscreen',
    'fullscreen_children' : false
  };

  // These helper functions available only to our plugin scope.

  var _eventCallback = function (){
    var current = $.currentFullScreenDiv;
    var obj = $('[fskey=' + current + ']');
    if (current != '') {
      fsCallback[current](obj, _fullScreenStatus());
    }
    if (!_fullScreenStatus()) {
      $.currentFullScreenDiv = '';
    }
  };

  var _randomString = function(length){
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = '';
    for (var i=0; i<length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
  };

  var _supportFullScreen = function(){
    var d = doc.documentElement;

    return  ('requestFullscreen' in d) ||
        ('mozRequestFullScreen' in d && doc.mozFullScreenEnabled) ||
        ('webkitRequestFullScreen' in d);
  };

  var _requestFullScreen = function (elem){

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    }
  };

  var _fullScreenStatus = function (){
    return  doc.fullscreen ||
        doc.mozFullScreen ||
        doc.webkitIsFullScreen;
  };

  var _cancelFullScreen = function (){
    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    }
    else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    }
    else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
    }
  };

  // Adding a new test to the jQuery support object
  $.support.fullscreen = _supportFullScreen();

  $.currentFullScreenDiv = '';

  // public methods
  var methods = {
    "init" : function( options, cb ) {
          if(!$.support.fullscreen){
              return this;
          }

          if (typeof options === 'function')
          {
              cb = options;
              options = undefined;
          }
          if (cb == undefined) {
               cb = function(){};
          }

          $(doc).off("fullscreenchange mozfullscreenchange webkitfullscreenchange", _eventCallback);
          $(doc).on("fullscreenchange mozfullscreenchange webkitfullscreenchange", _eventCallback);

          return this.each(function() {

             var $this   = $(this);
             var key     = _randomString(5);
             var tmp     = Object.create(defaults);

             $.extend(tmp, options);

             fsConfig[key]   = tmp;
             fsCallback[key] = cb;

             $this.attr('fskey', key);

          });
      },
      "close" : function() {
          if(_fullScreenStatus()){
             _cancelFullScreen();
          }
          var key = this.attr('fskey');
          var fs = $('div#fs-modal');

          this.find("*").removeClass(fsConfig[key].fullscreen_class);
          this.removeClass(fsConfig[key].fullscreen_class).insertBefore(fs);
          fs.remove();

          return this;
      },
      "open" : function() {
          var key = this.attr('fskey');
          $.currentFullScreenDiv = key;

          var fs = $('<div>', {
            'id'  : 'fs-modal',
            'css' : {
                'overflow'   : 'hidden',
                'margin'     : '0',
                'padding'    : '0',
                'background' : fsConfig[key].background,
                'width'      : '100%',
                'height'     : '100%'
            }
          });

          var elem = this;
          elem.addClass(fsConfig[key].fullscreen_class);

          if (fsConfig[key].fullscreen_children) {
            elem.find('*').addClass(fsConfig[key].fullscreen_class);
          }

          fs.insertBefore(elem);
          fs.append(elem);
          _requestFullScreen(fs.get(0));

          return this;
    },
    "width" : function() {
        return scrn.width;
    },
    "height" : function() {
        return scrn.height;
    },
    "isFull" : function() {
        if (_fullScreenStatus()){
            return true;
        }
        return false;
    }
  };

  // Creating the plugin
  $.fn.fsapi = function(method){
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || typeof method == 'function' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' is not a public method of jQuery.fsapi' );
    }

  };

})(jQuery, document, screen);
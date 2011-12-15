/* ==================================================================================
 * jquery.flickrPhotostream.js v0.1
 * Description: Retrieve's a list of images from the public photostream of a user
 * Project: http://manuel.manuelles.nl/jquery-flickrPhotostream
 * Author: Manuel van Rijn
 * Released under the MIT License.
 * =============================================================================== */

;( function( $, window, document, undefined ) {

  var FlickrPhotostream = function( elem, options ) {
    this.elem = elem;
    this.$elem = $(elem);
    this.config = $.extend( {}, $.fn.flickrPhotostream.defaults, options );
  };

  FlickrPhotostream.prototype = {
    init: function() {
      // I prefer not using the name "that"
			var _instance = this;
			var $ul = $('<ul />');
      $.getJSON( _instance.getFlickrPhotostreamUrl(), function(data) {
				var len = parseInt( _instance.config.photoCount );

				if( typeof len === "number" && data.items.length < len )
					len = data.items.length;

				for( var i=0; i<len; i++ ) {
					var flickrPhoto = data.items[i];
					var src = flickrPhoto.media.m;

					// Use small images instead of medium sized images?
					if( _instance.config.useSmallPhotos === true ) {
						src = src.split( '_m.' );
						src = src[0] + "_s." + src[1]
					}

					var photo = $( '<a />' )
						.attr( 'href', flickrPhoto.link )
						.attr( 'alt', flickrPhoto.title )
						.attr( 'title', flickrPhoto.title );

					var img = $( '<img />' )
						.data( 'src', src )
						.attr( 'alt', flickrPhoto.title )
						.appendTo( photo );

					var li = $( '<li />' )
						.append( photo )
						.addClass( 'photo-' + (i + 1) );

					$ul.append( li );
				}

				// if target is a <ul /> we'll append the li's
				if ( _instance.$elem.empty().get(0).tagName === 'UL' )
					_instance.$elem.append( $ul.children() );
				else
					_instance.$elem.empty().append( $ul );

				// smooth fadeIn
				$( 'img', _instance.$elem ).load(function() {
					$( this ).fadeIn();
				}).hide().each(function() {
					$( this ).attr( 'src', $(this).data('src') );
				});

				// trigger the callback
				_instance.config.callback.call( _instance.$elem );
			});

			return this;
		},
	  getFlickrPhotostreamUrl: function() {
	    return 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&id=' + this.config.userId + '&jsoncallback=?';
	  }
  }

  $.fn.flickrPhotostream = function( options ) {
    return this.each(function() {
      new FlickrPhotostream( this, options ).init();
    });
  };

  $.fn.flickrPhotostream.defaults = {
    userId: undefined,				// flickr userId.
		useSmallPhotos: true,			// use small images instead of medium sized images.
		photoCount: 6,						// number of photo's to show.
		callback: function() {}		// function that will be called after the latest tweet has been filled in.
  };

})( jQuery, window, document );

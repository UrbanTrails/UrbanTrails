/*
Copyright - 2015 2017 - Christian Guyette - Contact: http//www.ouaie.be/

This  program is free software;
you can redistribute it and/or modify it under the terms of the 
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

( function ( ) {

	'use strict';

	/*
	--- L.Marker.Pin object ------------------------------------------------------------------------------------------------
	
	This object extends the L.Marker object.
	
	v1.2.0:
	- Text part of the url is limited to 50 characters and the link open
	in a new window.
	- Doc reviewed 20160208
	- No automated unit tests for this object

	v1.2.4:
	- added the distance property
	- category name is added in the return value of the getHtml method
	- url length is limited to 30 characters in the return value of the getHtml method
	
	------------------------------------------------------------------------------------------------------------------------
	*/


	L.Marker.Pin = L.Marker.extend (
		{
			options : {
				text : '',
				phone : '',
				url : '',
				address : '',
				pinCategory : undefined,
				pinId : 0
			},

			
			/* --- Methods --- */
			
			/* 
			--- getHtml ( ) method --- 
			
			This method gives the text to display in the popup binded with the pin

			*/
		
			getHtml : function ( ) {
				var _Translator;
				if ( typeof module !== 'undefined' && module.exports ) {
					_Translator = require ('./L.Marker.Pin.Translator' );
				}
				else {
					_Translator = L.marker.pin.translator ( );
				}
				var HtmlText = this.options.pinCategory.CategoryName + '<br />';
				if ( this.options.text && 0 < this.options.text.length ) {
					HtmlText += this.options.text + '<br />';
				}
				if ( this.options.address && 0 < this.options.address.length ) {
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Address' ) +
						'&nbsp;: ' +
						this.options.address +
						'<br />';
				}
				if ( this.options.phone && 0 < this.options.phone.length ) {
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Phone' ) +
						'&nbsp;: ' +
						this.options.phone + 
						'<br />';
				}
				if ( this.options.url && 0 < this.options.url.length ) {
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Link' ) +
						'&nbsp: <a href="' +
						this.options.url + '" target="_blank">' +
						this.options.url.slice ( 0, 30 ) +
						'...</a>' +
						'<br />';
				}
				if ( this.options.distance && 0 < this.options.distance ) {
					HtmlText += 
						_Translator.getText ( 'L.Marker.Pin.Distance' ) +
						'&nbsp;: ' +
						this.options.distance.toFixed ( 3 );
				}
				
				return HtmlText;
			},

			/* 
			--- toGeoJSON ( ) method --- 
			
			This method returns the pin as a GeoJSON object

			*/

			toGeoJSON : function ( ) {
				return {
					"type" : "Feature",
					"geometry" : {
						"type" : "Point",
						"coordinates" : [ this.getLatLng().lng, this.getLatLng().lat ]
					},	
					"properties" : {
						"text" : this.options.text ? this.options.text : "",
						"address" : this.options.address ? this.options.address : "",
						"phone" : this.options.phone ? this.options.phone : "",
						"url" : this.options.url ? this.options.url : "",
						"categoryId" : this.options.pinCategory.CategoryId ? this.options.pinCategory.CategoryId : "",
						"distance" : this.options.distance ? this.options.distance : 0
					}
				};
			}
		}
	);
	
	L.marker.pin = function ( latlng, options ) 
	{
		return new L.Marker.Pin ( latlng, options );
	};		
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin;
	}
	
	/* --- End of L.Marker.Pin object --- */
	
} ) ( );
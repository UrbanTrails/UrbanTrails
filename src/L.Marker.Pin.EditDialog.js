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
	
	var myStyles = null;
	
	/* 
	--- L.Marker.Pin.EditDialog object -------------------------------------------------------------------------------------
	
	Patterns : Closure

	v1.2.0:
	- small changes to avoid order change after pin edition
	Doc reviewed 20160208
	No automated unit tests for this function

	v1.2.4:
	- replaced input for text by a textarea
	- added a "my style" button to load customized strings  for text, address and phone
	- added code for distance and read only
	
	------------------------------------------------------------------------------------------------------------------------
	*/
	
	L.Marker.Pin.getEditDialog  = function ( Map, latlng, options ) {
		
		/* --- private properties --- */
		
		var myStylesDiv = null;
		var focusArea = null;
		
		var _Translator;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Translator = require ('./L.Marker.Pin.Translator' );
		}
		else {
			_Translator = L.marker.pin.translator ( );
		}
		
		var _Categories;
		if ( typeof module !== 'undefined' && module.exports ) {
			_Categories = require ( './L.Marker.Pin.Categories' );
		}
		else {
			_Categories = L.marker.pin.categories ( );
		}
		
		var _MainDiv;
		var _TextArea;
		var _addressInput;
		var _PhoneInput;
		var _UrlInput;
		var _DistanceInput;
		var _CategorySelect;

		/* --- private methods --- */

		var onInsertStyle = function ( event ) {
			if ( ! focusArea ) {
				return;
			}
			var style = myStyles [ event.target.styleRange ];
			var bDouble = style.HTMLAfter && 0 < style.HTMLAfter.length;
			var selectionStart = focusArea.selectionStart;
			var selectionEnd = focusArea.selectionEnd;
			var oldText = focusArea.value;
			focusArea.value = oldText.substring ( 0, selectionStart ) + 
				( bDouble ? style.HTMLBefore + oldText.substring ( selectionStart, selectionEnd ) + style.HTMLAfter : style.HTMLBefore ) + 
				oldText.substring ( selectionEnd );
			focusArea.setSelectionRange ( 
				bDouble || selectionStart === selectionEnd ? selectionStart + style.HTMLBefore.length : selectionStart,
				( bDouble ? selectionEnd : selectionStart ) + style.HTMLBefore.length );
			focusArea.focus ( );
		};	
		
		var addStyleButtons = function ( ) {
			for ( var stylesCounter = 0; stylesCounter < myStyles.length; stylesCounter ++ ) {
				console.log ( stylesCounter );
				var newButton = L.DomUtil.create( 'button', 'PinEditDialog-StyleButton', myStylesDiv );
				newButton.setAttribute( 'type' , 'button' );
				var style = myStyles[ stylesCounter ];
				newButton.innerHTML = style.title;
				newButton.styleRange = stylesCounter;
				L.DomEvent.on ( newButton, 'click', onInsertStyle );	
			}
			
		};
		
		var onOpenFile = function ( event ) {
			var fileReader = new FileReader( );
			fileReader.onload = function ( event ) {
				myStyles = JSON.parse ( fileReader.result );
				addStyleButtons ( );
			};
			var fileName = event.target.files [ 0 ].name;
			fileReader.readAsText ( event.target.files [ 0 ] );
		};
		
		/* 
		--- _createDiv ( Class , Container, InnerHtml ) method --- 
		
		Helper method for html 'div' creation

		*/
		
		var _createDiv = function ( Class , Container, InnerHtml ) {
			var Div = L.DomUtil.create ( 'div', Class, Container );
			Div.innerHTML = InnerHtml;
			
			return Div;
		};
		
		/* End of _createDiv method */

		/* 
		--- _createButton ( Class, Label, Container ) method --- 
		
		Helper method for html 'button' creation

		*/

		var _createButton = function ( Class, Label, Container ) {
			var Button = L.DomUtil.create( 'button', Class, Container );
			Button.setAttribute( 'type' , 'button' );
			Button.innerHTML = Label;
			
			return Button;
		};

		/* End of _createButton method */

		/* 
		--- _createInput ( Type, Value, PlaceHolder, Container ) method --- 
		
		Helper method for html 'input' creation

		*/

		var _createInput = function ( Type, Value, PlaceHolder, Container ) {
			var Input = L.DomUtil.create( 'input', 'InputClass', Container );
			Input.setAttribute( 'type' , Type );
			Input.setAttribute( 'value' , Value );
			Input.setAttribute( 'placeholder', PlaceHolder );
			
			return Input;
		};
		
		/* End of _createInput method */

		/* 
		--- _createSelect ( Container ) method --- 
		
		Helper method for html 'select' creation

		*/

		var _createSelect = function ( Container ) {
			var Select = L.DomUtil.create( 'select', 'SelectClass', Container );
			
			return Select;
		};

		/* End of _createSelect method */

		/* 
		--- _createOption ( Value, Container ) method --- 
		
		Helper method for html 'option' creation

		*/

		var _createOption = function ( Value, Container ) {
			var Option = L.DomUtil.create( 'option', '', Container );
			Option.innerHTML = Value;
			
			return Option;
		};

		/* End of _createOption method */

		/* 
		--- _addPinToMap ( ) method --- 
		
		This method creates the pin and add it to the map and the pins collection

		*/

		var _addPinToMap = function ( ) {
			
			if ( '' === _DistanceInput.value ) {
				return ;
			}

			Map.closePopup(); 

			// ... A new pin is created...
			var getPin;
			if ( typeof module !== 'undefined' && module.exports ) {
				getPin = require ('./L.Marker.Pin' );
			}
			else {
				getPin = L.marker.pin;
			}

			var Pins;
			if ( typeof module !== 'undefined' && module.exports ) {
				Pins = require ('./L.Marker.Pin.Pins' );
			}
			else {
				Pins = L.marker.pin.pins ( );
			}

			var draggableIcon = ! Pins.readOnly;

			var Pin = getPin (
				latlng,
				{
					icon : _Categories.getAt ( _CategorySelect.selectedIndex ).CategoryIcon,
					draggable : draggableIcon,
					className : 'Pin',
					title : _Categories.getAt ( _CategorySelect.selectedIndex ).CategoryName,
					phone : _PhoneInput.value,
					url : _UrlInput.value,
					distance : parseFloat ( _DistanceInput.value ),
					//text : _TextInput.value,
					text : _TextArea.value,
					address : _addressInput.value,
					pinCategory : _Categories.getAt ( _CategorySelect.selectedIndex ),
					map : Map,
				}
			);

			if ( options.exist ) {
				// The dialog was open for edition. The old pin is 
				// removed from the map and from the pin's collection
				var pinPosition = Pins.remove ( options.pinObject );
				Map.removeLayer( options.pinObject );
				Pins.push ( Pin, pinPosition );
			}
			else {
				// ... and added to the pin's collection ...
				Pins.push ( Pin );
			}

			// ... a popup and events are added to the pin ...
			Pin.bindPopup ( Pin.getHtml ( ) ).addTo ( Map );
			
			var ContextMenu;
			if ( typeof module !== 'undefined' && module.exports ) {
				ContextMenu = require ('./L.Marker.Pin.ContextMenu' );
			}
			else {
				ContextMenu = L.marker.pin.contextmenu;
			}
			Pin.on ( 'contextmenu', ContextMenu ); 
			Pin.on ( 'dblclick', ContextMenu);
			Pin.on ( 'dragend', Pins.CallbackFunction ); 
			
			/*
			if ( options.exist ) {
				// The dialog was open for edition. The old pin is 
				// removed from the map and from the pin's collection
				var NewPos = Pins.remove ( options.pinObject );
				Map.removeLayer( options.pinObject );
				Pins.order ( OldPos - 1, NewPos, false );
			}
			*/
		};

		/* End of _addPinToMap method */
		
		/* 
		--- _createDialog ( ) method --- 
		
		This method creates the dialog

		*/
		
		var _createDialog = function ( ) {
			//... main div ...
			_MainDiv = L.DomUtil.create ( 'div','PinEditDialog-MainDiv' );
			_MainDiv.innerHTML = options.exist ? _Translator.getText ('L.Marker.Pin.EditDialog.PinModification' ) : _Translator.getText ('L.Marker.Pin.EditDialog.NewPin' );
			L.DomEvent.on ( 
				_MainDiv,
				'keyup',
				function ( KeyBoardEvent ) { 
					if ( 'Escape' === KeyBoardEvent.key || 'Esc' === KeyBoardEvent.key) {
						Map.closePopup ( );
					}
				}
			);

			// Open file button
			// It's impossible to add a style to an 'input' with type 'file'...
			var openFileDiv = L.DomUtil.create( 'div', 'PinEditDialog-openFileDiv', _MainDiv );
			openFileDiv.id = 'cyPinEditDialog-openFileDiv';
			// see also the style in the index.css file. due to this *#@?§ Microsoft Edge, it's not possible to modify the style with JS

			// ...so we have an input with opacity = 0 ...
			var openInput = L.DomUtil.create( 'input', 'PinEditDialog-openFileInput', openFileDiv );
			openInput.type = 'file';
			openInput.id = 'cyPinEditDialog-openFileInput';
			// see also the style in the css file. due to this *#@?§ Microsoft Edge, it's not possible to modify the style with JS
			openInput.accept ='.json';

			// ... and at the same position a div...
			var openFileFakeDiv = L.DomUtil.create( 'div', 'PinEditDialog-openFileFakeDiv', openFileDiv );
			openFileFakeDiv.id = 'cyPinEditDialog-openFileFakeDiv';
			// see also the style in the css file. due to this *#@?§ Microsoft Edge, it's not possible to modify the style with JS

			// with a button
			var openFileButton = L.DomUtil.create( 'button', 'PinEditDialog-openFileButton', openFileFakeDiv );
			openFileButton.setAttribute( 'type' , 'button' );
			openFileButton.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.MyStyles' );
			
			// When the button is clicked, the input is also clicked
			L.DomEvent.on ( openFileButton, 'click', function ( e ) { openInput.click ( ); } );

			// and the event on the input is handled
			L.DomEvent.on ( openInput, 'change', onOpenFile);

			myStylesDiv = L.DomUtil.create( 'div', 'PinEditDialog-myStylesDiv', _MainDiv );
			myStylesDiv.id = 'cyPinEditDialog-myStylesDiv';

			if ( myStyles )
			{
				addStyleButtons (  );
			}
			// ... input...
			var TextDiv = L.DomUtil.create ( 'div', 'PinEditDialog-TextDiv', _MainDiv );
			
			var textAreaLabel = L.DomUtil.create( 'label',  'PinEditDialog-TextDiv', TextDiv );
			textAreaLabel.htmlFor = 'cyPinEditDialog-TextArea';
			textAreaLabel.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.Text') + '&nbsp;:&nbsp;';

			_TextArea = L.DomUtil.create( 'textarea', 'PinEditDialog-TextDiv', TextDiv );
			_TextArea.value = options.text;
			_TextArea.id = 'cyPinEditDialog-TextArea';
			L.DomEvent.on ( _TextArea, 'focus', function ( event ) { focusArea = _TextArea;} );	

			var addressDiv = L.DomUtil.create ( 'div', 'PinEditDialog-AddressDiv', _MainDiv );
			
			var addressLabel = L.DomUtil.create( 'label',  'PinEditDialog-AddressDiv', addressDiv );
			addressLabel.htmlFor = 'cyPinEditDialog-AddressInput';
			addressLabel.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.Address') + '&nbsp;:&nbsp;';

			_addressInput = _createInput ( 'text', options.address, '', addressDiv );
			_addressInput.value = options.address;
			_addressInput.id = 'cyPinEditDialog-AddressInput';
			L.DomEvent.on ( _addressInput, 'focus', function ( event ) { focusArea = _addressInput;} );	

			var urlDiv = L.DomUtil.create ( 'div', 'PinEditDialog-UrlDiv', _MainDiv );
			
			var urlLabel = L.DomUtil.create( 'label',  'PinEditDialog-UrlDiv', urlDiv );
			urlLabel.htmlFor = 'cyPinEditDialog-UrlInput';
			urlLabel.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.Link') + '&nbsp;:&nbsp;';

			_UrlInput = _createInput ( 'url', options.url, '', urlDiv );
			_UrlInput.id = 'cyPinEditDialog-UrlInput';
			L.DomEvent.on ( _UrlInput, 'focus', function ( event ) { focusArea = null;} );	

			var categoryDiv = L.DomUtil.create ( 'div', 'PinEditDialog-CategoryDiv', _MainDiv );

			var categoryLabel = L.DomUtil.create( 'label',  'PinEditDialog-CategoryDiv', categoryDiv );
			categoryLabel.htmlFor = 'cyPinEditDialog-CategorySelect';
			categoryLabel.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.Category') + '&nbsp;:&nbsp;';
			
			_CategorySelect = _createSelect ( categoryDiv );
			_CategorySelect.id = 'cyPinEditDialog-CategorySelect';
			L.DomEvent.on ( _CategorySelect, 'focus', function ( event ) { focusArea = null;} );	
			
			for (var Counter = 0; Counter < _Categories.length; Counter++) {
				var Option = _createOption ( _Categories.getAt ( Counter ).CategoryName, _CategorySelect );
				if ( options.pinCategory && _Categories.getAt ( Counter ).CategoryId === options.pinCategory.CategoryId ) {
					Option.setAttribute ( 'selected', true );
				}
			}

			var phoneDiv = L.DomUtil.create ( 'div', 'PinEditDialog-PhoneDiv', _MainDiv );
			
			var phoneLabel = L.DomUtil.create( 'label',  'PinEditDialog-PhoneDiv', phoneDiv );
			phoneLabel.htmlFor = 'cyPinEditDialog-PhoneInput';
			phoneLabel.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.Phone') + '&nbsp;:&nbsp;';

			_PhoneInput = _createInput ( 'tel', options.phone, '', phoneDiv );
			_PhoneInput.id = 'cyPinEditDialog-PhoneInput';
			L.DomEvent.on ( _PhoneInput, 'focus', function ( event ) { focusArea = _PhoneInput;} );	

			var distanceDiv = L.DomUtil.create ( 'div', 'PinEditDialog-DistanceDiv', _MainDiv );
			
			var distanceLabel = L.DomUtil.create( 'label',  'PinEditDialog-DistanceDiv', distanceDiv );
			distanceLabel.htmlFor = 'cyPinEditDialog-DistanceInput';
			distanceLabel.innerHTML = _Translator.getText ('L.Marker.Pin.EditDialog.Distance') + '&nbsp;:&nbsp;';

			_DistanceInput = _createInput ( 'number', options.distance, '', distanceDiv );
			_DistanceInput.id = 'cyPinEditDialog-DistanceInput';
			_DistanceInput.lang = "en"; // to avoid problems with numeric keyboard...
			L.DomEvent.on ( _DistanceInput, 'focus', function ( event ) { focusArea = null;} );	


			// ... and buttons
			var ButtonsDiv = L.DomUtil.create ( 'div', 'PinEditDialog-ButtonsDiv', _MainDiv );
			var	OkButton = _createButton ( 'PinEditDialog-OkButton', _Translator.getText ('L.Marker.Pin.EditDialog.Ok'), ButtonsDiv );
			
			// Event on the ok button...
			L.DomEvent.on ( 
				OkButton,
				'click',
				_addPinToMap
			);
			
			var	CancelButton = _createButton ( 'PinEditDialog-CancelButton', _Translator.getText ('L.Marker.Pin.EditDialog.Cancel'), ButtonsDiv );
			// Event on the cancel button
			L.DomEvent.on ( 
				CancelButton, 
				'click', 
				function ( ) { 
					Map.closePopup ( );
				}
			);	

			// Call to nominatim for the geocoding
			_NominatimCall ( );
		};

		/* End of _createDialog method */
		
		/*
		--- _NominatimCallback ( NominatimJsonResponse ) method --- 
		Callback function for the geocoding of the pin
		Because we use asynchronous http request to Nominatim,
		a callback function is needed to analyse the Nominatim response
		
		Parameters :
		- NominatimJsonResponse : the Nominatim response in the JSON format
		
		*/

		var _NominatimCallback = function ( NominatimJsonResponse ) {
			var Address = '';
			
			// The Nominatim response is parsed
			var NominatimResponse = JSON.parse( NominatimJsonResponse );
			
			// House number is added
			if ( undefined !== NominatimResponse.address.house_number ) {
				Address += NominatimResponse.address.house_number + ' ';
			}
			
			// Street name...
			if ( undefined !== NominatimResponse.address.road ) {
				Address += NominatimResponse.address.road + ' ';
			}
			// or pedestrian name is added
			else if ( undefined !== NominatimResponse.address.pedestrian ) {
				Address += NominatimResponse.address.pedestrian + ' ';
			}
			
			// Separator
			if ( 0 < Address.length ) {
				Address += '- ';
			}
			
			// City name. This can be 'village' or 'town' or 'city' in the Nomination response!
			if ( undefined !== NominatimResponse.address.village ) {
				Address += NominatimResponse.address.village;
			}
			else if ( undefined !== NominatimResponse.address.town ) {
				Address += NominatimResponse.address.town;
			}
			else if ( undefined !== NominatimResponse.address.city ) {
				Address += NominatimResponse.address.city;
			}
			
			// If nothing found previously, the country is added
			if ( 0 === Address.length ) {
				Address += NominatimResponse.address.country;
			}
			
			// Address is added to the dialog if found
			if ( 0 < Address.length ) {
				_addressInput.value = Address;
			}
		};

		/* End of _NominatimCallback method */
		
		/* 
		--- _NominatimCall ( ) method --- 
		
		This method call the Nominatim web service

		*/

		var _NominatimCall = function ( ) {
			if ( ! options.exist ) {
				// http request to Nominatim to performs the Geocoding of the pin.
				// To avoid to much call to Nominatim with the same position,
				// the call is only performed when it's a new pin
				var NominatimUrl = 
					'http://nominatim.openstreetmap.org/reverse?format=json&lat=' +
					latlng.lat +
					'&lon=' +
					latlng.lng +
					'&zoom=' +
					Map.getZoom ( ) +
					'&addressdetails=1&accept-language=' +
					_Translator.UserLanguage +
					'&osm_type=W';
				var XmlHttpRequest = new XMLHttpRequest ( );
				XmlHttpRequest.onreadystatechange = function ( ) { 
					if ( XmlHttpRequest.readyState == 4 && XmlHttpRequest.status == 200 ) {
						_NominatimCallback ( XmlHttpRequest.responseText );
					}
				};  
				XmlHttpRequest.open ( "GET", NominatimUrl, true );
				XmlHttpRequest.send ( null );
			}
		};
		
		/* End of _NominatimCall function */
		
		return {	

			/* --- public methods --- */

			/* 
			--- show ( ) method --- 
			
			This method show the dialog on the map
			
			*/

			show : function ( ) {
				_createDialog ( );
				
				// The dialog is displayed
				L.popup (
					{
						keepInView : true,
						closeButton : true,
						maxWidth : 600,
						className : 'PinEditDialog'
					}
				).setContent ( _MainDiv ).setLatLng( latlng ).openOn( Map );
				document.getElementById ( 'cyPinEditDialog-TextArea' ).focus ( );
			}
		};
	};

	L.marker.pin.editdialog = function ( Map, latlng, options ) {
		return new L.Marker.Pin.getEditDialog ( Map, latlng, options );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.editdialog;
	}

	/* --- End of L.Marker.Pin.EditDialog object --- */
	
} ) ( );
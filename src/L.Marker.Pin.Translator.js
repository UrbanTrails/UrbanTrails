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

	if ( typeof module !== 'undefined' && module.exports ) require ( './L.Marker.Pin' );

	/*
	--- L.Marker.Pin.Translator object -------------------------------------------------------------------------------------

	This object is responsible for the translation of the messages
	
	Patterns : Closure and Singleton.
	
	v1.2.0:
	- added messages for L.Marker.Pin.Control and L.Maker.Pin.Pins.asHtmlElement
	Doc reviewed 20160211
	Tests done 20160211
	v1.2.4:
	- added messages for distance and show ( ) hide ( ) methods
	
	------------------------------------------------------------------------------------------------------------------------
	*/

	/* --- private properties outside of the constructor due to the singleton pattern --- */
	
	var _UserLanguage = 'fr';
	
	var _Translations  =
	{
		/* --- L.Marker.Pin object translation --- */
		'L.Marker.Pin.Address' : 
		{
			'fr' : 'Adresse',
			'en' : 'Address',
			'nl' : 'Adres',
		},
		'L.Marker.Pin.Phone' :  
		{
			'fr' : 'Téléphone',
			'en' : 'Phone',
			'nl' : 'Telefoon',
		},
		'L.Marker.Pin.Link' : 
		{
			'fr' : 'Lien',
			'en' : 'Link',
			'nl' : 'Link',
		},
		'L.Marker.Pin.Distance' : 
		{
			'fr' : 'Distance',
			'en' : 'Distance',
			'nl' : 'Afstand',
		},
		/* --- L.Marker.Pin.ContextMenu object translation --- */
		'L.Marker.Pin.ContextMenu.EditPin' : 
		{
			'fr' : 'Éditer cette épingle',
			'en' : 'Edit this pin',
			'nl' : 'Vlag veranderen',
		},
		'L.Marker.Pin.ContextMenu.DeletePin' :
		{
			'fr' : 'Supprimer cette épingle',
			'en' : 'Delete this pin',
			'nl' : 'Vlag wissen',
		},
		'L.Marker.Pin.ContextMenu.CloseMenu' : 
		{
			'fr' : 'Fermer ce menu',
			'en' : 'Close this menu',
			'nl' : 'Venster sluiten',
		},
		/* --- L.Marker.Pin.EditDialog object translation --- */
		'L.Marker.Pin.EditDialog.PinModification' : 
		{
			'fr' : 'Modification de l\'épingle',
			'en' : 'Pin\'s modification',
			'nl' : 'Vlag veranderen',
		},
		'L.Marker.Pin.EditDialog.NewPin' : 
		{
			'fr' : 'Nouvelle épingle',
			'en' : 'New Pin',
			'nl' : 'Nieuwe vlag',
		},
		'L.Marker.Pin.EditDialog.Text' : 
		{
			'fr' : 'Texte',
			'en' : 'Text',
			'nl' : 'Tekst',
		},
		'L.Marker.Pin.EditDialog.Address' : 
		{
			'fr' : 'Adresse',
			'en' : 'Address',
			'nl' : 'Adres'
		},
		'L.Marker.Pin.EditDialog.Phone' : 
		{
			'fr' : 'Tél.',
			'en' : 'Phone',
			'nl' : 'Telefoon',
		},
		'L.Marker.Pin.EditDialog.Link' : 
		{
			'fr' : 'Lien',
			'en' : 'Link',
			'nl' : 'Link',
		},
		'L.Marker.Pin.EditDialog.Distance' : 
		{
			'fr' : 'Distance',
			'en' : 'Distance',
			'nl' : 'Afstand',
		},
		'L.Marker.Pin.EditDialog.Category' : 
		{
			'fr' : 'Catégorie',
			'en' : 'Category',
			'nl' : 'Categorie'
		},
		'L.Marker.Pin.EditDialog.Ok' : 
		{
			'fr' : 'Terminer',
			'en' : 'Ok',
			'nl' : 'Aannemen'
		},
		'L.Marker.Pin.EditDialog.Cancel' : 
		{
			'fr' : 'Abandonner',
			'en' : 'Cancel',
			'nl' : 'Annuleren'
		},
		'L.Marker.Pin.Pins.asHtmlElement.Address' :
		{
			'fr' : '&#x2709; ',
			'en' : '&#x2709; ',
			'nl' : '&#x2709; ',
		},
		'L.Marker.Pin.Pins.asHtmlElement.Phone' :
		{
			'fr' : '&#x260E; ',
			'en' : '&#x260E; ',
			'nl' : '&#x260E; ',
		},
		'L.Marker.Pin.Pins.asHtmlElement.Url' :
		{
			'fr' : '&#x1F517; ',
			'en' : '&#x1F517; ',
			'nl' : '&#x1F517; ',
		},
		'L.Marker.Pin.Pins.asHtmlElement.Distance' :
		{
			'fr' : 'Distance: ',
			'en' : 'Distance: ',
			'nl' : 'Afstand: ',
		},
		'L.Marker.Pin.Pins.asHtmlElement.nextDistance' :
		{
			'fr' : 'Distance jusqu\'à la prochaine bifurcation: ',
			'en' : 'Next distance: ',
			'nl' : 'Volgend afstand: ',
		},
		'L.Marker.Pin.EditDialog.MyStyles' :
		{
			'fr' : 'Mes styles',
			'en' : 'My styles',
			'nl' : 'My styles',
		},
		'L.Marker.Pin.Control.onAdd.ZoomBoundsButton' :
		{
			'fr' : 'Zoom sur les épingles',
			'en' : 'Zoom on pins',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.MinimizeButton' :
		{
			'fr' : 'Réduire la fenêtre',
			'en' : 'Minimize the window',
			'nl' : '',
		},		
		'L.Marker.Pin.Control.onAdd.MaximizeButton' :
		{
			'fr' : 'Agrandir la fenêtre',
			'en' : 'Maximize the window',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.ExtendButton' :
		{
			'fr' : 'Augmenter la hauteur de la fenêtre',
			'en' : 'Extend the window height',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.ReduceButton' :
		{
			'fr' : 'Réduire la hauteur de la fenêtre',
			'en' : 'Reduce the window height',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.HideButton' :
		{
			'fr' : 'Cacher les épingles',
			'en' : 'Hide pins',
			'nl' : '',
		},
		'L.Marker.Pin.Control.onAdd.ShowButton' :
		{
			'fr' : 'Montrer les épingles',
			'en' : 'Show pins',
			'nl' : '',
		}
	};

	L.Marker.Pin.getTranslator = function ( ) {

		return {

			/* --- public methods --- */
			
			/* 
			--- getText ( TextId ) method --- 
			
			This method gives the text identified by TextId in the current user language.
			
			Parameters : 
			- TextId : a unique identifier for the asked text
			
			Return :
			- the text identified by TextId in the current user language when found
			- the text identified by TextId in 'en' when not found in the current user language
			- '???' when the text identified by TextId is not found in the current user language or 'en'
			- '???' when TextId is not found
			*/

			getText : function ( TextId ) {
				if ( ! _Translations [ TextId ] ) {
					console.log ( 'Invalid TextId : \'' + TextId + '\'.');
					return '???';
				}
				var UserLanguageEn = 'en';
				if ( _Translations [ TextId ] [ _UserLanguage ] ) { 
					return _Translations [ TextId ] [ _UserLanguage ];
				}
				else if ( _Translations [ TextId ] [ UserLanguageEn ] ) {
					return _Translations [ TextId ] [ UserLanguageEn ];
				}
				else {
					return '???';
				}
			},
		
			/* 
			--- addTranslation ( TextId, UserLanguage, Translation ) method --- 
			
			This method add a translation for a text in a specific language.
			
			Parameters:
			- TextId : the unique identifier of the text
			- UserLanguage : the language to be used
			- Translation : the translated text 

			Return value:
			- returns true when the translation is added
			- returns false when the TextId is not found
			- returns false when the TextId is already translated in the specified language
			
			*/

			addTranslation : function ( TextId, UserLanguage, Translation ) {
				if ( ! _Translations [ TextId ] ) {
					console.log ( 'Invalid TextId : \'' + TextId + '\'.');
					return false;
				}
				if ( _Translations [ TextId ] [ UserLanguage ] ) {
					console.log ( 'The translation to \'' + UserLanguage + '\' exists already for the TextId \'' + TextId  + '\'.');
					return false;
				}
				_Translations [ TextId ] [ UserLanguage ] = Translation;
				return true;
			},

			/* 
			--- addTranslations ( TextId, Translations ) method --- 
			
			This method add a translation for a text in multiple languages.
			
			Parameters:
			- TextId : the unique identifier of the text.
			- Translations : the translated text. Must be an object like  { 'fr' : 'Rue', 'nl' : 'Straat', 'en' : 'Street' }.

			Return value:
			- returns true when the text is added.
			- returns false when the TextId is already used.
			
			*/

			addTranslations : function ( TextId, Translations ) {
				if ( _Translations [ TextId ] ) {
					console.log ( 'The TextId : \'' + TextId + '\' is already used.');
					return false;
				}
				_Translations [ TextId ] = Translations;
				return true;
			},
			
			/* --- public properties --- */
			
			/* 
			--- UserLanguage  ---
			
			The language used for the translations

			*/
			
			get UserLanguage ( ) { return _UserLanguage; },

			set UserLanguage ( newUserLanguage ) { _UserLanguage = newUserLanguage;	},


		};
		
	};
		
	L.marker.pin.translator = function ( ) {
		return L.Marker.Pin.getTranslator ( );
	};
	
	if ( typeof module !== 'undefined' && module.exports ) {
		module.exports = L.marker.pin.translator ( );
	}

	/* --- End of L.Marker.Pin.Translator object --- */

}) ( );
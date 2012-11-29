//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data panels
//>>label: Panel
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.panel.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./page.sections" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.panel", $.mobile.widget, {
	options: {
		classes: {
			panel: "ui-panel"
		},
		theme: null,
		position: "left",
		dismissible: true,
		display: "push",
		initSelector: ":jqmData(role='panel')"
	},
	_handleLink: function( roleType , callback ){
		var elId = this.element.attr( "id" );
		$( document ).bind( "pagebeforechange", function( e, data ) {
			var $link, id;
			if ( data.options.role === roleType ) {
				e.preventDefault();

				$link = data.options.link;
				id = $link.attr( "href" ).split( "#" )[1];
				if( elId === id ){
					callback( $link , id );
				}
				return false;
			}
		});
	},
	_create: function() {
		var o = this.options,
			klass = o.classes.panel,
			$el = this.element,
			$closeLink = $el.find( "[data-rel=close]" );

		$el.addClass( klass + "-hide" )
			.addClass( klass );
		if( o.theme ){
			$el.addClass( "ui-body-" + o.theme );
		}
		this._handleLink( "panel" , function( $link , id ){
			$( "#" + id ).panel( "toggle" , {
				position: $link.jqmData( "position" ),//left right top
				dismissible: $link.jqmData( "dismissible" ),//true or false
				display: $link.jqmData( "display" )// overlay or push
			});
		});
		$closeLink.on( "click" , function( e ){
			e.preventDefault();
			$el.panel( "close" );
			return false;
		});
		this._trigger( "create" );
	},
	_destroy: function(){},
	open: function( options ){
		var o = this.options,
			klass = o.classes.panel,
			$el = this.element;
		for( var i in options ){
			if( options.hasOwnProperty( i ) ){
				o[ i ] = options [ i ];
			}
		}
		$el.addClass( klass + "-position-" + o.position )
			.addClass( klass + "-dismissible-" + o.dismissible )
			.addClass( klass + "-display-" + o.display )
			.removeClass( klass + "-hide" )
			.jqmData( "position" , o.position )
			.jqmData( "display" , o.display )
			.jqmData( "dismissible" , o.dismissible );
		if( o.display === "push" ){
			$( ".ui-content, .ui-header, .ui-footer" ).addClass( "panel-shift-" + o.position );
		} else {
			$( ".ui-content, .ui-header, .ui-footer" ).removeClass( "panel-shift-" + o.position );
		}
		$el.removeClass( klass + "-hidden" );
		$.mobile.panel.active = this;
		this._trigger( "open" );
		return this;
	},
	close: function(){
		var klass = this.options.classes.panel,
			$el = this.element,
			position = $el.jqmData( "position" ),
			display = $el.jqmData( "display" ),
			dismissible = $el.jqmData( "dismissible" );
		$( ".ui-content, .ui-header, .ui-footer" ).removeClass( "panel-shift-" + position );
		$el.removeClass( klass + "-position-" + position )
			.removeClass( klass + "-display-" + display )
			.removeClass( klass + "-dismissible-" + dismissible )
			.addClass( klass + "-hidden" );
		$.mobile.panel.active = false;
		this._trigger( "close" );
		return this;
	},
	toggle: function( options ){
		var $el = this.element,
			active = $.mobile.panel.active;
		if( active &&
				( active.element.jqmData( "position") === options.position ) &&
				( active.element.attr( "id" ) === $el.attr( "id" ) ) &&
				( active.element.jqmData( "display" ) === options.display ) ){
			return active.close();
		} else if ( active ){
			active.close();
			return this.open( options );
		} else {
			return this.open( options );
		}
	},
	refresh: function(){
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.panel.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

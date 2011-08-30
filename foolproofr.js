// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

(function($) {

	$.foolproofr = function(element, options) {

		var defaults = {
		}

		var plugin = this;

		plugin.settings = {}

		var $element = $(element),
		element = element;
		
		var currentId = 0;

		plugin.init = function() {
			plugin.settings = $.extend({}, defaults, options);
			//$('<div id="foolreadr_panel">')
			// bind the element selected
			$element.css({
				position: "relative"
			});
			$element.find("img").mousedown(function(e){
				e.preventDefault()
			});
			toggleMousedown(true);
			
		}
		
		var toggleMousedown = function(bool) {
			if(bool)
			{
				$element.mousedown(function(e){ 
					e.preventDefault();
					if(e.which == 1)
					{
						dragging(e);
					}
				});
			}
			else
			{
				$element.unbind('mousedown');
			}
		}

		var dragging = function(e) {
			toggleMousedown(false);
			var offset = $element.offset();
			var relativeX = (e.pageX - offset.left);
			var relativeY = (e.pageY - offset.top);
			var tempbox = $('<div class="foolslider_tempbox">').css({
				position: "absolute",
				left: relativeX + "px",
				top: relativeY + "px",
				width:"30px",
				height:"30px",
				border: "1px dotted red"
			}).appendTo($element);
			
			$element.mousemove(function(u){
				var uoffset = $element.offset();
				var urelativeX = (u.pageX - uoffset.left);
				var urelativeY = (u.pageY - uoffset.top);
				if(urelativeX - relativeX > 30 && urelativeY - relativeY > 30)
				{
					tempbox.css({
						width: (urelativeX - relativeX) + "px",
						height: (urelativeY - relativeY) + "px"					
					});
				}
			});
			$element.mouseup(function(u){
				var uoffset = $element.offset();
				var urelativeX = (u.pageX - uoffset.left);
				var urelativeY = (u.pageY - uoffset.top);
				if(urelativeX - relativeX > 30 && urelativeY - relativeY > 30)
				{
					alert(urelativeX - relativeX);
					
				}
				$element.unbind('mouseup').unbind('mousemove');
				toggleMousedown(true);
			});
		}

		plugin.init();

	}

	$.fn.foolproofr = function(options) {

		return this.each(function() {
			if (undefined == $(this).data('foolproofr')) {
				var plugin = new $.foolproofr(this, options);
				$(this).data('foolproofr', plugin);
			}
		});

	}

})(jQuery);
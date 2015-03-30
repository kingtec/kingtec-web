(function($) {
    // backgroundPosition[X,Y] get hooks
    var $div = $('<div style="background-position: 3px 5px">');
    $.support.backgroundPosition   = $div.css('backgroundPosition')  === "3px 5px" ? true : false;
    $.support.backgroundPositionXY = $div.css('backgroundPositionX') === "3px" ? true : false;
    $div = null;

    var xy = ["X","Y"];

    // helper function to parse out the X and Y values from backgroundPosition
    function parseBgPos(bgPos) {
        var parts  = bgPos.split(/\s/),
            values = {
                "X": parts[0],
                "Y": parts[1]
            };
        return values;
    }

    if (!$.support.backgroundPosition && $.support.backgroundPositionXY) {
        $.cssHooks.backgroundPosition = {
            get: function( elem, computed, extra ) {
                return $.map(xy, function( l, i ) {
                    return $.css(elem, "backgroundPosition" + l);
                }).join(" ");
            },
            set: function( elem, value ) {
                $.each(xy, function( i, l ) {
                    var values = parseBgPos(value);
                    elem.style[ "backgroundPosition" + l ] = values[ l ];
                });
            }
        };
    }

    if ($.support.backgroundPosition && !$.support.backgroundPositionXY) {
        $.each(xy, function( i, l ) {
            $.cssHooks[ "backgroundPosition" + l ] = {
                get: function( elem, computed, extra ) {
                    var values = parseBgPos( $.css(elem, "backgroundPosition") );
                    return values[ l ];
                },
                set: function( elem, value ) {
                    var values = parseBgPos( $.css(elem, "backgroundPosition") ),
                        isX = l === "X";
                    elem.style.backgroundPosition = (isX ? value : values[ "X" ]) + " " + 
                                                    (isX ? values[ "Y" ] : value);
                }
            };
            $.fx.step[ "backgroundPosition" + l ] = function( fx ) {
                $.cssHooks[ "backgroundPosition" + l ].set( fx.elem, fx.now + fx.unit );
            };
        });
    }
})(jQuery);




(function(elems) {

	var block_sets = elems;

	block_sets.each(function(i) {

		var right_block = $(this).find('.block.right');
		var left_block = $(this).find('.block.left');

		var toggled = {};

		if (i % 2 === 0) {
			toggled.industry = right_block.find('.industry');
			toggled.industry_cover = right_block.find('.industry-cover');
			toggled.key_cover = left_block.find('.key-cover');
			toggled.keyphrase = left_block.find('.keyphrase');

			right_block.mouseenter(function() {
                console.log('YOLO');
				$.each(toggled, function(key,value) {
					value.toggleClass('animated', 350, 'easeOutCubic');
				})
			});
			right_block.mouseleave(function() {
				$.each(toggled, function(key,value) {
					value.toggleClass('animated', 350, 'easeOutCubic');
				})
			});
		}
		else {
			toggled.industry = left_block.find('.industry');
			toggled.industry_cover = left_block.find('.industry-cover');
			toggled.key_cover = right_block.find('.key-cover');
			toggled.keyphrase = right_block.find('.keyphrase');

			left_block.mouseenter(function() {
                console.log('YOLO');
				$.each(toggled, function(key,value) {
					value.toggleClass('animated', 350, 'easeOutCubic');
				})
			});
			left_block.mouseleave(function() {
				$.each(toggled, function(key,value) {
					value.toggleClass('animated', 350, 'easeOutCubic');
				})
			});
		}

	});

})($('.block-set'));


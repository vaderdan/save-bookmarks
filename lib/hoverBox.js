(function($) {
    $__last_line = 0;
    $__stylesheet = undefined;

    $style = {
        getOrCreateStylesheet: function(contxt) {
            var context = contxt || document,
                stylesheet;

            if (typeof $__stylesheet != 'undefined') {
                return $__stylesheet;
            }


            if (typeof context.styleSheets != 'object')
                return;

            if (context.styleSheets.length) {
                stylesheet = context.styleSheets[context.styleSheets.length - 1];
            }
            if (context.styleSheets.length) {
                if (context.createStyleSheet) {
                    stylesheet = context.createStyleSheet();
                } else {
                    context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));
                    stylesheet = context.styleSheets[context.styleSheets.length - 1];
                }
            }


            $__stylesheet = stylesheet;

            return stylesheet;
        },

        insertRule: function(selector, rules, lin, contxt) {
            var context = contxt || document,
                stylesheet, line;

            stylesheet = this.getOrCreateStylesheet(context);


            if (typeof stylesheet == 'object') {
                line = lin || stylesheet.cssRules.length;
                $__last_line = line;

                // console.log(stylesheet.cssRules);

                stylesheet.insertRule(selector.join(',') + '{' + rules + '}', line);

                return line;
            }

            return 0;
        },

        cssRule: function(lin, contxt) {
            var context = contxt || document,
                stylesheet,
                line = typeof lin != 'undefined' ? lin : $__last_line;

            stylesheet = this.getOrCreateStylesheet(context);

            if (typeof stylesheet == 'object') {
                return stylesheet.cssRules[line];
            }

            return {};
        }
    };
})(jQuery);

var hover_after = $style.insertRule(['._hover:after'], 'content: ""; opacity: 1; left: 0px; top: 0px; right: 0px; bottom: 0px; position: absolute; z-index: 1; background: rgba(81, 141, 197, 0.70); border: 0px solid rgba(208, 233, 128, 0.57); pointer-events:none;');
var hover_before = $style.insertRule(['._hover:before'], 'content: ""; opacity: 0.5; left: 0px; top: 0px; right: 0px; bottom: 0px; position: absolute; z-index: 1; background: transparent; border: 0px solid rgba(235, 128, 12, 0.82); pointer-events:none;');



(function($) {
    $.fn.hoverBox = function() {
        if (this.length == 0) {
            return;
        }

        var self = this;

        if (this.prop("tagName") == 'IMG') {
            var padding = {
                left: parseInt(self.css('padding-left').replace('px', '')),
                right: parseInt(self.css('padding-right').replace('px', '')),
                top: parseInt(self.css('padding-top').replace('px', '')),
                bottom: parseInt(self.css('padding-bottom').replace('px', ''))
            }, margin = {
                    left: parseInt(self.css('margin-left').replace('px', '')),
                    right: parseInt(self.css('margin-right').replace('px', '')),
                    top: parseInt(self.css('margin-top').replace('px', '')),
                    bottom: parseInt(self.css('margin-bottom').replace('px', ''))
                }, border = {
                    left: parseInt(self.css('border-left-width').replace('px', '')),
                    right: parseInt(self.css('border-right-width').replace('px', '')),
                    top: parseInt(self.css('border-top-width').replace('px', '')),
                    bottom: parseInt(self.css('border-bottom-width').replace('px', ''))
                }, outline = parseInt(self.css('outline-width').replace('px', ''));
        } else {
            var padding = {
                left: parseInt(self.css('padding-left').replace('px', '')),
                right: parseInt(self.css('padding-right').replace('px', '')),
                top: parseInt(self.css('padding-top').replace('px', '')),
                bottom: parseInt(self.css('padding-bottom').replace('px', ''))
            }, margin = {
                    left: parseInt(self.css('margin-left').replace('px', '')),
                    right: parseInt(self.css('margin-right').replace('px', '')),
                    top: parseInt(self.css('margin-top').replace('px', '')),
                    bottom: parseInt(self.css('margin-bottom').replace('px', ''))
                }, border = {
                    left: parseInt(self.css('border-left-width').replace('px', '')),
                    right: parseInt(self.css('border-right-width').replace('px', '')),
                    top: parseInt(self.css('border-top-width').replace('px', '')),
                    bottom: parseInt(self.css('border-bottom-width').replace('px', ''))
                }, outline = parseInt(self.css('outline-width').replace('px', ''));
        }



        var fixGutter = function(width) {
            return width >= 0 ? width : 0;
        }





        $style.cssRule(hover_after).style.borderTopWidth = fixGutter(padding.top) + 'px';
        $style.cssRule(hover_after).style.borderLeftWidth = fixGutter(padding.left) + 'px';
        $style.cssRule(hover_after).style.borderRightWidth = fixGutter(padding.right) + 'px';
        $style.cssRule(hover_after).style.borderBottomWidth = fixGutter(padding.bottom) + 'px';





        $style.cssRule(hover_before).style.borderTopWidth = fixGutter(margin.top + border.top + outline) + 'px';
        $style.cssRule(hover_before).style.borderLeftWidth = fixGutter(margin.left + border.left + outline) + 'px';
        $style.cssRule(hover_before).style.borderRightWidth = fixGutter(margin.right + border.right + outline) + 'px';
        $style.cssRule(hover_before).style.borderBottomWidth = fixGutter(margin.bottom + border.bottom + outline) + 'px';

        $style.cssRule(hover_before).style.top = '-' + (margin.top + border.top + outline) + 'px';
        $style.cssRule(hover_before).style.left = '-' + (margin.left + border.left + outline) + 'px';
        $style.cssRule(hover_before).style.right = '-' + (margin.right + border.right + outline) + 'px';
        $style.cssRule(hover_before).style.bottom = '-' + (margin.bottom + border.bottom + outline) + 'px';






        if (self.prop("tagName") == 'IMG') {
            $style.cssRule(hover_after).style.top = (this.position().top + margin.top + border.top + outline) + 'px';
            $style.cssRule(hover_after).style.left = (this.position().left + margin.left + border.left + outline) + 'px';
            $style.cssRule(hover_after).style.width = this.width() + 'px';
            $style.cssRule(hover_after).style.height = this.height() + 'px';



            //margins
            $style.cssRule(hover_before).style.top = '0px';
            $style.cssRule(hover_before).style.left = '0px';
            $style.cssRule(hover_before).style.borderTopWidth = fixGutter((parseInt(self.parent().css('padding-top').replace('px')) || 0) + margin.top + border.top + outline) + 'px';
            $style.cssRule(hover_before).style.borderLeftWidth = fixGutter((parseInt(self.parent().css('padding-left').replace('px')) || 0) + margin.left + border.left + outline) + 'px';

            $style.cssRule(hover_before).style.width = self.width() + 'px';
            $style.cssRule(hover_before).style.height = self.height() + 'px';
        } else {
            $style.cssRule(hover_after).style.top = '0px';
            $style.cssRule(hover_after).style.left = '0px';
            $style.cssRule(hover_after).style.right = '0px';
            $style.cssRule(hover_after).style.bottom = '0px';

            $style.cssRule(hover_after).style.width = 'auto';
            $style.cssRule(hover_after).style.height = 'auto';

            $style.cssRule(hover_before).style.width = 'auto';
            $style.cssRule(hover_before).style.height = 'auto';
        }



        $('*').removeClass('_hover');

        if (self.css('position') == 'static') {
            self.css('position', 'relative')
        }

        if (this.prop("tagName") == 'IMG') {
            self.parent().addClass('_hover');
        } else {
            self.addClass('_hover');
        }



        return self;
    };


    $.fn.showOutlines = function() {
        var obj = $(this);

        obj.addClass();

        return obj;
    };

    $.fn.hideOutlines = function() {

        obj.removeClass();

        return obj;
    };

}(jQuery));
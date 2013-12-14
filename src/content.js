



// var selected_el = prev_el = el = $('<div></div>');
// var selection_mode = false;
// var edit_mode = false;


// chrome.extension.onMessage.addListener(function(message, sender, callback) {
//     if (!edit_mode) {
//         return;
//     }

//     prev_el = el;
//     el = $("[data-selected='1']").removeAttr('data-selected');

//     if (el.prop("tagName") == 'BODY' || typeof el.prop("tagName") == 'undefined') {
//         el = $('<div></div>');
//     }

    

//     try{
//         $('.ui-draggable').draggable('destroy');
//     } catch(e){}   

//     el.draggable({
//         scroll: true,
//         cancel: false,
//         position: el.css('position')
//     });

//     // $('.ui-draggable').draggable('destroy');

//     // if (el.prop("tagName") == "DIV" || el.prop("tagName") == "A" || el.prop("tagName") == "SPAN" || el.prop("tagName") == "P") {
//     //     el.resizable({
//     //         scroll: true,
//     //         cancel: true,
//     //         handles: 'n, e, s, w, ne, nw, se, sw',
//     //         stop: function(event, ui) {
//     //             el.css('position', 'relative');
//     //         }
//     //     });
//     // }
// });


// $(document).ready(function() {
//     $('body').prepend('<div id="_edit_prototip" class="make-switch switch-small _edit_prototip" data-text-label="edit"><input type="checkbox"></div>');




//     $('#_edit_prototip').bootstrapSwitch('init');

//     $('#_edit_prototip').on('switch-change', function(e, data) {
//         edit_mode = data.value;

//         // try{
//         //     if (!edit_mode) {
//         //         $('.ui-draggable').draggable('disable');
//         //     } else {
//         //         $('.ui-draggable').draggable('enable');
//         //     }
//         // } catch(e){}        
//     });






//     $('*:not(html)').on('mouseover', function(event) {
//         if (!edit_mode) {
//             return;
//         }

//         event.stopPropagation();

//         if (selection_mode) {
//             $(event.target).hoverBox();
//         }

//         selected_el = $(event.target);
//     });

//     $('*:not(html)').on('click', function(event) {
//         if (!edit_mode) {
//             return;
//         }

//         event.stopPropagation();



//         if (selection_mode) {
//             $('*:not(html)').removeAttr('data-selected');
//             $(event.target).attr('data-selected', '1');

//             chrome.runtime.sendMessage({
//                 'to': 'devtools',
//                 'message': 'test'
//             });
//         }

//         event.preventDefault();
//         return false;
//     });



//     $(document).keydown(function(event) {
//         if ((event.which == 91 && event.metaKey == true) || (event.which == 17 && event.ctrlKey == true)) {
//             selection_mode = true;
//             selected_el.hoverBox();
//         }


//         // selection_mode = true;

//         if ((event.which != 91 && event.metaKey == true) && (event.which != 17 && event.ctrlKey == true)) {
//             selection_mode = false;
//             $('*').removeClass('_hover');
//         }

//         if (!edit_mode) {
//             return;
//         }

//         var ar = new Array(33, 34, 35, 36, 37, 38, 39, 40);
//         if ($.inArray(event.which, ar) > -1 || (event.which == 83 && event.ctrlKey == true)) {
//             moveElement(el, event);
//         }
//     });


//     $(document).keyup(function(event) {
//         if (!edit_mode) {
//             return;
//         }

//         if (event.which == 91 || event.which == 17) {
//             selection_mode = false;
//             $('*').removeClass('_hover');
//         }
//     });

//     $(window).blur(function() {
//         if (!edit_mode) {
//             return;
//         }

//         selection_mode = false;
//         $('*').removeClass('_hover');
//     });





//     var ar = new Array(33, 34, 35, 36, 37, 38, 39, 40);
//     $(document).keydown(function(event) {
//         if (!edit_mode) {
//             return;
//         }

//         var key = event.which;
//         if ($.inArray(key, ar) > -1) {
//             event.preventDefault();
//             return false;
//         }
//         return true;
//     });


//     var moveElement = function(el, event) {
//         el = $(el);

//         var mult = event.shiftKey == true ? 10 : 1;
//         var position = el.css('position');


//         var left, top;

//         if (position == 'relative') {
//             left = (parseInt(el.css('margin-left').replace('px', '')) || 0) + (parseInt(el.css('left').replace('px', '')) || 0);
//             top = (parseInt(el.css('margin-top').replace('px', '')) || 0) + (parseInt(el.css('top').replace('px', '')) || 0);

//             el.css('left', '0px');
//             el.css('top', '0px');
//             el.css('margin-left', left + 'px');
//             el.css('margin-top', top + 'px');
//         } else if (position == 'absolute') {
//             top = (parseInt(el.css('top').replace('px', '')) || 0);
//             left = (parseInt(el.css('left').replace('px', '')) || 0);


//             el.css('margin-left', '0px');
//             el.css('margin-top', '0px');
//         } else if (position == 'fixed') {
//             top = el.offset().top;
//             left = el.offset().left;

//             el.css('left', left + 'px');
//             el.css('top', top + 'px');
//             el.css('margin-left', '0px');
//             el.css('margin-top', '0px');
//         }




//         // 37 = left
//         // 39 = right
//         // 38 = up
//         // 40 = down




//         switch (event.which) {
//             case 37:
//                 left -= mult;
//                 if (position != 'relative')
//                     el.css('left', left + 'px');
//                 else
//                     el.css('margin-left', left + 'px');
//                 break;
//             case 39:
//                 left += mult;
//                 if (position != 'relative')
//                     el.css('left', left + 'px');
//                 else
//                     el.css('margin-left', left + 'px');
//                 break;
//             case 38:
//                 top -= mult;
//                 if (position != 'relative')
//                     el.css('top', top + 'px');
//                 else
//                     el.css('margin-top', top + 'px');
//                 break;
//             case 40:
//                 top += mult;
//                 if (position != 'relative')
//                     el.css('top', top + 'px');
//                 else
//                     el.css('margin-top', top + 'px');
//                 break;
//         }
//     }
// });
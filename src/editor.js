var editor;
var old_html = '';
var origin_html = '';
var shown_save_mask = 1;

var resetEditorOptions = function() {
    origin_html = editor.getValue();
    shown_save_mask -= 4;
}

var resizeEditor = function() {
    chrome.runtime.sendMessage({
        'to': 'devtools',
        'message': 'height',
        'height': getEditorHeight()
    });

    if (editor.getSession().getLength() < 30) {
        editor.getSession().setUseWrapMode(true);
    } else {
        editor.getSession().setUseWrapMode(false);
    }

    if (editor.getSession().getLength() < 20) {
        $('#save_title').css('background-position', 'center -' + parseInt(-editor.getSession().getLength() * 10 + 300) + 'px');
    } else {
        $('#save_title').css('background-position', 'center -' + parseInt(-editor.getSession().getLength() * 10 + 200) + 'px');
    }
}

var loadHtml = function() {
    function mark() {
        return $0.outerHTML;
    }

    var expression = "(" + mark.toString() + ")()";
    chrome.devtools.inspectedWindow.eval(expression, function(r) {
        old_html = r;

        $().htmltabifier(r, function(html) {
            var wrapped = $("<div>" + html + "</div>");
            wrapped.find('div.ui-resizable-handle').remove();
            html = wrapped.html();

            editor.setValue(html, -1);



            resizeEditor();

        });
    });
}


var loadHtml2 = function() {
    function mark() {
        return $0.outerHTML;
    }

    var expression = "(" + mark.toString() + ")()";
    chrome.devtools.inspectedWindow.eval(expression, function(r) {

        if(old_html != r){
            old_html = r;

            $().htmltabifier(r, function(html) {
                var wrapped = $("<div>" + html + "</div>");
                wrapped.find('div.ui-resizable-handle').remove();
                html = wrapped.html();

                editor.setValue(html, -1);


                resizeEditor();

            });
        }
        
    });
}

function getEditorHeight() {
    var neededHeight =
        editor.getSession().getScreenLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth() + 20;

    return neededHeight;
}

$(window).load(function() {


    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");
    // editor.getSession().setUseWrapMode(true);
    // editor.getSession().setWrapLimitRange(200, 80);
    editor.setFontSize(11);


    editor.focus();







    var checkHaveToSave = function() {
        if (origin_html != editor.getValue() && shown_save_mask >= 20 && shown_save_mask < 21) {
            $('#save_title').show();
            $('#save_mask').show();

            setTimeout(function() {
                $('#save_title').fadeOut({
                    duration: 400
                });
                $('#save_mask').fadeOut({
                    duration: 400
                });
            }, 3000);

            $('#editor').blur();
        }

        shown_save_mask++;
    }



    var saveHtml = function() {
        var has_body = false;

        $('#save_mask').show();

        setTimeout(function() {
            $('#save_mask').fadeOut({
                duration: 300
            });
        }, 100);



        function mark(attributes, html) {
            $0.innerHTML = html;

            for (var i = $0.attributes.length; i-- > 0;) {
                $0.removeAttributeNode($0.attributes[i]);
            }


            for (var i in attributes) {
                var value = attributes[i];
                $0.setAttribute(i, value);
            };

            return html;
        }

        var value = editor.getValue();
        value = value.replace('<body', '<div').replace('</body', '</div');



        var value_dom = $(value);
        value = value_dom.html();

        var attrs = {};
        $.each(value_dom[0].attributes, function(i, e) {
            attrs[e.nodeName] = e.nodeValue;
        });


        value = value.replace(/[\n\r\t\f]/mg, "").replace(/\'/mg, "\\'");





        var expression = " (" + mark.toString() + ")(" + JSON.stringify(attrs) + ", '" + value + "')";

        chrome.devtools.inspectedWindow.eval(expression);
    }


    editor.commands.addCommand({
        name: 'myCommand',
        bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-s'
        },
        exec: function(editor) {
            saveHtml();
        }
    });

    $(document).keydown(function(event) {        
        if ((event.which == 83 && event.ctrlKey == true)) {
            moveElement(el, event);
        }
    });

    editor.session.on('change', function(e) {
        resizeEditor();
        checkHaveToSave();
    });

    chrome.devtools.panels.elements.onSelectionChanged.addListener(function() {
        resetEditorOptions();
        loadHtml();
    });





    resetEditorOptions();
    loadHtml();

    setInterval(function() {
        resetEditorOptions();
        loadHtml2();
    }, 500);
});
chrome.devtools.panels.elements.createSidebarPane("Editor",
    function(sidebar) {
        sidebar.setPage("src/editor.html");
        sidebar.setHeight("100ex");





       








        sidebar.onShown.addListener(function(w) {
            w.resetEditorOptions();
            w.loadHtml();
        });



        chrome.devtools.panels.elements.onSelectionChanged.addListener(function() {
            function mark() {
                document.getElementsByAttribute = Element.prototype.getElementsByAttribute = function(attr) {
                    var nodeList = this.getElementsByTagName('*');
                    var nodeArray = [];

                    for (var i = 0, elem; elem = nodeList[i]; i++) {
                        if (elem.getAttribute(attr)) nodeArray.push(elem);
                    }

                    return nodeArray;
                };

                var elements = document.getElementsByAttribute('data-selected');

                for (var i = 0; i < elements.length; i++) {
                    elements[i].removeAttribute('data-selected');
                };

                $0.addEventListener('DOMAttrModified', function(e) {
                    // if (e.attrName === 'style') {
                    console.log('prevValue: ' + e.prevValue, 'newValue: ' + e.newValue);
                    // }
                }, false);

                // $0.addEventListener('DOMSubtreeModified', function() {
                //     console.log('here1')
                // }, true)

                $0.dataset.selected = 1;



                $0.dataset.style.background = 'red';
            }

            var expression = "(" + mark.toString() + ")()";
            chrome.devtools.inspectedWindow.eval(expression, function(r) {
                chrome.runtime.sendMessage({
                    'to': chrome.devtools.inspectedWindow.tabId,
                    'message': 'test'
                });
            });


        });


        var port = chrome.extension.connect({
            name: "connection" //Given a Name
        });
        //Hanlde response when recieved from background page
        port.onMessage.addListener(function(msg) {
            if(msg.message == 'height'){
                sidebar.setHeight(msg.height + 'px');
            }
            else{
                function mark() {
                    document.getElementsByAttribute = Element.prototype.getElementsByAttribute = function(attr) {
                        var nodeList = this.getElementsByTagName('*');
                        var nodeArray = [];

                        for (var i = 0, elem; elem = nodeList[i]; i++) {
                            if (elem.getAttribute(attr)) nodeArray.push(elem);
                        }

                        return nodeArray;
                    };

                    var elements = document.getElementsByAttribute('data-selected');

                    if (typeof elements[0] != 'undefined') {
                        inspect(elements[0]);
                    }

                    for (var i = 0; i < elements.length; i++) {
                        elements[i].removeAttribute('data-selected');
                    }
                }




                var expression = "(" + mark.toString() + ")()";
                chrome.devtools.inspectedWindow.eval(expression);
            }

            
        });
    });



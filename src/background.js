// var opened_tabs_map = [];
var opened_tabs = [];
var opened_history = [];


var getQuery = function(url){
    var query;

    query = 'asd';

    return query;
}

var urlChange = function(type, tabId, changeInfo, tab){
    

    if(typeof changeInfo == 'undefined' || typeof changeInfo.status == 'undefined' || changeInfo.status != 'complete'){
        return;
    }

    console.log(tab, tabId);

    // if is opened in new tab
    if(typeof opened_tabs[tab.openerTabId] != 'undefined'){
        opened_history[tab.openerTabId].push(tab);
    }
    
    //if is opened in the same tab        
    else if(typeof opened_tabs[tab.openerTabId] == 'undefined'){
        if(typeof opened_tabs[tabId] == 'undefined'){
            opened_tabs[tabId] = tab;
            opened_history[tabId] = [tab];
        }
        else{            
            opened_history[tabId].push(tab);
        }
    }
    
    
    
    

    console.log(opened_history);


    // //if is google
    // if(tab.url.match(/https?:\/\/(www\.)?google\./)){
    //     var q = getQuery(tab.url);

    //     var tab_obj = { 
    //                     id: tab.id,
    //                     title: tab.title, 
    //                     url: tab.url,
    //                     site: 'google',
    //                     query: q,
    //                     parent: []
    //                 };


    //     opened_tabs_map[tabId] = tab_obj; 
        
    //     console.log('google!');
    // }

    // //when site is opened from google or somewhere else
    // if(typeof opened_tabs[tab.openerTabId] != 'undefined'){
    //     var q = getQuery(tab.url);

    //     var tab_obj = { 
    //                     id: tab.id,
    //                     title: tab.title, 
    //                     url: tab.url,
    //                     site: 'bookmark',
    //                     query: q,
    //                     parent: opened_tabs[tab.openerTabId]
    //                 };

    //     opened_tabs_map[tabId] = tab_obj;
    // }



}


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    urlChange('update', tabId, changeInfo, tab);
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
   urlChange('create', tabId, changeInfo, tab);
});

// chrome.webNavigation.onCreatedNavigationTarget.addListener(function(details){
//     console.log(details);
// })

// chrome.webNavigation.onReferenceFragmentUpdated.addListener(function(details){
//     console.log(details);  
// })

// chrome.webNavigation.onCommitted.addListener(function(details){
//     console.log(details);  
// })

// chrome.history.onVisited.addListener(function(history){
//     // chrome.history.getVisits({ url: history.url}, function(items){
//     //     console.log(items)
//     // })
//     // console.log(history);
// });



// var height = 27;
// var to;

// chrome.extension.onMessage.addListener(function(message, sender, callback) {
//     message.from = typeof sender.tab != "undefined" ? JSON.parse(JSON.stringify(sender.tab.id)) : 0;

//     if (message.to == 'devtools') {
//         return;
//     }

//     if (typeof message.to == 'undefined') {
//         message.to = to;
//     }

//     to = message.to;




//     chrome.tabs.sendMessage(message.to, message, function(r) {
//         callback(r);
//         return true;
//     });




// });


// chrome.extension.onConnect.addListener(function(port) {
//     //Posting back to Devtools
//     chrome.extension.onMessage.addListener(function(message, sender) {
//         console.log(message);

//         if (message.to == 'devtools') {
//             port.postMessage(message);
//         }
//     });
// });


// port.onMessage.addListener(function(message) {
//     //Request a tab for sending needed information
//     chrome.tabs.query({
//         "status": "complete",
//         "currentWindow": true,
//         "url": "http://www.google.co.in/"
//     }, function(tabs) {
//         for (tab in tabs) {
//             //Sending Message to content scripts
//             chrome.tabs.sendMessage(tabs[tab].id, message);
//         }
//     });
// });



// chrome.contextMenus.create({
//     "title": "Buzz This",
//     "contexts": ["all", "page", "selection", "image", "link"],
//     "onclick": function() {

//     }
// });



// //if is google
//     if(tab.url.match(/https?:\/\/(www\.)?google\./)){
//         var q = getQuery(tab.url);

//         var tab_obj = { 
//                         id: tab.id,
//                         title: tab.title, 
//                         url: tab.url,
//                         site: 'google',
//                         query: q,
//                         parent: []
//                     };


//         opened_tabs_map[tabId] = tab_obj; 
        
//         console.log('google!');
//     }

//     //when site is opened from google or somewhere else
//     if(typeof opened_tabs[tab.openerTabId] != 'undefined'){
//         var q = getQuery(tab.url);

//         var tab_obj = { 
//                         id: tab.id,
//                         title: tab.title, 
//                         url: tab.url,
//                         site: 'bookmark',
//                         query: q,
//                         parent: opened_tabs[tab.openerTabId]
//                     };

//         opened_tabs_map[tabId] = tab_obj;
//     }
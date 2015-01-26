// ==UserScript==
// @name        TVTropes Simple Quote Button
// @namespace	http://google.com/
// @description	Provides simple quote functionality to the TVTropes Forum
// @include		http://tvtropes.org/*
// @include		http://www.tvtropes.org/*
// ==/UserScript==
	
	
//Retrieves the post text
//Sets textarea contents of the addnewpost page.
	if(localStorage.getItem('postStorageTemp') != null) {
		var newTextAreaContent = localStorage.getItem('postStorageTemp');
		localStorage.removeItem('postStorageTemp');
	}
	var elmLink = document.getElementById('postedit');
	if(elmLink != null) {	
		elmLink.value = '[[quoteblock]]' + newTextAreaContent + '[[/quoteblock]]';
	}
		
//Function to parse URL parameter of the curent page
//Return Key-value pairs of attribute-value
//Credited to http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
var UrlParams = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to UrlParams
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();


//Stores the current discussion id and page to their respective variables
currDiscussionId = UrlParams.discussion;
currDiscussionPage = UrlParams.page;

//Locates all instances of forumtext (and effectively the number of posts) in a page. 
var postsElement = document.getElementsByClassName('forumtext');
var headersElement = document.getElementsByClassName('forumreplyheader');

//Create a quote button at the every instance of a post.
if((headersElement.length != 0) && (postsElement.length == headersElement.length)) {
	for(var i = 0; i<headersElement.length; i++) {
		var quoteLink = document.createElement('a');
		quoteLink.class = 'forumbutton'
		quoteLink.href = 'javascript:void(0);';
		quoteLink.onclick = function () {
		  localStorage.setItem('postStorageTemp', postsElement[postInPage].textContent);
          window.location.href = 'http://www.tvtropes.org/pmwiki/addpost.php?discussion=' + currDiscussionId + '&page=' + currDiscussionPage;
		};
		quoteLink.appendChild(document.createTextNode('Quote'));
		var	placementAnchor = headersElement[i];
		placementAnchor.parentNode.insertBefore(quoteLink, placementAnchor);
	}
}
'use strict';
//api.createNewBookmark('title', 5, 'http://', 'words, words, words')

$(document).ready(function() {
    bookmarks.render();
    api.getBookmarks() 
        .then(data => {
            data.forEach(bookmark => store.addBookmark(bookmark));
            bookmarks.render();
        });

})
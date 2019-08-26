'use strict';

const api = (function() {
    const baseUrl = 'https://thinkful-list-api.herokuapp.com/snschroeder'

    function listApiFetch(...args) {
        let error;
        return fetch(...args)
            .then(res => {
                if (!res.ok) {
                    error = {code: res.status}
                }
            return res.json()
            })
            .then(data => {
                if (error) {
                    error.message = data.message;
                    return Promise.reject(error);
                }
            return data;
            })
    }

    function getBookmarks() {
        return listApiFetch(`${baseUrl}/bookmarks`);
    }

    function createNewBookmark(title, rating, url, desc) {
        let newBookmark = {
            title,
            rating,
            url,
            desc,
        }

        console.log(JSON.stringify(newBookmark));
        return listApiFetch(`${baseUrl}/bookmarks`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newBookmark)});
    }

    function updateBookMark(title, rating, url, des) {

    }
    function deleteBookmark(id) {
        return listApiFetch(`${baseUrl}/bookmarks/${id}`, {method: 'DELETE'});
    }

    return {
        baseUrl,
        listApiFetch,
        getBookmarks,
        createNewBookmark,
        updateBookMark,
        deleteBookmark,
    }


}());
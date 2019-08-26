'use strict';

const store = (function(){

    const addBookmark = function(bookmark) {
        this.list.push(bookmark);
    }

    const setIsAdding = function() {

    }

    const findById = function(id) {

    }


    return {
        list: [],
        adding: false,

        addBookmark,
        setIsAdding,
        findById,
    }

}());
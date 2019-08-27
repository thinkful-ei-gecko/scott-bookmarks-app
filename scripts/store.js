'use strict';

const store = (function(){
    const error = {message: null};

    const addBookmark = function(bookmark) {
        bookmark.expanded = false;
        this.list.push(bookmark);
    }

    const setAdding = function() {
        this.adding = !(this.adding)
    }

    const findById = function(id) {
        return this.list.find(item => item.id === id);
    }

    const findAndDelete = function(id) {
        this.list = this.list.filter(item => item.id !== id);
    }
    
    const setMinRatingFilter = function(rating) {
        this.minRating = rating;
    }

    const addErrorToStore = function(errorMessage) {
        error.message = errorMessage;
        console.log(error.message)
    }

    return {
        list: [],
        adding: false,
        minRating: 0,
        error,

        addBookmark,
        setAdding,
        findById,
        findAndDelete,
        setMinRatingFilter,
        addErrorToStore,
    }

}());
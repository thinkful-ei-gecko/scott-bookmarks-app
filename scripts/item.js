'use strict';

const Item = (function() {
    const validateTitle = function(title) {
        if (!title) throw new TypeError('Title must not be blank')
    }

    const flipExpanded = function(bookmark) {
        bookmark.expanded = !bookmark.expanded;
    }


    return {
        validateTitle,
        flipExpanded,
    }
}());
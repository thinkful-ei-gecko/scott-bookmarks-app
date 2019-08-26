'use strict';

const Item = (function() {
    const validateTitle = function(title) {
        if (!title) throw new TypeError('Title must not be blank')
    }
    const create = function(title, rating, url, desc) {
        return {
            id: cuid(),
            title,
            rating,
            url,
            desc,
            expanded: false,
        };
    };

    const flipExpanded = function(bookmark) {
        bookmark.expanded = !bookmark.expanded;
    }


    return {
        validateTitle,
        create,
        flipExpanded,
    }
}());
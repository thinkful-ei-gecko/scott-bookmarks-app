'use strict';

const Item = (function() {
    const flipExpanded = function(bookmark) {
        bookmark.expanded = !bookmark.expanded;
    }

    return {
        flipExpanded,
    }
}());
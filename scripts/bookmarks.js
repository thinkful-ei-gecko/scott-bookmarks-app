'use strict';

const bookmarks = (function() {
    function render() {

        let items = [...store.list];
        const htmlString = createInitialBookmarkString(items);
        $('.js-bookmarks-display').html(htmlString);
    }

    function handleAddClick() {

    }

    function handleAddSubmit() {

    }

    function getItemIdFromElement() {

    }

    function handleExpandClicked() {

    }

    function handleDelete() {

    }

    function createInitialBookmarkString(bookmarks) {
        const string = bookmarks.map(bookmark => generateShortElement(bookmark));
        console.log(string);
        return string.join('');
    }

    function generateShortElement(bookmark) {
        return `
            <div>
                <h3>${bookmark.title}</h3>
                <p>${bookmark.rating}</p>
                <form action="${bookmark.url}" class="visit-site">
                    <button type="submit">Visit</button>
                </form>
            </div>   
        `

    }

    function generateLongElement() {

    }

    return {
        render,
    }
}());
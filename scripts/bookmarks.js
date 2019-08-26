'use strict';

const bookmarks = (function() {
    function render() {

        let items = [...store.list];
        items = items.filter(item => item.rating >= store.minRating)
        console.log(items)
        $('.js-bookmarks').html(generateHtmlString(items));
    }

    function handleAddClick() {
        $('.get-add-form').on('click', function(event) {
            $('.add-or-filter').html(generateAddForm())
        })
    }




    //need to add the function to bring back the original field
    //update to use formData api?



    function handleAddSubmit() {
        $('.add-or-filter').on('submit', $('.add-form'), function(event) {
            event.preventDefault();
            const title = $('#title').val();
            const url = $('#url').val();
            const description = $('#description').val();
            const rating = $('#rating').val();
            api.createNewBookmark(title, rating, url, description)
                .then((newBookmark) => {
                    store.addBookmark(newBookmark);
                    render();
                })
                //.catch(err => store.addErrorToStoreAndRender(err.message));
        })
    }

    function getItemIdFromElement(item) {
        return $(item)
            .closest('.bookmark-element')
            .data('item-id');
    }

    function handleExpandClicked() {
        $('.js-bookmarks').on('click', '.bookmark-element', function(event) {
            const id = getItemIdFromElement(event.currentTarget);
            Item.flipExpanded(store.findById(id));
            render();

        })
    }

    function generateHtmlString(bookmarks) {
        const string = bookmarks.map(bookmark => bookmark.expanded ? generateLongElement(bookmark) : generateShortElement(bookmark));
        return string.join('');
    }

    function handleDelete() {
        $('.js-bookmarks').on('click', '.js-delete-button', function(event) {
            const id = getItemIdFromElement(event.currentTarget);
            api.deleteBookmark(id);
            store.findAndDelete(id);
            render();
        })

    }



    //get help here

    function handleVisitClick() {
        $('.js-bookmarks').on('click', '.visit-site', function(event) {
            window.location = $('.visit-site').val();
        })
    }


    // get help here 

    function handleMinRatingSort() {
        $('min-rating-form').on('click','#min-rating-selector', function(event) {
            event.preventDefault();
            console.log('in min sort')
            store.setMinRating($('#min-rating-selector').val());
            render();
        })
    }



    function generateAddForm() {
        return `
        <form class="add-form">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" required>
            <label for="url">URL</label>
            <input type="url" name="url" id="url" pattern="https?://.+" required>
            <label for="description">Description</label>
            <input type="text" name="description" id="description">
            <select name="rating" id="rating">
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>
            <button type="submit" class="submit-add-form">add bookmark</button>
        </form>
        `
    }


    // add this html back in once the add form has been submitted

    
    function generateAddFilter() {
        return `
            <button type="button" class="get-add-form">add bookmark</button>
            <select name="min-rating" id="min-rating-selector">
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>
        `
    }

    function generateShortElement(bookmark) {
        return `

            <li class="bookmark-element" data-item-id="${bookmark.id}">
                <div class ="bookmark-box">
                    <div class="bookmark-item">
                        <h3 class="title">${bookmark.title}</h3>
                        <p class="rating">${bookmark.rating}</p>
                    </div>   
                    <form action="${bookmark.url}" class="visit-site">
                        <button type="submit" class="visit-site-button">Visit</button>
                    </form>
                </div>
            </li>
        `
    }

    function generateLongElement(bookmark) {
        return `
            <li class="bookmark-element" data-item-id="${bookmark.id}">
            <button class="js-delete-button">remove</button>
            <div class ="bookmark-box">
                <div class="bookmark-item">
                    <h3 class="title">${bookmark.title}</h3>
                    <p class="rating">${bookmark.rating}</p>
                    <p class="description">${bookmark.desc}</p>
                </div>

                <button class="visit-site" value=${bookmark.url}>visit</button>

            </div>

        </li>
    `
    }

    function eventListeners() {
        handleAddClick();
        handleAddSubmit();
        handleExpandClicked();
        handleDelete();
        handleVisitClick();
        handleMinRatingSort();
    }

    return {
        render,
        eventListeners,
    }
}());


                // <form action="${bookmark.url}" class="visit-site">
                //     <button type="submit" class="visit-site-button">Visit</button>
                // </form>
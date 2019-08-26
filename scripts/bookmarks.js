'use strict';

const bookmarks = (function() {
    function render() {
        if (store.adding) {
            $('.add-or-filter').html(generateAddForm());
        } else {
            $('.add-or-filter').html(generateAddFilter());
        }

        let items = [...store.list];
        items = items.filter(item => item.rating >= store.minRating)
        $('.js-bookmarks').html(generateHtmlString(items));
    }

    function handleAddClick() {
        $('.add-or-filter').on('click', '.get-add-form', function(event) {
            store.adding = true;
            render();
        })
    }



    function handleAddSubmit() {
        $('.add-or-filter').on('submit', $('.add-form'), function(event) {
            event.preventDefault();
            let formData = new FormData(document.querySelector('.add-form'));

            api.createNewBookmark(formData.get('title'), formData.get('rating'), formData.get('url'), formData.get('desc'))
                .then((newBookmark) => {
                    store.addBookmark(newBookmark);
                    store.adding = false;
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
        $('.js-bookmarks').on('click', '.bookmark-item', function(event) {
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



    //get help here   ---- target="_blank" use a href instead of button

    function handleVisitClick() {
        $('.js-bookmarks').on('submit', function(event) {
            window.location = $('.visit-site').val();
        })
    }



    function handleMinRatingFilter() {
        $('.add-or-filter').on('change','#min-rating-selector', function(event) {
            store.setMinRatingFilter(this.value);
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
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
            </select>
            <button type="submit" class="submit-add-form">add bookmark</button>
        </form>
        `
    }


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
                        <a href="${bookmark.url}><h3 class="title">${bookmark.title}</h3></a>
                        <p class="rating">${bookmark.rating}</p>
                    </div>   
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
                    <a href="${bookmark.url}><h3 class="title">${bookmark.title}</h3></a>
                    <p class="rating">${bookmark.rating}</p>
                    <p class="description">${bookmark.desc}</p>
                </div>

                <a href=${bookmark.url} class="button-like">Take me there, Alfred</a>

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
        handleMinRatingFilter();
    }

    return {
        render,
        eventListeners,
    }
}());
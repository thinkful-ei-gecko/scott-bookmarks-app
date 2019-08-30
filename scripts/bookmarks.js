'use strict';

const bookmarks = (function () {
    function render() {
        if (store.adding) {
            $('.add-or-filter').html(generateAddForm());
        } else {
            $('.add-or-filter').html(generateAddFilter());
        }
        if (store.error.message) {
            $('.error-message').append(store.error.message);
        } else {
            $('.error-message').empty();
        }

        let items = [...store.list];
        items = items.filter(item => item.rating >= store.minRating)
        $('.js-bookmarks').html(generateHtmlString(items));
    }

    function handleAddClick() {
        $('.add-or-filter').on('click', '.get-add-form', function (event) {
            store.adding = true;
            render();
        })
    }

    function handleAddSubmit() {
        $('.add-or-filter').on('submit', $('.add-form'), function (event) {
            event.preventDefault();

            let formData = new FormData(document.querySelector('.add-form'));

            api.createNewBookmark(formData.get('title'), formData.get('rating'), formData.get('url'), formData.get('description'))
                .then((newBookmark) => {
                    store.addBookmark(newBookmark);
                    store.adding = false;
                    store.error.message = null;
                    render();
                })
                .catch(err => {
                    store.addErrorToStore(err.message)
                    render();
                });
        })
    }

    function getItemIdFromElement(item) {
        return $(item)
            .closest('.bookmark-element')
            .data('item-id');
    }

    function handleExpandClicked() {
        $('.js-bookmarks').on('click', '.bookmark-item', function (event) {
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
        $('.js-bookmarks').on('click', '.js-delete-button', function (event) {
            const id = getItemIdFromElement(event.currentTarget);
            api.deleteBookmark(id);
            store.findAndDelete(id);
            render();
        })

    }

    function handleMinRatingFilter() {
        $('.add-or-filter').on('change', '#min-rating-selector', function (event) {
            store.setMinRatingFilter(this.value);
            render();
        })
    }

    function handleCancelClicked() {
        $('.add-or-filter').on('click', '.cancel', function (event) {
            store.adding = false;
            store.error.message = null;
            render();
        })
    }

    function generateAddForm() {
        return `
        <form class="add-form">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" required>
            <label for="url">URL</label>
            <input type="url" name="url" id="url" pattern="http[s]?://.+.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&%\$#\=~_\-]+))*$" placeholder="http://www.google.com" required>
            <label for="description">Description</label>
            <input type="text" name="description" id="description" placeholder="Enter a short description">
            <select name="rating" id="rating">
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
            </select>
            <button type="submit" class="submit-add-form">add</button>
            <button type="button" class="cancel">cancel</button>
        </form>
        `
    }

    function generateAddFilter() {
        if (store.minRating !== 0) {
            return `
            <button type="button" class="get-add-form">+</button>
            <select name="min-rating" id="min-rating-selector">
                <option value="${store.minRating}" selected="selected">${store.minRating} ${store.minRating == 1 ? `star` : `stars`} ${store.minRating == 5 ? `only` : `and up`}</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>
        `
        } else {
            return `
                <button type="button" class="get-add-form">+</button>
                <select name="min-rating" id="min-rating-selector">
                    <option value="0" selected="selected">filter by rating</option>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                </select>
            `
        }
    }

    function generateShortElement(bookmark) {
        return `
            <li class="bookmark-element" data-item-id="${bookmark.id}">
                <div class ="bookmark-box">
                    <div class="bookmark-item">
                        <div class="left">
                            <a href="${bookmark.url}"><h3 class="title">${bookmark.title}</h3></a>
                        </div>
                        <div class="right">
                            <p class="rating">${bookmark.rating}/5</p>
                        </div>
                    </div>   
                </div>
            </li>
        `
    }

    function generateLongElement(bookmark) {
        return `
            <li class="bookmark-element" data-item-id="${bookmark.id}">
            <div class="position-delete">
                <button class="js-delete-button">remove</button>
            </div>
            <div class ="bookmark-box">
                <div class="bookmark-item">
                    <div class="left">
                        <a href="${bookmark.url}"><h3 class="title">${bookmark.title}</h3></a>
                    </div>
                    <div class="right">
                        <p class="rating">${bookmark.rating}/5</p>
                    </div>
                </div>
                <div class="bookmark-item-description">
                    <p class="description">${bookmark.desc}</p>
                </div>
                <div class="center">
                    <a href="${bookmark.url}" class="button-like">${bookmark.url}</a>
                </div>
            </div>
        </li>
    `
    }

    function eventListeners() {
        handleAddClick();
        handleAddSubmit();
        handleExpandClicked();
        handleDelete();
        handleMinRatingFilter();
        handleCancelClicked();
    }

    return {
        render,
        eventListeners,
    }
}());
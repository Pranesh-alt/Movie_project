document.addEventListener("DOMContentLoaded", () => {
    const watchlistContainer = document.getElementById('watchlist');

    // Initialize watchlist from localStorage
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Function to render the watchlist
    function renderWatchlist() {
        watchlistContainer.innerHTML = ''; // Clear previous items
        if (watchlist.length === 0) {
            watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
            return;
        }

        watchlist.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.title}</span>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            watchlistContainer.appendChild(listItem);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeFromWatchlist);
        });
    }

    // Function to remove an item from the watchlist
    function removeFromWatchlist(event) {
        const contentId = event.target.getAttribute('data-id');
        watchlist = watchlist.filter(item => item.id !== contentId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    }

    // Initial render
    renderWatchlist();
});
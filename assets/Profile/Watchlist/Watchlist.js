// Select all "Add to Watchlist" buttons
const addToWatchlistButtons = document.querySelectorAll('.add-watchlist-btn');

// Initialize watchlist from localStorage
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Function to add an item to the watchlist
function addToWatchlist(contentId, contentTitle) {
    // Check if the item already exists
    const exists = watchlist.some(item => item.id === contentId);
    if (!exists) {
        watchlist.push({ id: contentId, title: contentTitle });
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`${contentTitle} has been added to your watchlist.`);
    } else {
        alert(`${contentTitle} is already in your watchlist.`);
    }
}

// Add event listeners to each button
addToWatchlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const contentItem = e.target.closest('.content-item');
        const contentId = contentItem.getAttribute('data-id');
        const contentTitle = contentItem.getAttribute('data-title');

        addToWatchlist(contentId, contentTitle);
    });
});

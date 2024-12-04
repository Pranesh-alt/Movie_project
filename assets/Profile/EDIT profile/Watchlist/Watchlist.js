document.addEventListener('DOMContentLoaded', () => {
    const watchlistContainer = document.getElementById('watchlist');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<li>Your watchlist is empty!</li>';
    } else {
        watchlist.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;
            watchlistContainer.appendChild(listItem);
        });
    }
});










// Show modal when an item is added to the watchlist
function showModal() {
    const modal = document.getElementById('watchlist-modal');
    modal.style.display = 'flex'; // Use 'flex' for centering
    setTimeout(() => {
        closeModal(); // Automatically close after 3 seconds
    }, 3000);
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('watchlist-modal');
    modal.style.display = 'none';
}

// Close modal on button click
document.querySelector('.close-btn').addEventListener('click', closeModal);

// Close modal on outside click
window.addEventListener('click', (event) => {
    const modal = document.getElementById('watchlist-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Example add to watchlist function
function addToWatchlist(item) {
    // Your logic to add item to the watchlist
    console.log(`${item} added to watchlist.`);
    
    // Show the modal pop-up
    showModal();
}

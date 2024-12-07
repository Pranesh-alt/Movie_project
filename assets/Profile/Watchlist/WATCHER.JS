let watchlist = [];

// Add a movie/show to the watchlist
function addMovie() {
    const movieName = document.getElementById("movie-name").value;
    if (movieName) {
        const movie = {
            name: movieName,
            imageUrl: "https://via.placeholder.com/200x300/000000/FFFFFF?text=Movie" // Placeholder image
        };

        // Add movie to the watchlist array
        watchlist.push(movie);
        document.getElementById("movie-name").value = ''; // Clear input field

        // Update the watchlist display
        displayWatchlist();
    } else {
        alert("Please enter a movie/show name.");
    }
}

// Display the watchlist on the page
function displayWatchlist() {
    const watchlistContainer = document.querySelector(".watchlist");
    watchlistContainer.innerHTML = ''; // Clear the existing watchlist

    watchlist.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("watchlist-item");
        
        movieElement.innerHTML = `
            <img src="${movie.imageUrl}" alt="${movie.name}" />
            <h3>${movie.name}</h3>
            <button onclick="removeMovie('${movie.name}')">Remove</button>
        `;

        watchlistContainer.appendChild(movieElement);
    });
}

// Remove a movie/show from the watchlist
function removeMovie(movieName) {
    watchlist = watchlist.filter(movie => movie.name !== movieName);
    displayWatchlist(); // Re-render the watchlist after removal
}

// Initialize watchlist on page load
window.onload = displayWatchlist;

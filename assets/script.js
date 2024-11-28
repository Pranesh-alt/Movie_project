
async function fetchMovies() {
    try {
        const response = await fetch('Marvel.json'); // Replace 'movies.json' with the path to your JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderMovies(data.MarvelMovies);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function renderMovies(movies) {
    const movieGallery = document.getElementById('movieGallery');
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const movieImage = document.createElement('img');
        movieImage.className="images";
        movieImage.src = movie.image;
        movieImage.alt = movie.title;
        movieCard.appendChild(movieImage);

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;
        movieInfo.appendChild(movieTitle);

        const movieDescription = document.createElement('p');
        movieDescription.textContent = movie.description;
        movieInfo.appendChild(movieDescription);

        movieCard.appendChild(movieInfo);
        movieGallery.appendChild(movieCard);
    });
}


fetchMovies();


document.getElementById('profile-logo').onclick = function() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
};
// Hide the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('#profile-logo')) {
        const dropdown = document.getElementById('dropdown-menu');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
};
function logoutUser() {
    // Your logout functionality here
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    window.location.href = "../index.html";
}
window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function () {
    window.history.pushState(null, null, window.location.href);
});
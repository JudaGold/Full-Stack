let movies = [];
let ids = [];

if (sessionStorage.getItem("movieIds")) {
  ids = JSON.parse(sessionStorage.getItem("movieIds"));
}

document.addEventListener("click", handleScreenClicks);

document.getElementById("find-movies").addEventListener("submit", searchMovies);

function handleScreenClicks(e) {
  // sessionStorage.clear();
  if (e.target.dataset.movieId) {
    const id = e.target.dataset.movieId;

    if (!ids.includes(id)) {
      ids.push(id);
      document.getElementById(
        `${id}`
      ).innerHTML = `<i data-movie-id="${id}" class="fa-solid fa-circle-minus" style="color: red;"></i>Watchlist`;
    } else {
      ids = ids.filter((i) => i !== id);
      document.getElementById(
        `${id}`
      ).innerHTML = `<i data-movie-id="${id}" class="fa-solid fa-circle-plus"></i>Watchlist`;
    }
    sessionStorage.setItem("movieIds", JSON.stringify(ids));
  }
}

function searchMovies(e) {
  e.preventDefault();
  fetch(
    `http://www.omdbapi.com/?apikey=27f67cc4&s=${
      document.getElementById("movie-title").value
    }`
  )
    .then((r) => r.json())
    .then((d) => {
      movies = d.Search;
      renderMovies(movies);
    });
}

function renderMovies(moviesToRender) {
  Promise.all(
    moviesToRender.map((m) =>
      fetch(`http://www.omdbapi.com/?i=${m.imdbID}&apikey=27f67cc4`)
        .then((r) => r.json())
        .then((d) => {
          const i = !ids.includes(d.imdbID)
            ? `<i data-movie-id="${d.imdbID}" class="fa-solid fa-circle-plus"></i>`
            : `<i data-movie-id="${d.imdbID}" class="fa-solid fa-circle-minus" style="color: red;"></i>`;
          return `
          <div class="movie-slot">
            <img class="cover" src="${d.Poster}" alt="Movie cover." />
            <div class="info">
              <div class="title">
                <h2>${d.Title}</h2>
                <p><i class="fa-solid fa-star"></i>${d.Metascore}</p>
              </div>
              <div class="extra-info">
                <h4>${d.Runtime}</h4>
                <h4>${d.Genre}</h4>
                <button id="${d.imdbID}" data-movie-id="${d.imdbID}" title="Add to your watchlist.">
                  ${i}Watchlist
                </button>
              </div>
              <p>${d.Plot}</p>
            </div>
          </div>
          <hr/>
        `;
        })
    )
  ).then((htmlArray) => {
    document.getElementById("movies").innerHTML = htmlArray.join("");
  });
}

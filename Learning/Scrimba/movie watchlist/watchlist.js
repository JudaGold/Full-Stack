let ids = [];

if (sessionStorage.getItem("movieIds")) {
  ids = JSON.parse(sessionStorage.getItem("movieIds"));
}

document.addEventListener("click", handleScreenClicks);

function renderMovies(moviesToRender) {
  if (ids.length > 0) {
    Promise.all(
      moviesToRender.map((m) =>
        fetch(`http://www.omdbapi.com/?i=${m}&apikey=27f67cc4`)
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
  } else {
    document.getElementById("movies").innerHTML = `
            <img
              src="assets/start exploring icon.png"
              alt="Start exploring image indicating no movie searched yet."
            />
            `;
  }
}

renderMovies(ids);

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
    renderMovies(ids);
  }
}

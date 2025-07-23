import postsArray from "./assets/data.js";

document.addEventListener("click", handlePageClicks);

const intro = document.getElementById("intro");
const posts = document.getElementById("posts");
const fullPost = document.getElementById("full-post");
const aboutMe = document.getElementById("about-me");
const year = document.getElementById("year");

let maxPostsId = 0;

function handlePageClicks(e) {
  if (e.target.closest("[data-show-full-post]")) {
    const postElement = e.target.closest("[data-show-full-post]");
    showFullPost(postElement.dataset.showFullPost);
    aboutMe.classList.add("hide");
    renderPosts(false, postElement.dataset.showFullPost);
  } else if (e.target.dataset.home) {
    intro.classList.remove("hide");
    fullPost.classList.add("hide");
    aboutMe.classList.add("hide");
    renderPosts();
  } else if (e.target.dataset.aboutMe) {
    intro.classList.add("hide");
    fullPost.classList.add("hide");
    aboutMe.classList.remove("hide");
    renderPosts(false);
  }
}

function renderPage() {
  renderIntro();
  renderPosts();
  year.textContent = new Date().getFullYear();
}

function renderIntro() {
  const introSection = document.getElementById("intro");
  const latestPost = postsArray.reduce((max, post) => {
    return post.id > max.id ? post : max;
  });

  maxPostsId = latestPost.id;
  introSection.dataset.showFullPost = latestPost.id;
  intro.innerHTML = `
    <div>
      <h2>${latestPost.title}</h2>
      <p>${latestPost.blurb}</p>
      <p class="date">${latestPost.date}</p>
    </div>
  `;
}

function renderPosts(isAll = true, id = 0) {
  let processedPosts = [];
  if (!isAll) {
    processedPosts = postsArray
      .filter((p) => p.id != id)
      .sort((p1, p2) => p2.id - p1.id)
      .slice(0, 3);
  } else {
    processedPosts = postsArray
      .filter((p) => p.id != maxPostsId)
      .sort((p1, p2) => p2.id - p1.id);
  }

  posts.innerHTML = processedPosts
    .map((p) => {
      return `
                <div class="post" data-show-full-post="${p.id}">
                  <img src="./assets/${p.url}" />
                  <h2>${p.title}</h2>
                  <p>${p.blurb}</p>
                  <p class="date">${p.date}</p>
                </div>
              `;
    })
    .join("");
}

function showFullPost(id) {
  const post = postsArray.filter((p) => p.id === Number(id))[0];
  intro.classList.add("hide");
  fullPost.classList.remove("hide");

  fullPost.innerHTML = `
    <p class="date">${post.date}</p>
    <h2>${post.title}</h2>
    <p>${post.blurb}</p>
    <img
      src="assets/${post.url}"
      alt="Image attatched to post, but nothing to do with the post."
    />
    <p>${post.fullStory}</p>
    <h4 data-home="true">All Posts</h4>
  `;
  console.log("showFullPost" + id);
}

renderPage();

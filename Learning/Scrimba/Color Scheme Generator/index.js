const scheme = document.getElementById("color-scheme");
const color = document.getElementById("color");

document.addEventListener("click", handleDocumentClicks);

document
  .getElementById("color-choice")
  .addEventListener("submit", getColorPallete);

async function handleDocumentClicks(e) {
  if (e.target.dataset.color) {
    await navigator.clipboard.writeText(e.target.dataset.color);
  }
}

function getColorPallete(e) {
  e.preventDefault();
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color.value.substring(1)}&mode=${
      scheme.value
    }&format=json`
  )
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("color-container").innerHTML = d.colors
        .map((c) => {
          return `
          <div class="color-block">
            <div class="color" style="background-color: ${c.hex.value}" data-color="${c.hex.value}"></div>
            <p data-color="${c.hex.value}">${c.hex.value}</p>
          </div>
          `;
        })
        .join("");
    });
}

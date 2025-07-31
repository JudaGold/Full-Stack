const liveStatus = document.getElementById("status");
const price = document.getElementById("live-price");
const summaryContainer = document.getElementById("summary-container");

const buyGoldForm = document.getElementById("buy-gold");
const buyGoldBtn = document.getElementById("buy-gold-btn");
const amount = document.getElementById("amount-to-invest");

buyGoldForm.addEventListener("submit", buyGold);
summaryContainer.addEventListener("click", () =>
  summaryContainer.classList.add("hidden")
);

async function buyGold(e) {
  e.preventDefault();
  try {
    if (amount.value) {
      const purchase = {
        livePrice: price.textContent.trim(),
        amount: amount.value.trim(),
      };

      const response = await fetch("api/buyGold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchase),
      });

      if (!response.ok) console.log("Buying gold transaction failed.");

      const data = await response.json();

      summaryContainer.innerHTML = `
      <div class="summary" id="summary">
        <h2>SUMMARY</h2>
        <p>
          You bought ${(purchase.amount / purchase.livePrice).toFixed(
            2
          )} ounces (ozt) for $${purchase.amount}. The sale has
          executed and we are preparing your documentation.
        </p>
        <button id="summary-button">OK</button>
      </div>
  `;

      summaryContainer.classList.remove("hidden");

      document
        .getElementById("summary")
        .addEventListener("click", (e) => e.stopPropagation());

      document
        .getElementById("summary-button")
        .addEventListener("click", () =>
          summaryContainer.classList.add("hidden")
        );
    } else {
      throw new Error("Value must be bigger than 0");
    }
  } catch (error) {
    console.log(error);
  }
}

setInterval(getGoldPrice, 5000);

async function getGoldPrice() {
  try {
    const response = await fetch("/api/goldPrice");
    if (!response.ok) throw new Error("Could not get live price.");
    const data = await response.json();
    liveStatus.innerHTML = `
      <span>Live Prices <i class="fa-solid fa-circle green"></i></span>
    `;
    price.textContent = `
      ${data}
    `;
    buyGoldBtn.disabled = false;
  } catch (err) {
    liveStatus.innerHTML = `
      <span>Not Connected <i class="fa-solid fa-circle red"></i></span>
    `;
    price.textContent = `----,--`;
    buyGoldBtn.disabled = true;
    console.log(err);
  }
}

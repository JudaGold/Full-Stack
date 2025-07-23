import menuItems from "./data.js";

const menu = document.getElementById("menu");
const summary = document.getElementById("summary-items");
const completeOrder = document.getElementById("complete-order");
const modal = document.getElementById("modal-overlay");

let price = 0;
const order = [];

document.addEventListener("click", handleClicks);
completeOrder.addEventListener("click", showPayModal);

function handleClicks(e) {
  if (e.target.dataset.buy) {
    order.push(e.target.dataset.buy);
    renderSummary();
  } else if (e.target.dataset.remove) {
    order.splice(e.target.dataset.remove, 1);
    renderSummary();
  } else if (e.target.dataset.hideModal) modal.style.display = "none";
}

function renderitems() {
  menu.innerHTML = menuItems
    .map((item) => {
      return `
      <article class="menu-item">
        <p class="icon">${item.emoji}</p>
        <div>
          <h3>${item.name}</h3>
          <p class="menu-ingredients">${item.ingredients}</p>
          <p>$${item.price}</p>
        </div>
        <div class="right">
          <i class="fa-solid fa-plus" data-buy="${item.id}"></i>
        </div>
      </article>
      <hr />
    `;
    })
    .join("");
}

function renderSummary() {
  const totalPrice = document.getElementById("total-price");
  price = 0;
  summary.innerHTML = order
    .map((item, index) => {
      const menuItem = menuItems.filter((m) => m.id === Number(item))[0];
      price += menuItem.price;
      return `
      <article class="total">
        <h3>${menuItem.name}</h3>
        <button data-remove="${index}">remove</button>
        <h3 class="right">$${menuItem.price}</h3>
      </article>
    `;
    })
    .join("");
  completeOrder.disabled = !price;
  totalPrice.textContent = `$${price}`;
}

function showPayModal() {
  modal.innerHTML = "";
  const form = document.createElement("form");
  form.classList.add("form");
  form.onclick = function (event) {
    event.stopPropagation();
  };

  const name = document.createElement("input");
  name.placeholder = "Enter your name";
  name.required = true;

  const cardNo = document.createElement("input");
  cardNo.placeholder = "Enter your card numebr";
  cardNo.required = true;
  cardNo.type = "text";
  cardNo.pattern = "\\d{16,}";
  cardNo.minLength = 16;
  cardNo.maxLength = 16;

  const cvv = document.createElement("input");
  cvv.placeholder = "Enter your card's CVV";
  cvv.required = true;
  cvv.type = "number";

  const payBtn = document.createElement("button");
  payBtn.textContent = "Pay Now";

  form.append(name, cardNo, cvv, payBtn);
  modal.appendChild(form);

  modal.style.display = "flex";
}

renderitems();

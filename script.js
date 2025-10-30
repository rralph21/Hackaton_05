function showPromiseExample() {
  console.log("Start of code");
  const myPromise = new Promise((resolve) => {
    setTimeout(() => resolve("Promise has finished!"), 2000);
  });
  myPromise.then((msg) => console.log(msg));
  console.log("This line runs right after starting the promise!");
}
showPromiseExample();

const PAIRS = [
  "BTC-USD", "ETH-USD", "LTC-USD", "SOL-USD", "ADA-USD"
];

function getSelectedCount() {
  const sel = document.getElementById("Stocks");
  return Number(sel.value) || 1;
}

async function fetchSpot(pair) {
  const url = `https://api.coinbase.com/v2/prices/${pair}/spot`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${pair}`);
  const { data } = await res.json();
  return data;
}

function fmtAmount(amountStr) {
  const n = Number(amountStr);
  return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 8 }) : amountStr;
}

function renderPrices(container, rows) {
  container.innerHTML = "";
  rows.forEach(({ base, currency, amount }) => {
    const card = document.createElement("div");
    card.className = "price-card";
    card.innerHTML = `
      <div class="pair">${base} <span class="sep">/</span> ${currency}</div>
      <div class="price">${fmtAmount(amount)}</div>
    `;
    container.appendChild(card);
  });
}

async function displayStockList() {
  const count = getSelectedCount();
  const container = document.getElementById("stockContainer");

  container.textContent = "Loading prices...";
  try {
    const targets = PAIRS.slice(0, count);
    const results = await Promise.all(
      targets.map(pair => fetchSpot(pair))
    );
    renderPrices(container, results);
  } catch (err) {
    console.error(err);
    container.textContent = "Sorry, something went wrong while fetching prices.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayStockList();
});
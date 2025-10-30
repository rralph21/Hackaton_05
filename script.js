function showPromiseExample() {
  console.log("Start of code");
  new Promise(resolve => setTimeout(() => resolve("Promise has finished!"), 1500))
    .then(msg => console.log(msg));
  console.log("This line runs right after starting the promise!");
}
showPromiseExample();

async function fetchSpot(pair) {
  const url = `https://api.coinbase.com/v2/prices/${pair}/spot`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${pair}`);
  const { data } = await res.json();
  return data;
}

function formatAmount(amountStr) {
  const n = Number(amountStr);
  return Number.isFinite(n)
    ? n.toLocaleString(undefined, { maximumFractionDigits: 8 })
    : amountStr;
}

const pairSelect = document.getElementById("pair");
const priceOutput = document.getElementById("priceOutput");

document.getElementById("priceForm").addEventListener("submit", (e) => e.preventDefault());

pairSelect.addEventListener("change", async () => {
  const pair = pairSelect.value;
  if (!pair) return;

  priceOutput.textContent = "Loading price...";

  try {
    const { base, currency, amount } = await fetchSpot(pair);
    priceOutput.innerHTML = `
      <strong>${base}/${currency}</strong> spot: ${formatAmount(amount)}
    `;
  } catch (err) {
    console.error(err);
    priceOutput.textContent = "Sorry, could not load price.";
  }
});

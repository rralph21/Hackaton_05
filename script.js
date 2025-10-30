 function showPromiseExample() {
  console.log("Start of code");

let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
  resolve("Promise has finished!");
  }, 2000);
  });

myPromise.then((message) => {
  console.log(message);
  });

  console.log("This line runs right after starting the promise!");
}

showPromiseExample();

async function fetchStockList() {
  try {
let response = await fetch("https://catfact.ninja/breeds");

  if (!response.ok) {
  throw new Error("Something went wrong while getting breeds.");
}
let data = await response.json();
  console.log("Cat breeds data:", data);
  } catch (error) {
  console.log("Error:", error);
  }
}

fetchStockList();

function getSelectedStock() {
  let dropdown = document.getElementById("coinCount");
  return dropdown.value; 
}

async function displayStockList() {

  let count = getSelectedStockCount();
  let stocksContainer = document.getElementById("stockContainer");

  stocksContainer.innerHTML = "Loading stocks...";

  try {
    let response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json=${count}`);

    if (!response.ok) {
      throw new Error("Could not fetch stock.");
    }

    let data = await response.json();

    stocksContainer.innerHTML = "";

    data.data.forEach((fact) => {
      let p = document.createElement("p");
      p.textContent = fact.fact;
      stocksContainer.appendChild(p);
    });
  } catch (error) {
    stocksContainer.innerHTML = "Sorry, something went wrong.";
    console.log("Error:", error);
  }
}
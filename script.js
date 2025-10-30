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
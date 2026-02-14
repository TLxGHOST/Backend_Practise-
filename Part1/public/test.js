let a;
const testinPromise = new Promise((resolve, reject) => {
  setInterval(() => {
    document.querySelector('button').addEventListener('click', () => {
      console.log("button click");
      a = 23;
    });
  }, 1000);
  if(a===23){
    resolve("successfull");}
  else
    reject("Error processing the request");
});
const testinPromise2 = testinPromise.then((string) => {
  console.log(string);
}).catch((k) => {
console.log(k);
});
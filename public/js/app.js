console.log("Client side JS file is loading");

fetch("http://localhost:5000/weather?address=lagos").then(response => {
  response.json().then(data => {
    const { error, location, forecast } = data;
    if (error) {
      console.log(error);
    } else {
      console.log({ location, forecast });
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:5000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      const { error, location, forecast } = data;
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
  });
});

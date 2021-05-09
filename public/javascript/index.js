const btn = document.getElementById("submit");
const message = document.querySelector("#message");

const fetchWeather = (e) => {
  e.preventDefault();
  message.textContent = `Loading`;
  const userInput = document.getElementsByClassName("userInput")[0];
  if (userInput.value) {
    fetch(`http://localhost:8000/weather?address=${userInput.value}`)
      .then((data) => {
        //console.log(data);
        return data.json();
      })
      .then((result) => {
        message.className = "success";
        message.textContent = `Your current Temperature is ${result.current.temperature} degrees`;
      })
      .catch((e) => {
        message.className = "err";
        message.textContent = `Unable to access the server Please try again later`;
      });
  } else {
    console.log("Please enter some value");
  }
};

btn.addEventListener("click", fetchWeather, false);

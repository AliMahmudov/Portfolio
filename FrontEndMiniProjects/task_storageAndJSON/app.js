let form = document.querySelector("form");
let isLoggedin = false;
let users = JSON.parse(localStorage.getItem("users")) || [];

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   let username = e.target.elements.username.value;
//   let password = e.target.elements.password.value;

//   if (username === "azer" && password === "1234") {
//     isLoggedin = true;
//     // Store this value to local storage
//     localStorage.setItem("isLoggedin", isLoggedin);
//   } else {
//     isLoggedin = false;
//   }

//   console.log(isLoggedin);
// });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputs = document.querySelectorAll(`input:not([type='submit'])`);
  let obj = {};
  inputs.forEach((elem) => {
    obj[elem.name] = elem.value;
  });
  users.push(obj);
  localStorage.setItem("users", JSON.stringify(users));
  //   window.location.href = "about.html";
});

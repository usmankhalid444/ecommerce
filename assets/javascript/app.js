/** @format */

var toogle = document.querySelector(".toogle>i");
addEventListener("click", function () {
  toogle.classList.toggle("tbtnstyle");

  document.querySelector(".navlinkss").classList.toggle("togglestyles");
  document.querySelector(".icons").classList.toggle("togglestyles");
});
function seconds() {
  var second = document.querySelector(".sec");
  var d = new Date();
  var n = d.getSeconds();
  second.innerText = n < 10 ? "0" + n : n;
}
setInterval(seconds, 1000);
maincart = document.querySelector(".maincart");
maincart.addEventListener("click", function () {
  let usman = document.querySelector(".mainbody");
  // usman.classList.remove("mainbody");
  // usman.classList.add("mainbodystyles");
  // console.log(usman);
  document.querySelector(".mainbody").style.marginRight = "490px";
  document.querySelector(".cartbody").style.right = "0";
  document.querySelector(".cartbody").style.transition = "0.5s";
  document.querySelector(".cartbody").style.display = "block";
});
document
  .querySelector(".fa-window-close")
  .addEventListener("click", function () {
    document.querySelector(".mainbody").style.marginRight = "0";
    document.querySelector(".cartbody").style.display = "none";
  });
//todo cart features
let cartbutton = document.querySelectorAll(".cartbutton");
cartbutton.forEach((btn) => {
  btn.addEventListener("click", myfun);
});

function myfun(e) {
  let parent = e.target.parentElement.parentElement;
  let title = parent.querySelector(".ptitle").innerText;
  let price = parent.querySelector(".pprice").innerText;
  let image = parent.querySelector("img").getAttribute("src");
  let qtn = 1;
  price = price.replace("$ ", "");

  let arr = JSON.parse(localStorage.getItem("data"));
  let obj = { image, title, price, qtn };
  if (arr) {
    arr.push(obj);
    localStorage.setItem("data", JSON.stringify(arr));
  } else {
    localStorage.setItem("data", JSON.stringify([obj]));
  }
}
cartbutton.forEach((btn) => {
  btn.addEventListener("click", cartdisplay);
});
function cartdisplay(e) {
  // let ctitle = document.querySelector(".ctitle").innerText;
  // let cprice = document.querySelector(".cprice").innerText;
  // cprice = cprice.replace("$", "");
  // let cdetail = "xxl size";
  let arr = JSON.parse(localStorage.getItem("data"));
  if (arr) {
    let list = "";
    arr.forEach((data, index) => {
      list += `<div class="row cartitem" data-index="${index}">
      <div class="col-3">
        <img src="${data.image}" alt="" />
      </div>
      <div class="col-3"><p class="ctitle">${data.title}</p>
      <p>Qtn ${data.qtn}</p>
      </div>
      <div class="col-3">
        <p class="cdetail">XXL Size</p>
        <p class="cprice">${data.price}$</p>
        <p>Total Price</p>
        <p>${data.price * data.qtn} $</p>
      </div>
      <div class="col-3">
        <ul>
          <li class="addqtn"><p>Add</p></li>
          <li class="removeqtn"><p>Remove</p></li>
          <li class="delete-qtn"><p>Delete</p></li>
        </ul>
      </div>
    </div>`;
    });

    // addqtn.addEventListener("click", function () {
    //   data.qtn == +1;
    // });
    document.querySelector(".cart-body").innerHTML = list;

    let addqtn = document.querySelectorAll(".addqtn");
    let removeqtn = document.querySelectorAll(".removeqtn");
    let deleteqtn = document.querySelectorAll(".delete-qtn");
    addqtn.forEach((qtn) => {
      qtn.addEventListener("click", plus);
    });
    removeqtn.forEach((rqtn) => {
      rqtn.addEventListener("click", minus);
    });
    deleteqtn.forEach((btn) => {
      btn.addEventListener("click", del);
    });
  }
}
window.onload = cartdisplay();

function plus(e) {
  let parent = e.target.parentElement.parentElement.parentElement.parentElement;
  let index = parent.getAttribute("data-index");
  // let index = parent.querySelector(".row").getAttribute("data-index");
  // console.log(index);
  let arr = JSON.parse(localStorage.getItem("data"));
  arr[index].qtn += 1;

  localStorage.setItem("data", JSON.stringify(arr));
  cartdisplay();
}
function minus(e) {
  let parent = e.target.parentElement.parentElement.parentElement.parentElement;
  let index = parent.getAttribute("data-index");
  // let index = parent.querySelector(".row").getAttribute("data-index");
  // console.log(index);
  let arr = JSON.parse(localStorage.getItem("data"));
  if (arr[index].qtn > 1) {
    arr[index].qtn -= 1;
  }

  localStorage.setItem("data", JSON.stringify(arr));
  cartdisplay();
}
function del(e) {
  console.log("date");
  let parent = e.target.parentElement.parentElement.parentElement.parentElement;
  let index = parent.getAttribute("data-index");
  // let index = parent.querySelector(".row").getAttribute("data-index");
  // console.log(index);
  let arr = JSON.parse(localStorage.getItem("data"));
  arr.splice(index, 1);

  localStorage.setItem("data", JSON.stringify(arr));
  cartdisplay();
}

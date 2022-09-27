let typeText = "";
if (window.innerWidth <= 800)
  typeText = "Web Developer | Programmer<br>Graphics\xa0Designer\xa0| Musician";
else
  typeText = "Web Developer | Programmer | Graphics\xa0Designer\xa0| Musician";
let typeIterator = 0;

window.onload = function () {
  let date = new Date();
  let time = date.getHours();

  if (time >= 20 || time <= 8) toggleDark();
  document.body.classList.toggle("hide");
  if (window.innerWidth > 1000) {
    this.setTimeout(() => {
      typeIt(this.document.getElementById("heading-sub"), 60);
    }, 150);
  } else {
    this.document.getElementById("heading-sub").innerHTML = typeText;
  }
};

function typeIt(element, speed) {
  if (element.innerHTML === "&nbsp;") {
    element.innerHTML = "";
  }
  if (typeText === "") {
    typeText = element.innerHTML;
    element.innerHTML = "";
  }
  if (typeIterator < typeText.length) {
    element.innerHTML += typeText.charAt(typeIterator);
    typeIterator++;
    setTimeout(() => {
      typeIt(element, speed);
    }, speed);
  } else {
    typeIterator = 0;
    typeText = "";
  }
}

function switchTabs(target) {
  let activeTab = document.querySelector(".active");
  let hr = document.querySelector("#hr-btm");
  let dark = document.querySelector("#dark-mode");
  document.querySelector(".selected").classList.toggle("selected");
  document
    .querySelector("#btn-" + target.id.split("-")[1])
    .classList.toggle("selected");
  if (activeTab != target) {
    activeTab.classList.toggle("fade");
    hr.classList.toggle("fade");
    dark.classList.toggle("fade");
    setTimeout(() => {
      activeTab.classList.toggle("active");
      activeTab.classList.toggle("hide");
      target.classList.toggle("hide");
      setTimeout(() => {
        target.classList.toggle("fade");
        hr.classList.toggle("fade");
        dark.classList.toggle("fade");
        target.classList.toggle("active");
      }, 50);
    }, 200);
  }
}

function toggleDark() {
  document.querySelector('body').classList.toggle('dark');
}

/* --- Beep Boop --- */
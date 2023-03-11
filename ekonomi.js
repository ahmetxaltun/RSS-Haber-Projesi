const newsContainer = document.getElementById("news-area");

const updateNewsTimeDiff = () => {
  const pubDates = document.querySelectorAll(".pubDate");
  pubDates.forEach(pubDate => {
    const pubDateObj = new Date(pubDate.dataset.pubDate);
    const currentDateObj = new Date();
    const timeDiffInSeconds = Math.floor((currentDateObj - pubDateObj) / 1000);
    let timeDiff;
    if (timeDiffInSeconds < 60) {
      timeDiff = `${timeDiffInSeconds} saniye önce`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      timeDiff = `${minutes} dakika önce`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      timeDiff = `${hours} saat önce`;
    } else {
      const days = Math.floor(timeDiffInSeconds / 86400);
      timeDiff = `${days} gün önce`;
    }
    pubDate.innerText = timeDiff;
  });
};

fetch('https://www.cnnturk.com/feed/rss/ekonomi/news')
.then(response => response.text())
.then(data => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'application/xml');
  const items = Array.from(xml.querySelectorAll("item")).slice(0, 36);
  items.forEach(item => {
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const image = item.querySelector('image').textContent;
    const description = item.querySelector('description').textContent;
    const pubDate = item.querySelector("pubDate").innerHTML;
    const pubDateObj = new Date(pubDate);
    const currentDateObj = new Date();
    const timeDiffInSeconds = Math.floor((currentDateObj - pubDateObj) / 1000);
    let timeDiff;
    if (timeDiffInSeconds < 60) {
      timeDiff = `${timeDiffInSeconds} saniye önce`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      timeDiff = `${minutes} dakika önce`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      timeDiff = `${hours} saat önce`;
    } else {
      const days = Math.floor(timeDiffInSeconds / 86400);
      timeDiff = `${days} gün önce`;
    }
    const url = new URL(link);
    const urlPart = url.hostname.split(".")[1];
    const newsPart = `
      <div class="news">
        <a href="${link}" target="_blank" rel="nofollow">
          <img src="${image}" alt="${title}" loading="lazy" width="312" height="200" title="${title}">
          <div class="news-info">
            <span><i class="bi bi-globe-central-south-asia"></i> ${urlPart}</span>
            <span class="pubDate" data-pub-date="${pubDateObj.toISOString()}">${timeDiff}</span>
          </div>
          <h2>${title}</h2>
          <p>${description}</p>
        </a>
      </div>
    `;
    newsContainer.insertAdjacentHTML("beforeend", newsPart);
  });
  setInterval(updateNewsTimeDiff, 1000);
});

const clock = document.querySelector(".clock");
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = now.getDay();
  let dayName = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  let today = dayName[day-1];
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  clock.innerHTML = `<i class="bi bi-calendar-week"></i> ${hours}:${minutes}, ${today}`;

  var wellcome = document.querySelector(".wellcome");
  if (hours < 1){
    wellcome.innerHTML = "<i class='bi bi-moon-stars-fill'></i> Merhaba, İyi akşamlar!";
  } else if (hours < 11){
    wellcome.innerHTML = "<i class='bi bi-sunrise-fill'></i> Merhaba, Günaydın!";
  } else if (hours < 18){
    wellcome.innerHTML = "<i class='bi bi-emoji-laughing-fill'></i> Merhaba, İyi günler!";
  } else{
    wellcome.innerHTML = "<i class='bi bi-moon-stars-fill'></i> Merhaba, İyi akşamlar!";
  }
}
setInterval(updateClock, 1000);

var menuIcon = document.querySelector("#webapp_cover");
var inputCheckbox = document.querySelector("#menu_checkbox");
var rightCategoryArea = document.querySelector(".right-category-area");
var rightCategoryClose = document.querySelector(".right-category-close");

menuIcon.addEventListener("click", () => {
  if (rightCategoryArea.style.left === "0px") {
    rightCategoryArea.style.left = "-100%";
  } else {
    rightCategoryArea.style.left = "0px";
  }
});


rightCategoryClose.addEventListener("click", ()=>{
  rightCategoryArea.style.left = "-100%";
  inputCheckbox.checked = false;
});

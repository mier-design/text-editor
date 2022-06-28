function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
            function scroll(){
                let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                let url = Math.round(window.pageYOffset/height);
                console.log(url)
                if(url > 2) {
                    document.getElementById("up").style.display = "flex";
                    document.getElementById("up").style.opacity = 1;
                    document.getElementById("down").style.opacity = 0;
                    document.getElementById("down").style.display = "none";
                }else {
                    document.getElementById("up").style.opacity = 0;
                    document.getElementById("up").style.display = "none";
                    document.getElementById("down").style.display = "flex";
                    document.getElementById("down").style.opacity = 1;
                }
              }
              function more(){
                let windowid = window.location.hash;
                if(windowid && windowid != null){
                    windowid = windowid.replace("#", "");
                }else{
                    windowid = 1;
                }
                windowid = ++windowid;
                window.location.href = "#" + windowid;
              }
              function togglemenu(){
                  var menu = document.getElementById("menu");
                  if(menu.style.visibility != "visible"){
                      menu.style.visibility = "visible";
                      menu.style.opacity = 1;
                  }else {
                      menu.style.visibility = "hidden";
                      menu.style.opacity = 0;
                  }
              }
              function setTheme(themeName) {
                localStorage.setItem('theme', themeName);
                document.documentElement.className = themeName;
              }
              // function to toggle between light and dark theme
              function toggleTheme() {
                if (localStorage.getItem('theme') === 'theme-two'){
                  setTheme('theme-one');
                } else {
                  setTheme('theme-two');
                }
              }
              // Immediately invoked function to set the theme on initial load
              (function () {
                if (localStorage.getItem('theme') === 'theme-two') {
                  setTheme('theme-two');
                } else {
                  setTheme('theme-one');
                }
              })();

              window.addEventListener('load', async function() {
                const langs = ["en", "nl", "fr", "ru"];
                let lang = navigator.language;
                lang = langs.includes(lang) ? lang : "en";
                let content = fetch(`https://mier.design/assets/lang/${lang}.json`).then(response => response.json()).then(data => {
                  var cusid_ele = document.getElementsByClassName('translatable');
                  for (var i = 0; i < cusid_ele.length; ++i) {
                    var item = cusid_ele[i];
                    let key = item.dataset.key;
                    const obj = data;
                    const realtext = (obj.translations[key]);
                    item.innerHTML = realtext;
                  }});
                  let age = document.getElementById("age");
                  if(age){
                  age.innerHTML = age.innerHTML.replace(/age/g, getAge(1061490614000)).replace(/AGE/g, getAge(1061490614000));
                  }
                  document.getElementsByTagName("html")[0].setAttribute("lang", lang);
                  await content;
                  document.getElementById("loader").style.opacity = "0";
                  document.getElementById("loader").style.display = "none";
                  document.body.style.overflowY = "auto";
                  document.body.style.height = "auto";
                  //showSlides(slideIndex);
              });

              let slideIndex = 1;

              // Next/previous controls
              function plusSlides(n) {
                showSlides(slideIndex += n);
              }
              
              // Thumbnail image controls
              function currentSlide(n) {
                showSlides(slideIndex = n);
              }
              
              function showSlides(n) {
                let i;
                let slides = document.getElementsByClassName("mySlides");
                let dots = document.getElementsByClassName("dot");
                if (n > slides.length) {slideIndex = 1}
                if (n < 1) {slideIndex = slides.length}
                for (i = 0; i < slides.length; i++) {
                  slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                  dots[i].className = dots[i].className.replace(" active", "");
                }
                slides[slideIndex-1].style.display = "flex";
                dots[slideIndex-1].className += " active";
              }
              

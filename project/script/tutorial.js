const check001 = document.getElementById("check001");
check001.onclick = () => {
    document.getElementById("step1").style.color  = "red";
    window.location = window.location + "#step1";
    window.location = cutUrl(window.location);
    setTimeout(() => {
        document.getElementById("step1").style.color  = "#ddd";
    }, 1000);
}

function cutUrl(url){
    let a = String(url);
    let temp = a.slice(0, a.lastIndexOf("#"));

    if(temp.includes("#")){
        console.clear();
        return temp;
    } 
        return a;
}

function loveImage() {
    let allImage = document.querySelectorAll("img");
    allImage.forEach(image => {
        image.addEventListener("click", check);
    });
}

function check(image){

    if(image.target.hasAttribute("im")){
        originalState(image);
        image.target.removeAttribute("im");
    } else {
        image.target.setAttribute("im", true)
        imageZoom(image);
    }
}

loveImage(); 

function imageZoom(imageEl){
   let image = imageEl.target;
    image.style.position = "absolute";
    let all = document.querySelector("#heart");
    all.style.visibility = "visible";
    image.style.opacity = 1;
    image.style.zIndex = 2;
    image.style.top = "150%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    image.style.width = "60%";
    
}

function originalState(imageEl) {
    let image = imageEl.target;

    image.style.position = "relative"; 
    let all = document.querySelector("#heart");
    all.style.visibility = "hidden"
    image.style.top = "0%";
    image.style.left = "0%";
    image.style.width = "30%";
    image.style.transform = "translate(0, 0)"
    image.style.opacity = 1;

}

function getAllCopies(_class) {
    
}
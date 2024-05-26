document.getElementById("introduction").onclick = () => {
    alert("A basic introduction about the whole page :D")
}

let allNav = ["homeEl", "contactEl", "projectEl", "aboutEl"]

allNav.forEach(el => {
    if(el === thePageNav){
        document.getElementById(""+el+"").style.color = "red"
    }
})
window.onload = () => {
    alert("aaa")
    const app = document.getElementById("app")
    const div = document.createElement('div')
    div.style.position = "absolute"
    div.style.zIndex = "100"
    div.style.width = "100%"
    div.innerHTML = '<nav class="navbar navbar-expand navbar-light bg-light">\
    <div class="collapse navbar-collapse">\
        <ul class="navbar-nav">\
            <li class="nav-item"><a class="nav-link">Home</a></li>\
            <li class="nav-item"><a class="nav-link">Docassets</a></li>\
        </ul>\
    </div>\
    </nav>'
    document.body.insertBefore(div, app)
}
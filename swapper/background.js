window.onload = () => {
    const app = document.getElementById("app")
    const div = document.createElement('div')
    div.style.position = "absolute"
    div.style.zIndex = "100"
    div.style.width = "100%"
    div.innerHTML = '<nav id="menu" class="navbar navbar-expand navbar-dark bg-dark">\
    <div class="collapse navbar-collapse">\
        <ul class="navbar-nav mr-auto">\
            <li class="nav-item"><a class="nav-link" onclick="docassets()">\
                <img style="width: 30px; height: 30px;" src="https://lh3.googleusercontent.com/JwLoyKugJQ-GNq-hGK94I23EJETk2_2Wi3UrLlShwBa1UTgiWFQQ4uvmKfxi7pacYwBbjg1IxOeus7Tlv8h5-Lui_5Q=w128-h128-e365-rj-sc0x00ffffff">\
                <div id="doc-switch" class="position-absolute bg-success text-white px-1 rounded"\
                    style="font-size: 10px; margin-top: -10px">ON</div>\
            </a></li>\
        </ul>\
        <ul class="navbar-nav">\
            <li class="nav-item"><a class="nav-link pull-right" onclick="dark()">\
                <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">\
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />\
                </svg>\
            </a></li>\
        </ul>\
    </div>\
    </nav>'
    document.body.insertBefore(div, app)
}

function dark() {
    const menu = document.getElementById("menu")
    if (menu.classList.contains("navbar-light")) {
        menu.className = "navbar navbar-expand navbar-dark bg-dark"
    } else {
        menu.className = "navbar navbar-expand navbar-light bg-light"
    }
}

const extension = localStorage.getItem("docassets")
if (extension == null) {
    localStorage.setItem("docassets", false)
}
const switch = document.getElementById("doc-switch")
if (extension) {
    switch.className = "position-absolute bg-success text-white px-1 rounded"
    switch.innerText = "ON"
} else {
    switch.className = "position-absolute bg-danger text-white px-1 rounded"
    switch.innerText = "OFF"
}

function docassets() {
    const switch = document.getElementById("doc-switch")
    if (extension) {
        localStorage.setItem("docassets", false)
    } else {
        localStorage.setItem("docassets", true)
    }
    reload()
}
window.addEventListener("load", () => { // Extensions
  const ext = document.querySelector(".pink").cloneNode(true)
  ext.style.width = "5.5rem"

  const group = document.querySelector(".el-col-sm-8")
  group.appendChild(ext)
  group.style.maxWidth = "100%"
  group.style.flex = "0 0 100%"

  ext.classList.remove("pink")
  ext.classList.add("green", "ext", "ext-close")
  const extText = document.querySelector("button.ext > span:nth-child(1) > span:nth-child(2)")
  extText.innerText = "Extensions"

  const extIcon = document.querySelector("button.ext > span:nth-child(1) > svg:nth-child(1)")
  extIcon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>`

  const extMain = document.getElementById("ext-main")
  for (const path in data) {
    const extBox = document.createElement("div")
    extMain.appendChild(extBox)
    extBox.outerHTML = `
    <div class="relative ext-box ${config[path].active ? "active" : ""}" id="${path}">
      <div style="bottom: 0" class="text-center absolute w-full p-2">${data[path].name}</div>
    </div>
    `
    const extBoxNew = document.getElementById(path)
    extBoxNew.addEventListener("click", () => {
      extBoxNew.classList.toggle("active")
      config[path].active = extBoxNew.classList.contains("active")
      setConfig(config)
    })
  }

  const extCloses = document.getElementsByClassName("ext-close")
  const extModal = document.getElementById("ext-modal")
  for (const extClose of extCloses) {
    extClose.addEventListener("click", () => {
      extModal.classList.toggle("hidden")
    })
  }
})

window.addEventListener("load", () => { // Evotree
    const evo = document.querySelector(".pink").cloneNode(true)

    const group = document.querySelector(".el-col-sm-8")
    group.appendChild(evo)
    group.style.maxWidth = "100%"
    group.style.flex = "0 0 100%"

    evo.classList.remove("pink")
    evo.classList.add("blue")
    evo.classList.add("evo")
    const evoText = document.querySelector("button.evo > span:nth-child(1) > span:nth-child(2)")
    evoText.innerHTML = "Evo"

    const evoIcon = document.querySelector("button.evo > span:nth-child(1) > svg:nth-child(1)")
    evoIcon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25" version="1.1">
<g id="surface1">
<path style="fill:none;stroke-width:8;stroke-linecap:butt;stroke-linejoin:round;stroke:rgb(100%,100%,100%);stroke-opacity:1;stroke-miterlimit:10;" d="M 50.953125 52.6875 L 70.359375 52.6875 L 70.359375 41.71875 " transform="matrix(0.25,0,0,0.25,0,0)"/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 15.566406 9.464844 C 15.566406 8.34375 16.472656 7.4375 17.589844 7.4375 C 18.128906 7.4375 18.644531 7.652344 19.023438 8.03125 C 19.402344 8.410156 19.617188 8.925781 19.617188 9.464844 C 19.617188 10.582031 18.710938 11.492188 17.589844 11.492188 C 16.472656 11.492188 15.566406 10.582031 15.566406 9.464844 Z M 15.566406 9.464844 "/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 13.550781 20.296875 L 13.550781 7.4375 L 11.621094 7.4375 L 11.621094 20.296875 Z M 13.550781 20.296875 "/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 10.558594 6.730469 C 10.558594 5.613281 11.464844 4.703125 12.585938 4.703125 C 13.125 4.703125 13.640625 4.917969 14.019531 5.296875 C 14.398438 5.675781 14.613281 6.195312 14.613281 6.730469 C 14.613281 7.851562 13.707031 8.757812 12.585938 8.757812 C 11.464844 8.757812 10.558594 7.851562 10.558594 6.730469 Z M 10.558594 6.730469 "/>
<path style="fill:none;stroke-width:8;stroke-linecap:butt;stroke-linejoin:round;stroke:rgb(100%,100%,100%);stroke-opacity:1;stroke-miterlimit:10;" d="M 49.046875 65.703125 L 29.640625 65.703125 L 29.640625 54.734375 " transform="matrix(0.25,0,0,0.25,0,0)"/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.433594 12.71875 C 9.433594 11.601562 8.527344 10.695312 7.410156 10.695312 C 6.871094 10.695312 6.355469 10.90625 5.976562 11.285156 C 5.59375 11.667969 5.382812 12.183594 5.382812 12.71875 C 5.382812 13.839844 6.289062 14.746094 7.410156 14.746094 C 8.527344 14.746094 9.433594 13.839844 9.433594 12.71875 Z M 9.433594 12.71875 "/>
</g>
</svg>`
})

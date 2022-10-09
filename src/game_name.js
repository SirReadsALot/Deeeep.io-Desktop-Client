window.addEventListener('load', () => {
    document.getElementsByClassName("el-input__inner")[0].addEventListener('input', change)
    function change() {
        const input = document.getElementsByClassName("el-input__inner")[0].value
        localStorage.setItem("game_name", input)
    }

    var game_name = localStorage.getItem("game_name")
    if (game_name == null) {
        console.log("[DDC] no localStorage key found")
        return;
    } else {
        const input = document.getElementsByClassName("el-input__inner")[0].value
        input = game_name
        console.log("[DDC] localStorage key found")
    }
})

/*window.addEventListener('load', () => {

  var game_name = localStorage.getItem("game_name")
  input = game_name
}) */

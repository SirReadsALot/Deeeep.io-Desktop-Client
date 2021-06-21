// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// </head>
// <body>
//     <img src="../build/splashIntro_resized.png"> 
//     <!-- <img src="../build/splashIntro_TROLLED.png"> -->
//     <div id="myProgress">
//         <div id="myBar">5%</div>
//     </div>
//     <style>
//         img {
//             background-position: centre;
//             /* background-repeat: no-repeat;
//             background-size: cover; */
//             pointer-events: none;
//             user-select: none;
//             -moz-user-select: none;
//             -webkit-user-drag: none;
//             -webkit-user-select: none;
//             -ms-user-select: none; 
//            }

//         #myProgress {
//             width: 92%;
//             background-color: #ddd;
//             position: absolute;
//             z-index: 2;
//         }

//         #myBar {
//             font-family: 'Dosis', sans-serif;
//             width: 5%;
//             height: 50px;
//             background-color: #04AA6D;
//             text-align: center;
//             line-height: 50px;
//             color: white;
//             font-size: 40px;
//             font-weight: bold;
//             position: absolute;
//             z-index: 2;
//         }
//     </style>
//     <script>
// var troll = true
// var i = 0;
// function move() {
//         if (i == 0) {
//             i = 1;
//             var elem = document.getElementById("myBar");
//             var width = 10;
//             var id = setInterval(frame, 60);

//             function frame() {
//                if (width >= 100) {
//                 clearInterval(id);
//                 i = 0;
//             } else {
//                 width++;
//                 elem.style.width = width + "%";
//                 elem.innerHTML = width + "%";
//             }
//         }
//     }
// }
// if (troll) {
//     move()
// }
//     </script>
// </body>
// </html>

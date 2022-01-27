let zana = document.getElementsByClassName("zana")[0];
let obstacol = document.getElementsByClassName("obstacol")[0];

document.addEventListener("click",() => {
  obstacol.style.transition="2s all";
  setTimeout(moveLeft,1000);
})

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        zana.classList.add("jump")
        setTimeout(() => { zana.classList.remove("jump")}, 1000)
    }
})

function moveLeft()
{
  obstacol.classList.add("miscare");
  setTimeout(moveBack,2000);
}

function moveBack()
{
  obstacol.style.transition="none";
  obstacol.classList.remove("miscare");
}

let score = 0;
setInterval(() => {
  score++;
  document.getElementsByClassName("timer")[0].innerHTML=score;

  let interval = setInterval(() => {
    let zanaRect = zana.getBoundingClientRect();
    let obstacolRect = obstacol.getBoundingClientRect();
  
    if (zanaRect.right > obstacolRect.left && zanaRect.left < obstacolRect.right && zanaRect.bottom > obstacolRect.top)
      {
        alert("OOPSIE DAISY... TRY  A G A I N");
        score = 1;
      }
  }, 10);

}, 1000);


alert("wow, wow, be careful");

document.getElementById("nice").addEventListener("click", changeText);

function changeText(){
    console.log(this)
    this.innerHTML = "young heart";
}

document.getElementById("buton").addEventListener("click",(ata) => {alert("hopa");});
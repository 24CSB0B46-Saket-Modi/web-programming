const movBT = document.getElementById("add");
const inpBox = document.getElementById("movIN");
const movList = document.getElementById("mList");
const remBT = document.getElementById("removeAll");
const count = document.getElementById("count");
let totalMovies = 0;
movBT.onclick = function()
{
    if (inpBox.value)
    {
        let mov = document.createElement("button");
        mov.onclick = function()
        {
            totalMovies--;
            mov.remove();
            count.innerText = totalMovies;
        }
        mov.id = "movie";
        const txt = document.createTextNode(inpBox.value);
        mov.appendChild(txt);
        movList.appendChild(mov);
        totalMovies++;
        count.innerText = totalMovies;
    }    
    else
        window.alert("No value entered!");
}
remBT.onclick = function()
{
    movList.innerHTML = "";
    totalMovies = 0;
    count.innerText = totalMovies;
}
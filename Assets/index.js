const electron  = require("electron");

const { ipcRenderer } = electron;

const btn = document.getElementById("btn");
const btn_clr = document.getElementById("btn_clr");
const body = document.getElementsByClassName("container");
const Field = document.getElementById("Search");

btn.addEventListener("click",(e)=>{
    //@ts-ignore
    if(Field.value){
        //@ts-ignore
        ipcRenderer.send("Query",Field.value);
        //@ts-ignore
        Field.value = "";
        
    }
    else{
        const Message = ipcRenderer.send("links");
    }
});
btn_clr.addEventListener("click",e=>{
    // @ts-ignore
    Field.value = "";
    body[0].innerHTML = "";
});


ipcRenderer.on("alinks",(e,args)=>{
    args.forEach((element,i) => {
        const img = document.createElement("img");
        img.setAttribute("id",`img_${i}`);
        img.setAttribute("src",`${element}`);
        img.classList.add("grid_img");
        body[0].appendChild(img);    
    });
    
});
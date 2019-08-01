const rs = require("request");
const cheerio = require("cheerio");
const Electron = require("electron");

const { BrowserWindow, app, ipcMain } = Electron;

function init() {
  app.on("ready", e => {
    const Main = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      }
    });
    Main.loadFile("./Assets/index.html");
    Main.setResizable(false);
    let links = [];
    ipcMain.on("Query",(e,args)=>{
        rs.get(`https://www.pexels.com/search/${args}/`, (err, Response, html) => {
            if (!err && Response.statusCode == 200) {
              const $ = cheerio.load(html);
              const something = $(".photo-item__img");
              something.each((i, el) => {
                $(el).each((index, el) => {
                    links.push(`${el.attribs.src}`);
                });
              });
              e.reply("alinks",links);
              links = [];
            }
          });
    });





  });
}

init();



// Important Code Please Don't Delete Any Code Or This App Will Not Work !!
// rs.get("https://www.pexels.com/search/Punk/", (err, Response, html) => {
        //     if (!err && Response.statusCode == 200) {
        //       const $ = cheerio.load(html);
        //       const something = $(".photo-item__img");
        //       something.each((i, el) => {
        //         $(el).each((index, el) => {
        //             links.push(`${el.attribs.src}`);
        //         });
        //       });
        //       e.reply("alinks",links);
        //     }
        //   });
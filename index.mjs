import http from "http";
import fs from "fs/promises";
import url from "url";
import {
  getLandingData,
  getArticleData,
  getCarouselData,
} from "./modules/functions.mjs";

function RouteActions(req) {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;
  if (path === "/landing") {
    return getLandingData();
  }
  if (path === "/article") {
    return getArticleData();
  }
  if (path === "/carousel") {
    return getCarouselData();
  }
}

const server = http.createServer(function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      let totalFormData = Buffer.concat(chunks).toString();

      if (totalFormData.length > 0) {
        (async () => {
          const readFileData = await fs.readFile(
            "./database/formData.txt",
            "utf8"
          );
          totalFormData += ";" + readFileData;
          await fs.writeFile("./database/formData.txt", totalFormData);
        })();
      }
    });
    res.end(RouteActions(req));
  
  } catch (err) {
    console.log(err);
  }
});

server.listen(5000);

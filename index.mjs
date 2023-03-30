import http from "http";
import fs from "fs/promises";
import url from "url";
import { parse } from "querystring";
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
  if (path === "/post-data") {
    let chunks = "";
    req.on("data", (chunk) => {
      chunks = chunk.toString();
    });

    req.on("end", () => {
      let parsedData = parse(chunks);
      if (Object.keys(parsedData).length !== 0) {
        modifyFile(parsedData);
      }
    });
  }
}

async function modifyFile(totalFormData) {
  let readFileData = await fs.readFile("./database/formData.txt", "utf-8");
  readFileData = JSON.parse(readFileData);
  readFileData.push(totalFormData);
  await fs.writeFile("./database/formData.txt", JSON.stringify(readFileData));
}

const server = http.createServer(function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(RouteActions(req));
  } catch (err) {
    console.log(err);
  }
});

server.listen(5000);

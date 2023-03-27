import http from "http";
import fs from "fs/promises";
// let arr = [];
const server = http.createServer(function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    const chunks = [];
    if (req.url === "/form-data") {
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        async function read() {
          await fs.readFile("data.txt", "utf-8").then((data) => {
            return data;
          });
        }

        async function write() {
          await fs.writeFile("data.txt", arr).then(() => {
            console.log("file written");
          });
        }
        data = read();
        arr.push(data.toString());

        write();
      });
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
});

server.listen(5000);

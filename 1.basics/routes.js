const fs = require("fs");
const path = require("path");

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>app</title>
      </head>
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message" />
          <button type="submit">send</button>
        </form>
      </body>
    </html>
    `);
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log({ chunk });
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log({ parsedBody });
      const message = parsedBody.split("=")[1];
      fs.writeFile(path.resolve("message.txt"), message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Title of the page</title></head>");
  res.write("<body><h1>Hello!!!!</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   text: "hi",
// };

// module.exports.handler = requestHandler;
// module.exports.text = "hi";

exports.handler = requestHandler;
exports.text = "hi";

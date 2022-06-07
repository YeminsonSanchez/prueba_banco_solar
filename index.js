const fs = require("fs");
const http = require("http");
const url = require("url");
const {
  newUser,
  allUsers,
  editUser,
  deleteUser,
  newTransfer,
  allTransfers,
} = require("./consult");
const { showError } = require("./error");

const PORT = 3000;

http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method == "GET") {
      try {
        res.setHeader("content-type", "utf-8", "text/html");
        res.statusCode = 200;
        fs.readFile("index.html", (err, data) => {
          err ? console.log(err.message, err.code) : res.end(data);
        });
      } catch (e) {
        showError(res, e);
      }
    } else if (req.url == "/usuario" && req.method == "POST") {
      let body = "";
      req.on("data", (payload) => {
        body += payload;
      });
      req.on("end", async () => {
        try {
          const data = Object.values(JSON.parse(body));
          const result = await newUser(data);
          res.statusCode = 201;
          res.end(JSON.stringify(result));
        } catch (e) {
          showError(res, e);
        }
      });
    } else if (req.url == "/usuarios" && req.method == "GET") {
      try {
        const result = await allUsers();
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (e) {
        showError(res, e);
      }
    } else if (req.url.startsWith("/usuario?") && req.method == "PUT") {
      let { id } = url.parse(req.url, true).query;
      let body = "";
      req.on("data", (payload) => {
        body += payload;
      });
      req.on("end", async () => {
        try {
          const data = Object.values(JSON.parse(body));
          const response = await editUser(data, id);
          res.statusCode = 201;
          res.end(JSON.stringify(response));
        } catch (e) {
          showError(res, e);
        }
      });
    } else if (req.url.startsWith("/usuario?") && req.method == "DELETE") {
      try {
        const { id } = url.parse(req.url, true).query;
        const response = await deleteUser(id);
        res.statusCode = 200;
        res.end(JSON.stringify(response));
      } catch (e) {
        showError(res, e);
      }
    } else if (req.url == "/transferencia" && req.method == "POST") {
      let body = "";
      req.on("data", (payload) => {
        body += payload;
      });
      req.on("end", async () => {
        try {
          const data = Object.values(JSON.parse(body));
          const result = await newTransfer(data);
          res.statusCode = 201;
          res.end(JSON.stringify(result));
        } catch (e) {
          showError(res, e);
        }
      });
    } else if (req.url == "/transferencias" && req.method == "GET") {
      try {
        const result = await allTransfers();
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (e) {
        showError(res, e);
      }
    }
  })
  .listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );

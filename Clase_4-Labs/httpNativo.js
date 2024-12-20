import http from "http";

const server = http.createServer((req, res) => {
    if (req.url === "/api") {
        if (req.method === "GET") {
            res.end(`API response to method ${req.method}`);
            return;
        }

        if (req.method === "POST") {
            res.end(`API response to method ${req.method}`);
            return;
        }

        res.end("Other API response");
    }

    res.end("Hello World");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

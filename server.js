   const http = require('http');
   const url = require('url');

   const server = http.createServer((req, res) => {
       const parsedUrl = url.parse(req.url, true);
       const pathname = parsedUrl.pathname;

       // Обработка статического запроса
       if (pathname === '/static') {
           res.writeHead(200, { 'Content-Type': 'application/json' });
           res.end(JSON.stringify({ header: "Hello", body: "Octagon NodeJS Test" }));
       } 
       // Обработка динамического запроса
       else if (pathname === '/dynamic') {
           const { a, b, c } = parsedUrl.query;

           // Проверяем, являются ли a, b, c числом
           const numA = parseFloat(a);
           const numB = parseFloat(b);
           const numC = parseFloat(c);

           if (!isNaN(numA) && !isNaN(numB) && !isNaN(numC)) {
               const result = (numA * numB * numC) / 3;
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end(JSON.stringify({ header: "Calculated", body: result.toString() }));
           } else {
               res.writeHead(400, { 'Content-Type': 'application/json' });
               res.end(JSON.stringify({ header: "Error" }));
           }
       } else {
           res.writeHead(404, { 'Content-Type': 'application/json' });
           res.end(JSON.stringify({ header: "Error", body: "Not found" }));
       }
   });

   const PORT = 3000;
   server.listen(PORT, () => {
       console.log(`Сервер запущен на http://localhost:${PORT}`);
   });
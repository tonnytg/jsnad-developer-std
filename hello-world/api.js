// Importa o módulo HTTP do Node.js
const http = require('http');

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Define cabeçalhos padrão
  res.setHeader('Content-Type', 'text/plain');

  // Roteamento básico
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('Hello, World! Welcome to the OpenJS Node.js Application Developer journey.');
  } else if (req.method === 'GET' && req.url === '/about') {
    res.statusCode = 200;
    res.end('This is the "About" page of our Node.js app.');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


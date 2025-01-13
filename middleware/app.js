// Importa o módulo HTTP do Node.js
const http = require('http');

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware personalizado
function middleware(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  // Adiciona uma propriedade ao objeto `req`
  req.appInfo = { name: 'Node.js Middleware App', version: '1.0.0' };
  // Chama o próximo manipulador
  next();
}

// Função para lidar com rotas
function handleRoutes(req, res) {
  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end(`Hello, World! Welcome to the ${req.appInfo.name} v${req.appInfo.version}.`);
  } else if (req.method === 'GET' && req.url === '/about') {
    res.statusCode = 200;
    res.end('This is a demo app showcasing custom middleware in Node.js.');
  } else {
    res.statusCode = 404;
    res.end('Route not found.');
  }
}

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Chama o middleware antes de processar as rotas
  middleware(req, res, () => {
    handleRoutes(req, res);
  });
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


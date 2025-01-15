const fs = require('fs');
const { Transform } = require('stream');

// Caminho do arquivo de entrada e saída
const inputFilePath = './input.txt';
const outputFilePath = './output.txt';

// Middleware para transformar os dados (exemplo: converter texto para maiúsculas)
class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // Converte o buffer para string e transforma para maiúsculas
    const upperCaseData = chunk.toString().toUpperCase();
    // Envia os dados transformados para o próximo fluxo
    callback(null, upperCaseData);
  }
}

// Função principal para demonstrar Buffer e Streams
function processFile() {
  // Cria fluxos de leitura e gravação
  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);

  // Middleware de transformação
  const uppercaseTransform = new UppercaseTransform();

  // Conecta os fluxos: Leitura -> Transformação -> Gravação
  readStream
    .pipe(uppercaseTransform)
    .pipe(writeStream)
    .on('finish', () => {
      console.log('Arquivo processado e salvo em:', outputFilePath);
    });

  // Manipula erros nos fluxos
  readStream.on('error', (err) => console.error('Erro ao ler arquivo:', err));
  writeStream.on('error', (err) => console.error('Erro ao escrever arquivo:', err));
}

// Criar um arquivo de entrada para demonstração
function createInputFile() {
  const sampleData = 'Hello, world!\nThis is a demo of Node.js Buffers and Streams.\n';
  fs.writeFileSync(inputFilePath, sampleData, { encoding: 'utf-8' });
  console.log('Arquivo de entrada criado em:', inputFilePath);
}

// Executa o exemplo
createInputFile();
processFile();


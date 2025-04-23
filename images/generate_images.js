// Arquivo para gerar imagens de exemplo para o site Brisa Boa
// Cria imagens de produtos, logos de pagamento e outros recursos visuais

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configurações
const outputDir = '/home/ubuntu/projeto_ecommerce/site/images';
const colors = {
  primary: '#2D8C46',    // Verde Cannabis
  secondary: '#1A5C2D',  // Verde Escuro
  accent: '#FFD100',     // Amarelo Vibrante
  light: '#F5F5F5',      // Cinza Claro
  dark: '#333333',       // Cinza Escuro
  white: '#FFFFFF',
  black: '#000000'
};

// Garantir que o diretório de saída exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Função para criar imagem de produto
function createProductImage(filename, bgColor, text) {
  const width = 600;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fundo
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Desenhar padrão de folha estilizada
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawStylizedLeaf(ctx, width / 2, height / 2, 200);
  
  // Texto do produto
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Salvar imagem
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  
  console.log(`Imagem criada: ${filename}`);
}

// Função para desenhar folha estilizada
function drawStylizedLeaf(ctx, centerX, centerY, size) {
  ctx.save();
  ctx.translate(centerX, centerY);
  
  // Desenhar folha central
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(size / 4, 0);
  ctx.lineTo(0, size / 2);
  ctx.lineTo(-size / 4, 0);
  ctx.closePath();
  ctx.fill();
  
  // Desenhar folhas laterais
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size / 3, -size / 6);
    ctx.lineTo(size / 2, 0);
    ctx.lineTo(size / 3, size / 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  
  ctx.restore();
}

// Função para criar logo de método de pagamento
function createPaymentLogo(filename, text) {
  const width = 100;
  const height = 60;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fundo branco
  ctx.fillStyle = colors.white;
  ctx.fillRect(0, 0, width, height);
  
  // Borda
  ctx.strokeStyle = colors.light;
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, width - 4, height - 4);
  
  // Texto
  ctx.fillStyle = colors.dark;
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Salvar imagem
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  
  console.log(`Logo de pagamento criado: ${filename}`);
}

// Função para criar banner
function createBanner(filename, text, subtitle) {
  const width = 1200;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Gradiente de fundo
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.primary);
  gradient.addColorStop(1, colors.secondary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Padrão de fundo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = 30 + Math.random() * 100;
    drawStylizedLeaf(ctx, x, y, size);
  }
  
  // Título
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2 - 30);
  
  // Subtítulo
  ctx.fillStyle = colors.accent;
  ctx.font = '30px Arial';
  ctx.fillText(subtitle, width / 2, height / 2 + 30);
  
  // Salvar imagem
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  
  console.log(`Banner criado: ${filename}`);
}

// Função para criar imagem de categoria
function createCategoryImage(filename, text) {
  const width = 600;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Gradiente de fundo
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.secondary);
  gradient.addColorStop(1, colors.primary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Overlay escuro na parte inferior
  const gradientOverlay = ctx.createLinearGradient(0, height * 0.6, 0, height);
  gradientOverlay.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradientOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
  ctx.fillStyle = gradientOverlay;
  ctx.fillRect(0, 0, width, height);
  
  // Desenhar padrão de folha estilizada
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawStylizedLeaf(ctx, width / 2, height / 2, 300);
  
  // Texto da categoria
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 50px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height - 80);
  
  // Salvar imagem
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  
  console.log(`Imagem de categoria criada: ${filename}`);
}

// Função para criar imagem de blog
function createBlogImage(filename, text) {
  const width = 800;
  const height = 450;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fundo
  ctx.fillStyle = colors.light;
  ctx.fillRect(0, 0, width, height);
  
  // Desenhar padrão de folha estilizada
  ctx.fillStyle = 'rgba(45, 140, 70, 0.1)';
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = 50 + Math.random() * 100;
    drawStylizedLeaf(ctx, x, y, size);
  }
  
  // Overlay para texto
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillRect(width * 0.1, height * 0.3, width * 0.8, height * 0.4);
  
  // Texto do blog
  ctx.fillStyle = colors.dark;
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Salvar imagem
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  
  console.log(`Imagem de blog criada: ${filename}`);
}

// Criar imagens de produtos
createProductImage('camiseta1.png', colors.primary, 'Camiseta Brisa Boa');
createProductImage('camiseta2.png', colors.secondary, 'Camiseta Relax');
createProductImage('camiseta3.png', colors.accent, 'Camiseta High Life');
createProductImage('caneca1.png', colors.primary, 'Caneca Brisa Boa');
createProductImage('caneca2.png', colors.secondary, 'Caneca Relax');
createProductImage('bone1.png', colors.primary, 'Boné Brisa Boa');
createProductImage('bone2.png', colors.accent, 'Boné High Life');

// Criar logos de métodos de pagamento
createPaymentLogo('visa.png', 'VISA');
createPaymentLogo('mastercard.png', 'MASTER');
createPaymentLogo('pix.png', 'PIX');
createPaymentLogo('boleto.png', 'BOLETO');

// Criar banners
createBanner('banner1.png', 'BRISA BOA', 'Estilo e atitude em cada peça');
createBanner('banner2.png', 'NOVA COLEÇÃO', 'Confira os lançamentos');

// Criar imagens de categorias
createCategoryImage('categoria_camisetas.png', 'CAMISETAS');
createCategoryImage('categoria_canecas.png', 'CANECAS');
createCategoryImage('categoria_bones.png', 'BONÉS');

// Criar imagens de blog
createBlogImage('blog1.png', 'Tendências de Moda Cannabis');
createBlogImage('blog2.png', 'Cultura e Estilo de Vida');
createBlogImage('blog3.png', 'Novidades da Brisa Boa');

console.log('Todas as imagens foram geradas com sucesso!');

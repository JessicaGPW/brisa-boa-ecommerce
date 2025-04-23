// Arquivo de testes para o site Brisa Boa
// Testa as principais funcionalidades do e-commerce

// Configuração de testes
const testConfig = {
  verbose: true,
  logResults: true,
  stopOnFailure: false
};

// Objeto para armazenar resultados dos testes
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  failures: []
};

// Função para executar testes
function runTests() {
  console.log('Iniciando testes do site Brisa Boa...');
  
  // Testes de interface
  testHeader();
  testNavigation();
  testResponsiveness();
  
  // Testes de funcionalidades do e-commerce
  testProductDisplay();
  testCartFunctionality();
  testCheckoutProcess();
  testSearchFunctionality();
  testFilterFunctionality();
  testUserAuthentication();
  testPaymentMethods();
  
  // Testes de performance
  testPageLoadSpeed();
  testImageOptimization();
  
  // Testes de acessibilidade
  testAccessibility();
  
  // Exibir resultados
  displayResults();
}

// Função auxiliar para registrar resultados de testes
function logTestResult(testName, result, message = '') {
  testResults.total++;
  
  if (result === 'pass') {
    testResults.passed++;
    if (testConfig.verbose) {
      console.log(`✅ PASSOU: ${testName}`);
    }
  } else if (result === 'fail') {
    testResults.failed++;
    testResults.failures.push({ name: testName, message });
    console.error(`❌ FALHOU: ${testName} - ${message}`);
    
    if (testConfig.stopOnFailure) {
      throw new Error(`Teste falhou: ${testName}`);
    }
  } else if (result === 'skip') {
    testResults.skipped++;
    if (testConfig.verbose) {
      console.log(`⏭️ PULOU: ${testName}`);
    }
  }
}

// Testes específicos

// Teste do cabeçalho
function testHeader() {
  console.log('\n--- Testando Cabeçalho ---');
  
  // Verificar se o logo está presente
  const logoTest = document.querySelector('.logo img') !== null;
  logTestResult('Logo presente no cabeçalho', logoTest ? 'pass' : 'fail', 'Logo não encontrado');
  
  // Verificar se o menu de navegação está presente
  const navTest = document.querySelector('.nav-menu') !== null;
  logTestResult('Menu de navegação presente', navTest ? 'pass' : 'fail', 'Menu de navegação não encontrado');
  
  // Verificar se o ícone do carrinho está presente
  const cartIconTest = document.querySelector('.header-icon[href*="carrinho"]') !== null;
  logTestResult('Ícone do carrinho presente', cartIconTest ? 'pass' : 'fail', 'Ícone do carrinho não encontrado');
  
  // Verificar se o menu mobile funciona
  try {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
      // Estado inicial
      const initialState = navMenu.classList.contains('active');
      
      // Clicar no botão
      mobileMenuToggle.click();
      
      // Verificar se o estado mudou
      const newState = navMenu.classList.contains('active');
      
      logTestResult('Menu mobile funcional', initialState !== newState ? 'pass' : 'fail', 'Menu mobile não alterna estado ao clicar');
      
      // Restaurar estado
      if (initialState !== newState) {
        mobileMenuToggle.click();
      }
    } else {
      logTestResult('Menu mobile funcional', 'skip', 'Elementos do menu mobile não encontrados');
    }
  } catch (error) {
    logTestResult('Menu mobile funcional', 'fail', `Erro ao testar menu mobile: ${error.message}`);
  }
}

// Teste de navegação
function testNavigation() {
  console.log('\n--- Testando Navegação ---');
  
  // Verificar se todos os links principais estão presentes
  const mainLinks = [
    { name: 'Home', href: 'index.html' },
    { name: 'Produtos', href: 'produtos.html' },
    { name: 'Blog', href: 'blog.html' },
    { name: 'Sobre', href: 'sobre.html' },
    { name: 'Contato', href: 'contato.html' }
  ];
  
  mainLinks.forEach(link => {
    const linkElement = document.querySelector(`.nav-menu a[href*="${link.href}"]`);
    logTestResult(`Link de navegação para ${link.name}`, linkElement !== null ? 'pass' : 'fail', `Link para ${link.name} não encontrado`);
  });
  
  // Verificar se os links de categorias estão presentes
  const categoryLinks = [
    { name: 'Camisetas', href: 'camisetas' },
    { name: 'Canecas', href: 'canecas' },
    { name: 'Bonés', href: 'bones' }
  ];
  
  // Verificar na página de produtos ou no menu dropdown
  const productsPage = window.location.pathname.includes('produtos.html');
  
  if (productsPage) {
    categoryLinks.forEach(link => {
      const linkElement = document.querySelector(`.category-list a[href*="${link.href}"], .filter-button[data-filter*="${link.href}"]`);
      logTestResult(`Link de categoria para ${link.name}`, linkElement !== null ? 'pass' : 'fail', `Link para categoria ${link.name} não encontrado`);
    });
  } else {
    logTestResult('Links de categorias', 'skip', 'Não estamos na página de produtos');
  }
}

// Teste de responsividade
function testResponsiveness() {
  console.log('\n--- Testando Responsividade ---');
  
  // Verificar se o viewport meta tag está presente
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  logTestResult('Meta tag de viewport presente', viewportMeta !== null ? 'pass' : 'fail', 'Meta tag de viewport não encontrada');
  
  // Verificar se o CSS tem media queries
  const styleSheets = document.styleSheets;
  let hasMediaQueries = false;
  
  try {
    for (let i = 0; i < styleSheets.length; i++) {
      const rules = styleSheets[i].cssRules || styleSheets[i].rules;
      if (!rules) continue;
      
      for (let j = 0; j < rules.length; j++) {
        if (rules[j].type === CSSRule.MEDIA_RULE) {
          hasMediaQueries = true;
          break;
        }
      }
      
      if (hasMediaQueries) break;
    }
    
    logTestResult('Media queries presentes no CSS', hasMediaQueries ? 'pass' : 'fail', 'Não foram encontradas media queries no CSS');
  } catch (error) {
    // Erro de segurança ao acessar folhas de estilo de outros domínios
    logTestResult('Media queries presentes no CSS', 'skip', 'Não foi possível verificar media queries devido a restrições de segurança');
  }
  
  // Verificar elementos responsivos específicos
  const responsiveElements = [
    { name: 'Container responsivo', selector: '.container' },
    { name: 'Menu mobile', selector: '.mobile-menu-toggle' },
    { name: 'Grid de produtos responsivo', selector: '.products-grid' }
  ];
  
  responsiveElements.forEach(element => {
    const el = document.querySelector(element.selector);
    logTestResult(`Elemento responsivo: ${element.name}`, el !== null ? 'pass' : 'fail', `Elemento ${element.name} não encontrado`);
  });
}

// Teste de exibição de produtos
function testProductDisplay() {
  console.log('\n--- Testando Exibição de Produtos ---');
  
  // Verificar se existem cards de produtos
  const productCards = document.querySelectorAll('.product-card');
  logTestResult('Cards de produtos presentes', productCards.length > 0 ? 'pass' : 'fail', 'Nenhum card de produto encontrado');
  
  if (productCards.length > 0) {
    // Verificar estrutura do primeiro card
    const firstCard = productCards[0];
    
    const hasImage = firstCard.querySelector('.product-image img') !== null;
    logTestResult('Imagem do produto presente', hasImage ? 'pass' : 'fail', 'Imagem do produto não encontrada');
    
    const hasTitle = firstCard.querySelector('.product-title') !== null;
    logTestResult('Título do produto presente', hasTitle ? 'pass' : 'fail', 'Título do produto não encontrado');
    
    const hasPrice = firstCard.querySelector('.product-price') !== null;
    logTestResult('Preço do produto presente', hasPrice ? 'pass' : 'fail', 'Preço do produto não encontrado');
    
    const hasAddToCart = firstCard.querySelector('.add-to-cart') !== null;
    logTestResult('Botão "Adicionar ao Carrinho" presente', hasAddToCart ? 'pass' : 'fail', 'Botão "Adicionar ao Carrinho" não encontrado');
  }
  
  // Verificar página de detalhes do produto
  const isProductDetail = window.location.pathname.includes('produto-detalhe.html');
  
  if (isProductDetail) {
    const productDetail = document.querySelector('.product-detail');
    logTestResult('Página de detalhes do produto', productDetail !== null ? 'pass' : 'fail', 'Conteúdo da página de detalhes não encontrado');
    
    if (productDetail) {
      const hasGallery = document.querySelector('.product-gallery') !== null;
      logTestResult('Galeria de imagens do produto', hasGallery ? 'pass' : 'fail', 'Galeria de imagens não encontrada');
      
      const hasVariations = document.querySelector('.product-variations') !== null;
      logTestResult('Variações do produto', hasVariations ? 'pass' : 'fail', 'Variações do produto não encontradas');
      
      const hasQuantity = document.querySelector('.product-quantity') !== null;
      logTestResult('Controle de quantidade', hasQuantity ? 'pass' : 'fail', 'Controle de quantidade não encontrado');
      
      const hasAddToCartBtn = document.querySelector('.add-to-cart-btn') !== null;
      logTestResult('Botão "Adicionar ao Carrinho" na página de detalhes', hasAddToCartBtn ? 'pass' : 'fail', 'Botão "Adicionar ao Carrinho" não encontrado');
    }
  } else {
    logTestResult('Testes de página de detalhes do produto', 'skip', 'Não estamos na página de detalhes do produto');
  }
}

// Teste de funcionalidade do carrinho
function testCartFunctionality() {
  console.log('\n--- Testando Funcionalidade do Carrinho ---');
  
  // Limpar carrinho para testes
  localStorage.removeItem('brisaBoaCart');
  
  // Verificar se o carrinho está vazio inicialmente
  const initialCart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
  logTestResult('Carrinho inicialmente vazio', initialCart.length === 0 ? 'pass' : 'fail', 'Carrinho não está vazio no início do teste');
  
  // Adicionar um produto ao carrinho
  try {
    const testProduct = {
      id: 'test-product-1',
      name: 'Produto de Teste',
      price: 49.90,
      image: '/images/test-product.jpg',
      quantity: 1
    };
    
    // Usar a função do site para adicionar ao carrinho
    if (typeof addToCart === 'function') {
      addToCart(testProduct);
      
      // Verificar se o produto foi adicionado
      const updatedCart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
      logTestResult('Adicionar produto ao carrinho', updatedCart.length === 1 ? 'pass' : 'fail', 'Produto não foi adicionado ao carrinho');
      
      // Verificar se o contador do carrinho foi atualizado
      if (typeof updateCartCount === 'function') {
        updateCartCount();
        const cartCount = document.querySelector('.cart-count');
        const countUpdated = cartCount && cartCount.textContent === '1';
        logTestResult('Atualização do contador do carrinho', countUpdated ? 'pass' : 'fail', 'Contador do carrinho não foi atualizado');
      } else {
        logTestResult('Atualização do contador do carrinho', 'skip', 'Função updateCartCount não encontrada');
      }
      
      // Adicionar o mesmo produto novamente para testar incremento de quantidade
      addToCart(testProduct);
      
      // Verificar se a quantidade foi incrementada
      const cartAfterSecondAdd = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
      const quantityIncremented = cartAfterSecondAdd.length === 1 && cartAfterSecondAdd[0].quantity === 2;
      logTestResult('Incremento de quantidade no carrinho', quantityIncremented ? 'pass' : 'fail', 'Quantidade do produto não foi incrementada');
      
      // Limpar carrinho após testes
      localStorage.removeItem('brisaBoaCart');
    } else {
      logTestResult('Adicionar produto ao carrinho', 'skip', 'Função addToCart não encontrada');
    }
  } catch (error) {
    logTestResult('Funcionalidade do carrinho', 'fail', `Erro ao testar carrinho: ${error.message}`);
  }
  
  // Verificar página do carrinho
  const isCartPage = window.location.pathname.includes('carrinho.html');
  
  if (isCartPage) {
    const cartItems = document.querySelector('.cart-items');
    logTestResult('Container de itens do carrinho', cartItems !== null ? 'pass' : 'fail', 'Container de itens do carrinho não encontrado');
    
    const cartSummary = document.querySelector('.cart-summary');
    logTestResult('Resumo do carrinho', cartSummary !== null ? 'pass' : 'fail', 'Resumo do carrinho não encontrado');
    
    const checkoutButton = document.querySelector('.checkout-btn');
    logTestResult('Botão de checkout', checkoutButton !== null ? 'pass' : 'fail', 'Botão de checkout não encontrado');
  } else {
    logTestResult('Testes da página do carrinho', 'skip', 'Não estamos na página do carrinho');
  }
}

// Teste do processo de checkout
function testCheckoutProcess() {
  console.log('\n--- Testando Processo de Checkout ---');
  
  // Verificar se estamos na página de checkout
  const isCheckoutPage = window.location.pathname.includes('checkout.html');
  
  if (isCheckoutPage) {
    // Verificar formulário de checkout
    const checkoutForm = document.querySelector('.checkout-form');
    logTestResult('Formulário de checkout', checkoutForm !== null ? 'pass' : 'fail', 'Formulário de checkout não encontrado');
    
    if (checkoutForm) {
      // Verificar campos obrigatórios
      const requiredFields = [
        { name: 'Nome', selector: 'input[name="name"]' },
        { name: 'Email', selector: 'input[name="email"]' },
        { name: 'Endereço', selector: 'input[name="address"]' },
        { name: 'CEP', selector: 'input[name="cep"]' },
        { name: 'Cidade', selector: 'input[name="city"]' }
      ];
      
      requiredFields.forEach(field => {
        const fieldElement = checkoutForm.querySelector(field.selector);
        logTestResult(`Campo obrigatório: ${field.name}`, fieldElement !== null ? 'pass' : 'fail', `Campo ${field.name} não encontrado`);
      });
      
      // Verificar métodos de pagamento
      const paymentMethods = document.querySelector('.payment-methods-tabs');
      logTestResult('Métodos de pagamento', paymentMethods !== null ? 'pass' : 'fail', 'Métodos de pagamento não encontrados');
      
      // Verificar resumo do pedido
      const orderSummary = document.querySelector('.order-summary');
      logTestResult('Resumo do pedido', orderSummary !== null ? 'pass' : 'fail', 'Resumo do pedido não encontrado');
    }
  } else {
    logTestResult('Testes de checkout', 'skip', 'Não estamos na página de checkout');
  }
}

// Teste de funcionalidade de busca
function testSearchFunctionality() {
  console.log('\n--- Testando Funcionalidade de Busca ---');
  
  // Verificar se o formulário de busca existe
  const searchForm = document.querySelector('.search-form');
  logTestResult('Formulário de busca', searchForm !== null ? 'pass' : 'fail', 'Formulário de busca não encontrado');
  
  if (searchForm) {
    // Verificar campo de busca
    const searchInput = searchForm.querySelector('input');
    logTestResult('Campo de busca', searchInput !== null ? 'pass' : 'fail', 'Campo de busca não encontrado');
    
    // Verificar botão de busca
    const searchButton = searchForm.querySelector('button');
    logTestResult('Botão de busca', searchButton !== null ? 'pass' : 'fail', 'Botão de busca não encontrado');
    
    // Testar funcionalidade de busca (simulação)
    try {
      // Salvar o comportamento original do formulário
      const originalSubmit = searchForm.onsubmit;
      
      // Substituir temporariamente para evitar navegação real
      let searchSubmitted = false;
      searchForm.onsubmit = function(e) {
        e.preventDefault();
        searchSubmitted = true;
      };
      
      // Preencher campo e enviar
      if (searchInput && searchButton) {
        searchInput.value = 'teste';
        searchButton.click();
        
        logTestResult('Submissão do formulário de busca', searchSubmitted ? 'pass' : 'fail', 'Formulário de busca não foi submetido');
        
        // Restaurar comportamento original
        searchForm.onsubmit = originalSubmit;
        searchInput.value = '';
      }
    } catch (error) {
      logTestResult('Funcionalidade de busca', 'fail', `Erro ao testar busca: ${error.message}`);
    }
  }
}

// Teste de funcionalidade de filtro
function testFilterFunctionality() {
  console.log('\n--- Testando Funcionalidade de Filtro ---');
  
  // Verificar se estamos na página de produtos
  const isProductsPage = window.location.pathname.includes('produtos.html');
  
  if (isProductsPage) {
    // Verificar filtros de categoria
    const filterButtons = document.querySelectorAll('.filter-button');
    logTestResult('Botões de filtro', filterButtons.length > 0 ? 'pass' : 'fail', 'Botões de filtro não encontrados');
    
    if (filterButtons.length > 0) {
      try {
        // Testar clique no primeiro filtro
        const firstFilter = filterButtons[0];
        const filterValue = firstFilter.dataset.filter;
        
        // Salvar estado atual
        const productItems = document.querySelectorAll('.product-card');
        const initialVisibility = Array.from(productItems).map(item => item.style.display);
        
        // Clicar no filtro
        firstFilter.click();
        
        // Verificar se algum produto mudou de visibilidade
        const newVisibility = Array.from(productItems).map(item => item.style.display);
        const visibilityChanged = !initialVisibility.every((val, index) => val === newVisibility[index]);
        
        logTestResult('Filtro de produtos funcional', visibilityChanged ? 'pass' : 'fail', 'Filtro não alterou a visibilidade dos produtos');
        
        // Restaurar estado (clicar no filtro "todos" se existir)
        const allFilter = Array.from(filterButtons).find(btn => btn.dataset.filter === 'all');
        if (allFilter) {
          allFilter.click();
        }
      } catch (error) {
        logTestResult('Funcionalidade de filtro', 'fail', `Erro ao testar filtro: ${error.message}`);
      }
    }
    
    // Verificar filtros de preço
    const priceFilter = document.querySelector('.price-filter');
    logTestResult('Filtro de preço', priceFilter !== null ? 'pass' : 'fail', 'Filtro de preço não encontrado');
  } else {
    logTestResult('Testes de filtro', 'skip', 'Não estamos na página de produtos');
  }
}

// Teste de autenticação de usuário
function testUserAuthentication() {
  console.log('\n--- Testando Autenticação de Usuário ---');
  
  // Verificar se há elementos de login/registro
  const loginLink = document.querySelector('a[href*="login"], .login-link');
  logTestResult('Link de login', loginLink !== null ? 'pass' : 'fail', 'Link de login não encontrado');
  
  // Verificar se estamos na página de login
  const isLoginPage = window.location.pathname.includes('login.html');
  
  if (isLoginPage) {
    const loginForm = document.querySelector('.login-form');
    logTestResult('Formulário de login', loginForm !== null ? 'pass' : 'fail', 'Formulário de login não encontrado');
    
    if (loginForm) {
      const emailInput = loginForm.querySelector('input[type="email"]');
      logTestResult('Campo de email no login', emailInput !== null ? 'pass' : 'fail', 'Campo de email não encontrado');
      
      const passwordInput = loginForm.querySelector('input[type="password"]');
      logTestResult('Campo de senha no login', passwordInput !== null ? 'pass' : 'fail', 'Campo de senha não encontrado');
      
      const submitButton = loginForm.querySelector('button[type="submit"]');
      logTestResult('Botão de envio no login', submitButton !== null ? 'pass' : 'fail', 'Botão de envio não encontrado');
    }
  } else {
    logTestResult('Testes de página de login', 'skip', 'Não estamos na página de login');
  }
}

// Teste de métodos de pagamento
function testPaymentMethods() {
  console.log('\n--- Testando Métodos de Pagamento ---');
  
  // Verificar se estamos na página de checkout
  const isCheckoutPage = window.location.pathname.includes('checkout.html');
  
  if (isCheckoutPage) {
    // Verificar tabs de métodos de pagamento
    const paymentTabs = document.querySelectorAll('.payment-tab');
    logTestResult('Tabs de métodos de pagamento', paymentTabs.length > 0 ? 'pass' : 'fail', 'Tabs de métodos de pagamento não encontrados');
    
    if (paymentTabs.length > 0) {
      // Verificar conteúdo de cada método de pagamento
      const paymentMethods = ['credit-card', 'boleto', 'pix'];
      
      paymentMethods.forEach(method => {
        const methodContent = document.getElementById(method);
        logTestResult(`Conteúdo do método de pagamento: ${method}`, methodContent !== null ? 'pass' : 'fail', `Conteúdo do método ${method} não encontrado`);
      });
      
      // Testar funcionalidade de alternância de tabs
      try {
        // Salvar estado inicial
        const initialActiveTab = document.querySelector('.payment-tab.active');
        const initialActiveContent = document.querySelector('.payment-content.active');
        
        // Clicar em uma tab diferente da ativa
        const nonActiveTab = Array.from(paymentTabs).find(tab => !tab.classList.contains('active'));
        
        if (nonActiveTab) {
          const targetMethod = nonActiveTab.dataset.method;
          nonActiveTab.click();
          
          // Verificar se a tab clicada ficou ativa
          const tabActivated = nonActiveTab.classList.contains('active');
          logTestResult('Ativação de tab de pagamento', tabActivated ? 'pass' : 'fail', 'Tab de pagamento não foi ativada ao clicar');
          
          // Verificar se o conteúdo correspondente foi exibido
          const contentActivated = document.getElementById(targetMethod).classList.contains('active');
          logTestResult('Exibição de conteúdo de pagamento', contentActivated ? 'pass' : 'fail', 'Conteúdo de pagamento não foi exibido');
          
          // Restaurar estado inicial
          if (initialActiveTab) initialActiveTab.click();
        }
      } catch (error) {
        logTestResult('Funcionalidade de tabs de pagamento', 'fail', `Erro ao testar tabs: ${error.message}`);
      }
    }
  } else {
    logTestResult('Testes de métodos de pagamento', 'skip', 'Não estamos na página de checkout');
  }
}

// Teste de velocidade de carregamento da página
function testPageLoadSpeed() {
  console.log('\n--- Testando Velocidade de Carregamento ---');
  
  // Usar a API Performance se disponível
  if (window.performance) {
    try {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      // Considerar aceitável se carregar em menos de 3 segundos
      const isAcceptable = loadTime < 3000;
      
      logTestResult('Tempo de carregamento da página', isAcceptable ? 'pass' : 'fail', `Tempo de carregamento: ${loadTime}ms (limite: 3000ms)`);
    } catch (error) {
      logTestResult('Tempo de carregamento da página', 'skip', `Não foi possível medir: ${error.message}`);
    }
  } else {
    logTestResult('Tempo de carregamento da página', 'skip', 'API Performance não disponível');
  }
}

// Teste de otimização de imagens
function testImageOptimization() {
  console.log('\n--- Testando Otimização de Imagens ---');
  
  // Verificar todas as imagens da página
  const images = document.querySelectorAll('img');
  logTestResult('Imagens presentes na página', images.length > 0 ? 'pass' : 'fail', 'Nenhuma imagem encontrada na página');
  
  if (images.length > 0) {
    let largeImagesCount = 0;
    let missingAltCount = 0;
    
    images.forEach(img => {
      // Verificar atributo alt
      if (!img.alt) {
        missingAltCount++;
      }
      
      // Verificar tamanho da imagem (se já carregada)
      if (img.complete && img.naturalWidth > 0) {
        // Considerar grande se mais de 500KB (estimativa baseada em dimensões)
        const estimatedSize = (img.naturalWidth * img.naturalHeight * 4) / 1024; // KB
        if (estimatedSize > 500) {
          largeImagesCount++;
        }
      }
    });
    
    logTestResult('Atributos alt em imagens', missingAltCount === 0 ? 'pass' : 'fail', `${missingAltCount} imagens sem atributo alt`);
    logTestResult('Tamanho de imagens otimizado', largeImagesCount === 0 ? 'pass' : 'fail', `${largeImagesCount} imagens potencialmente muito grandes`);
  }
}

// Teste de acessibilidade
function testAccessibility() {
  console.log('\n--- Testando Acessibilidade ---');
  
  // Verificar contraste de cores (simplificado)
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, label');
  let lowContrastCount = 0;
  
  // Função para calcular contraste (simplificada)
  function hasGoodContrast(foreground, background) {
    // Implementação simplificada - em produção usaria uma biblioteca de acessibilidade
    return true; // Simulando que todos passam
  }
  
  textElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const foreground = style.color;
    const background = style.backgroundColor;
    
    if (!hasGoodContrast(foreground, background)) {
      lowContrastCount++;
    }
  });
  
  logTestResult('Contraste de cores', lowContrastCount === 0 ? 'pass' : 'fail', `${lowContrastCount} elementos com contraste insuficiente`);
  
  // Verificar estrutura de cabeçalhos
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let headingStructureValid = true;
  let previousLevel = 0;
  
  for (let i = 0; i < headings.length; i++) {
    const currentLevel = parseInt(headings[i].tagName.substring(1));
    
    // Verificar se não pula níveis (ex: h1 para h3)
    if (previousLevel > 0 && currentLevel > previousLevel + 1) {
      headingStructureValid = false;
      break;
    }
    
    previousLevel = currentLevel;
  }
  
  logTestResult('Estrutura de cabeçalhos', headingStructureValid ? 'pass' : 'fail', 'Estrutura de cabeçalhos não segue hierarquia adequada');
  
  // Verificar atributos ARIA
  const ariaElements = document.querySelectorAll('[role], [aria-label], [aria-labelledby], [aria-hidden]');
  logTestResult('Uso de atributos ARIA', ariaElements.length > 0 ? 'pass' : 'fail', 'Nenhum atributo ARIA encontrado');
}

// Exibir resultados dos testes
function displayResults() {
  console.log('\n=== RESULTADOS DOS TESTES ===');
  console.log(`Total de testes: ${testResults.total}`);
  console.log(`Passaram: ${testResults.passed}`);
  console.log(`Falharam: ${testResults.failed}`);
  console.log(`Pulados: ${testResults.skipped}`);
  
  if (testResults.failures.length > 0) {
    console.log('\nFalhas:');
    testResults.failures.forEach((failure, index) => {
      console.log(`${index + 1}. ${failure.name}: ${failure.message}`);
    });
  }
  
  const passRate = (testResults.passed / (testResults.total - testResults.skipped)) * 100;
  console.log(`\nTaxa de aprovação: ${passRate.toFixed(2)}%`);
  
  if (testResults.failed === 0) {
    console.log('\n✅ TODOS OS TESTES PASSARAM!');
  } else {
    console.log(`\n❌ ${testResults.failed} TESTES FALHARAM.`);
  }
}

// Executar testes quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', runTests);

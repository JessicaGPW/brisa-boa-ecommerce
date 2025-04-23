// Arquivo principal de JavaScript para o site Brisa Boa
// Implementa funcionalidades dinâmicas do e-commerce

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar menu mobile
    initMobileMenu();
    
    // Inicializar contador do carrinho
    updateCartCount();
    
    // Inicializar funcionalidades específicas de cada página
    initPageSpecificFunctions();
    
    // Inicializar formulário de newsletter
    initNewsletterForm();
});

// Função para inicializar o menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (cartCountElements.length === 0) return;
    
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Atualizar todos os elementos de contagem do carrinho
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
        
        // Mostrar ou esconder o contador baseado na quantidade
        if (itemCount > 0) {
            element.classList.add('has-items');
        } else {
            element.classList.remove('has-items');
        }
    });
}

// Função para inicializar funcionalidades específicas de cada página
function initPageSpecificFunctions() {
    // Identificar a página atual
    const currentPath = window.location.pathname;
    
    // Página de produtos
    if (currentPath.includes('produtos.html') || currentPath.includes('camisetas.html') || 
        currentPath.includes('canecas.html') || currentPath.includes('bones.html')) {
        initProductsPage();
    }
    
    // Página de detalhes do produto
    if (currentPath.includes('produto-detalhe.html')) {
        initProductDetailPage();
    }
    
    // Página de carrinho
    if (currentPath.includes('carrinho.html')) {
        initCartPage();
    }
    
    // Página de checkout
    if (currentPath.includes('checkout.html')) {
        initCheckoutPage();
    }
    
    // Página de blog
    if (currentPath.includes('blog.html')) {
        initBlogPage();
    }
    
    // Página de contato
    if (currentPath.includes('contato.html')) {
        initContactPage();
    }
}

// Função para inicializar a página de produtos
function initProductsPage() {
    // Adicionar event listeners para botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter informações do produto
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('R$', '').trim());
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Adicionar ao carrinho
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            // Mostrar mensagem de sucesso
            showNotification('Produto adicionado ao carrinho!');
        });
    });
    
    // Inicializar filtros de produtos
    initProductFilters();
}

// Função para inicializar filtros de produtos
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const productItems = document.querySelectorAll('.product-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Obter categoria do filtro
            const filterValue = this.dataset.filter;
            
            // Filtrar produtos
            productItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.dataset.category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Função para inicializar a página de detalhes do produto
function initProductDetailPage() {
    // Inicializar galeria de imagens
    initProductGallery();
    
    // Inicializar seleção de variações
    initProductVariations();
    
    // Adicionar event listener para botão "Adicionar ao Carrinho"
    const addToCartButton = document.querySelector('.add-to-cart-btn');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter informações do produto
            const productId = this.dataset.productId;
            const productName = document.querySelector('.product-title').textContent;
            const productPrice = parseFloat(document.querySelector('.product-price').textContent.replace('R$', '').trim());
            const productImage = document.querySelector('.product-main-image img').src;
            
            // Obter quantidade selecionada
            const quantityInput = document.querySelector('.quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            // Obter variação selecionada (se houver)
            const variationSelect = document.querySelector('.product-variation-select');
            const variation = variationSelect ? variationSelect.value : null;
            
            // Adicionar ao carrinho
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity,
                variation: variation
            });
            
            // Mostrar mensagem de sucesso
            showNotification('Produto adicionado ao carrinho!');
        });
    }
    
    // Inicializar controles de quantidade
    initQuantityControls();
}

// Função para inicializar galeria de imagens do produto
function initProductGallery() {
    const mainImage = document.querySelector('.product-main-image img');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Atualizar imagem principal
            const newImageSrc = this.querySelector('img').dataset.fullsize;
            mainImage.src = newImageSrc;
            
            // Atualizar classe active
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Função para inicializar seleção de variações do produto
function initProductVariations() {
    const variationSelect = document.querySelector('.product-variation-select');
    const priceElement = document.querySelector('.product-price');
    
    if (!variationSelect || !priceElement) return;
    
    variationSelect.addEventListener('change', function() {
        // Obter preço da variação selecionada
        const selectedOption = this.options[this.selectedIndex];
        const variationPrice = selectedOption.dataset.price;
        
        // Atualizar preço exibido
        if (variationPrice) {
            priceElement.textContent = `R$ ${variationPrice}`;
        }
    });
}

// Função para inicializar controles de quantidade
function initQuantityControls() {
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        }
    });
}

// Função para inicializar a página de carrinho
function initCartPage() {
    // Renderizar itens do carrinho
    renderCartItems();
    
    // Adicionar event listener para botão "Atualizar Carrinho"
    const updateCartButton = document.querySelector('.update-cart-btn');
    
    if (updateCartButton) {
        updateCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Atualizar quantidades
            updateCartQuantities();
            
            // Mostrar mensagem de sucesso
            showNotification('Carrinho atualizado com sucesso!');
        });
    }
    
    // Adicionar event listener para botão "Limpar Carrinho"
    const clearCartButton = document.querySelector('.clear-cart-btn');
    
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Limpar carrinho
            clearCart();
            
            // Mostrar mensagem de sucesso
            showNotification('Carrinho esvaziado com sucesso!');
            
            // Renderizar carrinho vazio
            renderCartItems();
        });
    }
    
    // Inicializar cálculo de frete
    initShippingCalculator();
}

// Função para renderizar itens do carrinho
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos ao seu carrinho para continuar comprando.</p>
                <a href="produtos.html" class="btn">Ver Produtos</a>
            </div>
        `;
        
        // Esconder elementos relacionados ao carrinho
        const cartSummary = document.querySelector('.cart-summary');
        const cartActions = document.querySelector('.cart-actions');
        
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        
        return;
    }
    
    // Mostrar elementos relacionados ao carrinho
    const cartSummary = document.querySelector('.cart-summary');
    const cartActions = document.querySelector('.cart-actions');
    
    if (cartSummary) cartSummary.style.display = 'block';
    if (cartActions) cartActions.style.display = 'flex';
    
    // Renderizar cada item
    let cartHTML = '';
    
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    ${item.variation ? `<p class="cart-item-variation">${item.variation}</p>` : ''}
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <div class="quantity-control">
                        <button class="quantity-decrease" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-increase" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item-subtotal">
                    R$ ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div class="cart-item-remove">
                    <button class="remove-item-btn" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    
    // Adicionar event listeners para botões de quantidade
    const decreaseButtons = document.querySelectorAll('.quantity-decrease');
    const increaseButtons = document.querySelectorAll('.quantity-increase');
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            if (value > 1) {
                input.value = value - 1;
                updateCartItemSubtotal(index, input.value);
            }
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            input.value = value + 1;
            updateCartItemSubtotal(index, input.value);
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const index = this.dataset.index;
            let value = parseInt(this.value);
            
            if (isNaN(value) || value < 1) {
                this.value = 1;
                value = 1;
            }
            
            updateCartItemSubtotal(index, value);
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            removeCartItem(index);
            renderCartItems();
            updateCartCount();
            updateCartSummary();
            
            // Mostrar mensagem de sucesso
            showNotification('Item removido do carrinho!');
        });
    });
    
    // Atualizar resumo do carrinho
    updateCartSummary();
}

// Função para atualizar o subtotal de um item do carrinho
function updateCartItemSubtotal(index, quantity) {
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    // Atualizar subtotal no DOM
    const subtotalElement = document.querySelector(`.cart-item[data-index="${index}"] .cart-item-subtotal`);
    const subtotal = cart[index].price * quantity;
    
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    }
}

// Função para atualizar quantidades do carrinho
function updateCartQuantities() {
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    // Obter inputs de quantidade
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-input');
    
    // Atualizar quantidades
    quantityInputs.forEach(input => {
        const index = input.dataset.index;
        const quantity = parseInt(input.value);
        
        if (!isNaN(quantity) && quantity > 0 && index < cart.length) {
            cart[index].quantity = quantity;
        }
    });
    
    // Salvar carrinho atualizado
    localStorage.setItem('brisaBoaCart', JSON.stringify(cart));
    
    // Atualizar contador do carrinho
    updateCartCount();
    
    // Atualizar resumo do carrinho
    updateCartSummary();
}

// Função para remover item do carrinho
function removeCartItem(index) {
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    // Remover item
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
    }
    
    // Salvar carrinho atualizado
    localStorage.setItem('brisaBoaCart', JSON.stringify(cart));
}

// Função para limpar o carrinho
function clearCart() {
    // Limpar carrinho no localStorage
    localStorage.removeItem('brisaBoaCart');
    
    // Atualizar contador do carrinho
    updateCartCount();
}

// Função para atualizar o resumo do carrinho
function updateCartSummary() {
    const subtotalElement = document.querySelector('.cart-subtotal-value');
    const shippingElement = document.querySelector('.cart-shipping-value');
    const discountElement = document.querySelector('.cart-discount-value');
    const totalElement = document.querySelector('.cart-total-value');
    
    if (!subtotalElement || !totalElement) return;
    
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    // Calcular subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Obter valores de frete e desconto
    const shipping = shippingElement ? parseFloat(shippingElement.dataset.value || 0) : 0;
    const discount = discountElement ? parseFloat(discountElement.dataset.value || 0) : 0;
    
    // Calcular total
    const total = subtotal + shipping - discount;
    
    // Atualizar elementos
    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `R$ ${shipping.toFixed(2)}`;
    if (discountElement) discountElement.textContent = `R$ ${discount.toFixed(2)}`;
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para inicializar calculadora de frete
function initShippingCalculator() {
    const shippingForm = document.querySelector('.shipping-calculator-form');
    
    if (!shippingForm) return;
    
    shippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cepInput = this.querySelector('input[name="cep"]');
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            showNotification('Por favor, insira um CEP válido.', 'error');
            return;
        }
        
        // Simular cálculo de frete (em produção, isso seria uma chamada AJAX)
        const shippingOptions = [
            { name: 'PAC', price: 15.90, days: '5-8 dias úteis' },
            { name: 'SEDEX', price: 25.50, days: '1-3 dias úteis' }
        ];
        
        // Renderizar opções de frete
        renderShippingOptions(shippingOptions);
    });
}

// Função para renderizar opções de frete
function renderShippingOptions(options) {
    const shippingOptionsContainer = document.querySelector('.shipping-options');
    
    if (!shippingOptionsContainer) return;
    
    let optionsHTML = '';
    
    options.forEach((option, index) => {
        optionsHTML += `
            <div class="shipping-option">
                <label>
                    <input type="radio" name="shipping" value="${option.price}" ${index === 0 ? 'checked' : ''}>
                    <div class="shipping-option-details">
                        <span class="shipping-name">${option.name}</span>
                        <span class="shipping-price">R$ ${option.price.toFixed(2)}</span>
                        <span class="shipping-days">${option.days}</span>
                    </div>
                </label>
            </div>
        `;
    });
    
    shippingOptionsContainer.innerHTML = optionsHTML;
    
    // Adicionar event listeners para opções de frete
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Atualizar valor do frete
            const shippingElement = document.querySelector('.cart-shipping-value');
            
            if (shippingElement) {
                const shippingValue = parseFloat(this.value);
                shippingElement.textContent = `R$ ${shippingValue.toFixed(2)}`;
                shippingElement.dataset.value = shippingValue;
                
                // Atualizar total
                updateCartSummary();
            }
        });
    });
    
    // Selecionar primeira opção por padrão
    if (shippingRadios.length > 0) {
        const firstOption = shippingRadios[0];
        const shippingElement = document.querySelector('.cart-shipping-value');
        
        if (shippingElement) {
            const shippingValue = parseFloat(firstOption.value);
            shippingElement.textContent = `R$ ${shippingValue.toFixed(2)}`;
            shippingElement.dataset.value = shippingValue;
            
            // Atualizar total
            updateCartSummary();
        }
    }
}

// Função para inicializar a página de checkout
function initCheckoutPage() {
    // Renderizar itens do pedido
    renderOrderItems();
    
    // Inicializar tabs de pagamento
    initPaymentTabs();
    
    // Inicializar busca de CEP
    initCepSearch();
    
    // Inicializar formulário de checkout
    initCheckoutForm();
}

// Função para renderizar itens do pedido
function renderOrderItems() {
    const orderItemsContainer = document.querySelector('.order-items');
    if (!orderItemsContainer) return;
    
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
        return;
    }
    
    // Renderizar cada item
    let orderHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        orderHTML += `
            <div class="order-item">
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.variation ? item.variation : ''}</p>
                    <p>Quantidade: ${item.quantity}</p>
                </div>
                <div class="order-item-price">
                    <p>R$ ${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    
    orderItemsContainer.innerHTML = orderHTML;
    
    // Atualizar subtotal
    const subtotalElement = document.querySelector('.order-subtotal-value');
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    }
    
    // Atualizar total
    updateOrderTotal();
}

// Função para atualizar o total do pedido
function updateOrderTotal() {
    const subtotalElement = document.querySelector('.order-subtotal-value');
    const shippingElement = document.querySelector('.order-shipping-value');
    const discountElement = document.querySelector('.order-discount-value');
    const totalElement = document.querySelector('.order-total-value');
    
    if (!subtotalElement || !totalElement) return;
    
    // Obter valores
    const subtotal = parseFloat(subtotalElement.textContent.replace('R$', '').trim());
    const shipping = shippingElement ? parseFloat(shippingElement.textContent.replace('R$', '').trim()) || 0 : 0;
    const discount = discountElement ? parseFloat(discountElement.textContent.replace('R$', '').trim()) || 0 : 0;
    
    // Calcular total
    const total = subtotal + shipping - discount;
    
    // Atualizar elemento
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para inicializar tabs de pagamento
function initPaymentTabs() {
    const paymentTabs = document.querySelectorAll('.payment-tab');
    const paymentContents = document.querySelectorAll('.payment-content');
    
    paymentTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover classe active de todas as tabs
            paymentTabs.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active na tab clicada
            this.classList.add('active');
            
            // Esconder todos os conteúdos
            paymentContents.forEach(content => content.classList.remove('active'));
            
            // Mostrar conteúdo correspondente
            const method = this.dataset.method;
            document.getElementById(method).classList.add('active');
        });
    });
}

// Função para inicializar busca de CEP
function initCepSearch() {
    const cepButton = document.getElementById('buscar-cep');
    if (!cepButton) return;
    
    cepButton.addEventListener('click', function() {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            showNotification('Por favor, insira um CEP válido.', 'error');
            return;
        }
        
        // Simular busca de CEP (em produção, isso seria uma chamada AJAX)
        setTimeout(() => {
            document.getElementById('street').value = 'Rua Exemplo';
            document.getElementById('neighborhood').value = 'Bairro Exemplo';
            document.getElementById('city').value = 'São Paulo';
            document.getElementById('state').value = 'SP';
            
            // Focar no campo número
            document.getElementById('number').focus();
        }, 1000);
    });
}

// Função para inicializar formulário de checkout
function initCheckoutForm() {
    const checkoutForm = document.querySelector('.checkout-form');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular processamento do pedido
        showNotification('Pedido finalizado com sucesso! Você será redirecionado para a página de confirmação.');
        
        // Limpar carrinho
        localStorage.removeItem('brisaBoaCart');
        
        // Redirecionar para página de confirmação (em produção)
        // window.location.href = 'confirmacao.html';
    });
}

// Função para inicializar a página de blog
function initBlogPage() {
    // Inicializar busca no blog
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm.length === 0) {
                showNotification('Por favor, insira um termo de busca.', 'error');
                return;
            }
            
            // Simular busca (em produção, isso seria uma chamada AJAX)
            showNotification(`Buscando por "${searchTerm}"...`);
        });
    }
}

// Função para inicializar a página de contato
function initContactPage() {
    // Inicializar FAQ
    initFAQ();
    
    // Inicializar formulário de contato
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
}

// Função para inicializar FAQ
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

// Função para inicializar formulário de newsletter
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email.length === 0) {
                showNotification('Por favor, insira seu e-mail.', 'error');
                return;
            }
            
            // Simular inscrição na newsletter
            showNotification('Inscrição realizada com sucesso! Obrigado por se inscrever em nossa newsletter.');
            this.reset();
        });
    }
}

// Função para adicionar produto ao carrinho
function addToCart(product) {
    // Obter carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('brisaBoaCart')) || [];
    
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        (product.variation ? item.variation === product.variation : true)
    );
    
    if (existingItemIndex !== -1) {
        // Atualizar quantidade
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Adicionar novo item
        cart.push(product);
    }
    
    // Salvar carrinho atualizado
    localStorage.setItem('brisaBoaCart', JSON.stringify(cart));
    
    // Atualizar contador do carrinho
    updateCartCount();
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Adicionar classe para mostrar com animação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Adicionar event listener para fechar
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

# Brisa Boa · E-commerce 🌿

Site de e-commerce da marca **Brisa Boa** (camisetas, canecas e bonés com temática da cultura cannabis), feito com **HTML, CSS e JavaScript puro**, sem frameworks.

> **EN:** Vanilla JS e-commerce front-end for a merchandise brand: product catalog with filters, cart, shipping calculator, checkout with ZIP-code lookup, blog and contact pages, plus a custom browser test suite.

## Funcionalidades

- **Catálogo** com filtros (tamanho, cor, preço) e ordenação
- **Página de produto** com galeria, variações e controle de quantidade
- **Carrinho** persistente: alterar quantidade, remover itens, subtotal e resumo
- **Cálculo de frete** com opções de entrega
- **Checkout** com busca de endereço por CEP, abas de forma de pagamento e validação do formulário
- **Blog, Sobre, Contato e FAQ**
- **Newsletter** e notificações na interface
- **Menu mobile** e layout responsivo

## Stack

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (responsivo, variáveis de cor da marca) |
| Lógica | JavaScript (ES6+) sem dependências |
| Testes | Suíte própria em JS (`tests/`) com relatório no navegador |
| Imagens de exemplo | Node.js + `canvas` (`images/generate_images.js`) |

## Estrutura

```
brisa-boa-ecommerce/
├── index.html            # Home
├── pages/                # produtos, carrinho, checkout, blog, sobre, contato
├── css/styles.css
├── js/main.js            # toda a lógica da loja
├── tests/                # test_site.js + index.html (relatório)
├── images/               # imagens + script gerador
└── estrutura_site.md     # arquitetura e mapa do site
```

## Como executar

Não precisa de build. Abra `index.html` no navegador ou use um servidor local:

```bash
npx live-server
```

Para rodar os testes, abra `tests/index.html`.

## Próximos passos

- [ ] Integrar um gateway de pagamento real (ambiente de testes)
- [ ] Back-end para produtos e pedidos (API REST + banco de dados)
- [ ] Página individual de produto e FAQ como páginas próprias
- [ ] Remover `images/node_modules` do repositório e adicionar ao `.gitignore`

## Autora

Desenvolvido por **Jessica Baptista** · [GitHub](https://github.com/JessicaGPW) · [LinkedIn](https://www.linkedin.com/in/baptistajessica/)

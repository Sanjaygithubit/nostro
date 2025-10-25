// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Newsletter form submit (demo)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Subscribed! Check your email.');
        });
    }

    // Contact form submit (demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! We\'ll get back to you soon.');
        });
    }

    // Collections page: Search and Filter
    if (document.getElementById('productGrid')) {
        // Sample products data
        const products = [
            { id: 1, name: 'Air Max Sneakers', price: 1200, category: 'shoes', image: './img/c1.jpg' },
            { id: 2, name: 'Leather Jacket', price: 1999, category: 'clothing', image: './img/c2.jpg' },
            { id: 3, name: 'Running Shoes', price: 2000 ,category: 'shoes', image: './img/c3.jpg' },
            { id: 4, name: 'T-Shirt', price: 299, category: 'clothing', image: './img/c4.jpg' },
            { id: 5, name: 'Watch', price: 2999, category: 'accessories', image: './img/c5.jpg' },
            { id: 6, name: 'Hoodie', price: 599, category: 'clothing', image: './img/c6.jpg' },
            { id: 7, name: 'Boots', price: 1499, category: 'shoes', image: './img/c7.jpg' },
            { id: 8, name: 'Sunglasses', price: 799, category: 'accessories', image: './img/c8.jpg' }
        ];

        // Render products
        function renderProducts(filteredProducts) {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = '';
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                `;
                grid.appendChild(card);
            });
        }

        // Initial render
        renderProducts(products);

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });

        // Filter functionality
        const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selectedCategories = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                let filtered = products;
                if (selectedCategories.length > 0) {
                    filtered = products.filter(product => 
                        selectedCategories.includes(product.category)
                    );
                }
                
                // Re-apply search if active
                const query = searchInput.value.toLowerCase();
                if (query) {
                    filtered = filtered.filter(product => 
                        product.name.toLowerCase().includes(query)
                    );
                }
                
                renderProducts(filtered);
            });
        });
    }
});
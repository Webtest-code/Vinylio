// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
});

let currentLang = 'nl'; // Default language
let translations = null;

// Function to load language file
async function loadLanguage(lang) {
    try {
        const response = await fetch(`../Talen/lang-${lang}.json`);
        translations = await response.json();
        currentLang = lang;
        updateContent();
    } catch (error) {
        console.error('Error loading language file:', error);
    }
}

// Function to update all content with translations
function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    // Update menu items
    if (translations.menu) {
        Object.keys(translations.menu).forEach(category => {
            const container = document.querySelector(`#${category} .menu-items`);
            if (container) {
                container.innerHTML = translations.menu[category]
                    .map(item => createMenuItem(item))
                    .join('');
            }
        });
    }
}

// Function to create menu items
function createMenuItem(item) {
    return `
        <div class="menu-item" data-aos="fade-up">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
        </div>
    `;
}

// Menu Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load default language
    loadLanguage(currentLang);

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            loadLanguage(lang);
        });
    });

    // Main menu tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            button.classList.add('active');
            const categoryId = button.getAttribute('data-tab');
            document.getElementById(categoryId).classList.add('active');
            
            // Show/hide food sub-tabs based on selected category
            const foodSubTabs = document.querySelector('.food-sub-tabs');
            if (categoryId === 'food') {
                foodSubTabs.style.display = 'flex';
            } else {
                foodSubTabs.style.display = 'none';
            }
        });
    });
    
    // Food sub-tabs
    const subTabButtons = document.querySelectorAll('.sub-tab-button');
    const subCategories = document.querySelectorAll('.sub-category');
    
    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all sub-buttons and sub-categories
            subTabButtons.forEach(btn => btn.classList.remove('active'));
            subCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked sub-button and corresponding sub-category
            button.classList.add('active');
            const subCategoryId = button.getAttribute('data-subtab');
            document.getElementById(subCategoryId).classList.add('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('nav-open');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('nav-open');
        });
    });
} 

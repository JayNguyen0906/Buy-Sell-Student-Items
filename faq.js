document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Show/hide FAQ items based on category
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        faqItems.forEach(item => {
                        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
            
            // If search is active, ignore category filters
            if (searchTerm.length > 0) {
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                categoryButtons[0].classList.add('active'); // Set "All Questions" as active
            }
        });
    });
    
    // Clear search when clicking the search button
    const searchButton = document.querySelector('.faq-search button');
    
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            searchInput.value = '';
            // Trigger the input event to reset the search
            const event = new Event('input');
            searchInput.dispatchEvent(event);
        });
    }
    
    // URL parameter handling for direct linking to categories
    function handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (categoryButton) {
                categoryButton.click();
            }
        }
    }
    
    // Call the function to handle URL parameters
    handleURLParameters();
    
    // Add smooth scrolling to FAQ items when linked from other pages
    function scrollToFAQItem() {
        const urlParams = new URLSearchParams(window.location.search);
        const faqId = urlParams.get('faq');
        
        if (faqId) {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach((item, index) => {
                if (index + 1 === parseInt(faqId)) {
                    // Open the FAQ item
                    item.classList.add('active');
                    
                    // Scroll to the item with smooth behavior
                    setTimeout(() => {
                        item.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            });
        }
    }
    
    // Call the function to handle scrolling to specific FAQ items
    scrollToFAQItem();
    
    // Add animation to FAQ items when they appear in viewport
    function animateFAQItems() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        faqItems.forEach((item, index) => {
            // Set initial styles
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.3s ease ${index * 0.1}s`;
            
            // Observe the item
            observer.observe(item);
        });
    }
    
    // Call the animation function
    animateFAQItems();
});
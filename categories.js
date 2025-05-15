// JavaScript for categories page
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add hover effects for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.category-icon i').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.category-icon i').style.transform = 'scale(1)';
        });
    });
    
    // Add click tracking for analytics (placeholder)
    const trackCategoryClick = function(categoryName) {
        console.log(`Category clicked: ${categoryName}`);
        // In a real implementation, you would send this data to your analytics service
    };
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            trackCategoryClick(categoryName);
        });
    });
    
    // Add subcategory tag tracking
    const subcategoryTags = document.querySelectorAll('.subcategory-tag');
    subcategoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            console.log(`Subcategory clicked: ${this.textContent}`);
            // In a real implementation, you would send this data to your analytics service
        });
    });
});
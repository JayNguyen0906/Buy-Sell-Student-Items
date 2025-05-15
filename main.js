 // Simple JavaScript for basic interactions
 document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality could be added here
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add to wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    if (wishlistButtons) {
        wishlistButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active');
                // Here you would typically send an AJAX request to update the user's wishlist
                alert('Item added to wishlist!');
            });
        });
    }
});
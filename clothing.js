// JavaScript for clothing page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    if (wishlistButtons) {
        wishlistButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                
                // Here you would typically send an AJAX request to update the user's wishlist
                if (this.classList.contains('active')) {
                    // Show a small notification
                    const notification = document.createElement('div');
                    notification.style.position = 'fixed';
                    notification.style.bottom = '20px';
                    notification.style.right = '20px';
                    notification.style.backgroundColor = 'var(--primary-color)';
                    notification.style.color = 'white';
                    notification.style.padding = '10px 20px';
                    notification.style.borderRadius = '5px';
                    notification.style.zIndex = '1000';
                    notification.textContent = 'Added to wishlist!';
                    document.body.appendChild(notification);
                    
                    // Remove notification after 3 seconds
                    setTimeout(() => {
                        notification.remove();
                    }, 3000);
                }
            });
        });
    }
    
    // Filter functionality
    const filterForm = document.querySelector('.filters');
    if (filterForm) {
        const applyBtn = filterForm.querySelector('.apply-btn');
        const resetBtn = filterForm.querySelector('.reset-btn');
        
        applyBtn.addEventListener('click', function() {
            // Here you would typically collect filter values and reload the page with query parameters
            alert('Filters applied! (This would filter results in a real implementation)');
        });
        
        resetBtn.addEventListener('click', function() {
            // Reset all form fields
            const selects = filterForm.querySelectorAll('select');
            const inputs = filterForm.querySelectorAll('input');
            
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            inputs.forEach(input => {
                input.value = '';
            });
            
            alert('Filters reset!');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

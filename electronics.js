document.addEventListener('DOMContentLoaded', function() {
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                // Show a notification that item was added to wishlist
                showNotification('Item added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                // Show a notification that item was removed from wishlist
                showNotification('Item removed from wishlist!');
            }
        });
    });
    
    // Filter functionality
    const applyFilterBtn = document.querySelector('.apply-btn');
    const resetFilterBtn = document.querySelector('.reset-btn');
    
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            // Get filter values
            const category = document.getElementById('category').value;
            const condition = document.getElementById('condition').value;
            const priceMin = document.getElementById('price-min').value;
            const priceMax = document.getElementById('price-max').value;
            const brand = document.getElementById('brand').value;
            
            // In a real application, you would use these values to filter the products
            // For this demo, we'll just show a notification
            showNotification('Filters applied!');
            
            // You could also reload the page with query parameters or make an AJAX request
            // window.location.href = `electronics.html?category=${category}&condition=${condition}&priceMin=${priceMin}&priceMax=${priceMax}&brand=${brand}`;
        });
    }
    
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            // Reset all filter inputs
            document.getElementById('category').value = '';
            document.getElementById('condition').value = '';
            document.getElementById('price-min').value = '';
            document.getElementById('price-max').value = '';
            document.getElementById('brand').value = '';
            
            showNotification('Filters reset!');
        });
    }
    
    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Contact seller functionality
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get seller name from the card
            const card = this.closest('.electronics-card');
            const sellerName = card.querySelector('.seller-name').textContent;
            const productName = card.querySelector('.electronics-title').textContent;
            
            // In a real application, this would open a chat or contact form
            // For this demo, we'll just show a notification
            showNotification(`Contacting ${sellerName} about "${productName}"`);
        });
    });
    
    // View details functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product name from the card
            const productName = this.closest('.electronics-card').querySelector('.electronics-title').textContent;
            
            // In a real application, this would navigate to the product detail page
            // For this demo, we'll just show a notification
            showNotification(`Viewing details for "${productName}"`);
        });
    });
});
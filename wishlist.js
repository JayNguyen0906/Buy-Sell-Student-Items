document.addEventListener('DOMContentLoaded', function() {
    // Remove item from wishlist
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wishlistItem = this.closest('.wishlist-item');
            wishlistItem.style.opacity = '0';
            setTimeout(() => {
                wishlistItem.remove();
                updateWishlistCount();
                checkEmptyWishlist();
            }, 300);
        });
    });
    
    // Add to cart functionality
    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Item added to cart!');
            // Here you would typically send an AJAX request to update the user's cart
        });
    });
    
    // Clear all items
    const clearAllButton = document.querySelector('.clear-btn');
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all items from your wishlist?')) {
                const wishlistItems = document.querySelectorAll('.wishlist-item');
                wishlistItems.forEach(item => {
                    item.style.opacity = '0';
                });
                
                setTimeout(() => {
                    wishlistItems.forEach(item => {
                        item.remove();
                    });
                    updateWishlistCount();
                    checkEmptyWishlist();
                }, 300);
            }
        });
    }
    
    // Add all to cart
    const addAllButton = document.querySelector('.add-all-btn');
    if (addAllButton) {
        addAllButton.addEventListener('click', function() {
            alert('All items added to cart!');
            // Here you would typically send an AJAX request to update the user's cart
        });
    }
    
    // Update wishlist count
    function updateWishlistCount() {
        const wishlistItems = document.querySelectorAll('.wishlist-item');
        const countElement = document.querySelector('.wishlist-count span');
        if (countElement) {
            countElement.textContent = wishlistItems.length;
        }
    }
    
    // Check if wishlist is empty and show empty state
    function checkEmptyWishlist() {
        const wishlistItems = document.querySelectorAll('.wishlist-item');
        const wishlistGrid = document.querySelector('.wishlist-grid');
        const wishlistControls = document.querySelector('.wishlist-controls');
        const container = document.querySelector('.wishlist-section .container');
        
        if (wishlistItems.length === 0) {
            // Create empty state
            wishlistGrid.style.display = 'none';
            wishlistControls.style.display = 'none';
            
            const emptyState = document.createElement('div');
            emptyState.className = 'wishlist-empty';
            emptyState.innerHTML = `
                <i class="far fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Items you save will appear here. Start browsing to add items to your wishlist.</p>
                <a href="index.html" class="btn">Browse Items</a>
            `;
            
            container.appendChild(emptyState);
        }
    }
});
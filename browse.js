document.addEventListener('DOMContentLoaded', function() {
    // Toggle filter sections
    const filterTitles = document.querySelectorAll('.filter-title');
    
    filterTitles.forEach(title => {
        title.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('active');
            
            // Toggle the visibility of the filter content
            const filterContent = this.nextElementSibling;
            filterContent.style.display = filterContent.style.display === 'none' ? 'block' : 'none';
        });
    });
    
    // Toggle view mode (grid/list)
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const itemsGrid = document.querySelector('.items-grid');
    const itemCards = document.querySelectorAll('.item-card');
    
    gridViewBtn.addEventListener('click', function() {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        
        itemsGrid.classList.remove('list-view');
        itemCards.forEach(card => {
            card.classList.remove('list-view');
        });
    });
    
    listViewBtn.addEventListener('click', function() {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        
        itemsGrid.classList.add('list-view');
        itemCards.forEach(card => {
            card.classList.add('list-view');
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle heart icon
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            // Here you would typically send an AJAX request to update the user's wishlist
            // For demo purposes, we'll just show a notification
            if (icon.classList.contains('fas')) {
                showNotification('Added to wishlist!');
            } else {
                showNotification('Removed from wishlist!');
            }
        });
    });
    
    // Filter functionality
    const applyBtn = document.querySelector('.apply-btn');
    const resetBtn = document.querySelector('.reset-btn');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            // Here you would typically collect filter values and reload the page with query parameters
            showNotification('Filters applied!');
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset all form fields
            const selects = document.querySelectorAll('.filter-group select');
            const inputs = document.querySelectorAll('.filter-group input');
            
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            
            showNotification('Filters reset!');
        });
    }
    
    // Pagination functionality
    const paginationItems = document.querySelectorAll('.pagination-item');
    
    paginationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination items
            paginationItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Here you would typically load new content or navigate to a new page
            // For demo purposes, we'll just show a notification
            showNotification('Loading page...');
        });
    });
    
    // Helper function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        document.body.appendChild(notification);
        
        // Show the notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
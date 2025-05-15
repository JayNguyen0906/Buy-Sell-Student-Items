// JavaScript for bicycle page functionality
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
    
    // Price range validation
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    
    if (priceMin && priceMax) {
        priceMin.addEventListener('change', function() {
            if (priceMax.value && parseInt(priceMin.value) > parseInt(priceMax.value)) {
                alert('Minimum price cannot be greater than maximum price');
                this.value = '';
            }
        });
        
        priceMax.addEventListener('change', function() {
            if (priceMin.value && parseInt(priceMax.value) < parseInt(priceMin.value)) {
                alert('Maximum price cannot be less than minimum price');
                this.value = '';
            }
        });
    }
    
    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    if (paginationLinks) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                paginationLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Here you would typically load new content or navigate to a new page
                // For demo purposes, we'll just show an alert
                if (this.textContent.includes('Next')) {
                    alert('Loading next page...');
                } else {
                    alert('Loading page ' + this.textContent + '...');
                }
            });
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
    
    // Mobile responsiveness for filters
    const filterContainer = document.querySelector('.filter-container');
    if (filterContainer && window.innerWidth <= 768) {
        // Add a toggle button for filters on mobile
        const filtersSection = document.querySelector('.filters');
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Show Filters';
        toggleButton.className = 'filter-toggle-btn';
        toggleButton.style.width = '100%';
        toggleButton.style.padding = '10px';
        toggleButton.style.marginBottom = '10px';
        toggleButton.style.backgroundColor = 'var(--primary-color)';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.cursor = 'pointer';
        
        filterContainer.style.display = 'none';
        
        filtersSection.insertBefore(toggleButton, filterContainer);
        
        toggleButton.addEventListener('click', function() {
            if (filterContainer.style.display === 'none') {
                filterContainer.style.display = 'flex';
                this.textContent = 'Hide Filters';
            } else {
                filterContainer.style.display = 'none';
                this.textContent = 'Show Filters';
            }
        });
    }
});
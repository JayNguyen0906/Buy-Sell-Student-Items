document.addEventListener('DOMContentLoaded', function() {
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
                
                // Show a small notification
                showNotification('Item added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                
                // Show a small notification
                showNotification('Item removed from wishlist!', 'info');
            }
        });
    });
    
    // Filter functionality
    const applyFilterBtn = document.querySelector('.apply-btn');
    const resetFilterBtn = document.querySelector('.reset-btn');
    const typeSelect = document.getElementById('type');
    const conditionSelect = document.getElementById('condition');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const subjectSelect = document.getElementById('subject');
    const supplyCards = document.querySelectorAll('.supply-card');
    
    // Apply filters
    applyFilterBtn.addEventListener('click', function() {
        const selectedType = typeSelect.value;
        const selectedCondition = conditionSelect.value;
        const minPrice = priceMinInput.value ? parseFloat(priceMinInput.value) : 0;
        const maxPrice = priceMaxInput.value ? parseFloat(priceMaxInput.value) : Infinity;
        const selectedSubject = subjectSelect.value;
        
        let filteredCount = 0;
        
        supplyCards.forEach(card => {
            // For demo purposes, we'll use the card's content to filter
            // In a real application, you would have data attributes or fetch from a database
            const cardType = getCardType(card);
            const cardCondition = getCardCondition(card);
            const cardPrice = getCardPrice(card);
            const cardSubject = getCardSubject(card);
            
            const typeMatch = !selectedType || cardType.includes(selectedType);
            const conditionMatch = !selectedCondition || cardCondition.includes(selectedCondition);
            const priceMatch = cardPrice >= minPrice && cardPrice <= maxPrice;
            const subjectMatch = !selectedSubject || cardSubject.includes(selectedSubject);
            
            if (typeMatch && conditionMatch && priceMatch && subjectMatch) {
                card.style.display = 'block';
                filteredCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (filteredCount === 0) {
            showNotification('No items match your filters. Try adjusting your criteria.', 'warning');
        } else {
            showNotification(`Showing ${filteredCount} items that match your filters.`, 'success');
        }
    });
    
    // Reset filters
    resetFilterBtn.addEventListener('click', function() {
        typeSelect.value = '';
        conditionSelect.value = '';
        priceMinInput.value = '';
        priceMaxInput.value = '';
        subjectSelect.value = '';
        
        supplyCards.forEach(card => {
            card.style.display = 'block';
        });
        
        showNotification('Filters have been reset.', 'info');
    });
    
    // Helper functions to extract card data (for demo purposes)
    function getCardType(card) {
        const typeElement = card.querySelector('.supply-info p:nth-child(1)');
        return typeElement ? typeElement.textContent.toLowerCase() : '';
    }
    
    function getCardCondition(card) {
        const conditionElement = card.querySelector('.supply-condition');
        return conditionElement ? conditionElement.textContent.toLowerCase() : '';
    }
    
    function getCardPrice(card) {
        const priceElement = card.querySelector('.supply-price');
        if (priceElement) {
            const priceText = priceElement.textContent;
            return parseFloat(priceText.replace('$', '').trim());
        }
        return 0;
    }
    
    function getCardSubject(card) {
        const subjectElement = card.querySelector('.supply-info p:nth-child(4)');
        return subjectElement ? subjectElement.textContent.toLowerCase() : '';
    }
    
    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add visible class after a small delay (for animation)
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.remove();
            }, 300); // Wait for fade out animation
        }, 3000);
    }
    
    // Add CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            background-color: white;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .notification.visible {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            border-left: 4px solid #34a853;
        }
        
        .notification.warning {
            border-left: 4px solid #fbbc05;
        }
        
        .notification.error {
            border-left: 4px solid #ea4335;
        }
        
        .notification.info {
            border-left: 4px solid #4285f4;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Contact seller functionality
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.supply-card');
            const itemTitle = card.querySelector('.supply-title').textContent;
            const sellerName = card.querySelector('.seller-name').textContent;
            
            // In a real application, this would open a chat or contact form
            // For demo purposes, we'll show a notification
            showNotification(`Contacting ${sellerName} about "${itemTitle}"...`, 'info');
        });
    });
    
    // View details functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.supply-card');
            const itemTitle = card.querySelector('.supply-title').textContent;
            
            // In a real application, this would navigate to a details page
            // For demo purposes, we'll show a notification
            showNotification(`Viewing details for "${itemTitle}"...`, 'info');
        });
    });
});
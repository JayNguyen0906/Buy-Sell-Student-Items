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
                
                // Show notification
                showNotification('Item added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                
                // Show notification
                showNotification('Item removed from wishlist', 'info');
            }
        });
    });
    
    // Filter functionality
    const applyFilterBtn = document.querySelector('.apply-btn');
    const resetFilterBtn = document.querySelector('.reset-btn');
    const subjectSelect = document.getElementById('subject');
    const conditionSelect = document.getElementById('condition');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const locationSelect = document.getElementById('location');
    const textbookCards = document.querySelectorAll('.textbook-card');
    
    applyFilterBtn.addEventListener('click', function() {
        const subject = subjectSelect.value;
        const condition = conditionSelect.value;
        const priceMin = priceMinInput.value ? parseFloat(priceMinInput.value) : 0;
        const priceMax = priceMaxInput.value ? parseFloat(priceMaxInput.value) : Infinity;
        const location = locationSelect.value;
        
        let filteredCount = 0;
        
        textbookCards.forEach(card => {
            // For demo purposes, we'll use some simple filtering logic
            // In a real application, you would have data attributes or fetch from a database
            
            const cardTitle = card.querySelector('.textbook-title').textContent.toLowerCase();
            const cardCondition = card.querySelector('.textbook-condition').textContent.toLowerCase();
            const cardPrice = parseFloat(card.querySelector('.textbook-price').textContent.replace('$', ''));
            const cardLocation = card.querySelector('.textbook-location').textContent.toLowerCase();
            
            // Check if the card matches all selected filters
            let matchesSubject = true;
            let matchesCondition = true;
            let matchesPrice = true;
            let matchesLocation = true;
            
            if (subject && !cardTitle.includes(subject.toLowerCase())) {
                matchesSubject = false;
            }
            
            if (condition && !cardCondition.includes(condition.toLowerCase())) {
                matchesCondition = false;
            }
            
            if (cardPrice < priceMin || cardPrice > priceMax) {
                matchesPrice = false;
            }
            
            if (location && !cardLocation.includes(location.toLowerCase())) {
                matchesLocation = false;
            }
            
            // Show or hide the card based on filter matches
            if (matchesSubject && matchesCondition && matchesPrice && matchesLocation) {
                card.style.display = 'block';
                filteredCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results
        if (filteredCount === 0) {
            showNotification('No textbooks match your filters. Try adjusting your criteria.', 'warning');
        } else {
            showNotification(`Showing ${filteredCount} textbooks that match your filters.`, 'success');
        }
    });
    
    resetFilterBtn.addEventListener('click', function() {
        // Reset all filter inputs
        subjectSelect.value = '';
        conditionSelect.value = '';
        priceMinInput.value = '';
        priceMaxInput.value = '';
        locationSelect.value = '';
        
        // Show all textbook cards
        textbookCards.forEach(card => {
            card.style.display = 'block';
        });
        
        showNotification('Filters have been reset.', 'info');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            textbookCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        let matchCount = 0;
        
        textbookCards.forEach(card => {
            const title = card.querySelector('.textbook-title').textContent.toLowerCase();
            const author = card.querySelector('.textbook-info').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (matchCount === 0) {
            showNotification('No textbooks match your search. Try different keywords.', 'warning');
        } else {
            showNotification(`Found ${matchCount} textbooks matching "${searchTerm}".`, 'success');
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getIconForType(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add styles if they don't exist
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 350px;
                    z-index: 1000;
                    animation: slideIn 0.3s forwards;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                }
                
                .notification-content i {
                    margin-right: 10px;
                    font-size: 1.2rem;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--gray-color);
                    cursor: pointer;
                    margin-left: 10px;
                }
                
                .notification.success {
                    border-left: 4px solid var(--secondary-color);
                }
                
                .notification.success i {
                    color: var(--secondary-color);
                }
                
                .notification.warning {
                    border-left: 4px solid var(--accent-color);
                }
                
                .notification.warning i {
                    color: var(--accent-color);
                }
                
                .notification.error {
                    border-left: 4px solid var(--danger-color);
                }
                
                .notification.error i {
                    color: var(--danger-color);
                }
                
                .notification.info {
                    border-left: 4px solid var(--primary-color);
                }
                
                .notification.info i {
                    color: var(--primary-color);
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', function() {
            closeNotification(notification);
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }
    
    function closeNotification(notification) {
        notification.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    function getIconForType(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'error': return 'fa-times-circle';
            case 'info': 
            default: return 'fa-info-circle';
        }
    }
    
    // Contact seller functionality
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get textbook and seller info
            const card = this.closest('.textbook-card');
            const title = card.querySelector('.textbook-title').textContent;
            const seller = card.querySelector('.seller-name').textContent;
            
            // Create modal for contact form
            const modal = document.createElement('div');
            modal.className = 'contact-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Contact ${seller} about "${title}"</h3>
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <form id="contact-form">
                            <div class="form-group">
                                <label for="message">Your Message</label>
                                <textarea id="message" rows="5" placeholder="Hi, I'm interested in your textbook. Is it still available?"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="contact-method">Preferred Contact Method</label>
                                <select id="contact-method">
                                    <option value="app">In-app Messaging</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                </select>
                            </div>
                            <div class="form-group contact-info" style="display: none;">
                                <label for="contact-info">Your Contact Information</label>
                                <input type="text" id="contact-info" placeholder="Your email or phone number">
                            </div>
                            <button type="submit" class="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            `;
            
            // Add modal styles
            if (!document.getElementById('modal-styles')) {
                const styles = document.createElement('style');
                styles.id = 'modal-styles';
                styles.textContent = `
                    .contact-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        animation: fadeIn 0.3s forwards;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    .modal-content {
                        background-color: white;
                        border-radius: 8px;
                        width: 90%;
                        max-width: 500px;
                        max-height: 90vh;
                        overflow-y: auto;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    }
                    
                    .modal-header {
                        padding: 15px 20px;
                        border-bottom: 1px solid #eee;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .modal-header h3 {
                        margin: 0;
                        font-size: 1.2rem;
                    }
                    
                    .modal-close {
                        background: none;
                        border: none;
                        font-size: 1.2rem;
                        cursor: pointer;
                        color: var(--gray-color);
                    }
                    
                    .modal-body {
                        padding: 20px;
                    }
                    
                    .form-group {
                        margin-bottom: 20px;
                    }
                    
                    .form-group label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 500;
                    }
                    
                    .form-group textarea,
                    .form-group select,
                    .form-group input {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 1rem;
                    }
                    
                    .submit-btn {
                        background-color: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 4px;
                        font-weight: 500;
                        cursor: pointer;
                        width: 100%;
                        transition: background-color 0.3s;
                    }
                    
                    .submit-btn:hover {
                        background-color: #3367d6;
                    }
                `;
                document.head.appendChild(styles);
            }
            
            // Add to DOM
            document.body.appendChild(modal);
            
            // Handle contact method change
            const contactMethodSelect = modal.querySelector('#contact-method');
            const contactInfoField = modal.querySelector('.contact-info');
            
            contactMethodSelect.addEventListener('change', function() {
                if (this.value === 'app') {
                    contactInfoField.style.display = 'none';
                } else {
                    contactInfoField.style.display = 'block';
                }
            });
            
            // Handle form submission
            const contactForm = modal.querySelector('#contact-form');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const message = modal.querySelector('#message').value;
                const contactMethod = contactMethodSelect.value;
                const contactInfo = modal.querySelector('#contact-info').value;
                
                // Validate form
                if (!message.trim()) {
                    showNotification('Please enter a message.', 'warning');
                    return;
                }
                
                if (contactMethod !== 'app' && !contactInfo.trim()) {
                    showNotification('Please provide your contact information.', 'warning');
                    return;
                }
                
                // In a real app, you would send this data to your backend
                console.log({
                    textbook: title,
                    seller: seller,
                    message: message,
                    contactMethod: contactMethod,
                    contactInfo: contactInfo
                });
                
                // Close modal
                modal.remove();
                
                // Show success message
                showNotification(`Message sent to ${seller}! They will respond soon.`, 'success');
            });
            
            // Close modal when clicking close button
            const closeModalButton = modal.querySelector('.modal-close');
            closeModalButton.addEventListener('click', function() {
                modal.remove();
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // View details functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get textbook info
            const card = this.closest('.textbook-card');
            const title = card.querySelector('.textbook-title').textContent;
            const price = card.querySelector('.textbook-price').textContent;
            const condition = card.querySelector('.textbook-condition').textContent;
            const info = card.querySelector('.textbook-info').innerHTML;
            const location = card.querySelector('.textbook-location').innerHTML;
            const description = card.querySelector('p').textContent;
            const sellerName = card.querySelector('.seller-name').textContent;
            const sellerAvatar = card.querySelector('.seller-avatar img').src;
            const bookImage = card.querySelector('.textbook-image img').src;
            
            // Create modal for details
            const modal = document.createElement('div');
            modal.className = 'details-modal';
            modal.innerHTML = `
                <div class="modal-content details-content">
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                    <div class="details-grid">
                        <div class="details-image">
                            <img src="${bookImage}" alt="${title}">
                        </div>
                        <div class="details-info">
                            <h2>${title}</h2>
                            <div class="details-meta">
                                <div class="details-price">${price}</div>
                                <div class="details-condition">${condition}</div>
                            </div>
                            <div class="details-section">
                                <h3>Book Information</h3>
                                <div class="details-book-info">
                                    ${info}
                                </div>
                            </div>
                            <div class="details-section">
                                <h3>Location</h3>
                                <div class="details-location">
                                    ${location}
                                </div>
                            </div>
                            <div class="details-section">
                                <h3>Description</h3>
                                <p>${description}</p>
                            </div>
                            <div class="details-seller">
                                <div class="seller-info">
                                    <img src="${sellerAvatar}" alt="${sellerName}">
                                    <div class="seller-details">
                                        <div class="seller-name">${sellerName}</div>
                                        <div class="seller-rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                            <span>4.5</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="contact-seller-btn">Contact Seller</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal styles
            if (!document.getElementById('details-modal-styles')) {
                const styles = document.createElement('style');
                styles.id = 'details-modal-styles';
                styles.textContent = `
                    .details-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                    }
                    
                    .details-content {
                        width: 90%;
                        max-width: 900px;
                        max-height: 90vh;
                        padding: 0;
                        position: relative;
                    }
                    
                    .details-content .modal-close {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background-color: white;
                        border-radius: 50%;
                        width: 36px;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                        z-index: 10;
                    }
                    
                    .details-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .details-image {
                        height: 100%;
                        background-color: #f5f5f5;
                    }
                    
                    .details-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 8px 0 0 8px;
                    }
                    
                    .details-info {
                        padding: 30px;
                        overflow-y: auto;
                        max-height: 90vh;
                    }
                    
                    .details-info h2 {
                        font-size: 1.8rem;
                        margin-bottom: 15px;
                        color: var(--dark-color);
                    }
                    
                    .details-meta {
                        display: flex;
                        align-items: center;
                        margin-bottom: 25px;
                    }
                    
                    .details-price {
                        font-size: 1.8rem;
                        font-weight: 700;
                        color: var(--primary-color);
                        margin-right: 15px;
                    }
                    
                    .details-condition {
                        background-color: var(--light-color);
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-weight: 500;
                    }
                    
                    .details-section {
                        margin-bottom: 25px;
                    }
                    
                    .details-section h3 {
                        font-size: 1.2rem;
                        margin-bottom: 10px;
                        color: var(--dark-color);
                    }
                    
                    .details-book-info p {
                        margin-bottom: 8px;
                    }
                    
                    .details-seller {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    }
                    
                    .seller-info {
                        display: flex;
                        align-items: center;
                    }
                    
                    .seller-info img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 15px;
                    }
                    
                    .seller-details .seller-name {
                        font-weight: 500;
                        margin-bottom: 5px;
                    }
                    
                    .seller-rating {
                        color: var(--accent-color);
                    }
                    
                    .seller-rating span {
                        color: var(--dark-color);
                        margin-left: 5px;
                    }
                    
                    .contact-seller-btn {
                        background-color: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        font-weight: 500;
                        cursor: pointer;
                    }
                    
                    .contact-seller-btn:hover {
                        background-color: #3367d6;
                    }
                    
                    @media (max-width: 768px) {
                        .details-grid {
                            grid-template-columns: 1fr;
                        }
                        
                        .details-image img {
                            border-radius: 8px 8px 0 0;
                            max-height: 300px;
                        }
                        
                        .details-seller {
                            flex-direction: column;
                            align-items: flex-start;
                        }
                        
                        .contact-seller-btn {
                            margin-top: 15px;
                            width: 100%;
                        }
                    }
                `;
                document.head.appendChild(styles);
            }
            
            // Add to DOM
            document.body.appendChild(modal);
            
            // Handle contact seller button
            const contactSellerBtn = modal.querySelector('.contact-seller-btn');
            contactSellerBtn.addEventListener('click', function() {
                // Close details modal
                modal.remove();
                
                // Find and click the contact button in the original card
                card.querySelector('.contact-btn').click();
            });
            
            // Close modal when clicking close button
            const closeModalButton = modal.querySelector('.modal-close');
            closeModalButton.addEventListener('click', function() {
                modal.remove();
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address.', 'warning');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'warning');
                return;
            }
            
            // In a real app, you would send this to your backend
            console.log('Newsletter subscription:', email);
            
            // Clear input
            emailInput.value = '';
            
            // Show success message
            showNotification('Thank you for subscribing to our newsletter!', 'success');
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.support-navigation ul li a');
    const topicSections = document.querySelectorAll('.topic-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all topic sections
            topicSections.forEach(section => section.classList.remove('active'));
            
            // Show the corresponding section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Scroll to top of content area on mobile
            if (window.innerWidth < 992) {
                document.querySelector('.support-content').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // Support search functionality
    const supportSearch = document.getElementById('supportSearch');
    
    if (supportSearch) {
        supportSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // If search term is empty, reset view
            if (searchTerm === '') {
                // Show first topic section
                topicSections.forEach((section, index) => {
                    section.classList.toggle('active', index === 0);
                });
                
                // Reset navigation
                navLinks.forEach((link, index) => {
                    link.classList.toggle('active', index === 0);
                });
                
                // Close all accordion items
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    item.style.display = 'block';
                });
                
                return;
            }
            
            // Search in accordion headers
            let foundResults = false;
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                const header = item.querySelector('.accordion-header h4').textContent.toLowerCase();
                const content = item.querySelector('.accordion-content').textContent.toLowerCase();
                
                if (header.includes(searchTerm) || content.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('active');
                    
                    // Show the parent topic section
                    const parentSection = item.closest('.topic-section');
                    topicSections.forEach(section => section.classList.remove('active'));
                    parentSection.classList.add('active');
                    
                    // Update navigation
                    const sectionId = parentSection.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                    });
                    
                    foundResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // If no results found in accordions, search in FAQs
            if (!foundResults) {
                // You could implement additional search logic here
            }
        });
    }
    
    // Contact form submission
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', formValues);
            
            // Show success message
            showNotification('Your message has been sent! We will respond within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
            
            // Add styles
            const styles = document.createElement('style');
            styles.textContent = `
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                
                .notification {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 15px 20px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    max-width: 450px;
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
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getIconForType(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to container
        document.querySelector('.notification-container').appendChild(notification);
        
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
    
    // Handle direct links to specific questions
    function handleDirectLinks() {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // If it's an accordion header
                if (targetElement.classList.contains('accordion-header')) {
                    // Open the accordion
                    targetElement.parentElement.classList.add('active');
                    
                    // Show the parent topic section
                    const parentSection = targetElement.closest('.topic-section');
                    topicSections.forEach(section => section.classList.remove('active'));
                    parentSection.classList.add('active');
                    
                    // Update navigation
                    const sectionId = parentSection.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                    });
                    
                    // Scroll to the element
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 100);
                }
            }
        }
    }
    
    // Run on page load
    handleDirectLinks();
});
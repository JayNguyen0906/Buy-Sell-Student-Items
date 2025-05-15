document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Get the login/register and dashboard containers
    const authContainer = document.getElementById('auth-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    
    // Show appropriate container based on login status
    if (isLoggedIn) {
        showDashboard();
    } else {
        showAuthForms();
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // In a real implementation, this would validate credentials with the server
            // For demo purposes, we'll just check if fields are not empty
            if (email && password) {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', email.split('@')[0]); // Simple name extraction
                
                // Show dashboard
                showDashboard();
                
                // Update user info in the dashboard
                updateUserInfo();
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Simple validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Store registration info
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            
            // Show dashboard
            showDashboard();
            
            // Update user info in the dashboard
            updateUserInfo();
        });
    }
    
    // Switch between login and register forms
    const switchToRegisterBtn = document.getElementById('switch-to-register');
    const switchToLoginBtn = document.getElementById('switch-to-login');
    
    if (switchToRegisterBtn) {
        switchToRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-section').classList.remove('active');
            document.getElementById('register-section').classList.add('active');
        });
    }
    
    if (switchToLoginBtn) {
        switchToLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('register-section').classList.remove('active');
            document.getElementById('login-section').classList.add('active');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn a');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login state
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            
            // Show auth forms
            showAuthForms();
        });
    }
    
    // Function to show dashboard
    function showDashboard() {
        if (authContainer) authContainer.style.display = 'none';
        if (dashboardContainer) dashboardContainer.style.display = 'block';
        
        // Initialize dashboard functionality
        initDashboard();
    }
    
    // Function to show auth forms
    function showAuthForms() {
        if (dashboardContainer) dashboardContainer.style.display = 'none';
        if (authContainer) authContainer.style.display = 'block';
    }
    
    // Function to update user info in the dashboard
    function updateUserInfo() {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        const userNameElements = document.querySelectorAll('.user-name');
        const userEmailElements = document.querySelectorAll('.user-email');
        
        userNameElements.forEach(element => {
            element.textContent = userName || 'User';
        });
        
        userEmailElements.forEach(element => {
            element.textContent = userEmail || 'user@example.com';
        });
    }
    
    // Initialize dashboard functionality
    function initDashboard() {
        // Update user info
        updateUserInfo();
        
        // Tab switching functionality
        const tabLinks = document.querySelectorAll('.dashboard-nav li');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all tabs
                tabLinks.forEach(item => item.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Edit avatar functionality
        const editAvatarBtn = document.querySelector('.edit-avatar');
        if (editAvatarBtn) {
            editAvatarBtn.addEventListener('click', function() {
                // In a real implementation, this would open a file picker
                alert('This would open a file picker to change your profile picture.');
            });
        }
        
        // Listing actions
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
        const markSoldButtons = document.querySelectorAll('.mark-sold-btn');
        const relistButtons = document.querySelectorAll('.relist-btn');
        
        editButtons.forEach(button => {
            button.addEventListener('click', editHandler);
        });
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteHandler);
        });
        
        markSoldButtons.forEach(button => {
            button.addEventListener('click', markSoldHandler);
        });
        
        relistButtons.forEach(button => {
            button.addEventListener('click', relistHandler);
        });
        
        // Message sending functionality
        const messageForm = document.querySelector('.message-input');
        const messageInput = messageForm ? messageForm.querySelector('input') : null;
        const sendButton = messageForm ? messageForm.querySelector('.send-btn') : null;
        
        if (messageForm && messageInput && sendButton) {
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Reviews tab switching
        const reviewTabs = document.querySelectorAll('.review-tab');
        if (reviewTabs.length > 0) {
            reviewTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    reviewTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    // In a real implementation, this would show different reviews
                    // based on the selected tab
                });
            });
        }
    }
    
    function relistHandler() {
        const listingCard = this.closest('.listing-card');
        const listingTitle = listingCard.querySelector('.listing-title').textContent;
        
        if (confirm(`Relist "${listingTitle}"?`)) {
            // In a real implementation, this would update the listing status
            const statusBadge = listingCard.querySelector('.listing-status');
            statusBadge.textContent = 'Active';
            statusBadge.classList.remove('sold');
            statusBadge.classList.add('active');
            
            // Update actions
            const actions = listingCard.querySelector('.listing-actions');
            actions.innerHTML = `
                <button class="action-btn edit-btn"><i class="fas fa-edit"></i> Edit</button>
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
                <button class="action-btn mark-sold-btn"><i class="fas fa-check"></i> Mark as Sold</button>
            `;
            
            // Reattach event listeners
            actions.querySelector('.edit-btn').addEventListener('click', editHandler);
            actions.querySelector('.delete-btn').addEventListener('click', deleteHandler);
            actions.querySelector('.mark-sold-btn').addEventListener('click', markSoldHandler);
            
            alert('Listing relisted successfully!');
        }
    }
    
    function deleteHandler() {
        const listingCard = this.closest('.listing-card');
        const listingTitle = listingCard.querySelector('.listing-title').textContent;
        
        if (confirm(`Are you sure you want to delete "${listingTitle}"?`)) {
            // In a real implementation, this would send a request to delete the listing
            listingCard.remove();
            alert('Listing deleted successfully!');
        }
    }
    
    function editHandler() {
        const listingCard = this.closest('.listing-card');
        const listingTitle = listingCard.querySelector('.listing-title').textContent;
        alert(`Edit listing: ${listingTitle}`);
    }
    
    function markSoldHandler() {
        const listingCard = this.closest('.listing-card');
        const listingTitle = listingCard.querySelector('.listing-title').textContent;
        
        if (confirm(`Mark "${listingTitle}" as sold?`)) {
            // In a real implementation, this would update the listing status
            const statusBadge = listingCard.querySelector('.listing-status');
            statusBadge.textContent = 'Sold';
            statusBadge.classList.remove('active');
            statusBadge.classList.add('sold');
            
            // Update actions
            const actions = listingCard.querySelector('.listing-actions');
            actions.innerHTML = `
                <button class="action-btn relist-btn"><i class="fas fa-redo"></i> Relist</button>
                <button class="action-btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
            `;
            
            // Reattach event listeners
            actions.querySelector('.relist-btn').addEventListener('click', relistHandler);
            actions.querySelector('.delete-btn').addEventListener('click', deleteHandler);
            
            alert('Listing marked as sold!');
        }
    }
    
    function sendMessage() {
        const messageInput = document.querySelector('.message-input input');
        if (!messageInput) return;
        
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        
        // Create new message element
        const messageBody = document.querySelector('.message-body');
        if (!messageBody) return;
        
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        newMessage.innerHTML = `
            <div class="message-bubble">
                <p>${messageText}</p>
            </div>
            <span class="message-time">Just now</span>
        `;
        
        // Add to message body
        messageBody.appendChild(newMessage);
        
        // Clear input
        messageInput.value = '';
        
        // Scroll to bottom
        messageBody.scrollTop = messageBody.scrollHeight;
        
        // In a real implementation, this would send the message to the server
        // and then wait for a response
        
        // Simulate a response after 1 second
        setTimeout(() => {
            const responseMessage = document.createElement('div');
            responseMessage.className = 'message received';
            responseMessage.innerHTML = `
                <div class="message-bubble">
                    <p>Thanks for your message! I'll get back to you soon.</p>
                </div>
                <span class="message-time">${timeString}</span>
            `;
            
            messageBody.appendChild(responseMessage);
            messageBody.scrollTop = messageBody.scrollHeight;
        }, 1000);
    }
});
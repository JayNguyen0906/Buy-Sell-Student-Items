document.addEventListener('DOMContentLoaded', function() {
    // Photo upload preview functionality
    const photoUpload = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    
    photoUpload.addEventListener('change', function() {
        // Limit to 5 photos
        const maxFiles = 5;
        const files = Array.from(this.files).slice(0, maxFiles);
        
        files.forEach(file => {
            // Check if it's an image
            if (!file.type.match('image.*')) {
                alert('Please upload image files only');
                return;
            }
            
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should not exceed 5MB');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                
                const removeBtn = document.createElement('div');
                removeBtn.className = 'remove-photo';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    photoItem.remove();
                });
                
                photoItem.appendChild(img);
                photoItem.appendChild(removeBtn);
                photoPreview.appendChild(photoItem);
            };
            
            reader.readAsDataURL(file);
        });
        
        if (files.length >= maxFiles) {
            alert(`Maximum ${maxFiles} photos allowed. Only the first ${maxFiles} have been added.`);
        }
    });
    
    // Form submission
    const sellForm = document.getElementById('sell-item-form');
    
    sellForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = sellForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        // Check if at least one photo is uploaded
        if (photoPreview.children.length === 0) {
            isValid = false;
            alert('Please upload at least one photo of your item');
        }
        
        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Your listing has been submitted successfully!');
            // Redirect to a success page or the user's listings
            // window.location.href = 'my-listings.html';
        }
    });
    
    // Save as draft functionality
    const saveAsDraftBtn = document.querySelector('.btn-outline');
    
    saveAsDraftBtn.addEventListener('click', function() {
        // Here you would save the current form state
        alert('Your listing has been saved as a draft');
    });

    // Add event listeners for form field validation on blur
    const requiredFields = sellForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Add drag and drop functionality for photo upload
    const uploadArea = document.querySelector('.photo-upload-area');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadArea.classList.add('highlight');
    }
    
    function unhighlight() {
        uploadArea.classList.remove('highlight');
    }
    
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        photoUpload.files = files;
        
        // Trigger the change event manually
        const event = new Event('change');
        photoUpload.dispatchEvent(event);
    }
});
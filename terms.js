document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Navigation highlighting based on scroll position
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.terms-navigation ul li');
    
    function highlightNavigation() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(li => {
            li.classList.remove('active');
            const href = li.querySelector('a').getAttribute('href').substring(1);
            
            if (href === currentSection) {
                li.classList.add('active');
            }
        });
    }
    
    // Initial call to highlight the correct navigation item
    highlightNavigation();
    
    // Update navigation highlighting on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Smooth scroll to section when navigation link is clicked
    const navigationLinks = document.querySelectorAll('.terms-navigation a');
    
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Check if URL has a hash on page load and scroll to that section
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Make external links open in a new tab
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Terms';
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add the print button to the page
    const termsContainer = document.querySelector('.terms-container');
    if (termsContainer) {
        termsContainer.insertBefore(printButton, termsContainer.firstChild);
    }
    
    // Add print styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            header, footer, .terms-navigation, .back-to-top, .print-button {
                display: none !important;
            }
            
            .terms-layout {
                display: block;
            }
            
            .terms-container {
                box-shadow: none;
                padding: 0;
            }
            
            body {
                background-color: white;
            }
            
            .section {
                page-break-inside: avoid;
            }
        }
        
        .print-button {
            background-color: var(--light-color);
            color: var(--dark-color);
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
            display: inline-flex;
            align-items: center;
            font-size: 0.9rem;
        }
        
        .print-button i {
            margin-right: 5px;
        }
        
        .print-button:hover {
            background-color: #e9ecef;
        }
    `;
    
    document.head.appendChild(printStyles);
    
    // Add copy to clipboard functionality for sections
    const addCopyButtons = () => {
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionTitle = section.querySelector('h3').textContent;
            
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-section-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = `Copy ${sectionTitle} section`;
            
            copyButton.addEventListener('click', function() {
                const sectionText = section.textContent.trim();
                navigator.clipboard.writeText(sectionText)
                    .then(() => {
                        // Show success message
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
            });
            
            section.querySelector('h3').appendChild(copyButton);
        });
    };
    
    // Add copy button styles
    const copyButtonStyles = document.createElement('style');
    copyButtonStyles.textContent = `
        .copy-section-button {
            background: none;
            border: none;
            color: var(--gray-color);
            cursor: pointer;
            font-size: 0.9rem;
            margin-left: 10px;
            opacity: 0.5;
            transition: opacity 0.3s;
        }
        
        .section h3:hover .copy-section-button {
            opacity: 1;
        }
        
        .copy-section-button:hover {
            color: var(--primary-color);
        }
        
        @media print {
            .copy-section-button {
                display: none !important;
            }
        }
    `;
    
    document.head.appendChild(copyButtonStyles);
    
    // Call the function to add copy buttons
    addCopyButtons();
    
    // Add search functionality
    const addSearchBox = () => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'terms-search';
        
        searchContainer.innerHTML = `
            <input type="text" id="terms-search-input" placeholder="Search terms...">
            <button id="terms-search-button"><i class="fas fa-search"></i></button>
        `;
        
        const termsNavigation = document.querySelector('.terms-navigation');
        if (termsNavigation) {
            termsNavigation.insertBefore(searchContainer, termsNavigation.firstChild);
        }
        
        // Add search functionality
        const searchInput = document.getElementById('terms-search-input');
        const searchButton = document.getElementById('terms-search-button');
        
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            if (searchTerm.length < 2) {
                // Reset highlighting if search term is too short
                document.querySelectorAll('.search-highlight').forEach(el => {
                    el.outerHTML = el.textContent;
                });
                return;
            }
            
            // Reset previous search highlighting
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.outerHTML = el.textContent;
            });
            
            // Highlight matching text in sections
            let foundMatch = false;
            sections.forEach(section => {
                const textNodes = getTextNodes(section);
                
                textNodes.forEach(node => {
                    const text = node.nodeValue;
                    const lowerText = text.toLowerCase();
                    
                    if (lowerText.includes(searchTerm)) {
                        foundMatch = true;
                        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
                        
                        const fragment = document.createDocumentFragment();
                        
                        parts.forEach(part => {
                            if (part.toLowerCase() === searchTerm) {
                                const span = document.createElement('span');
                                span.className = 'search-highlight';
                                span.textContent = part;
                                fragment.appendChild(span);
                            } else {
                                fragment.appendChild(document.createTextNode(part));
                            }
                        });
                        
                        node.parentNode.replaceChild(fragment, node);
                    }
                });
            });
            
            // Scroll to first match if found
            if (foundMatch) {
                const firstMatch = document.querySelector('.search-highlight');
                if (firstMatch) {
                    firstMatch.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        };
        
        // Helper function to get all text nodes within an element
        function getTextNodes(element) {
            const textNodes = [];
            const walk = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walk.nextNode()) {
                if (node.nodeValue.trim() !== '') {
                    textNodes.push(node);
                }
            }
            
            return textNodes;
        }
        
        // Add event listeners for search
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    };
    
    // Add search box styles
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .terms-search {
            margin-bottom: 20px;
            display: flex;
        }
        
        #terms-search-input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            font-size: 0.9rem;
        }
        
        #terms-search-button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        
        .search-highlight {
            background-color: rgba(251, 188, 5, 0.3);
            padding: 2px 0;
        }
        
        @media print {
            .terms-search {
                display: none !important;
            }
        }
    `;
    
    document.head.appendChild(searchStyles);
    
    // Call the function to add search box
    addSearchBox();
});
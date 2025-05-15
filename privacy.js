// JavaScript for Privacy Policy page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Table of contents highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.privacy-navigation ul li a');
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Highlight current section in navigation
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.parentElement.classList.add('active');
            }
        });
    });
    
    // Back to top button click event
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Print functionality
    const printButton = document.getElementById('print-privacy');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
});
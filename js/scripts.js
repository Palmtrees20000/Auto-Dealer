

// inject current year into the footer
const dateNow = new Date();
const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = dateNow.getFullYear();
}

// Hamburger menu functionality with proper icon toggling
document.addEventListener('DOMContentLoaded', function() {
    const theButton = document.querySelector('#theButton');
    const theNav = document.querySelector('#theNav');
    
    console.log('DOM loaded, theButton:', theButton, 'theNav:', theNav);
    
    if (theButton && theNav) {
        // Click event
        theButton.addEventListener('click', function() {
            console.log('Menu button clicked!');
            toggleMenu();
        });
        
        // Keyboard accessibility (Enter and Space keys)
        theButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('#theNav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        function toggleMenu() {
            const isOpen = theNav.classList.contains('open');
            console.log('Toggle menu called, isOpen:', isOpen);
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            console.log('Opening menu');
            theNav.classList.add('open');
            theButton.classList.add('open');
            theButton.setAttribute('aria-expanded', 'true');
            console.log('Menu classes after opening:', theNav.className);
        }
        
        function closeMenu() {
            console.log('Closing menu');
            theNav.classList.remove('open');
            theButton.classList.remove('open');
            theButton.setAttribute('aria-expanded', 'false');
            console.log('Menu classes after closing:', theNav.className);
        }
    }
    
    // Load and display reviews
    loadReviews();
});

// Function to create star rating display
function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star filled">★</span>';
        } else {
            stars += '<span class="star">★</span>';
        }
    }
    return stars;
}

// Function to load reviews from JSON
async function loadReviews() {
    try {
        const response = await fetch('data/reviews.json');
        const data = await response.json();
        const reviewsContainer = document.getElementById('reviewsContainer');
        
        if (reviewsContainer && data.reviews) {
            // Show only the first 6 reviews for better display
            const reviewsToShow = data.reviews.slice(0, 6);
            
            reviewsToShow.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = `review-card rating-${review.rating}`;
                
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <div class="customer-name">${review.customerName}</div>
                        <div class="rating">
                            ${createStarRating(review.rating)}
                        </div>
                    </div>
                    <div class="review-comment">"${review.comment}"</div>
                `;
                
                reviewsContainer.appendChild(reviewCard);
            });
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        // Fallback: display a message if reviews can't be loaded
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: #666;">Reviews are currently unavailable.</p>';
        }
    }
}
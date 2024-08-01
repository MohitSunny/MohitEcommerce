document.addEventListener("DOMContentLoaded", function() {
    // Lazy loading images
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.add("loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        let lazyLoadThrottleTimeout;
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }

            lazyLoadThrottleTimeout = setTimeout(function() {
                let scrollTop = window.pageYOffset;
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.add("loaded");
                    }
                });
                if (lazyImages.length == 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationchange", lazyLoad);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }

    // Search bar suggestions
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('search-suggestions');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        if (query.length > 2) {
            // Mock data, replace with actual AJAX call
            const suggestions = [
                'Nike Air Max',
                'Adidas Ultraboost',
                'Puma Running Shoes',
                'Reebok CrossFit',
                'Vans Old Skool'
            ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
            
            suggestionsBox.innerHTML = '';
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.textContent = suggestion;
                div.addEventListener('click', function() {
                    searchInput.value = suggestion;
                    suggestionsBox.style.display = 'none';
                });
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = 'none';
        }
    });
});
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate form fields
    if (!username) {
        alert('Username is required');
        return;
    }
    
    if (!email) {
        alert('Email is required');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }
    
    if (!password) {
        alert('Password is required');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // If all validations pass, submit the form
    alert('Form submitted successfully');
    document.getElementById('signupForm').reset();
});

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

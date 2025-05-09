document.addEventListener('DOMContentLoaded', function() {
    // Third page slider functionality
    const thirdPageSlider = document.querySelector('#third-page .slider');
    const thirdPageSlides = document.querySelectorAll('#third-page .slide');
    const thirdPagePrevBtn = document.querySelector('#third-page .slider-controls .round-button:first-child');
    const thirdPageNextBtn = document.querySelector('#third-page .slider-controls .round-button:last-child');
    
    // If slider elements exist
    if (thirdPageSlider && thirdPageSlides.length > 0) {
        let currentSlide = 0;
        const slideCount = thirdPageSlides.length;
        const visibleSlides = 4; // Number of slides visible at once
        const slideWidth = thirdPageSlides[0].offsetWidth;
        
        // Set initial position
        updateSliderPosition();
        
        // Next button click handler
        if (thirdPageNextBtn) {
            thirdPageNextBtn.addEventListener('click', function() {
                if (currentSlide < slideCount - visibleSlides) {
                    currentSlide++;
                    updateSliderPosition();
                } else {
                    // If at end, loop back to start
                    currentSlide = 0;
                    updateSliderPosition(true); // Pass true for instant transition
                }
            });
        }
        
        // Previous button click handler
        if (thirdPagePrevBtn) {
            thirdPagePrevBtn.addEventListener('click', function() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSliderPosition();
                } else {
                    // If at start, loop to end
                    currentSlide = slideCount - visibleSlides;
                    updateSliderPosition(true); // Pass true for instant transition
                }
            });
        }
        
        // Update slider position function
        function updateSliderPosition(instant = false) {
            if (instant) {
                thirdPageSlider.style.transition = 'none';
            } else {
                thirdPageSlider.style.transition = 'transform 0.5s ease-in-out';
            }
            
            const offset = -currentSlide * slideWidth;
            thirdPageSlider.style.transform = `translateX(${offset}px)`;
            
            // Force reflow to make instant transition work
            if (instant) {
                void thirdPageSlider.offsetWidth;
            }
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Recalculate slide width and update position
            const newSlideWidth = thirdPageSlides[0].offsetWidth;
            const offset = -currentSlide * newSlideWidth;
            thirdPageSlider.style.transition = 'none';
            thirdPageSlider.style.transform = `translateX(${offset}px)`;
        });
    }
    
    // Optional: Auto-advance slider (uncomment if you want auto-sliding)
    /*
    let slideInterval = setInterval(() => {
        if (thirdPageNextBtn) thirdPageNextBtn.click();
    }, 3000);
    
    // Pause auto-slide on hover
    thirdPageSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    thirdPageSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            if (thirdPageNextBtn) thirdPageNextBtn.click();
        }, 3000);
    });
    */
});
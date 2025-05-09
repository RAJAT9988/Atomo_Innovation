document.addEventListener('DOMContentLoaded', function() {
    // Define sliders with their respective containers and controls
    const sliders = [
        {
            container: document.querySelector('#second-page .slider'),
            controls: document.querySelector('#second-page .slider-controls'),
            currentIndex: 0,
            maxSlides: 12 // Total number of slides in second-page slider
        },
        {
            container: document.querySelector('#fourth-page .slider'),
            controls: document.querySelector('#fourth-page .slider-controls'),
            currentIndex: 0,
            maxSlides: 12 // Total number of slides in fourth-page slider
        }
    ];

    // Initialize each slider
    sliders.forEach((slider) => {
        // Check if slider container and controls exist
        if (!slider.container || !slider.controls) {
            console.warn('Slider container or controls not found:', slider);
            return;
        }

        const slides = slider.container.querySelectorAll('.slide');
        if (slides.length === 0) {
            console.warn('No slides found in slider:', slider);
            return;
        }

        // Get the width of the first slide, including margins/padding
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft || 0) + parseInt(getComputedStyle(slides[0]).marginRight || 0);
        const prevButton = slider.controls.querySelector('.round-button:first-child');
        const nextButton = slider.controls.querySelector('.round-button:last-child');

        // Function to move slider
        function moveSlider() {
            slider.container.style.transition = 'transform 0.5s ease-in-out';
            slider.container.style.transform = `translateX(-${slider.currentIndex * slideWidth}px)`;
        }

        // Next slide function
        function nextSlide() {
            if (slider.currentIndex < slider.maxSlides - 1) {
                slider.currentIndex++;
            } else {
                slider.currentIndex = 0; // Loop back to first slide
            }
            moveSlider();
        }

        // Previous slide function
        function prevSlide() {
            if (slider.currentIndex > 0) {
                slider.currentIndex--;
            } else {
                slider.currentIndex = slider.maxSlides - 1; // Loop to last slide
            }
            moveSlider();
        }

        // Event listeners for buttons
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        } else {
            console.warn('Next button not found for slider:', slider);
        }

        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        } else {
            console.warn('Previous button not found for slider:', slider);
        }

        // Handle window resize to recalculate slide width
        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft || 0) + parseInt(getComputedStyle(slides[0]).marginRight || 0);
            slider.container.style.transform = `translateX(-${slider.currentIndex * newSlideWidth}px)`;
        });

        // Initialize slider position
        moveSlider();
    });
});
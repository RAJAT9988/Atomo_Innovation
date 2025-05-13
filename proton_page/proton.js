document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Functionality
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navList = document.querySelector('#navbar ul');

        if (!hamburger || !navList) {
            console.warn('Hamburger or navList not found!');
            return;
        }

        hamburger.addEventListener('click', function () {
            navList.classList.toggle('active');
            this.classList.toggle('open');

            const navItems = navList.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (navList.classList.contains('active')) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                }
            });
        });

        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                hamburger.classList.remove('open');
                const navItems = navList.querySelectorAll('li');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            });
        });
    }

    function initializeSlider(sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slide');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        const dots = sliderContainer.querySelectorAll('.dot');
    
        if (!slider || slides.length === 0 || !prevBtn || !nextBtn || !dots.length) {
            console.warn('Slider elements missing in:', sliderContainer);
            return;
        }
    
        function getVisibleSlides() {
            const width = window.innerWidth;
            if (width <= 480) return 1;
            if (width <= 768) return 2;
            if (width <= 1024) return 3;
            return 4;
        }
    
        let visibleSlides = getVisibleSlides();
        const totalSlides = slides.length;
        let currentIndex = 0;
        let isTransitioning = false;
        let autoSlideInterval = null;
        let touchStartX = 0;
        let touchEndX = 0;
    
        // Update dots
        function updateDots() {
            const visibleDots = Math.min(totalSlides, dots.length);
            const activeIndex = currentIndex % totalSlides;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex && index < visibleDots);
            });
        }
    
        // Update slider position
        function updateSlider(useTransition = true) {
            if (isTransitioning) return;
            isTransitioning = useTransition;
    
            slider.style.transition = useTransition
                ? 'transform 0.5s ease-in-out'
                : 'none';
            const offset = -(currentIndex * (100 / visibleSlides));
            slider.style.transform = `translateX(${offset}%)`;
    
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', Math.abs(index - currentIndex) < visibleSlides);
            });
    
            updateDots();
    
            // Reset to first slide after reaching the 9th slide
            if (currentIndex >= 8) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                    startAutoSlide();
                }, useTransition ? 500 : 0);
            }
    
            if (useTransition) {
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            } else {
                isTransitioning = false;
            }
        }
    
        // Handle looping
        function handleTransitionEnd() {
            if (currentIndex >= totalSlides) {
                currentIndex = 0;
                updateSlider(false);
            } else if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
                updateSlider(false);
            }
        }
    
        // Autoplay
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (currentIndex < 8) {
                    currentIndex++;
                    updateSlider(true);
                } else {
                    updateSlider(true); // Trigger the reset in updateSlider
                }
            }, 3000);
        }
    
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
    
        // Button events
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex++;
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });
    
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex--;
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });
    
        // Dot events
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                const slideIndex = parseInt(dot.getAttribute('data-slide')) - 1;
                currentIndex = slideIndex;
                updateSlider(true);
                stopAutoSlide();
                startAutoSlide();
            });
        });
    
        // Touch events
        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            stopAutoSlide();
        });
    
        slider.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        });
    
        slider.addEventListener('touchend', () => {
            const touchDistance = touchStartX - touchEndX;
            if (Math.abs(touchDistance) > 50) {
                if (touchDistance > 0) {
                    currentIndex++;
                } else {
                    currentIndex--;
                }
                updateSlider(true);
            }
            startAutoSlide();
        });
    
        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
        // Handle resize
        window.addEventListener('resize', () => {
            const newVisibleSlides = getVisibleSlides();
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                currentIndex = Math.min(currentIndex, totalSlides - 1);
                updateSlider(false);
            }
        });
    
        // Initialize
        updateSlider(false);
        startAutoSlide();
        slider.addEventListener('transitionend', handleTransitionEnd);
    }

    // Scroll-Controlled Video
    function initializeVideoScroll() {
        const video = document.getElementById('scrollVideo');
        const firstPage = document.getElementById('first-page');

        if (!video || !firstPage) {
            console.warn('Video or first page not found!');
            return;
        }

        const keyTimes = [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.3, 4.6, 4.9, 5.3, 5.6, 5.8];
        const totalDuration = Math.max(...keyTimes);

        video.currentTime = 0;
        video.pause();

        const updateVideoTime = () => {
            const firstPageHeight = firstPage.offsetHeight;
            const windowHeight = window.innerHeight;
            const triggerPoint = firstPageHeight - windowHeight;
            const scrollY = window.scrollY;

            const secondPage = document.getElementById('second-page');
            const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
            const sectionBottom = triggerPoint + scrollableSectionHeight;

            const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;

            if (!isInVideoSection) {
                video.pause();
                if (scrollY < triggerPoint) {
                    video.currentTime = 0;
                } else if (scrollY > sectionBottom) {
                    video.currentTime = totalDuration;
                }
                return;
            }

            const scrollPositionInSection = Math.max(0, Math.min(scrollY - triggerPoint, scrollableSectionHeight));
            const progress = scrollPositionInSection / scrollableSectionHeight;
            const currentTime = progress * totalDuration;

            let targetTime = 0;
            for (let i = 0; i < keyTimes.length - 1; i++) {
                const startProgress = (keyTimes[i] / totalDuration);
                const endProgress = (keyTimes[i + 1] / totalDuration);
                if (progress >= startProgress && progress <= endProgress) {
                    const keyProgress = (progress - startProgress) / (endProgress - startProgress);
                    targetTime = keyTimes[i] + (keyTimes[i + 1] - keyTimes[i]) * keyProgress;
                    break;
                }
            }

            if (progress >= (keyTimes[keyTimes.length - 1] / totalDuration)) {
                targetTime = keyTimes[keyTimes.length - 1];
            }

            video.currentTime = targetTime;

            if (video.paused && scrollPositionInSection > 0 && scrollPositionInSection < scrollableSectionHeight) {
                video.play().catch(e => console.log("Playback prevented:", e));
            }
        };

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            updateVideoTime();

            scrollTimeout = setTimeout(() => {
                const firstPageHeight = firstPage.offsetHeight;
                const windowHeight = window.innerHeight;
                const triggerPoint = firstPageHeight - windowHeight;
                const secondPage = document.getElementById('second-page');
                const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
                const sectionBottom = triggerPoint + scrollableSectionHeight;
                const scrollY = window.scrollY;

                const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;
                if (isInVideoSection) {
                    video.pause();
                }
            }, 50);
        });

        updateVideoTime();
    }

    // Third Page Animation
    function initializeThirdPageAnimation() {
        const thirdPage = document.getElementById('third-page');
        const fourthPage = document.getElementById('fourth-page');
        const modelContainer = document.querySelector('.model-scroll-container');
        const centralCircle = document.querySelector('.central-circle');
        const featureCircles = document.querySelectorAll('.feature-circle');
        const svg = document.querySelector('.connection-lines');

        if (!thirdPage || !fourthPage || !centralCircle || !featureCircles.length || !svg) {
            console.warn('Third page animation elements missing!');
            return;
        }

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        const markerStart = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        markerStart.setAttribute('id', 'arrow-start');
        markerStart.setAttribute('viewBox', '0 0 10 10');
        markerStart.setAttribute('refX', '5');
        markerStart.setAttribute('refY', '5');
        markerStart.setAttribute('markerWidth', '6');
        markerStart.setAttribute('markerHeight', '6');
        markerStart.setAttribute('orient', 'auto-start-reverse');
        const arrowStartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowStartPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowStartPath.setAttribute('class', 'marker');
        markerStart.appendChild(arrowStartPath);
        defs.appendChild(markerStart);

        const markerEnd = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        markerEnd.setAttribute('id', 'arrow-end');
        markerEnd.setAttribute('viewBox', '0 0 10 10');
        markerEnd.setAttribute('refX', '5');
        markerEnd.setAttribute('refY', '5');
        markerEnd.setAttribute('markerWidth', '6');
        markerEnd.setAttribute('markerHeight', '6');
        markerEnd.setAttribute('orient', 'auto');
        const arrowEndPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowEndPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowEndPath.setAttribute('class', 'marker');
        markerEnd.appendChild(arrowEndPath);
        defs.appendChild(markerEnd);

        svg.appendChild(defs);

        let fifthFeatureActivated = false;
        let fifthFeatureTimer = null;

        function createLines() {
            // Placeholder: Implement line creation logic if needed
        }

        function handleScroll() {
            const scrollPosition = window.scrollY + window.innerHeight;
            const thirdPageTop = thirdPage.offsetTop;
            const thirdPageHeight = thirdPage.offsetHeight;
            const fourthPageHeight = fourthPage.offsetHeight;

            const thirdPageBottom = thirdPageTop + thirdPageHeight;

            const scrollProgress = Math.min(
                Math.max((scrollPosition - thirdPageBottom) / fourthPageHeight, 0),
                1
            );

            if (scrollPosition >= thirdPageBottom) {
                centralCircle.classList.add('active');
            } else {
                centralCircle.classList.remove('active');
                fifthFeatureActivated = false;
                if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
            }

            const featureCount = featureCircles.length;
            featureCircles.forEach((feature, index) => {
                const threshold = (index + 1) * 0.16;
                if (scrollProgress >= threshold) {
                    feature.classList.add('active');
                    if (index === 4 && !fifthFeatureActivated) {
                        fifthFeatureActivated = true;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                        fifthFeatureTimer = setTimeout(() => {
                            centralCircle.classList.add('effect-complete');
                        }, 1000);
                    }
                } else {
                    feature.classList.remove('active');
                    if (index === 4) {
                        fifthFeatureActivated = false;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                    }
                }
            });

            createLines();

            const scale = 1 + (scrollProgress * 0.2);
            centralCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        function init() {
            createLines();
            window.addEventListener('resize', createLines);
            handleScroll();
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
                        window.addEventListener('scroll', handleScroll);
                        handleScroll();
                    } else {
                        window.removeEventListener('scroll', handleScroll);
                        centralCircle.classList.remove('active');
                        centralCircle.classList.remove('effect-complete');
                        featureCircles.forEach(feature => feature.classList.remove('active'));
                        fifthFeatureActivated = false;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                        createLines();
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: `0px 0px -${thirdPage.offsetHeight - 50}px 0px`
            }
        );

        observer.observe(thirdPage);
        init();
    }

    // Initialize all components
    initializeHamburgerMenu();
    const sliders = document.querySelectorAll('#second-page, #fourth-page');
    sliders.forEach(slider => initializeSlider(slider));
    initializeVideoScroll();
    initializeThirdPageAnimation();
});



document.addEventListener('DOMContentLoaded', function() {
    const sliders = [
        {
            container: document.querySelector('#second-page .slider'),
            controls: document.querySelector('#second-page .slider-controls'),
            currentIndex: 0,
            maxSlides: 8
        },
        {
            container: document.querySelector('#fourth-page .slider'),
            controls: document.querySelector('#fourth-page .slider-controls'),
            currentIndex: 0,
            maxSlides: 8
        }
    ];

    sliders.forEach((slider) => {
        if (!slider.container || !slider.controls) {
            console.warn('Slider container or controls not found:', slider);
            return;
        }

        const slides = slider.container.querySelectorAll('.slide');
        if (slides.length === 0) {
            console.warn('No slides found in slider:', slider);
            return;
        }

        slider.maxSlides = Math.min(slider.maxSlides, slides.length);
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft || 0) + parseInt(getComputedStyle(slides[0]).marginRight || 0);
        const prevButton = slider.controls.querySelector('.round-button:first-child');
        const nextButton = slider.controls.querySelector('.round-button:last-child');

        function moveSlider() {
            slider.container.style.transition = 'transform 0.5s ease-in-out';
            slider.container.style.transform = `translateX(-${slider.currentIndex * slideWidth}px)`;
        }

        function nextSlide() {
            if (slider.currentIndex < slider.maxSlides - 1) {
                slider.currentIndex++;
            } else {
                slider.currentIndex = 0;
            }
            moveSlider();
        }

        function prevSlide() {
            if (slider.currentIndex > 0) {
                slider.currentIndex--;
            } else {
                slider.currentIndex = slider.maxSlides - 1;
            }
            moveSlider();
        }

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

        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft || 0) + parseInt(getComputedStyle(slides[0]).marginRight || 0);
            slider.container.style.transform = `translateX(-${slider.currentIndex * newSlideWidth}px)`;
        });

        moveSlider();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('electron-video');
    
    // Pause the video when it ends to stick at the last frame
    video.addEventListener('ended', () => {
        video.pause();
        video.currentTime = video.duration; // Ensure it stays on the last frame
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const featureSlider2 = document.querySelector('.features-slider2');
    const featureSlides2 = document.querySelectorAll('.feature-slide2');
    const prevFeatureBtn2 = document.querySelector('#second-page .prev-feature');
    const nextFeatureBtn2 = document.querySelector('#second-page .next-feature');
    const secondPageSection = document.querySelector('#second-page');

    let currentFeatureIndex2 = 0;
    const autoSlideInterval2 = 10000; // 10 seconds interval for regular sliding
    const restartDelay = 1000; // 1 second delay for restart
    let autoSlideTimer2 = null;
    let isAutoSliding2 = false;

    function updateSlidesToShow2() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function updateFeatureSlider2() {
        const slidesToShow = updateSlidesToShow2();
        const slideWidth = featureSlides2[0].offsetWidth + 30; // Width + margin
        const translateX = -currentFeatureIndex2 * slideWidth;
        featureSlider2.style.transform = `translateX(${translateX}px)`;

        // Disable buttons at boundaries
        prevFeatureBtn2.disabled = currentFeatureIndex2 === 0;
        nextFeatureBtn2.disabled = currentFeatureIndex2 >= featureSlides2.length - slidesToShow;
    }

    function autoSlide2() {
        const slidesToShow = updateSlidesToShow2();
        // Check if the current index is at the last visible slide
        if (currentFeatureIndex2 >= featureSlides2.length - slidesToShow) {
            // Wait for 1 second before restarting
            setTimeout(() => {
                currentFeatureIndex2 = 0; // Reset to the first slide
                updateFeatureSlider2();
                // Resume with the normal 10-second interval if still in view
                if (isAutoSliding2) {
                    autoSlideTimer2 = setTimeout(autoSlide2, autoSlideInterval2);
                }
            }, restartDelay);
        } else {
            // Move to the next slide
            currentFeatureIndex2++;
            updateFeatureSlider2();
            // Continue with the normal 10-second interval if still in view
            if (isAutoSliding2) {
                autoSlideTimer2 = setTimeout(autoSlide2, autoSlideInterval2);
            }
        }
    }

    // Intersection Observer to detect when the second page is in view
    const observer2 = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Start auto-sliding when the section comes into view
                    if (!isAutoSliding2) {
                        isAutoSliding2 = true;
                        autoSlideTimer2 = setTimeout(autoSlide2, autoSlideInterval2);
                    }
                } else {
                    // Stop auto-sliding when the section is out of view
                    if (isAutoSliding2) {
                        isAutoSliding2 = false;
                        clearTimeout(autoSlideTimer2);
                    }
                }
            });
        },
        {
            threshold: 0.3, // Start when 30% of the section is visible
        }
    );

    // Start observing the second page section
    observer2.observe(secondPageSection);

    // Pause auto-sliding on button click and resume after a delay
    prevFeatureBtn2.addEventListener('click', () => {
        clearTimeout(autoSlideTimer2); // Pause auto-sliding
        if (currentFeatureIndex2 > 0) {
            currentFeatureIndex2--; // Move one slide backward
            updateFeatureSlider2();
        }
        // Resume auto-sliding after 10 seconds if the section is still in view
        if (isAutoSliding2) {
            autoSlideTimer2 = setTimeout(autoSlide2, autoSlideInterval2);
        }
    });

    nextFeatureBtn2.addEventListener('click', () => {
        clearTimeout(autoSlideTimer2); // Pause auto-sliding
        const slidesToShow = updateSlidesToShow2();
        if (currentFeatureIndex2 < featureSlides2.length - slidesToShow) {
            currentFeatureIndex2++; // Move one slide forward
            updateFeatureSlider2();
            // Resume with the normal 10-second interval if still in view
            if (isAutoSliding2) {
                autoSlideTimer2 = setTimeout(autoSlide2, autoSlideInterval2);
            }
        } else {
            // At the last slide, wait 1 second before restarting
            setTimeout(() => {
                currentFeatureIndex2 = 0; // Reset to the first slide
                updateFeatureSlider2();
                // Resume with the normal 10-second interval if still in view
                if (isAutoSliding2) {
                    autoSlideTimer2 = setTimeout(autoSlide2, autoSlideInterval2);
                }
            }, restartDelay);
        }
    });

    // Responsive handling for the second page slider
    window.addEventListener('resize', () => {
        updateFeatureSlider2();
    });

    // Initialize the second page slider
    updateFeatureSlider2();
});

document.addEventListener('DOMContentLoaded', function () {
    const featureSlider = document.querySelector('.features-slider');
    const featureSlides = document.querySelectorAll('.feature-slide');
    const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
    const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
    const fourthPageSection = document.querySelector('#fourth-page');

    let currentFeatureIndex = 0;
    const autoSlideInterval = 10000; // 10 seconds interval for regular sliding
    const restartDelay = 1000; // 1 second delay for restart
    let autoSlideTimer = null;
    let isAutoSliding = false;

    function updateSlidesToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function updateFeatureSlider() {
        const slidesToShow = updateSlidesToShow();
        const slideWidth = featureSlides[0].offsetWidth + 30; // Width + margin
        const translateX = -currentFeatureIndex * slideWidth;
        featureSlider.style.transform = `translateX(${translateX}px)`;

        // Disable buttons at boundaries
        prevFeatureBtn.disabled = currentFeatureIndex === 0;
        nextFeatureBtn.disabled = currentFeatureIndex >= featureSlides.length - slidesToShow;
    }

    function autoSlide() {
        const slidesToShow = updateSlidesToShow();
        // Check if the current index is at the last visible slide
        if (currentFeatureIndex >= featureSlides.length - slidesToShow) {
            // Wait for 1 second before restarting
            setTimeout(() => {
                currentFeatureIndex = 0; // Reset to the first slide
                updateFeatureSlider();
                // Resume with the normal 10-second interval if still in view
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }, restartDelay);
        } else {
            // Move to the next slide
            currentFeatureIndex++;
            updateFeatureSlider();
            // Continue with the normal 10-second interval if still in view
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        }
    }

    // Intersection Observer to detect when the fourth page is in view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Start auto-sliding when the section comes into view
                    if (!isAutoSliding) {
                        isAutoSliding = true;
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                } else {
                    // Stop auto-sliding when the section is out of view
                    if (isAutoSliding) {
                        isAutoSliding = false;
                        clearTimeout(autoSlideTimer);
                    }
                }
            });
        },
        {
            threshold: 0.3, // Start when 30% of the section is visible
        }
    );

    // Start observing the fourth page section
    observer.observe(fourthPageSection);

    // Pause auto-sliding on button click and resume after a delay
    prevFeatureBtn.addEventListener('click', () => {
        clearTimeout(autoSlideTimer); // Pause auto-sliding
        if (currentFeatureIndex > 0) {
            currentFeatureIndex--; // Move one slide backward
            updateFeatureSlider();
        }
        // Resume auto-sliding after 10 seconds if the section is still in view
        if (isAutoSliding) {
            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
        }
    });

    nextFeatureBtn.addEventListener('click', () => {
        clearTimeout(autoSlideTimer); // Pause auto-sliding
        const slidesToShow = updateSlidesToShow();
        if (currentFeatureIndex < featureSlides.length - slidesToShow) {
            currentFeatureIndex++; // Move one slide forward
            updateFeatureSlider();
            // Resume with the normal 10-second interval if still in view
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        } else {
            // At the last slide, wait 1 second before restarting
            setTimeout(() => {
                currentFeatureIndex = 0; // Reset to the first slide
                updateFeatureSlider();
                // Resume with the normal 10-second interval if still in view
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }, restartDelay);
        }
    });

    // Responsive handling for the fourth page slider
    window.addEventListener('resize', () => {
        updateFeatureSlider();
    });

    // Initialize the fourth page slider
    updateFeatureSlider();
});

document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-button');
    const popup = document.getElementById('subscription-popup');
    const subscribeButton = document.getElementById('subscribe-button');
    const emailInput = document.getElementById('email-input');

    // Show popup when any Buy button is clicked
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.classList.add('active');
        });
    });

    // Hide popup when clicking outside the popup content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    // Handle subscription (placeholder action)
    subscribeButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            emailInput.value = '';
            popup.classList.remove('active');
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

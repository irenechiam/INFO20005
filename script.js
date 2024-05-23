// product list js. 
let slider = document.querySelector('.slider'); 
let slides = Array.from(slider.children); 
let nextButton = document.querySelector('.right_arrow');
let prevButton = document.querySelector('.left_arrow');
let dotsNav = document.querySelector('.carousel_nav'); 
let dots = Array.from(dotsNav.children);
let slideWidth = slides[0].getBoundingClientRect().width; 


function setSlidePosition(slide, index) { 
    slide.style.left = slideWidth * index + 'px'; 
}

function moveToSlide (slider, current_slide, targetSlide) { 
    slider.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    current_slide.classList.remove('current_slide'); 
    targetSlide.classList.add('current_slide'); 
}

function updateDots (currentDot, targetDot) { 
    currentDot.classList.remove('current_slide'); 
    targetDot.classList.add('current_slide'); 
}

function arrowVisibility (slides, prevButton, nextButton, targetIndex) { 
    if (targetIndex === 0) { 
        prevButton.classList.add('is_hidden'); 
        nextButton.classList.remove('is_hidden'); 
    } else if (targetIndex === slides.length -1) { 
        prevButton.classList.remove('is_hidden'); 
        nextButton.classList.add('is_hidden'); 
    } else { 
        prevButton.classList.remove('is_hidden'); 
        nextButton.classList.remove('is_hidden'); 
    }
    
}


slides.forEach(setSlidePosition); 

nextButton.addEventListener('click', function() {
    let currentSlide = slider.querySelector('.current_slide'); 
    let nextSlide = currentSlide.nextElementSibling; 
    let currentDot = dotsNav.querySelector('.current_slide'); 
    let nextDot = currentDot.nextElementSibling;
    let nextIndex = slides.findIndex(slide => slide === nextSlide); 

    moveToSlide(slider, currentSlide, nextSlide); 
    updateDots(currentDot, nextDot); 
    arrowVisibility (slides, prevButton, nextButton, nextIndex);
}); 

prevButton.addEventListener('click', function() { 
    let currentSlide = slider.querySelector('.current_slide'); 
    let prevSlide = currentSlide.previousElementSibling; 
    let currentDot = dotsNav.querySelector('.current_slide'); 
    let prevDot = currentDot.previousElementSibling;
    let prevIndex = slides.findIndex(slide => slide === prevSlide); 
    
    moveToSlide(slider, currentSlide, prevSlide); 
    updateDots(currentDot, prevDot);
    arrowVisibility (slides, prevButton, nextButton, prevIndex);
})

dotsNav.addEventListener('click', e => { 
    let targetDot = e.target.closest('button'); 
    
    if (!targetDot) return; 

    let currentSlide = slider.querySelector('.current_slide'); 
    let currentDot = dotsNav.querySelector('.current_slide'); 
    let targetIndex = dots.findIndex(dot => dot === targetDot);
    let targetSlide = slides[targetIndex]; 

    moveToSlide(slider, currentSlide, targetSlide);
    updateDots(currentDot, targetDot); 
    arrowVisibility (slides, prevButton, nextButton, targetIndex);

})

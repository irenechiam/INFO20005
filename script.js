
/* 
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const leftArrow = document.querySelector('.arrow_left');
    const rightArrow = document.querySelector('.arrow_right');

    let sectionIndex = 0;
    const totalSections = 3; // assuming there are 3 sections

    document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
        indicator.addEventListener('click', function()) { 
            slider.style.transform = 'translate(' + (ind) * -33.3 + '%)'
        }
    })

    rightArrow.addEventListener('click', function() {
        if (sectionIndex < totalSections - 1) {
            sectionIndex++;
        }
        slider.style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
    });

    leftArrow.addEventListener('click', function() {
        if (sectionIndex > 0) {
            sectionIndex--;
        }
        slider.style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
    });
}); 
*/ 


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


slides.forEach(setSlidePosition); 

nextButton.addEventListener('click', function() {
    let currentSlide = slider.querySelector('.current_slide'); 
    let nextSlide = currentSlide.nextElementSibling; 

    moveToSlide(slider, currentSlide, nextSlide); 
}); 

prevButton.addEventListener('click', function() { 
    let currentSlide = slider.querySelector('.current_slide'); 
    let prevSlide = currentSlide.previousElementSibling; 
    
    moveToSlide(slider, currentSlide, prevSlide); 
})

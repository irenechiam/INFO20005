
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



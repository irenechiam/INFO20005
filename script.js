/* const slider = document.querySelector('.slider'); 

const leftArrow = document.querySelector('.arrow_left');
const rightArrow = document.querySelector('.arrow_right');

let sectionIndex = 0;

document.addEventListener('click',function() { 
    if (sectionIndex < 2 ) { 
        sectionIndex = sectionIndex + 1;  
    } else { 
        sectionIndex = 2
    }
    document.querySelector('.slider').style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
}); 

*/ 

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const leftArrow = document.querySelector('.arrow_left');
    const rightArrow = document.querySelector('.arrow_right');

    let sectionIndex = 0;
    const totalSections = 3; // assuming there are 3 sections

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

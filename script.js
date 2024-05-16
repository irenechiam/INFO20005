const slider = document.querySelector('.slider'); 

const leftArrow = document.querySelector('.arrow_left');
const rightArrow = document.querySelector('#arrow_right');

let sectionIndex = 0;

document.addEventListener('click',function() { 
    sectionIndex = sectionIndex + 1;
    document.querySelector('.slider').style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
}); 
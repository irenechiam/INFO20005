




document.addEventListener('DOMContentLoaded', () => {
    // Product list JS
    const slider = document.querySelector('.slider'); 
    if (slider) {
        const slides = Array.from(slider.children); 
        const nextButton = document.querySelector('.right_arrow');
        const prevButton = document.querySelector('.left_arrow');
        const dotsNav = document.querySelector('.carousel_nav'); 
        const dots = Array.from(dotsNav.children);
        const slideWidth = slides[0].getBoundingClientRect().width; 

        function setSlidePosition(slide, index) { 
            slide.style.left = slideWidth * index + 'px'; 
        }

        function moveToSlide(slider, currentSlide, targetSlide) { 
            slider.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current_slide'); 
            targetSlide.classList.add('current_slide'); 
        }

        function updateDots(currentDot, targetDot) { 
            currentDot.classList.remove('current_slide'); 
            targetDot.classList.add('current_slide'); 
        }

        function arrowVisibility(slides, prevButton, nextButton, targetIndex) { 
            if (targetIndex === 0) { 
                prevButton.classList.add('is_hidden'); 
                nextButton.classList.remove('is_hidden'); 
            } else if (targetIndex === slides.length - 1) { 
                prevButton.classList.remove('is_hidden'); 
                nextButton.classList.add('is_hidden'); 
            } else { 
                prevButton.classList.remove('is_hidden'); 
                nextButton.classList.remove('is_hidden'); 
            }
        }

        slides.forEach(setSlidePosition); 

        nextButton.addEventListener('click', function() {
            const currentSlide = slider.querySelector('.current_slide'); 
            const nextSlide = currentSlide.nextElementSibling; 
            const currentDot = dotsNav.querySelector('.current_slide'); 
            const nextDot = currentDot.nextElementSibling;
            const nextIndex = slides.findIndex(slide => slide === nextSlide); 

            moveToSlide(slider, currentSlide, nextSlide); 
            updateDots(currentDot, nextDot); 
            arrowVisibility(slides, prevButton, nextButton, nextIndex);
        }); 

        prevButton.addEventListener('click', function() { 
            const currentSlide = slider.querySelector('.current_slide'); 
            const prevSlide = currentSlide.previousElementSibling; 
            const currentDot = dotsNav.querySelector('.current_slide'); 
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = slides.findIndex(slide => slide === prevSlide); 
            
            moveToSlide(slider, currentSlide, prevSlide); 
            updateDots(currentDot, prevDot);
            arrowVisibility(slides, prevButton, nextButton, prevIndex);
        });

        dotsNav.addEventListener('click', e => { 
            const targetDot = e.target.closest('button'); 
            
            if (!targetDot) return; 

            const currentSlide = slider.querySelector('.current_slide'); 
            const currentDot = dotsNav.querySelector('.current_slide'); 
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex]; 

            moveToSlide(slider, currentSlide, targetSlide);
            updateDots(currentDot, targetDot); 
            arrowVisibility(slides, prevButton, nextButton, targetIndex);
        });
    }

    // Product page JS
    let count = 0;
    let amount = 1; 
    let celtPrice = 2000;  

    const cart = document.querySelector('.cart');
    const openCart = document.querySelector('.cart_btn');
    const closeCart = document.querySelector('.cart_close_btn')

    const totalIndicator = document.querySelector('.total_indicator'); 

    const addTrigger = document.querySelector('.add_to_cart');
    const amountToAdd = document.querySelector('.amount_to_add'); 
    const increaseAdd = document.querySelector('.increase'); 
    const decreaseAdd = document.querySelector('.decrease');


    const decreaseValue = document.querySelector('.decrease_value');
    const increaseValue = document.querySelector('.increase_value');
    const quantityValue = document.querySelector('.quantity_value');
    const totalSumElement = document.querySelector('.total_price');
    

    
    function updateTotalPrice() {
        const totalPrice = count * celtPrice;
        totalSumElement.innerHTML = `$${totalPrice}`;
        updateTotalIndicator();
    }
    
    function increaseCount() {
        count += 1; 
        quantityValue.innerHTML = count;
        updateTotalPrice();
    }
    
    function increaseAmount() { 
        amount += 1; 
        amountToAdd.innerHTML = amount; 
    }

    function updateTotalIndicator() {
       if (count > 0) { 
        totalIndicator.innerHTML = count; 
       } else { 
        totalIndicator.innerHTML = 0;
       }
    }

   
    //within product info page 

    openCart.addEventListener('click', e => { 
        cart.style.width = '500px'; 
    })

    closeCart.addEventListener('click', e=> { 
        cart.style.width = '0px'; 
    })

  addTrigger.addEventListener('click', e => { 
        if (amount > 1) { 
            count += amount; 
            quantityValue.innerHTML = count; 
            amount = 1; 
            amountToAdd.innerHTML = amount; 
        } else { 
            increaseCount();
        } 

        updateTotalPrice();
        cart.style.width = '500px'; 

    });

    increaseAdd.addEventListener('click', e => { 
        increaseAmount(); 
    })

    decreaseAdd.addEventListener('click', e=> { 
        if (amount > 1 ) { 
            amount -= 1; 
            amountToAdd.innerHTML = amount; 
        }
    })

function openNav() {
    document.getElementById("mySideNav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}

    // within cart
    decreaseValue.addEventListener('click', e => { 
        if (count > 0) {
            count -= 1;
            quantityValue.innerHTML = count;
            updateTotalPrice();
        }
    });
    
    increaseValue.addEventListener('click', e => { 
        increaseCount();
    });
    
  
    
    // Initial total price update
    updateTotalPrice();
    updateTotalIndicator();

 

});



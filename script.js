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

    let count = 0;
    let amount = 0; 
    let price = parseFloat(document.querySelector('.price_text').textContent.replace('$', '').replace('AUD', '').trim());


    const cart = document.querySelector('.cart');
    const openCart = document.querySelector('.cart_btn');
    const closeCart = document.querySelector('.cart_close_btn')
    const totalIndicator = document.querySelector('.total_indicator'); 
    const itemContainer = document.querySelector('.items_container'); 
    const addTrigger = document.querySelector('.add_to_cart');
    const amountToAdd = document.querySelector('.amount_to_add'); 
    const increaseAdd = document.querySelector('.increase'); 
    const decreaseAdd = document.querySelector('.decrease');
    const decreaseValue = document.querySelector('.decrease_value');
    const increaseValue = document.querySelector('.increase_value');
    const quantityValue = document.querySelector('.quantity_value');
    const totalSumElement = document.querySelector('.total_price');

    // Function to update session storage
function updateSessionStorage() {
    const productName = document.querySelector('h2').textContent.trim();
    const cartData = {
        count: count,
        totalPrice: count * price,
        productName: productName,
        price: price
    };
    sessionStorage.setItem('cartData', JSON.stringify(cartData));
}

// Function to load cart data from session storage
function loadSessionStorage() {
    const storedCartData = sessionStorage.getItem('cartData');
    if (storedCartData) {
        const cartData = JSON.parse(storedCartData);
        count = cartData.count;
        price = cartData.price;
        totalSumElement.innerHTML = `$${cartData.totalPrice}`;
        quantityValue.innerHTML = count;
        updateTotalIndicator();
        emptyCartMessage();
    }
}
    
    
    function updateTotalPrice() {
        const totalPrice = count * price;
        totalSumElement.innerHTML = `$${totalPrice}`;
        updateTotalIndicator();
        emptyCartMessage();
        updateSessionStorage(); 
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

    function emptyCartMessage() { 
        if (count > 0) { 
            itemContainer.classList.remove('is_hidden');
            document.querySelector('.shopping_cart').classList.add('is_hidden');
            document.querySelector('.no_items').classList.add('is_hidden');
        } else {
            itemContainer.classList.add('is_hidden');
            document.querySelector('.shopping_cart').classList.remove('is_hidden');
            document.querySelector('.no_items').classList.remove('is_hidden');
        }
    }

    openCart.addEventListener('click', e => { 
        cart.style.width = '500px'; 
        document.querySelector('.productInfo_container').style.opacity = '0.2'
    })

    closeCart.addEventListener('click', e=> { 
        cart.style.width = '0px'; 
        document.querySelector('.productInfo_container').style.opacity = '1'
    })

  addTrigger.addEventListener('click', e => { 
    if (amount > 0) { 
        if (amount > 1) { 
            count += amount; 
            quantityValue.innerHTML = count; 
            amount = 0; 
            amountToAdd.innerHTML = amount; 
        } else { 
            increaseCount();
        }  }
        updateTotalPrice();
        cart.style.width = '500px'; 
        document.querySelector('.productInfo_container').style.opacity = '0.2'

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

      // within cart
      decreaseValue.addEventListener('click', e => { 
        if (count > 0) {
            count -= 1;
            quantityValue.innerHTML = count;
            updateTotalPrice();
        } 
        increaseValue.addEventListener('click', e => { 
            increaseCount();
        });
        
      
        
        // Initial total price update
        updateTotalPrice();
        updateTotalIndicator();
        emptyCartMessage(); 
    
        document.addEventListener('DOMContentLoaded', loadSessionStorage);
    });
});

//nav
function openNav() {
    document.getElementById("mySideNav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}




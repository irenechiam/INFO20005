




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

    // let cartData = JSON.parse(sessionStorage.getItem('cart') || '[]');
 
    // function updateTotalPrice(cartData) {
    //    let total = cartData.reduce((sum,item) => sum + (item.price * item.quantity), 0);
    //    totalSumElement.innerText = '${total}'; 
    // }
    
 
    // function displayCartItems(){
    //     if (cartData === 0) { 
    //         nilMessage.classList.remove(is_hidden); 
    //     } else {
    //         nilMessage.classList.add('is_hidden'); 
    //         itemContainer.innerHTML = '';
    //         cartData.forEach(item => {
    //             let itemElement = document.createElement('div'); 
    //             itemElement.classList.add('items')
    //             itemElement.innerHTML =    `
    //             <img src="${item.image}" alt="${item.name}">
    //             <div class="details">
    //                 <div class="name">${item.name}</div>
    //                 <div class="price">$${item.price} / ${item.quantity}</div>
    //             </div>
    //             <div class="quantity">
    //                 <button class="decrease_value">-</button>
    //                 <span class="quantity_value">${item.quantity}</span>
    //                 <button class="increase_value">+</button>
    //             </div>
    //             `;
    //             itemContainer.appendChild('itemElement'); 
    //         }); 
    //         updateTotalPrice(cartData); 
    //     }
    // }

    //start 
        const cartOverlay = document.querySelector('.cart_overlay');
        const iframe = document.querySelector('.cart_iframe');
        const openCart = document.querySelector('.cart_btn');
    

    
    function updateTotalPrice() {
        const totalPrice = count * celtPrice;
        totalSumElement.innerHTML = `$${totalPrice}`;
        updateTotalIndicator();
    }

    function saveCartToSessionStorage(product) {
        cartData.push(product);
        sessionStorage.setItem('cart', JSON.stringify(cartData));
    }

    function addToCart(product) {
        saveCartToSessionStorage(product);
        const cartOverlay = document.querySelector('.cart_overlay');
        cartOverlay.style.width = '500px';
        document.querySelector('.productInfo_container').style.opacity = '0.2';
    }

    function displayCartItems() {
        const nilMessage = document.querySelector('.nil');
        const itemContainer = document.querySelector('.items_container');
        
        if (!nilMessage) {
            console.error("No element with class 'nil' found.");
            return;
        }
        if (!itemContainer) {
            console.error("No element with class 'items_container' found.");
            return;
        }

    function emptyCartMessage() { 
        if (count>0) { 
            itemContainer.classList.remove('is_hidden');
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
            amount = 0; 
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

    // within cart
    decreaseValue.addEventListener('click', e => { 
        if (count > 0) {
            count -= 1;
            quantityValue.innerHTML = count;
            updateTotalPrice();
        }
    });
    

    // // within cart
    // const decreaseValue = document.querySelector('.decrease_value');
    // const increaseValue = document.querySelector('.increase_value');
    // const quantityValue = document.querySelector('.quantity_value');

    

    
    // Initial total price update
    updateTotalPrice();
    updateTotalIndicator();

 

});


    // nav
    function openNav() {
        document.getElementById("mySideNav").style.width = "350px";
    }
    
    function closeNav() {
        document.getElementById("mySideNav").style.width = "0";
    }
    
    

});


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

    //within product page
    //adding nunber of product(s) to cart
    const amountToAdd = document.querySelector('.amount_to_add'); 
    const increaseAdd = document.querySelector('.increase'); 
    const decreaseAdd = document.querySelector('.decrease');
    const addTrigger = document.querySelector('.add_to_cart');

    let amount = 0; //user toggles this before adding to cart 

    function increaseAmount() { //function adds 1 to amount 
        amount += 1; 
        amountToAdd.innerHTML = amount; 
    }    

    //on clicks to adjust amount number
    increaseAdd.addEventListener('click', e => { 
        increaseAmount(); 
    })

    decreaseAdd.addEventListener('click', e=> { 
        //to prevent number from becoming negative
        if (amount > 0 ) { 
            amount -= 1; 
            amountToAdd.innerHTML = amount;
        } 
    })

    //setting amount from product page into count in cart 
    const quantityValue = document.querySelector('.quantity_value'); //within cart

    //retrieving specific product details 
    let productNameElement = document.querySelector('.product_name');
    let productName = productNameElement.textContent; 
    let price = parseFloat(document.querySelector('.price_text').textContent.replace('$', '').replace('AUD', '').trim());
    let count = 0 //count in cart starts at 0
    let image = { 
        "CELTS - HIGHLAND EDITION": "Products /Celts.png",
        "CENTAUR REVISITED - ORBLIVION EDITION": "Products /Orblivion.png",
        "CENTAUR REVISITED - BEAST EDITION": "Products /Beast.png",
    }


    function updateSessionStorage() { //save information to session storage
        const cartData = {
            count: count,
            totalPrice: count * price,
            productName: productName,
            price: price
        };
        sessionStorage.setItem('cartData', JSON.stringify(cartData));
    }

    function updateTotalPrice() { //calculate total price in cart
        const totalPrice = count * price;
        const totalSumElement = document.querySelector('.total_price');

        totalSumElement.innerHTML = `$${totalPrice}`;
        updateTotalIndicator();
        updateSessionStorage(); 
    }

    function updateTotalIndicator() { //update total no. of items in cart
        const totalIndicator = document.querySelector('.total_indicator');  

        if (count > 0) { 
        totalIndicator.innerHTML = count; 
        } else { 
        totalIndicator.innerHTML = 0;
        }
    }

    function increaseCount() {
        count += 1; 
        quantityValue.innerHTML = count;
        updateTotalPrice();
    }

    function displayCartItems() { 
        // Check if cart items already exist
        if (!document.querySelector('.cart_image') && !document.querySelector('.cart_name') && !document.querySelector('.cart_price')) {
            //hide no items message if there are products added to cart
            document.querySelector('.shopping_cart').classList.add('is_hidden');
            document.querySelector('.no_items').classList.add('is_hidden');
    
            //add div elements to show item added to cart
            let cartImage = document.createElement('img'); 
            cartImage.classList.add('cart_image'); 
            cartImage.src = image[productName]; 
            
            let cartName = document.createElement('div');
            cartName.classList.add('cart_name');
            cartName.textContent = productName; 
        
            let cartPrice = document.createElement('div');
            cartPrice.classList.add('cart_price'); 
            cartPrice.textContent ='$' + price + '/1'; 
        
            const detailsContainer = document.querySelector('.details_container');
            const details = document.querySelector('.details');
            detailsContainer.appendChild(cartImage); 
            details.appendChild(cartName); 
            details.appendChild(cartPrice); 
            detailsContainer.appendChild(details); 
        }
    }
    
    addTrigger.addEventListener('click', e => { 
        if (amount > 0) { //doesnt change count if amount is 0
            document.querySelector('.items_container').classList.remove('is_hidden');
            if (count === 0) {
                displayCartItems(); // Call displayCartItems only if count is 0
            }
    
            if (amount > 1) { 
                //add count and amount 
                count += amount; 
                quantityValue.innerHTML = count; 
    
                //reset amount to 0
                amount = 0; 
                amountToAdd.innerHTML = amount; 
                 
            } else {  
                increaseCount();
                amount = 0;
                amountToAdd.innerHTML = amount; 
            } 
        } else { 
            document.querySelector('.items_container').classList.add('is_hidden');
            document.querySelector('.shopping_cart').classList.remove('is_hidden');
            document.querySelector('.no_items').classList.remove('is_hidden');
        }
    
        cart.style.width = '500px'; 
        document.querySelector('.productInfo_container').style.opacity = '0.2'
        
        updateTotalPrice();
        updateSessionStorage(); 
    });

    
    //accessing the cart from cart btn
    const cart = document.querySelector('.cart');
    const openCart = document.querySelector('.cart_btn');
    const closeCart = document.querySelector('.cart_close_btn')

    openCart.addEventListener('click', e => { 
            cart.style.width = '500px'; 
            document.querySelector('.productInfo_container').style.opacity = '0.2'
    })
    
    closeCart.addEventListener('click', e=> { 
            cart.style.width = '0px'; 
            document.querySelector('.productInfo_container').style.opacity = '1'
    })

    //modifying from cart 
    const decreaseValue = document.querySelector('.decrease_value');
    const increaseValue = document.querySelector('.increase_value');

    decreaseValue.addEventListener('click', e=> {
        if (count >0) {
            count -= 1; 
            quantityValue.innerHTML = count; 
            updateTotalPrice();
            updateSessionStorage();
        }
    })

    increaseValue.addEventListener('click', e => { 
        increaseCount();
        updateSessionStorage(); 
    });


    //checkout page 
    document.addEventListener('DOMContentLoaded', function() {
        // Load cart data from session storage
        const storedCartData = sessionStorage.getItem('cartData');
        if (storedCartData) {
            
            const checkoutList = document.querySelector('.checkout_list');
            const subtotalAmount = document.querySelector('.subtotal_amount');
            const totalAmount = document.querySelector('.total_amount');

            // Update subtotal amount
            subtotalAmount.textContent = `$${cartData.totalPrice}`;

            // Create a new div element for each item in the cart
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('checkout_item');
            const itemName = document.createElement('div');
            itemName.textContent = cartData.productName;
            const itemPrice = document.createElement('div');
            itemPrice.textContent = `$${cartData.price}`;
            cartItemDiv.appendChild(itemName);
            cartItemDiv.appendChild(itemPrice);
            checkoutList.appendChild(cartItemDiv);

            // Update total amount
            totalAmount.innerHTML = `$${cartData.totalPrice}`; 
        }
    })
          
        
      
        
        // Initial total price update
        updateTotalPrice();
        updateTotalIndicator();
    
        document.addEventListener('DOMContentLoaded', loadSessionStorage);
    });

//nav
function openNav() {
    document.getElementById("mySideNav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}




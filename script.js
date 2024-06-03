




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


    
    // //cart page 
    // const totalIndicator = document.querySelector('.total_indicator'); 

    // const nilMessage = document.querySelector('.nil');
    // const totalSumElement = document.querySelector('.total_price');

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
    

        openCart.addEventListener('click', e => {
            cartOverlay.style.width = '500px';
            document.querySelector('.productInfo_container').style.opacity = '0.2';
        });

        iframe.onload = () => {
            // Accessing the iframe document
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const closeCart = iframeDocument.querySelector('.cart_close_btn');

            if (closeCart) {
                closeCart.addEventListener('click', e => {
                    cartOverlay.style.width = '0px';
                    document.querySelector('.productInfo_container').style.opacity = '1';
                });
            } 
        };   

    //product specific  start 
    const addToCartBtn = document.querySelector('.add_to_cart');
    let cartData = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const amountToAdd = document.querySelector('.amount_to_add');
    let amount = parseInt(amountToAdd.innerText);
    const itemContainer = document.querySelector('.items_container');

    let productName = document.querySelector('.product_name').innerText;
    let productImage = document.querySelector('.product_grid img').src; 
    let productPrice = getPrice(productName); 
    let product = {
        name: productName,
        price: productPrice,
        quantity: amount,
        image: productImage
    };

   function getPrice(productName) { ///!!!! UPDATE THIS!!!!!!!!!!!!!!!!
    let priceMapping = { 
        'CELTS - HIGHLAND EDITION': 2000,
        'BEAST': 2000,
        'ORBLIVION': 3000
    }; 
    for(let key in priceMapping) { 
        if(productName.includes(key)){
            return priceMapping[key]; 
        }
    }
    return 0; 
    }
   
    function saveCartToSessionStorage() { //pushing cart products to session storage
        cartData.push(product);
        sessionStorage.setItem('cart', JSON.stringify(cartData));
    } 

    function addToCart(product) { //
        saveCartToSessionStorage(product); 
        cartOverlay.style.width = '500px';
        document.querySelector('.productInfo_container').style.opacity = '0.2';
    } 

   
    function displayCartItems() {
    const nilMessage = document.querySelector('.nil');
    const itemContainer = document.querySelector('.items_container');

    if (cartData.length === 0) {
        nilMessage.classList.remove('is_hidden');
    } else {
        nilMessage.classList.add('is_hidden');
        itemContainer.innerHTML = '';
        cartData.forEach(item => {
            let itemElement = document.createElement('div');
            itemElement.classList.add('items');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <div class="name">${item.name}</div>
                    <div class="price">$${item.price} / ${item.quantity}</div>
                </div>
                <div class="quantity">
                    <button class="decrease_value">-</button>
                    <span class="quantity_value">${item.quantity}</span>
                    <button class="increase_value">+</button>
                </div>
            `;
            itemContainer.appendChild(itemElement);
        });
        updateTotalPrice(cartData);
    }
}


    addToCartBtn.addEventListener('click', e => {     
        if (amount > 0) { 
            addToCart(product); 
        }
        emptyCartMessage();
    })  


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

        if (cartData.length === 0) {
            nilMessage.classList.remove('is_hidden');
        } else {
            nilMessage.classList.add('is_hidden');
            itemContainer.innerHTML = '';
            cartData.forEach(item => {
                let itemElement = document.createElement('div');
                itemElement.classList.add('items');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="details">
                        <div class="name">${item.name}</div>
                        <div class="price">$${item.price} / ${item.quantity}</div>
                    </div>
                    <div class="quantity">
                        <button class="decrease_value">-</button>
                        <span class="quantity_value">${item.quantity}</span>
                        <button class="increase_value">+</button>
                    </div>
                `;
                itemContainer.appendChild(itemElement);
            });
            updateTotalPrice(cartData);
        }
    }

    addToCartBtn.addEventListener('click', e => {
        if (amount > 0) {
            addToCart(product);
        }
    });

    displayCartItems();
});







    // function emptyCartMessage() { 
    //     if (count > 0) { 
    //         itemContainer.classList.remove('is_hidden');
    //         document.querySelector('.shopping_cart').classList.add('is_hidden');
    //         document.querySelector('.no_items').classList.add('is_hidden');
    //     } else {
    //         itemContainer.classList.add('is_hidden');
    //         document.querySelector('.shopping_cart').classList.remove('is_hidden');
    //         document.querySelector('.no_items').classList.remove('is_hidden');
    //     }
    // }

    // displayCartItems();


    //amount buttons from product page second start
    // const increaseAdd = document.querySelector('.increase');
    // const decreaseAdd = document.querySelector('.decrease');

    // function increaseAmount() { 
    //     amount += 1; 
    //     amountToAdd.innerHTML = amount; 
    // }
   
    // increaseAdd.addEventListener('click', increaseAmount());

    // decreaseAdd.addEventListener('click', e=> { 
    //     if (amount > 0 ) { 
    //         amount -= 1; 
    //         amountToAdd.innerHTML = amount; 
    //     } 
    // })

    //second end

    // if (document.querySelector('.total_indicator')) {
    //     const totalIndicator = document.querySelector('.total_indicator');
    //     const itemContainer = document.querySelector('.items_container');

    //     const totalSumElement = document.querySelector('.total_price');
    
    //   
    //     function updateTotalPrice(cartData) {
    //         let total = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    //         totalSumElement.innerText = `$${total}`;
    //     }
    
    //   
    
    // }
    
   //end 
    
    // function updateTotalIndicator() {
    //    if (count > 0) { 
    //     totalIndicator.innerHTML = count; 
    //    } else { 
    //     totalIndicator.innerHTML = 0;
    //    }
    // }

 
  

    // displayCartItems(); 

    
    increaseValue.addEventListener('click', e => { 
        increaseCount();
    });
    
  
    
    // function increaseCount() {
    //     count += 1; 
    //     quantityValue.innerHTML = count;
    //     updateTotalPrice();
    // }

    // decreaseValue.addEventListener('click', e => { 
    //     if (count > 0) {
    //         count -= 1;
    //         quantityValue.innerHTML = count;
    //         updateTotalPrice();
    //     } 
    // });
    
    // increaseValue.addEventListener('click', e => { 
    //     increaseCount();
    // });
    
    
    // // Initial total price update
    // updateTotalPrice();
    // updateTotalIndicator();
    // emptyCartMessage(); 

 

function openNav() {
    document.getElementById("mySideNav").style.width = "350px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}


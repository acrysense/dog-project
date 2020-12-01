document.addEventListener("DOMContentLoaded", function () {
    /**
     * NodeList.prototype.forEach() polyfill
     * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
     */
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    // ORDER OPEN/CLOSE ON MOBILE
    const orderBtn = document.querySelector('.order__preview')

    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            if (orderBtn.classList.contains('order__preview--active')) {
                $('.order__content').slideUp(350)
                orderBtn.classList.remove('order__preview--active')
            }
            else {
                $('.order__content').slideDown(350)
                orderBtn.classList.add('order__preview--active')
            }
        })
    }
    
    // ORDER PROMOCODE
    const promocodeCheckbox = document.getElementById('promocode-checkbox'),
        promocodeInput = document.querySelector('.order__promocode'),
        promocodeApply = document.querySelector('.order__apply')

    if (promocodeCheckbox) {
        promocodeCheckbox.addEventListener('click', () => {
            if (promocodeCheckbox.checked) {
                promocodeInput.classList.add('order__promocode--active')
            }
            else {
                promocodeInput.classList.remove('order__promocode--active')
            }
        })
    }

    if (promocodeApply) {
        promocodeApply.addEventListener('click', (event) => {
            event.preventDefault()
    
            promocodeInput.classList.remove('order__promocode--active')
            document.querySelector('.order__applied').classList.add('order__applied--active')
        })
    }

    // CHECKBOX
    let stageCounter = 0 // Stage counter
    let stageDependence = 0 // At value '0' skipping 2nd stage, at value '2' go to 2nd stage

    const checkboxBtn = document.querySelectorAll('.custom-checkbox--category')

    if (checkboxBtn) {
        checkboxBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                let checkboxNumber = item.dataset.product - 1

                document.querySelectorAll('.checkout-form__wrap').forEach((child) => child.classList.add('checkout-form__wrap--hidden'))
                document.querySelectorAll('.checkout-form__wrap')[checkboxNumber].classList.remove('checkout-form__wrap--hidden')
                
                stageDependence = 2 // When choosing a special service go to 2nd stage
                
                if (checkboxNumber == 1) {
                    stageDependence = 3
                }
            })
        })
    }

    // CONTINUE AND BACK
    const continueBtn = document.querySelectorAll('.checkout-form__continue'),
        backBtn = document.querySelectorAll('.checkout-form__back')

    if (continueBtn) {
        continueBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const stageItems = document.querySelectorAll('.stage__item'),
                    stageWrapper = document.querySelectorAll('.checkout-form__stage'),
                    stageSuccess = document.querySelector('.checkout-form__success')
                
                if (stageCounter < 3) {
                    stageItems.forEach((child) => child.classList.remove('stage__item--active'))
                    stageWrapper.forEach((child) => child.classList.remove('checkout-form__stage--active'))

                    if (stageDependence === 0) {
                        stageItems[stageCounter].classList.add('stage__item--success')
                        stageDependence = 1
                        stageCounter++
                    }

                    if (stageDependence === 3 && stageCounter == 1) {
                        stageItems[stageCounter].classList.add('stage__item--success')
                        stageCounter++
                    }

                    stageCounter++
                    stageItems[stageCounter - 1].classList.add('stage__item--success')

                    stageItems[stageCounter].classList.add('stage__item--active')
                    stageWrapper[stageCounter].classList.add('checkout-form__stage--active')
                }
                else {
                    stageItems[stageCounter].classList.add('stage__item--success')
                    stageWrapper.forEach((child) => child.classList.remove('checkout-form__stage--active'))
                    stageSuccess.classList.add('checkout-form__success--active')
                }
            })
        })
    }

    if (backBtn) {
        backBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const stageItems = document.querySelectorAll('.stage__item'),
                    stageWrapper = document.querySelectorAll('.checkout-form__stage')
                
                stageItems.forEach((child) => child.classList.remove('stage__item--active'))
                stageWrapper.forEach((child) => child.classList.remove('checkout-form__stage--active'))
                
                if (stageCounter === 2 && stageDependence === 1) {
                    stageDependence = 0
                    stageCounter--
                    stageItems[stageCounter].classList.remove('stage__item--success')
                }

                if (stageDependence === 3 && stageCounter == 3) {
                    stageCounter--
                    stageItems[stageCounter].classList.remove('stage__item--success')
                }
                
                stageCounter--
                stageItems[stageCounter].classList.remove('stage__item--success')
                stageItems[stageCounter].classList.add('stage__item--active')
                stageWrapper[stageCounter].classList.add('checkout-form__stage--active')
            })
        })
    }

    // QUIZ
    const quizComment = document.querySelectorAll('.quiz__comment')

    if (quizComment) {
        quizComment.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.quiz__textarea')[i].classList.toggle('quiz__textarea--active')

                let content = item.innerText
                if (content === 'Add comment') {
                    item.innerHTML = 'Cancel'
                }
                else {
                    item.innerHTML = 'Add comment'
                }
            })
        })
    }
    
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const overlay = document.getElementsByClassName('overlay')[0]

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && overlay.classList.contains('overlay--open')) {
                hamburger.classList.remove("hamburger--active");
                overlay.classList.remove("overlay--open");
                document.body.classList.remove("scroll-disabled");
            } else {
                hamburger.classList.add("hamburger--active");
                overlay.classList.add("overlay--open");
                document.body.classList.add("scroll-disabled");
            }
        });
    }

    // TABS
    const switchItems = document.querySelectorAll('.switch__item'),
        tabsItems = document.querySelectorAll('.tabs__item'),
        categoriesItems = document.querySelectorAll('.categories__link')

    if (switchItems) {
        switchItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.switch__item').forEach((child) => child.classList.remove('switch__item--active'))
                document.querySelectorAll('.switch__content').forEach((child) => child.classList.remove('switch__content--active'))
    
                item.classList.add('switch__item--active')
                document.querySelectorAll('.switch__content')[i].classList.add('switch__content--active')
            })
        })
    }

    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('tabs__content--active'))
    
                item.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__content')[i].classList.add('tabs__content--active')
            })
        })
    }

    if (categoriesItems) {
        categoriesItems.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
                document.querySelectorAll('.categories__link').forEach((child) => child.classList.remove('categories__link--active'))
                item.classList.add('categories__link--active')
            })
        })
    }

    // QUANTITY
    let countInput = document.getElementsByClassName('product__number'),
        countInputCart = document.getElementsByClassName('cart__number')
    
    const productQuantity = document.querySelectorAll('.product__quantity'),
        cartQuantity = document.querySelectorAll('.cart__quantity'),
        minus = document.getElementsByClassName('product__minus'),
        plus = document.getElementsByClassName('product__plus'),
        minusCart = document.getElementsByClassName('cart__minus'),
        plusCart = document.getElementsByClassName('cart__plus')

    productQuantity.forEach((s, i) => {
        minus[i].addEventListener('click', () => {
            if ((countInput[i].value) * 1 >= 1) {
                countInput[i].value = (countInput[i].value) * 1 - 1;
            }
        });

        plus[i].addEventListener('click', () => {
            countInput[i].value = (countInput[i].value) * 1 + 1;
        })
    })

    cartQuantity.forEach((s, i) => {
        minusCart[i].addEventListener('click', () => {
            if ((countInputCart[i].value) * 1 >= 1) {
                countInputCart[i].value = (countInputCart[i].value) * 1 - 1;
            }
        });

        plusCart[i].addEventListener('click', () => {
            countInputCart[i].value = (countInputCart[i].value) * 1 + 1;
        })
    })

    // CART
    const modalBtn = document.querySelectorAll('.shopping-cart__basket'),
        modal = document.querySelector('.cart'),
        modalClose = document.querySelector('.cart__close'),
        modalOverlay = document.querySelector('.cart-overlay');
    
    if (modalBtn) {
        modalBtn.forEach(function(item){
            item.addEventListener('click', function (event) {
                event.preventDefault();
    
                document.body.classList.add('scroll-disabled');
                modal.classList.add('cart--active');
                modalOverlay.classList.add('cart-overlay--active');
            });
        });
    }

    document.body.addEventListener('keyup', function (event) {
        let key = event.keyCode;

        if (key == 27) {
            document.body.classList.remove('scroll-disabled');
            document.querySelector('.cart.cart--active').classList.remove('cart--active');
            document.querySelector('.cart-overlay').classList.remove('cart-overlay--active');
        };
    }, false);


    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            document.body.classList.remove('scroll-disabled');
            document.querySelector('.cart.cart--active').classList.remove('cart--active');
            this.classList.remove('cart-overlay--active');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            document.body.classList.remove('scroll-disabled');
            document.querySelector('.cart.cart--active').classList.remove('cart--active');
            modalOverlay.classList.remove('cart-overlay--active');
        });
    }

    // ACCORDIONS FAQ
    const faq = document.querySelectorAll('.faq__trigger')

    if (faq) {
        $('.faq__trigger').click(function() {
            const triggerItem = $(this);
    
            if (triggerItem.hasClass('faq__trigger--active')) {
                $(this).removeClass('faq__trigger--active');
                $(this).next('.faq__content').slideUp(350);
            }
            else {
                $('.faq__trigger').removeClass('faq__trigger--active');
                $('.faq__trigger').next('.faq__content').slideUp(350);
                $(this).addClass('faq__trigger--active');
                $(this).next('.faq__content').slideDown(350);
            }
        })
    }

    // SLICK
    $('.product__slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1
    });

    $('.shop__wrapper--slider-md').slick({
        infinite: true,
        arrows: true,
        prevArrow: '<a class="arrow-left"><img src="img/icons/arrow-left.svg" alt=""></a>',
        nextArrow: '<a class="arrow-right"><img src="img/icons/arrow-right.svg" alt=""></a>',
        dots: false,
        slidesToShow: 3,
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    });

    $('.shop__wrapper--slider-lg').slick({
        infinite: true,
        arrows: true,
        prevArrow: '<a class="arrow-left"><img src="img/icons/arrow-left.svg" alt=""></a>',
        nextArrow: '<a class="arrow-right"><img src="img/icons/arrow-right.svg" alt=""></a>',
        dots: false,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3
                }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    });

    $('.review--slider').slick({
        infinite: true,
        arrows: true,
        prevArrow: '<a class="review__arrow-left"><svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7H1" stroke="#79909C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13L1 7L7 1" stroke="#79909C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
        nextArrow: '<a class="review__arrow-right"><svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7H1" stroke="#79909C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13L1 7L7 1" stroke="#79909C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>',
        dots: true,
        slidesToShow: 1
    });
});
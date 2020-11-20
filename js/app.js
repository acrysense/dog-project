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
    
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const overlay = document.getElementsByClassName('overlay')[0]

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
        minus[i].addEventListener('click', function() {
            if ((countInput[i].value) * 1 >= 1) {
                countInput[i].value = (countInput[i].value) * 1 - 1;
            }
        });

        plus[i].addEventListener('click', function() {
            countInput[i].value = (countInput[i].value) * 1 + 1;
        })
    })

    cartQuantity.forEach((s, i) => {
        minusCart[i].addEventListener('click', function() {
            if ((countInputCart[i].value) * 1 >= 1) {
                countInputCart[i].value = (countInputCart[i].value) * 1 - 1;
            }
        });

        plusCart[i].addEventListener('click', function() {
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

    // SLICK
    $('.product__slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1
    });

    // ACCORDIONS FAQ
    const faq = document.querySelectorAll('.faq__trigger')

    if (faq) {
        $('.faq__trigger').click(function() {
            const triggerItem = $(this);
    
            if (triggerItem.hasClass('faq__trigger--active')) {
                $(this).removeClass('faq__trigger--active');
                $(this).next('.faq__content').slideUp(350);
                console.log('Yes')
            }
            else {
                $('.faq__trigger').removeClass('faq__trigger--active');
                $('.faq__trigger').next('.faq__content').slideUp(350);
                $(this).addClass('faq__trigger--active');
                $(this).next('.faq__content').slideDown(350);
                console.log('No')
            }
        })
    }
});
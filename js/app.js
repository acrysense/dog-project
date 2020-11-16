document.addEventListener("DOMContentLoaded", function () {
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
        categoriesItems.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
                document.querySelectorAll('.categories__link').forEach((child) => child.classList.remove('categories__link--active'))
                item.classList.add('categories__link--active')
            })
        })
    }

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
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
    document.querySelectorAll('.switch__item').forEach((item, i) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.switch__item').forEach((child) => child.classList.remove('switch__item--active'))
            document.querySelectorAll('.switch__content').forEach((child) => child.classList.remove('switch__content--active'))

            item.classList.add('switch__item--active')
            document.querySelectorAll('.switch__content')[i].classList.add('switch__content--active')
        })
    })

    document.querySelectorAll('.tabs__item').forEach((item, i) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
            document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('tabs__content--active'))

            item.classList.add('tabs__item--active')
            document.querySelectorAll('.tabs__content')[i].classList.add('tabs__content--active')
        })
    })
});
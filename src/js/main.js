const helpBtn = document.querySelector('.help')
const helpCard = helpBtn.nextElementSibling
const menuBtn = document.querySelector('.menu-btn')
const header = document.querySelector('.header')
const smoothLinks = document.querySelectorAll('a[data-type="smooth-link"]')
const modalBtns = document.querySelectorAll('[data-modal]')
const modalWindows = document.querySelectorAll('.modal')

let isShowedHelp = false;

function deleteClass(el, elClass) {
    el.classList.remove(elClass)
}
function addClass(el, elClass) {
    el.classList.add(elClass)
}

function appearAnim(el) {
    el.style.display = ''
    deleteClass(el, 'hides')
    addClass(el, 'show')
}
function disappearAnim(el) {
    deleteClass(el, 'show')
    addClass(el, 'hides')
    setTimeout(function() {
        el.style.display = 'none'
    }, 500)
}

function helpAppear(el) {
    appearAnim(el)
    isShowedHelp = 1
}

function helpDisappear(el) {
    disappearAnim(el)
    isShowedHelp = 0
}

function getBodyScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

function smoothScroll() {
    smoothLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    })
}

window.addEventListener('DOMContentLoaded', function() {
    smoothScroll()

    helpBtn.addEventListener('click', function() {
        if (!isShowedHelp) {
            helpAppear(helpCard) 
        } else {
            helpDisappear(helpCard)
        }
    })

    document.body.addEventListener('click', function(e) {
        if (!e.target.closest('.help-card') && !e.target.closest('.help')) {
            if (isShowedHelp) {
                helpDisappear(helpCard)
            }
        }

        if (e.target.closest('[data-modal]')) {
            e.preventDefault()
            modalWindows.forEach(modalWin => {
                if (e.target.closest('[data-modal]').dataset.modal === modalWin.id) {
                    appearAnim(modalWin)
                }
            })
        }

        if ((!e.target.closest('.modal__content') && !e.target.closest('[data-modal]')) || e.target.closest('.modal__close')) {
            modalWindows.forEach(modalWin => {
                if (modalWin.classList.contains('show')) {
                    disappearAnim(modalWin)
                }
            })
        }
    })

    menuBtn.addEventListener('click', function(e) {
        e.target.closest('.menu-btn').classList.toggle('open')
        e.target.closest('.menu-btn').nextElementSibling.classList.toggle('open')
    })

    window.addEventListener('scroll', function() {
        const headerHeight = header.offsetHeight;
        let scrooledValue = getBodyScrollTop()

        if (scrooledValue > 1) {
            addClass(header, 'sticky')
            document.body.style.paddingTop = `${headerHeight}px`
        } else {
            deleteClass(header, 'sticky')
            document.body.style.paddingTop = ''
        }
    })
})

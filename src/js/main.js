// Поиск html-элементов
const helpBtn = document.querySelector('.help')
const helpCard = helpBtn.nextElementSibling
const menuBtn = document.querySelector('.menu-btn')
const header = document.querySelector('.header')
const smoothLinks = document.querySelectorAll('a[data-type="smooth-link"]')
const modalBtns = document.querySelectorAll('[data-modal]')
const modalWindows = document.querySelectorAll('.modal')
const accordeons = document.querySelectorAll('.accordeon')
const formSearch = document.forms['search-form']
const inputSearch = formSearch.querySelector('.input-block__field')

// Переменная-флаг для анимации helpCard 
let isShowedHelp = false;

// Функции-хелперы
function deleteClass(el, elClass) {
    el.classList.remove(elClass)
}
function addClass(el, elClass) {
    el.classList.add(elClass)
}
function toggleClass(el, elClass) {
    el.classList.toggle(elClass)
}

// Появление элемента
function appearAnim(el) {
    el.style.display = ''
    deleteClass(el, 'hides')
    addClass(el, 'show')
}
// Исчезание элемента
function disappearAnim(el) {
    deleteClass(el, 'show')
    addClass(el, 'hides')
    setTimeout(function() {
        el.style.display = 'none'
    }, 500)
}
// Появление для helpCard 
function helpAppear(el) {
    appearAnim(el)
    isShowedHelp = 1
}
// Исчезание для helpCard 
function helpDisappear(el) {
    disappearAnim(el)
    isShowedHelp = 0
}

// Узнать, на сколько проскроллили страницу
function getBodyScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

// Плавный скролл до анкора
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

// Обработчик спойлеров
function accordeonHandler(e) {
    if (!accordeons.length) return
    if (e.target.closest('.accordeon__top')) {
        accordeons.forEach(accordeon => {
            if (accordeon !== e.target.closest('.accordeon')) {
                deleteClass(accordeon.querySelector('.accordeon__top'), 'open')
                deleteClass(accordeon.querySelector('.accordeon__bottom'), 'open')
            }
        })
        toggleClass(e.target.closest('.accordeon__top'), 'open')
        toggleClass(e.target.closest('.accordeon__top').nextElementSibling, 'open')
    }
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

        // Обработчик модального окна
        if (e.target.closest('[data-modal]')) {
            e.preventDefault()
            modalWindows.forEach(modalWin => {
                if (e.target.closest('[data-modal]').dataset.modal === modalWin.id) {
                    appearAnim(modalWin)
                    document.body.style.overflow = 'hidden'
                }
            })
        }
        if ((!e.target.closest('.modal__content') && !e.target.closest('[data-modal]')) || e.target.closest('.modal__close')) {
            modalWindows.forEach(modalWin => {
                if (modalWin.classList.contains('show')) {
                    disappearAnim(modalWin)
                    document.body.style.overflow = ''
                }
            })
        }
    })

    menuBtn.addEventListener('click', function(e) {
        e.target.closest('.menu-btn').classList.toggle('open')
        e.target.closest('.menu-btn').nextElementSibling.classList.toggle('open')
    })

    document.body.addEventListener('click', accordeonHandler)

    // Анимация для инпута
    if (screen.width < 800 && formSearch) {
        inputSearch.addEventListener('focus', function() {
            addClass(inputSearch.parentElement, 'focus')
        })
        formSearch.querySelector('.input-block__field').addEventListener('blur', function() {
            deleteClass(inputSearch.parentElement, 'focus')
        })
    }
    
    // Фикс шапки
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

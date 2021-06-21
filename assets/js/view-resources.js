[...document.querySelectorAll('.image-box__slider-scroll-btn')].forEach(e => {
    e.addEventListener('click', () => {
        const slider = document.querySelector('.image-box__slider')  
        if(e.classList.contains('left')){
            slider.scrollBy(-145,0)
        }else{
            slider.scrollBy(145,0)
        }
    })
});

[...document.querySelectorAll('.image-box__scroll-btn')].forEach(e => {
    e.addEventListener('click', () => {
        const active = document.querySelector('.image-box__image.active')
        if(e.classList.contains('left') && active.previousElementSibling){
            active.previousElementSibling.classList.add('active')
            active.classList.remove('active')
        }else if(e.classList.contains('right') && active.nextElementSibling){
            active.nextElementSibling.classList.add('active')
            active.classList.remove('active')
        }
    })
});

[...document.querySelectorAll('.slider__image-btn')].forEach(e => {
    e.addEventListener('click', () => {
        const target = `image-${e.dataset.target}`
        document.querySelector('.image-box__image.active').classList.remove('active')
        document.querySelector(`.${target}`).classList.add('active')
    })
});

const programNavLinks = document.querySelector('.program-nav-links');

[...document.querySelectorAll('.program-nav-scroll-btn')].forEach(e => {
    e.addEventListener('click', () => {
        if(e.classList.contains('left')){
            programNavLinks.scrollBy(-150,0)
        }else{
            programNavLinks.scrollBy(150,0)            
        }
    })
})

programNavLinks.addEventListener('scroll', () => {
    if(programNavLinks.scrollLeft > 0){
        document.querySelector('.program-nav-scroll-btn.left').classList.add('active')
    }else{
        document.querySelector('.program-nav-scroll-btn.left').classList.remove('active')
    }
    if(Math.ceil(programNavLinks.scrollWidth) === Math.ceil(programNavLinks.scrollLeft) + Math.ceil(programNavLinks.offsetWidth)){
        document.querySelector('.program-nav-scroll-btn.right').classList.remove('active')
    }else{
        document.querySelector('.program-nav-scroll-btn.right').classList.add('active')
    }
})
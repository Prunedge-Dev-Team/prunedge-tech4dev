const testimonialsWrapper = document.querySelector('.testimonials-wrapper')

document.querySelectorAll('.testimonial-scroll-btn').forEach(e => {
    e.addEventListener('click', () => {
        const testimonials = [...document.querySelectorAll('.testimonial')]
        const currentIndex = testimonials.findIndex(e => testimonialsWrapper.scrollLeft <= e.offsetLeft)
        if(e.classList.contains('left')) {
            const targetScroll = testimonials[currentIndex - 1].offsetLeft
            testimonialsWrapper.scrollTo(targetScroll, 0)
        }else{
            const targetScroll = testimonials[currentIndex + 1].offsetLeft
            testimonialsWrapper.scrollTo(targetScroll, 0)
        }
    })
})

if(testimonialsWrapper){
    testimonialsWrapper.addEventListener('scroll', () => {
        if(testimonialsWrapper.scrollLeft > 0){
            document.querySelector('.testimonial-scroll-btn.left').classList.add('active')
        }else{
            document.querySelector('.testimonial-scroll-btn.left').classList.remove('active')
        }
        if(Math.floor(testimonialsWrapper.scrollWidth) === Math.floor(testimonialsWrapper.scrollLeft) + Math.floor(testimonialsWrapper.offsetWidth)){
            document.querySelector('.testimonial-scroll-btn.right').classList.remove('active')
        }else {
            document.querySelector('.testimonial-scroll-btn.right').classList.add('active')
        }
    })
}

document.querySelectorAll('.board-member').forEach(e => {
    e.addEventListener('click',(event) => {
        if(!event.path[0].classList.contains('close-board')){
            e.classList.add('active')   
        }
    })
})

document.querySelectorAll('.close-board').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('.board-member.active').classList.remove('active')
    })
})
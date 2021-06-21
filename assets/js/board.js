document.querySelectorAll('.director').forEach(e => {
    e.addEventListener('click',(event) => {
        if(!event.path[0].classList.contains('close-team')){
            e.classList.add('active')   
        }
    })
})

document.querySelectorAll('.trustee').forEach(e => {
    e.addEventListener('click',(event) => {
        if(!event.path[0].classList.contains('close-team')){
            e.classList.add('active')   
        }
    })
})

window.addEventListener('scroll', () => {
    const subNav = document.querySelector('.sub-nav')
    if(window.scrollY <= 480){
        subNav.classList.remove('fixed')
    }else{
        subNav.classList.add('fixed')
    }
})


document.querySelectorAll('.close-team').forEach(e => {
    e.addEventListener('click', () => {
        if(document.querySelector('.trustee.active')){
            document.querySelector('.trustee.active').classList.remove('active')
        }else{
            document.querySelector('.director.active').classList.remove('active')
        }
    })
})
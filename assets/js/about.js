document.querySelectorAll('.teammate').forEach(e => {
    e.addEventListener('click',(event) => {
        if(!event.path[0].classList.contains('close-team')){
            e.classList.add('active');
        }
    })
});

document.querySelectorAll('.close-team').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('.teammate.active').classList.remove('active');
    })
});

window.addEventListener('keydown', e => {
    if(e.key === 'Escape' || e.key === 'Esc'){
        if(document.querySelector('.teammate.active')){
            document.querySelector('.teammate.active').classList.remove('active');
        }
    }
});

document.querySelectorAll('.scrollspy-nav button:not(.scrollspy-scroll-btn)').forEach((e,i) => {
    e.addEventListener('click', () => {
        const { offsetTop } =  document.querySelector(`.${e.dataset.target}`);
        const scrollspyNav = document.querySelector('.scrollspy-nav');
        if(scrollspyNav.classList.contains('fixed')){
            if(i === 0){
                window.scrollTo(0,offsetTop - 60);
            }else{
                window.scrollTo(0,offsetTop - 100);
            }
        }else{
            if(i === 0){
                window.scrollTo(0,offsetTop - 120);
            }else{
                window.scrollTo(0,offsetTop - 160);
            }
        }
        document.querySelector('.toggle-buttons button.active').classList.remove('active');
        e.classList.add('active');
    })
});

const scrollspyNav = document.querySelector('.scrollspy-nav');
const toggleButtons = document.querySelector('.toggle-buttons');
toggleButtons.addEventListener('scroll', () => {
    if(toggleButtons.scrollLeft > 0 && (toggleButtons.scrollLeft + toggleButtons.offsetWidth) !== toggleButtons.scrollWidth){
        document.querySelector('.scrollspy-scroll-btn.left').classList.add('active');
        document.querySelector('.scrollspy-scroll-btn.right').classList.add('active');
    }else if(toggleButtons.scrollLeft > 0 && (toggleButtons.scrollLeft + toggleButtons.offsetWidth) === toggleButtons.scrollWidth){
        document.querySelector('.scrollspy-scroll-btn.left').classList.add('active');
        document.querySelector('.scrollspy-scroll-btn.right').classList.remove('active');
    }else if(toggleButtons.scrollLeft === 0){
        document.querySelector('.scrollspy-scroll-btn.left').classList.remove('active');
        document.querySelector('.scrollspy-scroll-btn.right').classList.add('active');
    }
});

document.querySelector('.scrollspy-scroll-btn.left').addEventListener('click', () => {
    toggleButtons.scrollBy(-100,0);
});

document.querySelector('.scrollspy-scroll-btn.right').addEventListener('click', () => {
    toggleButtons.scrollBy(100,0);
});


window.addEventListener('scroll', () => {
    const scrollspyNav = document.querySelector('.scrollspy-nav');
    if(window.scrollY <= 480 || window.scrollY >= document.querySelector('footer').offsetTop + 60){
        scrollspyNav.classList.remove('fixed');
    }else{
        scrollspyNav.classList.add('fixed');
        const activeSection = [...document.querySelectorAll('section')].find(e => e.offsetTop + e.scrollHeight > window.scrollY + 100);
        let activeSectionClassName;
        if(activeSection){
            activeSectionClassName = [...document.querySelectorAll('section')].find(e => e.offsetTop + e.scrollHeight > window.scrollY + 100).classList[0];
        }
        const line = document.querySelector('.toggle-buttons .line');
        const activeButton = document.querySelector(`button[data-target=${activeSectionClassName}]`);
        const currentActive = document.querySelector('.toggle-buttons button.active');
        if(currentActive && activeSectionClassName) {
            currentActive.classList.remove('active');
            activeButton.classList.add('active');
            line.style.width = `${activeButton.scrollWidth}px`;
            line.style.left = `${activeButton.offsetLeft}px`;
            if(window.innerWidth <= 620){
                toggleButtons.scrollTo(activeButton.offsetLeft,0);
            }
        }
    }
});

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if(window.scrollY > window.innerHeight){
        backToTop.classList.add('active')
        backToTop.disabled = false
    }else{
        backToTop.classList.remove('active')        
        backToTop.disabled = true
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
});

const applyFormClose = document.querySelector('.apply-form-close');
applyFormClose.addEventListener('click', () => {
    document.querySelector('.apply-form').classList.remove('active');
    setTimeout(() => {
        document.querySelector('.careers-flex-wrapper').classList.remove('show-form');
        applyToday.classList.remove('hide');
    },300)
});

const textarea = document.querySelector('textarea');

textarea.addEventListener('input',() => {
    if(textarea.offsetHeight < textarea.scrollHeight){
        textarea.style.height = `${textarea.scrollHeight}px`;
    }else if(textarea.offsetHeight > textarea.scrollHeight){
        textarea.style.height = `${textarea.scrollHeight}px`
    }
});

const allPartnersWrappers = [...document.querySelectorAll('.partners-row-wrapper')];

[...document.querySelectorAll('.partner-scroll-btn')].forEach(button => {
    button.addEventListener('click', () => {
        allPartnersWrappers.forEach(e => {
            const partners = [...e.querySelectorAll('.partner')];
            const activePartnerIndex = partners.findIndex(partner => e.scrollLeft <= partner.offsetLeft);
            if(button.classList.contains('left') && activePartnerIndex !== 0){
                e.scrollTo(partners[activePartnerIndex - 1].offsetLeft,0);
            }else if(button.classList.contains('right') && activePartnerIndex + 1 < partners.length){
                e.scrollTo(partners[activePartnerIndex + 1].offsetLeft,0);
            }
        });
    })
});

lazy([
    ...[...document.querySelectorAll('.team-role img')].map((el) => transformElement(el, '../assets/images/male-avatar.png')),
    ...[...document.querySelectorAll('.partner img')].map(el => transformElement(el, ''))
]);
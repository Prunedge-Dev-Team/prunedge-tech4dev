let elements = [...document.querySelectorAll('.gallery-images img')].map(el => transformElement(el,''));

if(document.querySelector('.testimonial__img')){
    elements = [
        ...elements,
        ...[...document.querySelectorAll('.testimonial__img')].map(el => transformElement(el,'../assets/images/male-avatar.png'))
    ]
}

lazy(elements);
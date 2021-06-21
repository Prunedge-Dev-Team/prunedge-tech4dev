document.querySelector('.open-filter').addEventListener('click', () => {
    if(document.querySelector('.filter').classList.contains('active')){
        document.querySelector('.filter').classList.remove('active')
    }else{
        document.querySelector('.filter').classList.add('active')
    }
});
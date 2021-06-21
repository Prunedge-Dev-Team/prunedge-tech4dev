const textarea = document.querySelector('textarea');

const changeTextAreaHeight = () => {
    textarea.style.height = '0';
    textarea.style.height = `${textarea.scrollHeight}px`
};

textarea.addEventListener('input',changeTextAreaHeight);
textarea.addEventListener('cut',changeTextAreaHeight);
textarea.addEventListener('paste',changeTextAreaHeight);

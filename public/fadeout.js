const article = document.querySelector('article');
const allNavLinks = document.querySelectorAll('li a');

function handleClick(event) {
    LENGTH_OF_ANIMATION = 300;
    event.preventDefault();
    article.classList.add('fade-out');
    setTimeout(() => {
        const link = event.target;
        link.removeEventListener('click', handleClick);
        link.click();
    }, LENGTH_OF_ANIMATION);
};

allNavLinks.forEach(link => { 
    link.addEventListener('click', handleClick);
})
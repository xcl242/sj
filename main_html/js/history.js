const scrollContainer = document.querySelector('.scroll-container');
const scrollItems = document.querySelectorAll('.scroll-item');

let currentStage = 1;

function updateScroll() {
    scrollItems.forEach((item, index) => {
        const stage = parseInt(item.getAttribute('data-stage'));
        const offset = (stage - currentStage) * 100;
        item.style.transform = `translateZ(${offset}px)`;
    });
}

function nextStage() {
    currentStage = (currentStage % 5) + 1;
    updateScroll();
}

setInterval(nextStage, 3000);

updateScroll();
const container = document.querySelector('.onboarding-container');
const nextButtons = document.querySelectorAll('.next-btn');
const startButton = document.querySelector('.start-btn');

let currentPage = 0;

nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentPage++;
        container.style.transform = 
            `translateX(-${currentPage * 100 / 3}%)`;
    });
});

startButton.addEventListener('click', () => {
    window.location.href = '/onboarding/start/';
})
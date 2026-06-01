const slider = document.getElementById('memberSlider');
const count = document.getElementById('memberCount');

function updateSlider() {

    const value =
        ((slider.value - slider.min) /
        (slider.max - slider.min)) * 100;

    slider.style.background = `
        linear-gradient(
            to right,
            var(--Foundation-Violet-Normal, #1A1953) 0%,
            var(--Foundation-Violet-Normal, #1A1953) ${value}%,
            var(--Foundation-Violet-Light, #E8E8EE) ${value}%,
            var(--Foundation-Violet-Light, #E8E8EE) 100%
        )
    `;

    count.textContent = slider.value;
}

slider.addEventListener('input', updateSlider);

updateSlider();
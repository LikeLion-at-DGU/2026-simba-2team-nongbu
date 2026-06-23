// 별 반짝반짝
const bgContainer =
    document.getElementById('backgroundStars');

for(let i = 0; i < 120; i++){

    const star =
        document.createElement('div');

    star.classList.add('bg-star');

    star.style.left =
        `${Math.random() * 100}%`;

    star.style.top =
        `${Math.random() * 100}%`;

    star.style.animationDelay =
        `${Math.random() * 5}s`;

    bgContainer.appendChild(star);
}
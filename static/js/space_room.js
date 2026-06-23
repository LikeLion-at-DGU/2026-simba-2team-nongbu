// ===== FAB 버튼 =====

const fabBtn = document.getElementById('fabBtn');
const fabContainer = document.querySelector('.fab-container');
const fabOverlay = document.getElementById('fabOverlay');

fabBtn.addEventListener('click', () => {

    fabContainer.classList.toggle('active');
    fabOverlay.classList.toggle('active');

});

fabOverlay.addEventListener('click', () => {

    fabContainer.classList.remove('active');
    fabOverlay.classList.remove('active');

});


// ===== 메뉴 버튼 =====

const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const spaceMenu = document.getElementById('spaceMenu');

menuBtn.addEventListener('click', () => {

    menuOverlay.classList.add('active');
    spaceMenu.classList.add('active');

});

menuOverlay.addEventListener('click', () => {

    menuOverlay.classList.remove('active');
    spaceMenu.classList.remove('active');

});


// ===== 별자리 데이터 =====

const constellations = JSON.parse(
    document.getElementById('constellations-data')
        .textContent
);


// ===== 별자리 렌더링 =====

renderConstellations(
    constellations,
    (item) => `
        <div class="constellation-name">
            ${item.name}
        </div>

        <div class="constellation-progress">
            ${item.current}/${item.required}
        </div>
    `
);


// ===== 우주맵 드래그 / 줌 =====

initSpaceMap(
    document.querySelector('.space-room'),
    document.getElementById('spaceMap'),
    document.getElementById('resetViewBtn')
);


// ===== 배경 별 =====

createBackgroundStars();
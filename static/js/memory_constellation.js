const constellations = JSON.parse(
    document.getElementById('constellations-data')
        .textContent
);

// 별자리 렌더링
renderConstellations(
    constellations,
    (item) => `
        <div class="constellation-name">
            ${item.name}
        </div>

        <div class="constellation-date">
            ${item.start_date}
            -
            ${item.end_date}
        </div>
    `
);

// 우주맵 드래그/줌
initSpaceMap(
    document.querySelector('.space-room'),
    document.getElementById('spaceMap'),
    document.getElementById('resetViewBtn')
);

// 배경 별 생성
createBackgroundStars();
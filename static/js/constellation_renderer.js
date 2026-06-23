const spaceMap = document.getElementById('spaceMap');
const svg = document.getElementById('constellation-svg');

function renderConstellations(
    constellations,
    labelTemplate
) {

    constellations.forEach(item => {

        const stars = item.data.stars;
        const lines = item.data.lines;

        const currentStarCount = item.current;

        const offsetX = item.data.world_x;
        const offsetY = item.data.world_y;

        // ===== 선 생성 =====

        lines.forEach(([startIdx, endIdx]) => {

            if (
                startIdx >= currentStarCount ||
                endIdx >= currentStarCount
            ) {
                return;
            }

            const start = stars[startIdx];
            const end = stars[endIdx];

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute(
                "x1",
                start[0] + offsetX
            );

            line.setAttribute(
                "y1",
                start[1] + offsetY
            );

            line.setAttribute(
                "x2",
                end[0] + offsetX
            );

            line.setAttribute(
                "y2",
                end[1] + offsetY
            );

            line.setAttribute(
                "stroke",
                "white"
            );

            line.setAttribute(
                "stroke-width",
                "1"
            );

            svg.appendChild(line);
        });

        // ===== 별 생성 =====

        stars
            .slice(0, currentStarCount)
            .forEach(([x, y]) => {

                const star = document.createElementNS("http://www.w3.org/2000/svg", "image");

                star.setAttribute(
                    "href",
                    "/static/images/star.svg"
                );

                star.setAttribute(
                    "x",
                    x + offsetX - 8
                );

                star.setAttribute(
                    "y",
                    y + offsetY - 8
                );

                star.setAttribute(
                    "width",
                    "19"
                );

                star.setAttribute(
                    "height",
                    "19"
                );

                svg.appendChild(star);
            });

        // ===== 별자리 이름 위치 계산 =====

        const maxX = Math.max(
            ...stars.map(star => star[0])
        );

        const minX = Math.min(
            ...stars.map(star => star[0])
        );

        const minY = Math.min(
            ...stars.map(star => star[1])
        );

        const maxY = Math.max(
            ...stars.map(star => star[1])
        );

        const centerY =
            (minY + maxY) / 2;

        // ===== 별자리 정보 생성 =====

        const info = document.createElement('div');

        info.className =
            'constellation-info';

        info.style.position =
            'absolute';

        if (
            item.data.label_position ===
            "right"
        ) {

            info.style.left =
                `${offsetX + maxX + 15}px`;

            info.style.top =
                `${offsetY + centerY - 20}px`;

        } else {

            info.style.left =
                `${offsetX + minX - 80}px`;

            info.style.top =
                `${offsetY + centerY - 20}px`;
        }

        info.innerHTML =
            labelTemplate(item);

        spaceMap.appendChild(info);
    });
}
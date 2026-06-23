function initSpaceMap(
    spaceRoom,
    spaceMap,
    resetViewBtn
) {

    const HOME_X = -200;
    const HOME_Y = -250;
    const HOME_SCALE = 1;

    let isDragging = false;

    let startX = 0;
    let startY = 0;

    let currentX = HOME_X;
    let currentY = HOME_Y;

    let scale = HOME_SCALE;

    // ===== 초기 위치 =====

    updateTransform();

    // ===== 드래그 시작 =====

    spaceRoom.addEventListener(
        'mousedown',
        (e) => {

            isDragging = true;

            startX = e.clientX;
            startY = e.clientY;

            spaceRoom.style.cursor =
                'grabbing';
        }
    );

    // ===== 드래그 중 =====

    document.addEventListener(
        'mousemove',
        (e) => {

            if (!isDragging) return;

            const dx =
                e.clientX - startX;

            const dy =
                e.clientY - startY;

            spaceMap.style.transform =
                `translate(${currentX + dx}px, ${currentY + dy}px)
                scale(${scale})`;
        }
    );

    // ===== 드래그 종료 =====

    document.addEventListener(
        'mouseup',
        (e) => {

            if (!isDragging) return;

            currentX +=
                e.clientX - startX;

            currentY +=
                e.clientY - startY;

            isDragging = false;

            spaceRoom.style.cursor =
                'grab';

            checkResetButton();
        }
    );

    // ===== 줌 =====

    spaceRoom.addEventListener(
        'wheel',
        (e) => {

            e.preventDefault();

            const rect =
                spaceRoom.getBoundingClientRect();

            const mouseX =
                e.clientX - rect.left;

            const mouseY =
                e.clientY - rect.top;

            const oldScale =
                scale;

            scale -=
                e.deltaY * 0.001;

            scale = Math.max(
                0.5,
                Math.min(scale, 3)
            );

            const scaleRatio =
                scale / oldScale;

            currentX =
                mouseX -
                (mouseX - currentX)
                * scaleRatio;

            currentY =
                mouseY -
                (mouseY - currentY)
                * scaleRatio;

            updateTransform();

            checkResetButton();
        }
    );

    // ===== 가운데 이동 =====

    resetViewBtn.addEventListener(
        'click',
        () => {

            currentX = HOME_X;
            currentY = HOME_Y;
            scale = HOME_SCALE;

            updateTransform();

            resetViewBtn.classList.remove(
                'show'
            );
        }
    );

    // ===== transform 적용 =====

    function updateTransform() {

        spaceMap.style.transform =
            `translate(${currentX}px, ${currentY}px)
            scale(${scale})`;
    }

    // ===== 리셋 버튼 표시 =====

    function checkResetButton() {

        const movedDistance =
            Math.sqrt(
                Math.pow(
                    currentX - HOME_X,
                    2
                )
                +
                Math.pow(
                    currentY - HOME_Y,
                    2
                )
            );

        const scaleChanged =
            Math.abs(
                scale - HOME_SCALE
            );

        if (
            movedDistance > 80 ||
            scaleChanged > 0.2
        ) {

            resetViewBtn.classList.add(
                'show'
            );

        } else {

            resetViewBtn.classList.remove(
                'show'
            );
        }
    }
}
function togglePolygonSidesInput(side) {
    const imageSelect = document.getElementById(`${side}_image`);
    const polygonSidesContainer = document.getElementById(`${side}_polygon_sides_container`);
    
    if (imageSelect.value === 'polygon') {
        polygonSidesContainer.style.display = 'block';
    } else {
        polygonSidesContainer.style.display = 'none';
    }
}

function drawShapes() {
    // Left Grid Inputs
    const leftImage = document.getElementById('left_image').value;
    const leftImageCount = parseInt(document.getElementById('left_image_count').value, 10);
    const leftRows = parseInt(document.getElementById('left_rows').value, 10);
    const leftColumns = parseInt(document.getElementById('left_columns').value, 10);
    const leftPolygonSides = document.getElementById('left_polygon_sides').value ? parseInt(document.getElementById('left_polygon_sides').value, 10) : null;

    // Right Grid Inputs
    const rightImage = document.getElementById('right_image').value;
    const rightImageCount = parseInt(document.getElementById('right_image_count').value, 10);
    const rightRows = parseInt(document.getElementById('right_rows').value, 10);
    const rightColumns = parseInt(document.getElementById('right_columns').value, 10);
    const rightPolygonSides = document.getElementById('right_polygon_sides').value ? parseInt(document.getElementById('right_polygon_sides').value, 10) : null;

    // Canvas Elements
    const leftCanvas = document.getElementById('left-canvas');
    const rightCanvas = document.getElementById('right-canvas');

    // Clear previous drawings
    leftCanvas.innerHTML = '';
    rightCanvas.innerHTML = '';

    // Create Two.js instances
    const leftTwo = new Two({ width: leftCanvas.clientWidth, height: leftCanvas.clientHeight }).appendTo(leftCanvas);
    const rightTwo = new Two({ width: rightCanvas.clientWidth, height: rightCanvas.clientHeight }).appendTo(rightCanvas);

    // Draw grids and shapes
    drawGrid(leftTwo, leftImage, leftImageCount, leftRows, leftColumns, leftPolygonSides);
    drawGrid(rightTwo, rightImage, rightImageCount, rightRows, rightColumns, rightPolygonSides);
}

function drawGrid(two, image, count, rows, columns, polygonSides) {
    const cellWidth = two.width / columns;
    const cellHeight = two.height / rows;

    // Draw grid lines
    for (let i = 0; i <= columns; i++) {
        const x = i * cellWidth;
        const line = two.makeLine(x, 0, x, two.height);
        line.stroke = '#ccc';
    }

    for (let j = 0; j <= rows; j++) {
        const y = j * cellHeight;
        const line = two.makeLine(0, y, two.width, y);
        line.stroke = '#ccc';
    }

    // Draw shapes
    for (let i = 0; i < count; i++) {
        const x = (i % columns) * cellWidth + cellWidth / 2;
        const y = Math.floor(i / columns) * cellHeight + cellHeight / 2;
        createShape(two, image, polygonSides, Math.min(cellWidth, cellHeight) * 0.8, x, y);
    }

    two.update();
}

function createShape(two, type, polygonSides, size, x, y) {
    switch (type) {
        case 'car':
            drawSimpleCar(two, size, x, y);
            break;
        case 'coin':
            drawSimpleCoin(two, size, x, y);
            break;
        case 'star':
            drawStar(two, size, x, y);
            break;
        case 'circle':
            drawCircle(two, size, x, y);
            break;
        case 'square':
            drawSquare(two, size, x, y);
            break;
        case 'polygon':
            drawPolygon(two, polygonSides, size, x, y);
            break;
    }
}

function drawSimpleCar(two, size, x, y) {
    const group = two.makeGroup();
    const body = two.makeRectangle(x, y, size * 0.8, size * 0.4);
    const wheel1 = two.makeCircle(x - size * 0.2, y + size * 0.2, size * 0.1);
    const wheel2 = two.makeCircle(x + size * 0.2, y + size * 0.2, size * 0.1);
    group.add(body, wheel1, wheel2);
    group.fill = '#3498db';
    group.noStroke();
}

function drawStar(two, size, x, y) {
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.4;
    const numPoints = 5;
    const angleStep = Math.PI / numPoints;

    let points = [];
    for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * angleStep - Math.PI / 2; // Start at top
        points.push(new Two.Anchor(
            x + radius * Math.cos(angle),
            y + radius * Math.sin(angle)
        ));
    }

    const star = two.makePath(points, true);
    star.fill = '#FFD700';
    star.noStroke();
}

function drawSimpleCoin(two, size, x, y) {
    const coin = two.makeCircle(x, y, size * 0.4);
    coin.fill = '#f1c40f';
    coin.noStroke();
}

function drawCircle(two, size, x, y) {
    const circle = two.makeCircle(x, y, size / 2);
    circle.fill = '#00F';
    circle.noStroke();
}

function drawSquare(two, size, x, y) {
    const square = two.makeRectangle(x, y, size, size);
    square.fill = '#0F0';
    square.noStroke();
}

function drawPolygon(two, sides, size, x, y) {
    if (!sides) return; // Ensure sides is provided

    const radius = size / 2;
    const angleStep = (2 * Math.PI) / sides;
    const points = [];

    for (let i = 0; i < sides; i++) {
        const xOffset = x + radius * Math.cos(i * angleStep);
        const yOffset = y + radius * Math.sin(i * angleStep);
        points.push(new Two.Anchor(xOffset, yOffset));
    }

    const polygon = two.makePath(points, true);
    polygon.fill = '#00F';
    polygon.noStroke();
}

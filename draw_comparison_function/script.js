document.addEventListener("DOMContentLoaded", () => {
    // Clear the drawing areas when the page is loaded
    document.getElementById('left-canvas').innerHTML = '';
    document.getElementById('right-canvas').innerHTML = '';

    // Bind the generateShapes function to the button click event
    document.querySelector('button').addEventListener('click', generateShapes);
});

function generateShapes() {
    const leftImage = document.getElementById('left_image').value;
    const leftCount = parseInt(document.getElementById('left_image_count').value);
    const rightImage = document.getElementById('right_image').value;
    const rightCount = parseInt(document.getElementById('right_image_count').value);

    // Clear existing content
    document.getElementById('left-canvas').innerHTML = '';
    document.getElementById('right-canvas').innerHTML = '';

    generateGrid('left-canvas', leftImage, leftCount);
    generateGrid('right-canvas', rightImage, rightCount);
}

function generateGrid(gridId, shape, count) {
    const container = document.getElementById(gridId);
    
    // Create and append SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    container.appendChild(svg);

    const gridSize = Math.ceil(Math.sqrt(count));
    const cellSize = 300 / gridSize;

    for (let i = 0; i < count; i++) {
        const x = (i % gridSize) * cellSize + cellSize / 2;
        const y = Math.floor(i / gridSize) * cellSize + cellSize / 2;
        const shapeElement = createShape(shape, x, y, cellSize * 0.8);
        svg.appendChild(shapeElement);
    }
}

function createShape(shape, x, y, size) {
    const ns = "http://www.w3.org/2000/svg";
    let element;

    switch (shape) {
        case 'circle':
            element = document.createElementNS(ns, 'circle');
            element.setAttribute('cx', x);
            element.setAttribute('cy', y);
            element.setAttribute('r', size / 2);
            element.setAttribute('fill', '#FFB6C1'); // light Pink color for circle
            break;
        case 'square':
            element = document.createElementNS(ns, 'rect');
            element.setAttribute('x', x - size / 2);
            element.setAttribute('y', y - size / 2);
            element.setAttribute('width', size);
            element.setAttribute('height', size);
            element.setAttribute('fill', '#FAFAD2'); // lightGoldenRodYellow for square
            break;
        case 'car':
            element = document.createElementNS(ns, 'image');
            //element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'https://lucide.dev/icons/car.svg');
            element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/car.svg');
            element.setAttribute('x', x - size / 2);
            element.setAttribute('y', y - size / 2);
            element.setAttribute('width', size);
            element.setAttribute('height', size);
            break;
        case 'coin':
            element = document.createElementNS(ns, 'image');
            //element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'https://lucide.dev/icons/coins.svg');
            element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './assets/badge-indian-rupee.svg');
            element.setAttribute('x', x - size / 2);
            element.setAttribute('y', y - size / 2);
            element.setAttribute('width', size);
            element.setAttribute('height', size);
            break;
        default:
            element = createPolygon(shape, x, y, size);
            element.setAttribute('fill', '#E6E6FA'); // lavender for polygon
            break;
    }

    element.setAttribute('stroke', 'black');
    element.setAttribute('stroke-width', '1');
    return element;
}

function createPolygon(shape, x, y, size) {
    const ns = "http://www.w3.org/2000/svg";
    const element = document.createElementNS(ns, 'polygon');
    const sides = getSidesFromShape(shape);
    const points = [];

    for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
        const px = x + size / 2 * Math.cos(angle);
        const py = y + size / 2 * Math.sin(angle);
        points.push(`${px},${py}`);
    }

    element.setAttribute('points', points.join(' '));
    return element;
}

function getSidesFromShape(shape) {
    switch (shape) {
        case 'triangle': return 3;
        case 'quadrilateral': return 4;
        case 'pentagon': return 5;
        case 'hexagon': return 6;
        case 'heptagon': return 7;
        case 'octagon': return 8;
        case 'nonagon': return 9;
        case 'decagon': return 10;
        default: return 5;
    }
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

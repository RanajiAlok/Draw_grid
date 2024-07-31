document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById('form-container');
    const drawButton = document.getElementById('draw-shape-button');
    const drawingArea = document.getElementById('drawing-area');
    const polygonSidesContainer = document.getElementById('polygon-sides-container');
    const polygonSidesInput = document.getElementById('polygon-sides');

    const createForm = (schema) => {
        for (let key in schema.properties) {
            const property = schema.properties[key];
            const formElement = document.createElement('div');

            const label = document.createElement('label');
            label.innerText = property.title;
            formElement.appendChild(label);

            let input;
            if (property.type === 'boolean') {
                input = document.createElement('input');
                input.type = 'checkbox';
            } else if (property.enum) {
                input = document.createElement('select');
                property.enum.forEach(optionValue => {
                    const option = document.createElement('option');
                    option.value = optionValue;
                    option.innerText = optionValue;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
                input.type = 'text';
            }
            input.id = key;
            formElement.appendChild(input);
            formContainer.appendChild(formElement);
        }
    };

    const getFormData = () => {
        const formData = {};
        for (let key in schema.properties) {
            const input = document.getElementById(key);
            if (input) {
                if (input.type === 'checkbox') {
                    formData[key] = input.checked;
                } else if (input.type === 'select-one') {
                    formData[key] = input.options[input.selectedIndex].value;
                } else {
                    formData[key] = input.value;
                }
            }
        }

        if (formData.shape_type === 'any') {
            formData.polygon_sides = parseInt(polygonSidesInput.value, 10);
        }

        return formData;
    };

    const drawShape = (formData) => {
        drawingArea.innerHTML = '';
        const two = new Two({ width: 500, height: 500 }).appendTo(drawingArea);

        const shapeType = formData.shape_type;
        const divisions = parseInt(formData.divisions, 10);
        const shadedDivisions = parseInt(formData.shaded_divisions, 10);
        const rotationDegrees = parseInt(formData.rotation_degrees, 10);
        const divideShadedDivision = formData.divide_shaded_division.split(':').map(Number);

        let shape;
        switch (shapeType) {
            case 'circle':
                shape = drawCircle(two, divisions, shadedDivisions, divideShadedDivision);
                break;
            case 'square':
                shape = drawSquare(two, divisions, shadedDivisions, divideShadedDivision);
                break;
            case 'any':
                shape = drawPolygon(two, formData.polygon_sides, divisions, shadedDivisions, divideShadedDivision);
                break;
            default:
                console.log('Unsupported shape type');
                return;
        }

        if (shape) {
            shape.rotation = rotationDegrees * Math.PI / 180;
            two.update();
        }
    };

    const drawCircle = (two, divisions, shadedDivisions, divideShadedDivision) => {
        const radius = 100;
        const centerX = 250;
        const centerY = 250;
        const circle = two.makeCircle(centerX, centerY, radius);
        circle.stroke = 'black';

        const angleStep = Math.PI * 2 / divisions;
        const [shade1, shade2] = divideShadedDivision;

        for (let i = 0; i < divisions; i++) {
            const x = centerX + radius * Math.cos(i * angleStep);
            const y = centerY + radius * Math.sin(i * angleStep);
            two.makeLine(centerX, centerY, x, y);
        }

        for (let i = 0; i < shadedDivisions; i++) {
            const startAngle = i * angleStep;
            const endAngle = (i + 1) * angleStep;
            const arc = two.makeArcSegment(centerX, centerY, 0, radius, startAngle, endAngle);
            arc.fill = i < shade1 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)';
        }

        return circle;
    };

    const drawSquare = (two, divisions, shadedDivisions, divideShadedDivision) => {
        const size = 200;
        const centerX = 250;
        const centerY = 250;
        const halfSize = size / 2;
        const [shade1, shade2] = divideShadedDivision;

        const square = two.makeRectangle(centerX, centerY, size, size);
        square.stroke = 'black';
        square.fill = 'white';

        if (divisions === 2) {
            const halfWidth = size / 2;

            const firstHalf = two.makeRectangle(centerX - halfWidth / 2, centerY, halfWidth, size);
            firstHalf.stroke = 'black';
            firstHalf.fill = 'rgba(255, 0, 0, 0.5)';

            const secondHalf = two.makeRectangle(centerX + halfWidth / 2, centerY, halfWidth, size);
            secondHalf.stroke = 'black';
            secondHalf.fill = 'rgba(0, 0, 255, 0.5)';

            return square;
        }

        const numCells = Math.sqrt(divisions);
        const cellSize = size / numCells;

        for (let i = 0; i < numCells; i++) {
            for (let j = 0; j < numCells; j++) {
                const x = centerX - halfSize + cellSize * (i + 0.5);
                const y = centerY - halfSize + cellSize * (j + 0.5);
                const rect = two.makeRectangle(x, y, cellSize, cellSize);
                rect.stroke = 'black';

                const index = i * numCells + j;
                if (index < shadedDivisions) {
                    rect.fill = index < shade1 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)';
                } else {
                    rect.fill = 'white';
                }
            }
        }

        return square;
    };

    const drawPolygon = (two, sides, divisions, shadedDivisions, divideShadedDivision) => {
        const radius = 100;
        const polygon = two.makePolygon(250, 250, radius, sides);
        polygon.stroke = 'black';

        const angleStep = Math.PI * 2 / sides;
        const [shade1, shade2] = divideShadedDivision;

        for (let i = 0; i < sides; i++) {
            const x = 250 + radius * Math.cos(i * angleStep);
            const y = 250 + radius * Math.sin(i * angleStep);
            two.makeLine(250, 250, x, y);
        }

        for (let i = 0; i < shadedDivisions; i++) {
            const x1 = 250 + radius * Math.cos(i * angleStep);
            const y1 = 250 + radius * Math.sin(i * angleStep);
            const x2 = 250 + radius * Math.cos((i + 1) * angleStep);
            const y2 = 250 + radius * Math.sin((i + 1) * angleStep);
            const path = two.makePath(250, 250, x1, y1, x2, y2, true);
            path.fill = i < shade1 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)';
        }

        return polygon;
    };

    createForm(schema);

    document.getElementById('shape_type').addEventListener('change', (event) => {
        const shapeType = event.target.value;
        if (shapeType === 'any') {
            polygonSidesContainer.style.display = 'block';
        } else {
            polygonSidesContainer.style.display = 'none';
        }
    });

    drawButton.addEventListener('click', () => {
        const formData = getFormData();
        drawShape(formData);
    });
});

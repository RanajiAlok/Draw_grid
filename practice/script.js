document.addEventListener('DOMContentLoaded', () => {
    const columnsInput = document.getElementById('columns');
    const rowsInput = document.getElementById('rows');
    const elementDrawDirectionInput = document.getElementById('element_draw_direction');
    const shadeElementInput = document.getElementById('shade_element');
    const drawButton = document.getElementById('draw-button');
    const jxgBox = document.getElementById('jxgbox');
    const shadeFormContainer = document.getElementById('shade-form-container');

    let board = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [-0.5, 10.5, 10.5, -0.5],
        axis: false,
        grid: false,
        showNavigation: false,
        showCopyright: false
    });

    drawButton.addEventListener('click', () => {
        const gridOptions = {
            columns: parseInt(columnsInput.value),
            rows: parseInt(rowsInput.value),
            element_draw_direction: elementDrawDirectionInput.value,
            shade_element: parseInt(shadeElementInput.value)
        };
        if (gridOptions.element_draw_direction === 'cell') {
            generateShadeForm(gridOptions.shade_element, gridOptions.rows, gridOptions.columns).then(shadeIndexes => {
                drawGrid({ ...gridOptions, shadeIndexes });
            });
        } else {
            drawGrid(gridOptions);
        }
    });

    function generateShadeForm(shadeCount, maxRows, maxColumns) {
        return new Promise((resolve) => {
            // Clear previous form if exists
            shadeFormContainer.innerHTML = '';

            // Create form
            const form = document.createElement('form');
            for (let i = 0; i < shadeCount; i++) {
                const label = document.createElement('label');
                label.textContent = `Cell ${i + 1} (row,col - max: ${maxRows - 1},${maxColumns - 1}): `;
                const input = document.createElement('input');
                input.type = 'text';
                input.name = `shadeCell${i}`;
                input.placeholder = `e.g., 0,0`;
                form.appendChild(label);
                form.appendChild(input);
                form.appendChild(document.createElement('br'));
            }
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Submit';
            form.appendChild(submitButton);

            shadeFormContainer.appendChild(form);

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const shadeIndexes = [];
                for (let i = 0; i < shadeCount; i++) {
                    const input = form[`shadeCell${i}`];
                    const [row, col] = input.value.split(',').map(Number);
                    if (row >= 0 && row < maxRows && col >= 0 && col < maxColumns) {
                        shadeIndexes.push([row, col]);
                    } else {
                        alert(`Invalid input for cell ${i + 1}. Please enter values within the range (0-${maxRows - 1}, 0-${maxColumns - 1}).`);
                        return;
                    }
                }
                resolve(shadeIndexes);
                shadeFormContainer.innerHTML = ''; // Clear form after submission
            });
        });
    }

    function drawGrid(options) {
        // Clear the board
        const allObjects = Object.values(board.objects);
        allObjects.forEach(obj => {
            if (JXG.isPoint(obj) || obj.elementClass === JXG.OBJECT_CLASS_LINE || obj.elementClass === JXG.OBJECT_CLASS_POLYGON) {
                board.removeObject(obj);
            }
        });

        const { columns, rows, element_draw_direction, shade_element, shadeIndexes } = options;

        // Adjust bounding box
        board.setBoundingBox([-0.5, rows + 0.5, columns + 0.5, -0.5], false);

        // Draw grid lines
        for (let i = 0; i <= rows; i++) {
            board.create('line', [[0, i], [columns, i]], { strokeColor: '#ccc', straightFirst: false, straightLast: false, fixed: true });
        }
        for (let j = 0; j <= columns; j++) {
            board.create('line', [[j, 0], [j, rows]], { strokeColor: '#ccc', straightFirst: false, straightLast: false, fixed: true });
        }

        // Shade cells based on element_draw_direction and shade_element
        let shadedCount = 0;

        if (element_draw_direction === 'row') {
            for (let i = 0; i < rows && shadedCount < shade_element; i++) {
                for (let j = 0; j < columns && shadedCount < shade_element; j++) {
                    shadeCell(i, j);
                    shadedCount++;
                }
            }
        } else if (element_draw_direction === 'col') {
            for (let j = 0; j < columns && shadedCount < shade_element; j++) {
                for (let i = 0; i < rows && shadedCount < shade_element; i++) {
                    shadeCell(i, j);
                    shadedCount++;
                }
            }
        } else if (element_draw_direction === 'cell') {
            shadeIndexes.forEach(([rowIndex, colIndex]) => {
                shadeCell(rowIndex, colIndex);
            });
        }

        function shadeCell(rowIndex, colIndex) {
            board.create('polygon', [
                [colIndex, rows - rowIndex - 1],
                [colIndex + 1, rows - rowIndex - 1],
                [colIndex + 1, rows - rowIndex],
                [colIndex, rows - rowIndex]
            ], {
                fillColor: '#FFB347',
                fillOpacity: 1,
                borders: { strokeColor: '#ccc' },
                vertices: { visible: false },
                fixed: true
            });
        }

        board.update();
    }
});

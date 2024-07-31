document.addEventListener('DOMContentLoaded', () => {
    const columnsInput = document.getElementById('columns');
    const rowsInput = document.getElementById('rows');
    const elementDrawDirectionInput = document.getElementById('element_draw_direction');
    const shadeElementInput = document.getElementById('shade_element');
    const drawButton = document.getElementById('draw-button');
    const jxgBox = document.getElementById('jxgbox');

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
        drawGrid(gridOptions);
    });

    function drawGrid(options) {
        // Clear the board
        const allObjects = Object.values(board.objects);
        allObjects.forEach(obj => {
            if (JXG.isPoint(obj) || obj.elementClass === JXG.OBJECT_CLASS_LINE || obj.elementClass === JXG.OBJECT_CLASS_POLYGON) {
                board.removeObject(obj);
            }
        });

        const { columns, rows, element_draw_direction, shade_element } = options;

        // Adjust bounding box
        board.setBoundingBox([-0.5, rows + 0.5, columns + 0.5, -0.5], false);

        // Draw grid lines
        for (let i = 0; i <= rows; i++) {
            board.create('line', [[0, i], [columns, i]], {strokeColor: '#ccc', straightFirst: false, straightLast: false, fixed: true});
        }
        for (let j = 0; j <= columns; j++) {
            board.create('line', [[j, 0], [j, rows]], {strokeColor: '#ccc', straightFirst: false, straightLast: false, fixed: true});
        }

        // Shade cells
        let shadedCount = 0;
        for (let i = 0; i < rows && shadedCount < shade_element; i++) {
            for (let j = 0; j < columns && shadedCount < shade_element; j++) {
                if (shouldShadeCell(i, j, element_draw_direction, shadedCount, columns, rows)) {
                    board.create('polygon', [[j, rows-i-1], [j+1, rows-i-1], [j+1, rows-i], [j, rows-i]], {
                        fillColor: '#FFB347',
                        fillOpacity: 1,
                        borders: {strokeColor: '#ccc'},
                        vertices: {visible: false},
                        fixed: true
                    });
                    shadedCount++;
                }
            }
        }

        board.update();
    }

    function shouldShadeCell(row, col, direction, currentCount, columns, rows) {
        switch (direction) {
            case 'row':
                return row * columns + col === currentCount;
            case 'col':
                return col * rows + row === currentCount;
            case 'cell':
                return row * columns + col === currentCount;
            default:
                return false;
        }
    }
});

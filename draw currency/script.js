document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const denominationInput = document.getElementById('denomination').value;
    const orderInput = document.getElementById('order').value;
  
    const denominations = denominationInput.split(',').map(Number);
    if (orderInput === 'ascending') {
      denominations.sort((a, b) => a - b);
    } else {
      denominations.sort((a, b) => b - a);
    }
  
    const drawingArea = document.getElementById('drawing-area');
    drawingArea.innerHTML = ''; // Clear previous grid
  
    const columns = 4;
    drawingArea.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
  
    denominations.forEach(value => {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      const img = document.createElement('img');
      img.src = `assets/${value}.svg`;
      img.alt = value;
      gridItem.appendChild(img);
      drawingArea.appendChild(gridItem);
    });
  });
  
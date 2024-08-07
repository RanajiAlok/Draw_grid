let params;

function setup() {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  params = Object.fromEntries(urlParams);
  
  // Convert string values to appropriate types
  params.columns = parseInt(params.columns);
  params.rows = parseInt(params.rows);
  params.block_size = parseInt(params.block_size);
  params.shading = params.shading === 'true';
  params.label_blocks = params.label_blocks === 'true';
  params.border_visibility = params.border_visibility === 'true';
  params.additional_number = parseInt(params.additional_number) || 0;
  params.show_operation_sign = params.show_operation_sign === 'true';

  // Set default values if not provided
  params.block_size = params.block_size || 10;
  params.color_scheme = params.color_scheme || 'default';

  drawPlaceValueBlocks();
}

function drawPlaceValueBlocks() {
  const container = document.getElementById('canvas-container');
  container.innerHTML = ''; // Clear previous content

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "600");
  svg.setAttribute("height", "400");
  svg.setAttribute("viewBox", "0 0 600 400");

  const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
  title.setAttribute("x", "300");
  title.setAttribute("y", "30");
  title.setAttribute("font-size", "20");
  title.setAttribute("text-anchor", "middle");
  title.textContent = "Place Value Blocks";
  svg.appendChild(title);

  const totalNumber = params.additional_number;
  const hundreds = Math.floor(totalNumber / 100);
  const tens = Math.floor((totalNumber % 100) / 10);
  const ones = totalNumber % 10;

  let xOffset = 50;
  const yOffset = 50;

  if (hundreds > 0) {
    const hundredsGroup = createBlockGroup(xOffset, yOffset, 100, hundreds);
    svg.appendChild(hundredsGroup);
    const label = createLabel(xOffset + 50, yOffset + 130, "Hundreds");
    svg.appendChild(label);
    xOffset += 200;
  }

  if (tens > 0) {
    const tensGroup = createBlockGroup(xOffset, yOffset, 10, tens);
    svg.appendChild(tensGroup);
    const label = createLabel(xOffset + 25, yOffset + 130, "Tens");
    svg.appendChild(label);
    xOffset += 200; // Adjust xOffset to prevent overlap
  }

  if (ones > 0) {
    const onesGroup = createBlockGroup(xOffset, yOffset, 1, ones);
    svg.appendChild(onesGroup);
    const label = createLabel(xOffset + 25, yOffset + 130, "Ones");
    svg.appendChild(label);
  }

  const totalText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  totalText.setAttribute("x", "300");
  totalText.setAttribute("y", "380");
  totalText.setAttribute("font-size", "24");
  totalText.setAttribute("text-anchor", "middle");
  totalText.setAttribute("font-weight", "bold");
  totalText.textContent = `Total: ${totalNumber}`;
  svg.appendChild(totalText);

  container.appendChild(svg);
}

function createBlockGroup(x, y, value, count) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", `translate(${x}, ${y})`);

  const colors = getColors(value);

  if (value === 100) {
    for (let i = 0; i < count; i++) {
      createCubeBlock(group, (i % 3) * 40, Math.floor(i / 3) * 40, 30, colors, 30); // Adjust size and spacing
    }
  } else if (value === 10) {
    for (let i = 0; i < count; i++) {
      createCubeBlock(group, (i % 10) * 14, Math.floor(i / 10) * 14, 10, colors, 10); // Adjust size and spacing
    }
  } else if (value === 1) {
    for (let i = 0; i < count; i++) {
      createCubeBlock(group, (i % 10) * 14, Math.floor(i / 10) * 14, 10, colors); // Adjust size and spacing
    }
  }

  return group;
}

function createCubeBlock(parent, x, y, size, colors, height = size) {
  // Front face
  const front = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  front.setAttribute("x", x);
  front.setAttribute("y", y);
  front.setAttribute("width", size);
  front.setAttribute("height", height);
  front.setAttribute("fill", colors.front);
  front.setAttribute("stroke", "black");
  front.setAttribute("stroke-width", "1");
  parent.appendChild(front);

  // Top face
  const top = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  top.setAttribute("points", `${x},${y} ${x+size/5},${y-size/5} ${x+size+size/5},${y-size/5} ${x+size},${y}`);
  top.setAttribute("fill", colors.top);
  top.setAttribute("stroke", "black");
  top.setAttribute("stroke-width", "1");
  parent.appendChild(top);

  // Right face
  const right = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  right.setAttribute("points", `${x+size},${y} ${x+size+size/5},${y-size/5} ${x+size+size/5},${y+height-size/5} ${x+size},${y+height}`);
  right.setAttribute("fill", colors.right);
  right.setAttribute("stroke", "black");
  right.setAttribute("stroke-width", "1");
  parent.appendChild(right);

  // Add grid lines if shading is enabled
  if (params.shading) {
    addGridLines(parent, x, y, size, height);
  }
}

function addGridLines(parent, x, y, size, height) {
  const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gridGroup.setAttribute("stroke", "black");
  gridGroup.setAttribute("stroke-width", "0.5");

  for (let i = 1; i < 10; i++) {
    const horizontalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    horizontalLine.setAttribute("x1", x);
    horizontalLine.setAttribute("y1", y + i * (height / 10));
    horizontalLine.setAttribute("x2", x + size);
    horizontalLine.setAttribute("y2", y + i * (height / 10));
    gridGroup.appendChild(horizontalLine);

    if (size === height) {
      const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      verticalLine.setAttribute("x1", x + i * (size / 10));
      verticalLine.setAttribute("y1", y);
      verticalLine.setAttribute("x2", x + i * (size / 10));
      verticalLine.setAttribute("y2", y + height);
      gridGroup.appendChild(verticalLine);
    }
  }

  parent.appendChild(gridGroup);
}

function getColors(value) {
  switch (value) {
    case 100:
      return { front: "#FFD700", top: "#FFE666", right: "#E6C300" };
    case 10:
      return { front: "#32CD32", top: "#90EE90", right: "#228B22" };
    case 1:
      return { front: "#4169E1", top: "#6495ED", right: "#1E90FF" };
    default:
      return { front: "#CCCCCC", top: "#DDDDDD", right: "#BBBBBB" };
  }
}

function createLabel(x, y, text) {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", x);
  label.setAttribute("y", y);
  label.setAttribute("font-size", "16");
  label.setAttribute("text-anchor", "middle");
  label.textContent = text;
  return label;
}

// Call setup when the window loads
window.onload = setup;

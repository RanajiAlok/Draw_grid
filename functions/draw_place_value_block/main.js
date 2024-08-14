function setup() {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  params = Object.fromEntries(urlParams);

  // Convert string values to appropriate types
  params.number = parseInt(params.number);
  params.no_of_1000_blocks = parseInt(params.no_of_1000_blocks) || 0;
  params.no_of_100_blocks = parseInt(params.no_of_100_blocks) || 0;
  params.no_of_10_blocks = parseInt(params.no_of_10_blocks) || 0;
  params.no_of_1_blocks = parseInt(params.no_of_1_blocks) || 0;
  params._1000_blocks_color = params['1000_blocks_color'] || "blue";
  params._100_blocks_color = params['100_blocks_color'] || "blue";
  params._10_blocks_color = params['10_blocks_color'] || "blue";
  params._1_blocks_color = params['1_blocks_color'] || "blue";
  params.label_blocks = params.label_blocks === 'true';

  drawPlaceValueBlocks(params);
}

const colorNameToHex = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#00FF00",
  yellow: "#FFFF00",
  purple: "#800080",
  orange: "#FFA500",
  pink: "#FFC0CB",
  brown: "#A52A2A",
  gray: "#808080",
  black: "#000000"
};

function getHexColor(color) {
  if (color.startsWith('#')) {
      return color;
  }
  return colorNameToHex[color.toLowerCase()] || "#0000FF"; // Default to blue if color not found
}

function drawPlaceValueBlocks(params) {
  const container = document.getElementById('drawing');
  if (!container) {
    console.error('Container element not found');
    return;
  }
  container.innerHTML = ''; // Clear previous content\


  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "260");
  

  const totalNumber = params.number;
  const thousands = params.no_of_1000_blocks;
  const hundreds = params.no_of_100_blocks;
  const tens = params.no_of_10_blocks;
  const ones = params.no_of_1_blocks;

  let xOffset = 50;
  const yOffset = 50;

  //Thousands
  if (thousands > 0) {
    const thousandBlockWidth = 120;
    const thousandBlockSpacing = 40;
    for (let i = 0; i < thousands; i++) {
      const thousandsGroup = createThousandsBlockGroup(xOffset, yOffset, 1, params._1000_blocks_color);
      svg.appendChild(thousandsGroup);
      xOffset += thousandBlockWidth + thousandBlockSpacing;
    }
    if (params.label_blocks) {
      const label = createLabel(xOffset - (thousandBlockWidth * thousands + thousandBlockSpacing * (thousands - 1)) / 2, 200, "Thousands");
      svg.appendChild(label);
    }
  }
  // Hundreds
  if (hundreds > 0) {
    const hundredBlockWidth = 100;
    const hundredBlockSpacing = 40;
    for (let i = 0; i < hundreds; i++) {
      const hundredsGroup = createHundredsBlockGroup(xOffset, yOffset, 1, params._100_blocks_color);
      svg.appendChild(hundredsGroup);
      xOffset += hundredBlockWidth + hundredBlockSpacing;
    }
    if (params.label_blocks) {
      const label = createLabel(xOffset - (hundredBlockWidth * hundreds + hundredBlockSpacing * (hundreds - 1)) / 2, 200, "Hundreds");
      svg.appendChild(label);
    }
  }

  // Tens
  if (tens > 0) {
    const tensGroup = createTensBlockGroup(xOffset, yOffset, tens, params._10_blocks_color);
    svg.appendChild(tensGroup);
    if (params.label_blocks) {
      const label = createLabel(xOffset + (tens * 20) / 2, 200, "Tens");
      svg.appendChild(label);
    }
    xOffset += tens * 20 + 30;
  }

  // Ones
  if (ones > 0) {
    const onesGroup = createOnesBlockGroup(xOffset, yOffset, ones, params._1_blocks_color);
    svg.appendChild(onesGroup);
    if (params.label_blocks) {
      const label = createLabel(xOffset + (ones * 10) / 2, 200, "Ones");
      svg.appendChild(label);
    }
  }

  const totalText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  totalText.setAttribute("x", "295");
  totalText.setAttribute("y", "240");
  totalText.setAttribute("font-size", "24");
  totalText.setAttribute("text-anchor", "middle");
  totalText.setAttribute("font-weight", "bold");
  totalText.textContent = `Total: ${totalNumber}`;
  svg.appendChild(totalText);

  const totalWidth = Math.max(590, xOffset + 50); // Ensure minimum width of 590px
  svg.setAttribute("width", totalWidth.toString());
  svg.setAttribute("viewBox", `0 0 ${totalWidth} 260`);

  totalText.setAttribute("x", (totalWidth / 2).toString());

  container.appendChild(svg);
  container.style.width = `${totalWidth}px`;
}

function createThousandsBlockGroup(x, y, count, color) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", `translate(${x}, ${y})`);

  for (let i = 0; i < count; i++) {
    createThousandsBlock(group, i * 120, 0, color);
  }

  return group;
}

function createThousandsBlock(parent, x, y, color) {
  // Front face
  const front = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  front.setAttribute("x", x);
  front.setAttribute("y", y);
  front.setAttribute("width", 100);
  front.setAttribute("height", 100);
  front.setAttribute("fill", getHexColor(color));
  front.setAttribute("stroke", "black");
  front.setAttribute("stroke-width", "2");
  parent.appendChild(front);

  // Top face
  const top = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  top.setAttribute("points", `${x},${y} ${x+20},${y-20} ${x+120},${y-20} ${x+100},${y}`);
  top.setAttribute("fill", darkenColor(color, 20));
  top.setAttribute("stroke", "black");
  top.setAttribute("stroke-width", "2");
  parent.appendChild(top);
  addGridLinesOnTop(parent, x, y, x + 100, y, x + 120, y - 20, x + 20, y - 20, 10);

  // Right face
  const right = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  right.setAttribute("points", `${x+100},${y} ${x+120},${y-20} ${x+120},${y+80} ${x+100},${y+100}`);
  right.setAttribute("fill", darkenColor(color, 10));
  right.setAttribute("stroke", "black");
  right.setAttribute("stroke-width", "2");
  parent.appendChild(right);

  // Grid lines for all faces (100 divisions)
  addGridLines(parent, x, y, 100, 100,10);
 
  addGridLinesOnRight(parent, x + 100, y, x + 120, y - 20, x + 120, y + 80, x + 100, y + 100, 10);
}

function createHundredsBlockGroup(x, y, count, color) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", `translate(${x}, ${y})`);

  for (let i = 0; i < count; i++) {
    createHundredsBlock(group, i * 100, 0, color);
  }

  return group;
}

function createHundredsBlock(parent, x, y, color) {
  // Front face
  const front = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  front.setAttribute("x", x);
  front.setAttribute("y", y);
  front.setAttribute("width", 100);
  front.setAttribute("height", 100);
  front.setAttribute("fill", color);
  front.setAttribute("stroke", "black");
  front.setAttribute("stroke-width", "2");
  parent.appendChild(front);

  // Top face
  const top = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  top.setAttribute("points", `${x},${y} ${x+10},${y-10} ${x+110},${y-10} ${x+100},${y}`);
  top.setAttribute("fill",darkenColor(color, 20) );
  top.setAttribute("stroke", "black");
  top.setAttribute("stroke-width", "2");
  parent.appendChild(top);

  // Right face
  const right = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  right.setAttribute("points", `${x+100},${y} ${x+110},${y-10} ${x+110},${y+90} ${x+100},${y+100}`);
  right.setAttribute("fill", darkenColor(color, 10));
  right.setAttribute("stroke", "black");
  right.setAttribute("stroke-width", "2");
  parent.appendChild(right);

  addGridLines(parent, x, y, 100, 100,10);
  
}

function createTensBlockGroup(x, y, count, color) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", `translate(${x}, ${y})`);

  for (let i = 0; i < count; i++) {
    createTensBlock(group, i * 20, 0, color);
  }

  return group;
}

function createTensBlock(parent, x, y, color) {
  // Front face
  const front = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  front.setAttribute("x", x);
  front.setAttribute("y", y);
  front.setAttribute("width", 10);
  front.setAttribute("height", 100);
  front.setAttribute("fill", color);
  front.setAttribute("stroke", "black");
  front.setAttribute("stroke-width", "2");
  parent.appendChild(front);

  // Top face
  const top = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  top.setAttribute("points", `${x},${y} ${x+5},${y-5} ${x+15},${y-5} ${x+10},${y}`);
  top.setAttribute("fill", darkenColor(color, 20));
  top.setAttribute("stroke", "black");
  top.setAttribute("stroke-width", "2");
  parent.appendChild(top);

  // Right face
  const right = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  right.setAttribute("points", `${x+10},${y} ${x+15},${y-5} ${x+15},${y+95} ${x+10},${y+100}`);
  right.setAttribute("fill", darkenColor(color, 10));
  right.setAttribute("stroke", "black");
  right.setAttribute("stroke-width", "2");
  parent.appendChild(right);

  // Grid lines
  addGridLines(parent, x, y, 10, 100);
}

function createOnesBlockGroup(x, y, count, color) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", `translate(${x}, ${y + (count - 1) * 16})`);

  for (let i = 0; i < count; i++) {
    createOnesBlock(group, 0, i * 16, color);
  }

  return group;
}

function createOnesBlock(parent, x, y, color) {
  // Front face
  const front = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  front.setAttribute("x", x);
  front.setAttribute("y", y);
  front.setAttribute("width", 10);
  front.setAttribute("height", 10);
  front.setAttribute("fill", color);
  front.setAttribute("stroke", "black");
  front.setAttribute("stroke-width", "1");
  parent.appendChild(front);

  // Top face
  const top = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  top.setAttribute("points", `${x},${y} ${x+2},${y-2} ${x+12},${y-2} ${x+10},${y}`);
  top.setAttribute("fill", `${color}66`);
  top.setAttribute("stroke", "black");
  top.setAttribute("stroke-width", "1");
  parent.appendChild(top);

  // Right face
  const right = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  right.setAttribute("points", `${x+10},${y} ${x+12},${y-2} ${x+12},${y+8} ${x+10},${y+10}`);
  right.setAttribute("fill", `${color}88`);
  right.setAttribute("stroke", "black");
  right.setAttribute("stroke-width", "1");
  parent.appendChild(right);
}

function darkenColor(color, percent) {
  const hexColor = getHexColor(color);
  const num = parseInt(hexColor.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return `#${(1 << 24 | (R < 255 ? R < 1 ? 0 : R : 255) << 16 | (G < 255 ? G < 1 ? 0 : G : 255) << 8 | (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
}

function addGridLines(parent, x, y, width, height, divisions = 10) {
  const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gridGroup.setAttribute("stroke", "black");
  gridGroup.setAttribute("stroke-width", "0.5");

  for (let i = 1; i < divisions; i++) {
    const horizontalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    horizontalLine.setAttribute("x1", x);
    horizontalLine.setAttribute("y1", y + i * (height / divisions));
    horizontalLine.setAttribute("x2", x + width);
    horizontalLine.setAttribute("y2", y + i * (height / divisions));
    gridGroup.appendChild(horizontalLine);

    const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    verticalLine.setAttribute("x1", x + i * (width / divisions));
    verticalLine.setAttribute("y1", y);
    verticalLine.setAttribute("x2", x + i * (width / divisions));
    verticalLine.setAttribute("y2", y + height);
    gridGroup.appendChild(verticalLine);
  }

  parent.appendChild(gridGroup);
}

function addGridLinesOnTop(parent, x1, y1, x2, y2, x3, y3, x4, y4, divisions) {
  const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gridGroup.setAttribute("stroke", "black");
  gridGroup.setAttribute("stroke-width", "0.5");

  // Draw horizontal lines (rows)
  for (let i = 0; i <= divisions; i++) {
    const t = i / divisions;
    const startX = x1 + (x4 - x1) * t;
    const startY = y1 + (y4 - y1) * t;
    const endX = x2 + (x3 - x2) * t;
    const endY = y2 + (y3 - y2) * t;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    gridGroup.appendChild(line);
  }

  // Draw vertical lines (columns)
  for (let i = 0; i <= divisions; i++) {
    const t = i / divisions;
    const startX = x1 + (x2 - x1) * t;
    const startY = y1 + (y2 - y1) * t;
    const endX = x4 + (x3 - x4) * t;
    const endY = y4 + (y3 - y4) * t;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    gridGroup.appendChild(line);
  }

  parent.appendChild(gridGroup);
}

function addGridLinesOnRight(parent, x1, y1, x2, y2, x3, y3, x4, y4, divisions) {
  const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gridGroup.setAttribute("stroke", "black");
  gridGroup.setAttribute("stroke-width", "0.5");

  // Draw horizontal lines (rows)
  for (let i = 0; i <= divisions; i++) {
    const t = i / divisions;
    const startX = x1 + (x4 - x1) * t;
    const startY = y1 + (y4 - y1) * t;
    const endX = x2 + (x3 - x2) * t;
    const endY = y2 + (y3 - y2) * t;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    gridGroup.appendChild(line);
  }

  // Draw vertical lines (columns)
  for (let i = 0; i <= divisions; i++) {
    const t = i / divisions;
    const startX = x1 + (x2 - x1) * t;
    const startY = y1 + (y2 - y1) * t;
    const endX = x4 + (x3 - x4) * t;
    const endY = y4 + (y3 - y4) * t;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    gridGroup.appendChild(line);
  }

  parent.appendChild(gridGroup);
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

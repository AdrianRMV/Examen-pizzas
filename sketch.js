// ADRIAN RAMIREZ VAZQUEZ
// IDS TV

let numSlices;
let pizzaRadius;

function setup() {
    createCanvas(800, 600);
    numSlices = createInput('', 'number');
    numSlices.position(10, 10);
    numSlices.size(100);
    numSlices.style('font-size', '16px');
    numSlices.style('padding', '5px');
    numSlices.style('border', '2px solid #000');
    numSlices.style('border-radius', '5px');
    numSlices.input(updateSlices);
    pizzaRadius = 100;
    noLoop();
}

function updateSlices() {
    redraw();
}

function draw() {
    background(255);
    let slices = parseInt(numSlices.value());

    if (isNaN(slices) || slices < 1) return;

    // Draw the three pizzas
    push();
    translate(width / 4, height / 2);
    drawPizza(pizzaRadius, slices, pointSlopeLine);
    pop();

    push();
    translate(width / 2, height / 2);
    drawPizza(pizzaRadius, slices, DDA);
    pop();

    push();
    translate((3 * width) / 4, height / 2);
    drawPizza(pizzaRadius, slices, Bresenham);
    pop();

    // Add "Created by" text at the bottom
    textSize(16);
    textAlign(CENTER, BOTTOM);
    text('Created by: Adrian Ramirez Vazquez IDS TV', width / 2, height);
}

function drawPizza(radius, slices, lineAlgorithm) {
    ellipse(0, 0, radius * 2);
    let angle = TWO_PI / slices;

    for (let i = 0; i < slices; i++) {
        let x2 = radius * cos(i * angle);
        let y2 = radius * sin(i * angle);
        if (lineAlgorithm === Bresenham) {
            lineAlgorithm(0, 0, x2, y2, radius);
        } else {
            lineAlgorithm(0, 0, x2, y2);
        }
    }
}

function pointSlopeLine(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
}

function DDA(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;
    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        point(Math.round(x), Math.round(y));
        x += xIncrement;
        y += yIncrement;
    }
}

function Bresenham(x1, y1, x2, y2, radius) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    let maxIterations = dx + dy;
    let iterations = 0;

    while (iterations <= maxIterations) {
        if (isPointInCircle(x1, y1, 0, 0, radius)) {
            point(x1, y1);
        }
        if (x1 === x2 && y1 === y2) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
        iterations++;
    }
}

function isPointInCircle(x, y, centerX, centerY, radius) {
    let dx = x - centerX;
    let dy = y - centerY;
    return dx * dx + dy * dy <= radius * radius;
}

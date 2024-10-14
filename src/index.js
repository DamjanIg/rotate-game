const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const radius = 150;
const x = canvas.clientWidth / 2;
const y = canvas.clientHeight / 2;
const rotateSpeed = 100;
let start = true;
let interval;

const circles = [
  {
    color: "red",
    startAngle: 0, // 0
    endAngle: Math.PI / 3, // 60
  },

  {
    color: "yellow",
    startAngle: Math.PI / 3, // 60
    endAngle: (2 * Math.PI) / 3, // 120
  },

  {
    color: "blue",
    startAngle: (2 * Math.PI) / 3, // 120
    endAngle: Math.PI, // 180
  },

  {
    color: "purple",
    startAngle: Math.PI, // 180
    endAngle: (4 * Math.PI) / 3, // 240
  },

  {
    color: "orange",
    startAngle: (4 * Math.PI) / 3, // 240
    endAngle: (5 * Math.PI) / 3, //300
  },

  {
    color: "green",
    startAngle: (5 * Math.PI) / 3, // 300
    endAngle: 0, //360
  },
];

const triangles = [
  {
    color: "red",
    startAngle: 300, // 300
    endAngle: 0, //360
  },
  {
    color: "yellow",
    startAngle: 240, // 240
    endAngle: 300, //300
  },
  {
    color: "blue",
    startAngle: 180, // 180
    endAngle: 240, // 240
  },
  {
    color: "purple",
    startAngle: 120, // 120
    endAngle: 180, // 180
  },
  {
    color: "orange",
    startAngle: 60, // 60
    endAngle: 120, // 120
  },
  {
    color: "green",
    startAngle: 0, // 0
    endAngle: 60, // 60
  },
];

// Circle
function drawCircle() {
  circles.forEach((c) => {
    context.beginPath();
    context.arc(x, y, radius, c.startAngle, c.endAngle);
    context.fillStyle = c.color;
    context.fill();
    context.closePath();
  });
}

// Traingle
function drawTriangle() {
  triangles.forEach((t) => {
    // Convert degrees to radians
    let radiansStart = t.startAngle * (Math.PI / 180);
    let radiansEnd = t.endAngle * (Math.PI / 180);

    // Generate x cord for drawing lines
    let startX = Math.ceil(radius * Math.cos(radiansStart));
    let startY = Math.ceil(radius * Math.sin(radiansStart));

    // Gerenate y cord for drawing lines
    let endX = Math.ceil(radius * Math.cos(radiansEnd));
    let endY = Math.ceil(radius * Math.sin(radiansEnd));

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + startX, y - startY);
    context.lineTo(x + endX, y - endY);
    context.fillStyle = t.color;
    context.fill();
  });
}

// Function for rotating cricle to left
function rotateLeft() {
  const valueColor = circles[0].color;
  const valueOne = circles[1].color;
  const valueTwo = circles[2].color;
  const valueThree = circles[3].color;
  const valueFour = circles[4].color;
  const valueFive = circles[5].color;

  for (let i = 0; i < circles.length; i++) {
    if (i === 0) {
      circles[0].color = valueFive;
      triangles[0].color = valueFive;
    }

    if (i === 1) {
      circles[1].color = valueColor;
      triangles[1].color = valueColor;
    }

    if (i === 2) {
      circles[2].color = valueOne;
      triangles[2].color = valueOne;
    }

    if (i === 3) {
      circles[3].color = valueTwo;
      triangles[3].color = valueTwo;
    }

    if (i === 4) {
      circles[4].color = valueThree;
      triangles[4].color = valueThree;
    }

    if (i === 5) {
      circles[5].color = valueFour;
      triangles[5].color = valueFour;
    }
  }

  drawCircle();
  drawTriangle();
}

// Function for rotating cricle to right
function rotateRight() {
  const valueColor = circles[0].color;
  const valueOne = circles[1].color;
  const valueTwo = circles[2].color;
  const valueThree = circles[3].color;
  const valueFour = circles[4].color;
  const valueFive = circles[5].color;

  // loop for changing colors
  for (let i = 0; i < circles.length; i++) {
    if (i === 0) {
      circles[0].color = valueOne;
      triangles[0].color = valueOne;
    }

    if (i === 1) {
      circles[1].color = valueTwo;
      triangles[1].color = valueTwo;
    }

    if (i === 2) {
      circles[2].color = valueThree;
      triangles[2].color = valueThree;
    }

    if (i === 3) {
      circles[3].color = valueFour;
      triangles[3].color = valueFour;
    }

    if (i === 4) {
      circles[4].color = valueFive;
      triangles[4].color = valueFive;
    }

    if (i === 5) {
      circles[5].color = valueColor;
      triangles[5].color = valueColor;
    }
  }

  drawCircle();
  drawTriangle();
}

// Event
canvas.addEventListener("click", (e) => {
  if (
    (e.clientX < x - radius ||
      (e.clientY < y - radius && e.clientX < x) ||
      (e.clientY > y + radius && e.clientX < x)) &&
    start == true
  ) {
    start = false;
    interval = setInterval(rotateLeft, rotateSpeed);
  }

  if (
    (e.clientX > x + radius ||
      (e.clientY < y - radius && e.clientX > x) ||
      (e.clientY > y + radius && e.clientX > x)) &&
    start == true
  ) {
    interval = setInterval(rotateRight, rotateSpeed);
    start = false;
  }

  if (
    e.clientX >= x - radius &&
    e.clientX <= x + radius &&
    e.clientY >= y - radius &&
    e.clientY <= y + radius
  ) {
    clearInterval(interval);
    start = true;
  }
});

// Play
function play() {
  drawCircle();
  drawTriangle();
}

window.addEventListener("load", play);

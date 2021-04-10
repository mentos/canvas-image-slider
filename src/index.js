const CANVAS_ID = "canvas-slider";
const COLORS = ["forestgreen", "orange", "pink", "purple", "red"];
const DRAG_DIRECTION = {
  Left: -1,
  Right: 1,
};

let dragging = false;
let draggingStart = false;
let dx = 0;
let dragX = null;

$canvas = document.getElementById(CANVAS_ID);
$ctx = $canvas.getContext("2d");

const stage = {
  height: $ctx.canvas.height,
  width: $ctx.canvas.width,
};

bindMouseEvents($canvas);
init();

function bindMouseEvents($el) {
  document.addEventListener("mouseup", function (event) {
    $el.style.cursor = "grab";
    dragX = null;
    dragging = false;
    draggingStart = false;
  });

  $el.addEventListener("mousedown", function (event) {
    $el.style.cursor = "grabbing";
    draggingStart = true;
    dragX = event.x - dx;
  });

  document.addEventListener("mousemove", function (event) {
    if (!draggingStart) return;
    dragging = true;
    dx = event.x - (dragX ?? 0);
  });
}

function draw(t = 0) {
  if (t === 0 || dragging) {
    clearCanvas($ctx, stage);

    COLORS.forEach((color, idx) => {
      const x = stage.width * idx;
      const xLimit = stage.width * (COLORS.length - 1 - idx) * -1;

      drawRect(
        $ctx,
        {
          color,
          h: stage.height,
          w: stage.width,
          x: Math.max(Math.min(x, dx + x), xLimit),
          y: 0,
        },
        stage
      );
    });
  }

  requestAnimationFrame(draw);
}

function init() {
  draw();
}

function drawRect(ctx, { color, h, w, x, y }, stage) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function clearCanvas(ctx, { width, height }) {
  ctx.clearRect(0, 0, width, height);
}

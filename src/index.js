import slides from "./slides";

const CANVAS_ID = "canvas-slider";
const DIRECTION = {
  Left: 'left',
  Right: 'right',
};

const $canvas = document.getElementById(CANVAS_ID);
const $ctx = $canvas.getContext("2d");
const loadedImages = {};
const stage = {
  height: $ctx.canvas.height,
  width: $ctx.canvas.width,
};

let canDrag = true;
let direction = "";
let dragStartX = null;
let dx = 0;
let isDragging = false;
let isMousePressed = false;

bindMouseEvents($canvas);
init();

function bindMouseEvents($el) {
  document.addEventListener("mouseup", function (event) {
    $el.style.cursor = "grab";
    dragStartX = null;
    isDragging = false;
    isMousePressed = false;
    direction = "";
  });

  $el.addEventListener("mousedown", function (event) {
    $el.style.cursor = "grabbing";
    dragStartX = event.x - dx;
    isMousePressed = true;
  });

  document.addEventListener("mousemove", function (event) {
    if (!isMousePressed) return;

    const newDx = event.x - (dragStartX ?? 0);
    const newDirextion = dx >= newDx ? DIRECTION.Left : DIRECTION.Right;

    if (newDirextion === direction && !canDrag) return;

    isDragging = true;
    direction = newDirextion;
    dx = newDx;
  });
}

function draw(t = 0) {
  if (!t || isDragging) {
    clearCanvas($ctx, stage);

    slides.forEach((cat, idx) => {
      const drawDimensions = fitAspectRatio(
        { width: cat.width, height: cat.height },
        stage
      );
      const center = getCenter(drawDimensions, stage);
      const limitX =
        stage.width * (slides.length - 1 - idx) * -1 + center.x;
      const x = stage.width * idx + center.x;
      const finalX = Math.max(Math.min(x, dx + x), limitX);

      if (direction === DIRECTION.Left) {
        canDrag = finalX !== limitX;
      } else if (direction === DIRECTION.Right) {
        canDrag = finalX < x;
      }

      drawImage($ctx, {
        height: drawDimensions.height,
        id: cat.id,
        url: cat.url,
        width: drawDimensions.width,
        x: finalX,
        y: center.y,
      });
    });
  }

  requestAnimationFrame(draw);
}

function init() {
  draw();
}

function drawImage(
  ctx,
  { id = "", url, height, width, x = 0, y = 0 }
) {
  if (!loadedImages[id]) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, x, y, width, height);
    img.src = url;
    loadedImages[id] = img;
  } else {
    ctx.drawImage(loadedImages[id], x, y, width, height);
  }
}

function clearCanvas(ctx, { width, height }) {
  ctx.clearRect(0, 0, width, height);
}

function fitAspectRatio(source, target) {
  const ratio = Math.min(
    target.height / source.height,
    target.width / source.width
  );

  return {
    height: source.height * ratio,
    width: source.width * ratio,
  };
}

function getCenter(source, stage) {
  return {
    x: (stage.width - source.width) / 2,
    y: (stage.height - source.height) / 2,
  };
}

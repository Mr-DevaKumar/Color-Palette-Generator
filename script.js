const canvas = document.getElementById('color-wheel');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

const radius = canvas.width / 2;
let isDragging = false;
let pointerPosition = { x: radius, y: radius }; // Default pointer position

// Draw the color wheel
const drawColorWheel = () => {
    const image = ctx.createImageData(canvas.width, canvas.height);
    const data = image.data;

    for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {
            const distance = Math.sqrt(x * x + y * y);
            if (distance <= radius) {
                const angle = Math.atan2(y, x) + Math.PI;
                const hue = (angle / (2 * Math.PI)) * 360;
                const saturation = distance / radius;

                const [r, g, b] = hslToRgb(hue, saturation, 0.5);
                const pixelIndex = ((y + radius) * canvas.width + (x + radius)) * 4;

                data[pixelIndex] = r;
                data[pixelIndex + 1] = g;
                data[pixelIndex + 2] = b;
                data[pixelIndex + 3] = 255;
            }
        }
    }
    ctx.putImageData(image, 0, 0);
};

// Convert HSL to RGB
const hslToRgb = (h, s, l) => {
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
        const k = (n + h / 30) % 12;
        return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    return [f(0) * 255, f(8) * 255, f(4) * 255];
};

// Draw the pointer
const drawPointer = () => {
    ctx.beginPath();
    ctx.arc(pointerPosition.x, pointerPosition.y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
};

// Update color information
const updateColorInfo = () => {
    const pixel = ctx.getImageData(pointerPosition.x, pointerPosition.y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    document.getElementById('selected-color').textContent = color;
    document.getElementById('selected-color').style.color = color;
};

// Redraw everything
const redraw = () => {
    drawColorWheel();
    drawPointer();
    updateColorInfo();
};

// Handle mouse events
const onMouseDown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - radius;
    const dy = y - radius;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= radius) {
        isDragging = true;
        pointerPosition = { x, y };
        redraw();
    }
};

const onMouseMove = (e) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius) {
            pointerPosition = { x, y };
            redraw();
        }
    }
};

const onMouseUp = () => {
    isDragging = false;
};

// Add event listeners
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp); // Stop dragging when leaving the canvas

// Initial rendering
redraw();

import { onMount, onCleanup } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Oval() {
  const { setCanvas, resizeCanvas, clearCanvas } = useCanvas();

  onMount(() => {
    // Get the global canvas element
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    // Set up the global canvas
    setCanvas(canvasElement);
    resizeCanvas();

    // Draw the oval
    drawOval();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Handle space bar for redraw
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scroll
        drawOval();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      clearCanvas();
    };
  });

  function handleResize() {
    resizeCanvas();
    drawOval();
  }

  function drawOval() {
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    // Random oval dimensions
    const radiusX = Math.random() * 150 + 50;
    const radiusY = Math.random() * 100 + 30;

    // Centered position (no random)
    const x = width / 2;
    const y = height / 2;

    // Random rotation
    const rotation = Math.random() * Math.PI * 2;

    // Draw the oval outline (black, no fill)
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  return (
    <div
      style={{
        'max-width': '600px',
        margin: '40px auto',
        'font-family': 'sans-serif',
        'line-height': 1.6,
        'z-index': 2,
        position: 'relative',
      }}></div>
  );
}

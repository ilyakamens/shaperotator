import { onMount, onCleanup } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Rectangle() {
  const { setCanvas, resizeCanvas, clearCanvas } = useCanvas();

  onMount(() => {
    // Get the global canvas element
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    // Set up the global canvas
    setCanvas(canvasElement);
    resizeCanvas();

    // Draw the rectangle
    drawRectangle();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Handle space bar for redraw
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scroll
        drawRectangle();
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
    drawRectangle();
  }

  function drawRectangle() {
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    // Random rectangle dimensions
    const rectWidth = Math.random() * 500 + 10;
    const rectHeight = Math.random() * 500 + 10;

    // Always center the rectangle
    const x = width / 2 - rectWidth / 2;
    const y = height / 2 - rectHeight / 2;

    // Random rotation
    const rotation = Math.random() * Math.PI * 2;

    // Draw the rectangle outline (black, no fill)
    ctx.save();
    ctx.translate(x + rectWidth / 2, y + rectHeight / 2);
    ctx.rotate(rotation);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
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

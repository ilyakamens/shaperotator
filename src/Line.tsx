import { onMount, onCleanup } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Line() {
  const { setCanvas, resizeCanvas, clearCanvas } = useCanvas();

  onMount(() => {
    // Get the global canvas element
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;

    // Set up the global canvas
    setCanvas(canvasElement);
    resizeCanvas();

    // Draw the line
    drawLine();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Handle space bar for redraw
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scroll
        drawLine();
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
    drawLine();
  }

  function drawLine() {
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;

    const ctx = canvasElement.getContext('2d')!;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    const lineWidth = Math.random() * 500;

    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI * 2 * Math.random());
    ctx.translate(-width / 2, -height / 2);
    ctx.fillStyle = 'red';
    ctx.fillRect(width / 2 - lineWidth / 2, height / 2, lineWidth, 1);
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

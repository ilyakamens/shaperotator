import { onMount } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Triangle() {
  const { setCanvas, resizeCanvas, clearCanvas } = useCanvas();

  onMount(() => {
    // Get the global canvas element
    const canvasElement = document.getElementById(
      'global-canvas'
    ) as HTMLCanvasElement;
    if (!canvasElement) return;

    // Set up the global canvas
    setCanvas(canvasElement);
    resizeCanvas();

    // Draw the triangle
    drawTriangle();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      clearCanvas();
    };
  });

  function handleResize() {
    resizeCanvas();
    drawTriangle();
  }

  function drawTriangle() {
    const canvasElement = document.getElementById(
      'global-canvas'
    ) as HTMLCanvasElement;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    // Triangle points (original)
    const points = [
      { x: Math.random() * 500 + 1, y: Math.random() * 500 + 1 },
      { x: Math.random() * 500 + 1, y: Math.random() * 500 + 1 },
      { x: Math.random() * 500 + 1, y: Math.random() * 500 + 1 },
    ];

    // Calculate centroid of the triangle
    const centroid = {
      x: (points[0].x + points[1].x + points[2].x) / 3,
      y: (points[0].y + points[1].y + points[2].y) / 3,
    };

    // Calculate canvas center
    const center = { x: width / 2, y: height / 2 };

    // Offset to move centroid to canvas center
    const offset = {
      x: center.x - centroid.x,
      y: center.y - centroid.y,
    };

    // Create new Path2D with translated points
    let region = new Path2D();
    region.moveTo(points[0].x + offset.x, points[0].y + offset.y);
    region.lineTo(points[1].x + offset.x, points[1].y + offset.y);
    region.lineTo(points[2].x + offset.x, points[2].y + offset.y);
    region.closePath();

    // Draw only the border (stroke) of the triangle
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke(region);
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
      }}
    >
    </div>
  );
}

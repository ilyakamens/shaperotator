import { onMount } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function About() {
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

    // Draw the about text
    drawAbout();

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
    drawAbout();
  }

  function drawAbout() {
    const canvasElement = document.getElementById(
      'global-canvas'
    ) as HTMLCanvasElement;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    ctx.fillStyle = '#333';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('About Page', width / 2, height / 2 - 50);

    ctx.font = '16px Arial';
    ctx.fillText(
      'This is a simple shape rotator application',
      width / 2,
      height / 2
    );
    ctx.fillText(
      'Use the navigation to switch between different views',
      width / 2,
      height / 2 + 30
    );
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
      <h1>About</h1>
      <p>This component uses the global canvas to display text.</p>
    </div>
  );
}

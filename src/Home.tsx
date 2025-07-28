import { onMount } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Home() {
  const { setCanvas, resizeCanvas, clearCanvas } = useCanvas();

  onMount(() => {
    // Get the global canvas element
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    // Set up the global canvas
    setCanvas(canvasElement);
    resizeCanvas();

    // Clear the canvas for home page
    clearCanvas();

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
    clearCanvas();
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
      }}>
      <h1>Welcome to the Shape Generator!</h1>
      <p>
        This app lets you generate a variety of shapes—lines, triangles, squares, rectangles,
        circles, and more. Each shape is created with a random element, making every one unique.
      </p>
      <ul>
        <li>
          <strong>
            Press the <kbd>Space</kbd> bar
          </strong>{' '}
          to generate a new, unique shape.
        </li>
        <li>
          <strong>Use the navigation links above</strong> to choose which type of shape to generate.
        </li>
      </ul>
      <p>Have fun exploring the endless possibilities of randomly generated shapes!</p>
    </div>
  );
}

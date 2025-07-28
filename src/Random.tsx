import { onMount, onCleanup } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Random() {
  // Define event handlers outside onMount so they can be accessed in onCleanup
  let resizeTimeout: number | undefined;
  function debouncedHandleResize() {
    if (resizeTimeout !== undefined) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
      handleResize();
    }, 150); // 150ms debounce delay
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault(); // Prevent page scroll
      drawPixels();
    }
  }

  let canvasElement: HTMLCanvasElement;

  onMount(() => {
    // Get the global canvas element
    canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;

    // Set up the global canvas with fixed size
    canvasElement.width = 300;
    canvasElement.height = 300;
    canvasElement.style.width = '300px';
    canvasElement.style.height = '300px';
    canvasElement.style.position = 'fixed';
    canvasElement.style.top = '50%';
    canvasElement.style.left = '50%';
    canvasElement.style.transform = 'translate(-50%, -50%)';

    // Draw the pixel pattern
    drawPixels();

    // Handle window resize
    window.addEventListener('resize', debouncedHandleResize);

    // Handle space bar for redraw
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      // No cleanup needed here - moved to onCleanup
    };
  });

  // Add a separate cleanup effect that runs when component unmounts
  onCleanup(() => {
    // Remove event listeners
    window.removeEventListener('resize', debouncedHandleResize);
    document.removeEventListener('keydown', handleKeyDown);

    // Restore canvas to original size for other components
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';
    canvasElement.style.position = 'absolute';
    canvasElement.style.top = '0';
    canvasElement.style.left = '0';
    canvasElement.style.transform = 'none';
  });

  function handleResize() {
    drawPixels();
  }

  function drawPixels() {
    const ctx = canvasElement.getContext('2d')!;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    // Create image data for pixel manipulation
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    function setWhite(i: number) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }

    function setBlack(i: number) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    // Iterate through each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        if (Math.random() < 0.5) {
          setWhite(index);
        } else {
          setBlack(index);
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
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
      <h1>Random Pixel Generator</h1>
      <p>Press the space bar to generate a new pixel pattern!</p>
    </div>
  );
}

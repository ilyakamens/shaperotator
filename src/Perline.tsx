import { onMount, onCleanup } from 'solid-js';

export default function Perline() {
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
      drawPerlin();
    }
  }

  let canvasElement: HTMLCanvasElement;

  // Return a smoothing value between 0 and 1.
  function fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a: number, b: number, t: number): number {
    // t: how far between a and b to go
    // (t = 0 → return a, t = 1 → return b, t = 0.5 → midpoint)
    return a + t * (b - a);
  }

  function grad(hash: number, x: number): number {
    // Use the hash to determine the gradient direction
    // This creates more varied gradients than just +1 or -1
    const h = hash & 15;
    const grad = 1 + (h & 7); // Gradient value from 1 to 8
    return (h & 8 ? -grad : grad) * x;
  }

  // (Fisher–Yates) Shuffle the permutation table for randomness
  function shuffle(p: number[]) {
    for (let i = p.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
  }

  // Create a permutation table for randomness. (Currently numbered 0->255.)
  const p = Array.from({ length: 256 }, (_, i) => i);

  // Return a value between -1 and 1.
  function perlin(x: number): number {
    const xi = Math.floor(x) & 255;
    // xf: Fractional part of x; how far between the integer and the next integer
    const xf = x - Math.floor(x);
    const blend = fade(xf);

    const g1 = grad(p[xi], xf);
    const g2 = grad(p[(xi + 1) & 255], xf - 1);

    // Normalize the result to keep it between -1 and 1
    return lerp(g1, g2, blend) / 8;
  }

  onMount(() => {
    // Get the global canvas element
    canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;

    // Set up the global canvas with fixed size
    canvasElement.width = 750;
    canvasElement.height = 300;
    canvasElement.style.width = '750px';
    canvasElement.style.height = '300px';
    canvasElement.style.position = 'fixed';
    canvasElement.style.top = '50%';
    canvasElement.style.left = '50%';
    canvasElement.style.transform = 'translate(-50%, -50%)';

    // Draw the perlin pattern
    drawPerlin();

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
    drawPerlin();
  }

  function drawPerlin() {
    const ctx = canvasElement.getContext('2d')!;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;

    // Set up the drawing context
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();

    shuffle(p);

    // Draw the sine wave
    for (let x = 0; x < width; x++) {
      // Scale the coordinates for perlin noise
      const scale = 0.01; // Adjust this to change the frequency
      const noiseValue = perlin(x * scale);

      // Convert noise value to y position (center the wave)
      const y = ((noiseValue + 1) * height) / 2;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
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
      <p>Press the space bar to generate a new Perline (Perlin line)</p>
    </div>
  );
}

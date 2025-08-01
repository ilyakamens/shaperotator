import { onMount, onCleanup } from 'solid-js';
import { useCanvas } from './canvasStore';

export default function Pixels1() {
  const { setCanvas, resizeCanvas, clearCanvas } = useCanvas();

  onMount(() => {
    // Get the global canvas element
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    // Set up the global canvas and match pixel dimensions to CSS dimensions
    setCanvas(canvasElement);

    // Set canvas pixel dimensions to match CSS dimensions
    const rect = canvasElement.getBoundingClientRect();
    canvasElement.width = rect.width;
    canvasElement.height = rect.height;

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

      // Restore canvas to original dimensions
      const isMobile = window.innerWidth <= 768;
      const margin = isMobile ? 20 : 50;
      const topMargin = isMobile ? 60 : 90;
      const bottomMargin = isMobile ? 120 : 180;

      canvasElement.width = window.innerWidth - margin * 2;
      canvasElement.height = window.innerHeight - topMargin - bottomMargin;
      canvasElement.style.left = margin + 'px';
      canvasElement.style.top = topMargin + 'px';
    };
  });

  onCleanup(() => {
    // Restore canvas to original dimensions and positioning
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (canvasElement) {
      canvasElement.width = window.innerWidth - 100;
      canvasElement.height = window.innerHeight - 180;
      canvasElement.style.left = '50px';
      canvasElement.style.top = '90px';
    }
  });

  function handleResize() {
    // Don't call resizeCanvas() as it overrides global canvas settings
    drawRectangle();
  }

  function drawRectangle() {
    const canvasElement = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;

    // Set canvas dimensions responsively for mobile
    const isMobile = window.innerWidth <= 768;
    const margin = isMobile ? 20 : 50;
    const topMargin = isMobile ? 60 : 90;
    const bottomMargin = isMobile ? 120 : 180;

    canvasElement.width = window.innerWidth - margin * 2;
    canvasElement.height = window.innerHeight - topMargin - bottomMargin;
    canvasElement.style.left = margin + 'px';
    canvasElement.style.top = topMargin + 'px';

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    ctx.reset();

    const width = canvasElement.width;
    const height = canvasElement.height;
    const sectionWidth = width / 6;

    // Draw squares for each 6th of the canvas with progressively smaller sizes
    for (let section = 0; section < 6; section++) {
      const sectionX = section * sectionWidth;

      // Calculate pixel size for this section (32 -> 16 -> 8 -> 4 -> 2 -> 1)
      const pixelSize = Math.max(1, Math.floor(32 / Math.pow(2, section)));

      // Calculate how many pixels we can fit in this section
      const pixelsPerRow = Math.ceil(sectionWidth / pixelSize);
      const pixelsPerColumn = Math.ceil(height / pixelSize);

      // Draw contiguous squares with random colors for this section
      for (let row = 0; row < pixelsPerColumn; row++) {
        for (let col = 0; col < pixelsPerRow; col++) {
          const x = sectionX + col * pixelSize;
          const y = row * pixelSize;

          // Generate random color
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    }
  }

  return (
    <div
      style={{
        'font-family': 'sans-serif',
        position: 'relative',
      }}></div>
  );
}

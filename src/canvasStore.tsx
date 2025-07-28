import { createSignal, createContext, useContext, JSX } from 'solid-js';

interface CanvasStore {
  canvas: () => HTMLCanvasElement | null;
  ctx: () => CanvasRenderingContext2D | null;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  resizeCanvas: () => void;
  clearCanvas: () => void;
}

const CanvasContext = createContext<CanvasStore>();

export function CanvasProvider(props: { children: JSX.Element }) {
  const [canvas, setCanvasSignal] = createSignal<HTMLCanvasElement | null>(
    null
  );
  const [ctx, setCtx] = createSignal<CanvasRenderingContext2D | null>(null);

  const setCanvas = (canvasElement: HTMLCanvasElement) => {
    setCanvasSignal(canvasElement);
    const context = canvasElement.getContext('2d');
    setCtx(context);
  };

  const resizeCanvas = () => {
    const canvasElement = canvas();
    if (!canvasElement) return;

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  };

  const clearCanvas = () => {
    const context = ctx();
    if (!context) return;
    context.reset();
  };

  const store: CanvasStore = {
    canvas,
    ctx,
    setCanvas,
    resizeCanvas,
    clearCanvas,
  };

  return (
    <CanvasContext.Provider value={store}>
      {props.children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}

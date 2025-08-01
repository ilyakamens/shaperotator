/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { Route, Router } from '@solidjs/router';
import { CanvasProvider } from './canvasStore';
import Navigation from './Navigation';
import Home from './Home';
import Line from './Line';
import Triangle from './Triangle';
import Rectangle from './Rectangle';
import Oval from './Oval';
import Random from './Random';
import Radient from './Radient';
import Perline from './Perline';
import Pixels1 from './Pixels1';
import About from './About';

import { onMount } from 'solid-js';

function AppContent() {
  onMount(() => {
    const canvas = document.getElementById('global-canvas') as HTMLCanvasElement;
    if (canvas) {
      // Set canvas dimensions directly in JavaScript
      canvas.width = window.innerWidth - 100;
      canvas.height = window.innerHeight - 180;
    }
  });

  return (
    <div>
      <canvas
        id='global-canvas'
        style='
        position: fixed;
        top: 90px;
        left: 50px;
        pointer-events: none;
        z-index: 1;
      '
      />
      <Navigation />
      <Router base='/shaperotator'>
        <Route path='/' component={Home} />
        <Route path='/line' component={Line} />
        <Route path='/triangle' component={Triangle} />
        <Route path='/rectangle' component={Rectangle} />
        <Route path='/oval' component={Oval} />
        <Route path='/random' component={Random} />
        <Route path='/radient' component={Radient} />
        <Route path='/perline' component={Perline} />
        <Route path='/pixels1' component={Pixels1} />
        <Route path='/about' component={About} />
      </Router>
    </div>
  );
}

function App() {
  return (
    <CanvasProvider>
      <AppContent />
    </CanvasProvider>
  );
}

render(() => <App />, document.getElementById('root')!);

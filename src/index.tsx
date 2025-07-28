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
import About from './About';

render(
  () => (
    <CanvasProvider>
      <div>
        <canvas
          id='global-canvas'
          style='
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
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
          <Route path='/about' component={About} />
        </Router>
      </div>
    </CanvasProvider>
  ),
  document.getElementById('root')!
);

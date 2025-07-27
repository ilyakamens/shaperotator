/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { Route, Router } from '@solidjs/router';
import Home from './Home';
import Line from './Line';
import Triangle from './Triangle';
import About from './About';

render(
  () => (
    <div>
      <nav
        style='
        background: #f8f8f8;
        border-bottom: 1px solid;
        padding: 12px 0;
        text-align: center;
      '
      >
        <a
          href='/'
          style='
          margin: 0 20px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        '
        >
          Home
        </a>
        <a
          href='/line'
          style='
          margin: 0 20px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        '
        >
          Line
        </a>
        <a
          href='/triangle'
          style='
          margin: 0 20px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        '
        >
          Triangle
        </a>
        <a
          href='/about'
          style='
          margin: 0 20px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        '
        >
          About
        </a>
      </nav>
      <Router>
        <Route path='/' component={Home} />
        <Route path='/line' component={Line} />
        <Route path='/triangle' component={Triangle} />
        <Route path='/about' component={About} />
      </Router>
    </div>
  ),
  document.getElementById('root')!
);

import styles from './App.module.css';
import { createMemoryHistory } from '@solidjs/router';

export default function App() {
  const history = createMemoryHistory();

  return (
    <div class={styles.App}>
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
      <canvas id='canvas'></canvas>
    </div>
  );
}

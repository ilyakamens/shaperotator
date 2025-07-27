export default function Home() {
  return (
    <div
      style={{
        'max-width': '600px',
        margin: '40px auto',
        'font-family': 'sans-serif',
        'line-height': 1.6,
      }}
    >
      <h1>Welcome to the Shape Generator!</h1>
      <p>
        This app lets you generate a variety of shapes—lines, triangles,
        squares, rectangles, circles, and more. Each shape is created with a
        random element, making every one unique.
      </p>
      <ul>
        <li>
          <strong>
            Press the <kbd>Space</kbd> bar
          </strong>{' '}
          to generate a new random shape.
        </li>
        <li>
          <strong>Use the navigation links above</strong> to choose which type
          of shape to generate.
        </li>
      </ul>
      <p>
        Have fun exploring the endless possibilities of randomly generated
        shapes!
      </p>
    </div>
  );
}

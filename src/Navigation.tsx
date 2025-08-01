import { createSignal, onMount } from 'solid-js';

export default function Navigation() {
  const [currentPath, setCurrentPath] = createSignal('/');

  onMount(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);

    // Listen for navigation changes
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for link clicks
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href) {
        const url = new URL(target.href);
        setCurrentPath(url.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  });

  const isActive = (path: string) => {
    const current = currentPath();
    if (path === '/') {
      return current === '/shaperotator/' || current === '/shaperotator';
    }
    return current.includes(path);
  };

  const getLinkStyle = (path: string) => ({
    margin: '0 10px',
    'text-decoration': isActive(path) ? 'underline' : 'none',
    color: '#333',
    'font-weight': 'bold',
    'font-size': '14px',
    padding: '4px 8px',
  });

  return (
    <nav
      style='
      background: #f8f8f8;
      border-bottom: 1px solid;
      padding: 8px 0;
      text-align: center;
      z-index: 2;
      position: relative;
      font-size: 14px;
      overflow-x: auto;
      white-space: nowrap;
    '>
      <a href='/shaperotator/' style={getLinkStyle('/')}>
        Home
      </a>
      <a href='/shaperotator/line' style={getLinkStyle('/line')}>
        Line
      </a>
      <a href='/shaperotator/triangle' style={getLinkStyle('/triangle')}>
        Triangle
      </a>
      <a href='/shaperotator/rectangle' style={getLinkStyle('/rectangle')}>
        Rectangle
      </a>
      <a href='/shaperotator/oval' style={getLinkStyle('/oval')}>
        Oval
      </a>
      <a href='/shaperotator/random' style={getLinkStyle('/random')}>
        Random
      </a>
      <a href='/shaperotator/radient' style={getLinkStyle('/radient')}>
        Radient
      </a>
      <a href='/shaperotator/perline' style={getLinkStyle('/perline')}>
        Perline
      </a>
      <a href='/shaperotator/pixels1' style={getLinkStyle('/pixels1')}>
        Pixels1
      </a>
      <a href='/shaperotator/about' style={getLinkStyle('/about')}>
        About
      </a>
    </nav>
  );
}

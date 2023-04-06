import { useEffect, useState } from 'react';

interface RouteProps {
  path: string;
  children: any;
}

const Route = ({ path, children }: RouteProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
      const onLocationChange = () => {
          setCurrentPath(window.location.pathname);
      }

      window.addEventListener('popstate', onLocationChange);

      return () => {
          window.removeEventListener('popstate', onLocationChange)
      };
  }, [])
  
  return window.location.pathname === path ? children : null
}

export default Route;
import { useCallback, useEffect, useState } from 'react';
import { useSpring } from 'react-spring';

export default function useHoverBounce({
  x = 0,
  y = 0,
  duration = 150,
  spring = {
    tension: 200,
    friction: 15
  }
}) {
  const [isHovered, setHovered] = useState(false);

  const style = useSpring({
    config: spring,
    display: 'inline-block',
    transform: isHovered ? `translate(${x}px, ${y}px)` : `translate(0px, 0px)`
  });

  useEffect(() => {
    if (!isHovered) {
      return;
    }

    const timeout = setTimeout(() => setHovered(false), duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [isHovered, setHovered, duration]);

  const trigger = useCallback(() => setHovered(true), [setHovered]);

  return [style, trigger];
}

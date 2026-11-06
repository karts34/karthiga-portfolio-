import { useRef, type AnchorHTMLAttributes, type PointerEvent } from 'react';

export function MagneticLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * 0.035}px, ${(event.clientY - bounds.top - bounds.height / 2) * 0.07}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ''; };
  return <a {...props} ref={ref} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>{children}</a>;
}

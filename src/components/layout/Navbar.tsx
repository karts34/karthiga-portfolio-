import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [['Home', 'home'], ['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'], ['Journey', 'experience'], ['Contact', 'contact']];

export function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 960px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', escape);
    window.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', escape);
      window.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);
  const isActive = (id: string) => activeSection === id || (id === 'experience' && activeSection === 'achievements');
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="nav-shell">
        <a href="#home" className="wordmark" aria-label="Karthiga S. home"><span className="monogram">K<span>S</span><i /></span><span className="wordmark-label">PURPLE<br /><strong>GALAXY</strong></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={isActive(id) ? 'location' : undefined} className={isActive(id) ? 'active' : ''}>{label}</a>)}
        </nav>
        <a href="#contact" className="nav-connect">Let’s talk <ArrowUpRight size={15} /></a>
        <button ref={trigger} type="button" className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {open && <nav ref={menu} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        {links.map(([label, id], index) => <a key={id} href={`#${id}`} aria-current={isActive(id) ? 'location' : undefined} onClick={() => { setOpen(false); document.getElementById(id)?.focus({ preventScroll: true }); }}><span>0{index + 1}</span>{label}<ArrowUpRight size={17} /></a>)}
      </nav>}
    </header>
  );
}

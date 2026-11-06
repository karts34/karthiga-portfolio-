import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  description
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={title || imageAlt}
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center bg-surface/90 border border-violet/30 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-violet/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-surface-raised/80 hover:bg-violet/30 text-white border border-border-subtle hover:border-violet transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full flex-1 min-h-0 flex items-center justify-center overflow-auto rounded-lg bg-black/40 p-2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-md shadow-lg"
          />
        </div>

        {(title || description) && (
          <div className="mt-4 text-center max-w-2xl px-2">
            {title && (
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

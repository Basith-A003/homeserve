import { useState } from 'react';
import { getCategoryImage } from '../services/mockStore';

export default function ServiceImage({ src, category, alt = '', className }) {
  const fallback = getCategoryImage(category);
  const [current, setCurrent] = useState(src || fallback);

  return (
    <img
      className={className}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}

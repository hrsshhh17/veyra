import { forwardRef } from "react";

const SceneLayer = forwardRef(function SceneLayer(
  {
    desktopSrc,
    mobileSrc,
    alt = "",
    className = "",
  },
  ref
) {
  return (
    <picture className="absolute inset-0 block h-full w-full">
      {mobileSrc && (
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrc}
        />
      )}

      <img
        ref={ref}
        src={desktopSrc}
        alt={alt}
        draggable="false"
        className={`
          pointer-events-none
          absolute inset-0
          h-full w-full
          object-cover object-center
          select-none
          will-change-transform
          ${className}
        `}
      />
    </picture>
  );
});

export default SceneLayer;
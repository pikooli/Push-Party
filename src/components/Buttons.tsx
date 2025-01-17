import { useEffect, useRef, useState } from 'react';
import { useBoxStore, useTextureStore } from '@/zustand/store';
import { GEOMETRY_TYPES } from '@/constants';
import * as THREE from 'three';

export const Buttons = () => {
  const { setSpecifyGeometry } = useBoxStore();
  const { setTexture } = useTextureStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [duckTexture, setDuckTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/duck.png', (loadedTexture) => {
      setDuckTexture(loadedTexture);
      setTexture(loadedTexture);
    });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);

      const loader = new THREE.TextureLoader();
      loader.load(url, (loadedTexture) => {
        setTexture(loadedTexture);
      });
    }
  };

  return (
    <div className="absolute left-1/2 top-4 z-50 flex -translate-x-1/2 flex-wrap justify-center gap-3 rounded-lg bg-white/80 p-4 shadow-lg sm:flex-nowrap">
      <div className="flex flex-wrap justify-center gap-3 sm:flex-nowrap">
        {Object.keys(GEOMETRY_TYPES).map((geometry) => (
          <button
            key={geometry}
            className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium capitalize text-white transition-colors hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-base"
            onClick={() => setSpecifyGeometry(geometry)}
          >
            {geometry}
          </button>
        ))}
      </div>
      <div className="mx-2 hidden w-px self-stretch bg-gray-300 sm:block" />
      <div className="flex justify-center gap-3 sm:flex-nowrap">
        <button
          className="rounded-md bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-yellow-600 sm:px-4 sm:py-2 sm:text-base"
          onClick={() => duckTexture && setTexture(duckTexture)}
        >
          Duck
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          className="rounded-md bg-purple-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-purple-600 sm:px-4 sm:py-2 sm:text-base"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

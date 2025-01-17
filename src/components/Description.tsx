'use client';

import { useState, useEffect } from 'react';
import { View } from '@react-three/drei';
import { Clouds } from '@/components/mesh/Clouds';
import { Sphere } from '@/components/mesh/Sphere';
import * as THREE from 'three';

interface DescriptionProps {
  initMediapipe: () => void;
}

const Information = () => {
  return (
    <div>
      <h1 className="font-geist-sans text-3xl font-bold">
        🎮 Welcome to Push Party! 🎉
      </h1>
      <p className="text-lg leading-relaxed text-gray-700">
        🎯 Get ready for a fun interactive experience where you can push and
        play with 3D objects using just your hands! ✨
      </p>
      <p className="text-lg leading-relaxed text-gray-700">
        {' '}
        📸 Make sure your camera is enabled and your hands are visible. 👋
      </p>
      <p className="mt-2 rounded-lg bg-red-500 p-2 text-sm text-gray-200">
        ⚠️ Note: This application requires either a decent dedicated GPU or
        Apple Silicon Mac for optimal performance. 💻
      </p>
    </div>
  );
};

export const Description = ({ initMediapipe }: DescriptionProps) => {
  const [worldTexture, setWorldTexture] = useState<THREE.Texture>();
  const [cloudTexture, setCloudTexture] = useState<THREE.Texture>();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      'https://assets.codepen.io/141041/small-world.jpg',
      (texture) => {
        setWorldTexture(texture);
      }
    );
    loader.load(
      'https://assets.codepen.io/141041/small-world-clouds.png',
      (texture) => {
        setCloudTexture(texture);
      }
    );
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-500 to-blue-200">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.5,
        }}
      ></div>
      <View className="absolute h-screen w-screen">
        <Clouds />
        <ambientLight intensity={1} />
        <group position={[0, -4, 0]}>
          {worldTexture && (
            <Sphere
              scale={2}
              texture={worldTexture}
              rotationY={0.0005}
              radius={1}
              widthSegments={40}
              heightSegments={40}
            />
          )}
          {cloudTexture && (
            <Sphere
              scale={2}
              texture={cloudTexture}
              transparent={true}
              rotationY={-0.001}
              radius={1.01}
              widthSegments={40}
              heightSegments={40}
            />
          )}
        </group>
      </View>
      <div className="absolute bottom-0 left-0 right-0 z-50 flex h-screen items-center justify-center">
        <div className="flex max-w-lg flex-col items-center gap-8 rounded-xl bg-white/90 p-8 text-center shadow-lg">
          <Information />
          <button
            className="rounded-lg bg-blue-500 px-8 py-4 font-medium text-white transition hover:bg-blue-600"
            onClick={initMediapipe}
          >
            Start Playing
          </button>
        </div>
      </div>
    </div>
  );
};

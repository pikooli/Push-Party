import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Sphere = (props: {
  scale?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  texture: THREE.Texture;
  transparent?: boolean;
  rotationY?: number;
}) => {
  const {
    scale,
    texture,
    transparent,
    rotationY,
    radius,
    widthSegments,
    heightSegments,
  } = props;
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationY || 0;
    }
  });

  return (
    <mesh ref={ref} scale={scale}>
      <sphereGeometry args={[radius, widthSegments, heightSegments]} />
      <meshBasicMaterial map={texture} transparent={transparent} />
    </mesh>
  );
};

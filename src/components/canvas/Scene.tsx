'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { View } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      {...props}
      shadows={true}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}

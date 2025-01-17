'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from './Cloud';
import { Group } from 'three';

const SPEED = 2;
const LIMIT_CLOUD = {
  1: 0,
  2: 1,
  3: 4,
};

export const Clouds = () => {
  const MAX_CLOUD_POSITION = window.innerWidth / 100; // Convert pixels to Three.js units
  const cloudRef1 = useRef<Group>(null);
  const cloudRef2 = useRef<Group>(null);
  const cloudRef3 = useRef<Group>(null);

  useFrame((_, delta) => {
    const move = delta * SPEED;
    if (cloudRef1.current) {
      cloudRef1.current.position.x += move;
      if (cloudRef1.current.position.x > MAX_CLOUD_POSITION + LIMIT_CLOUD[1]) {
        cloudRef1.current.position.x = -MAX_CLOUD_POSITION + LIMIT_CLOUD[1];
      }
    }
    if (cloudRef2.current) {
      cloudRef2.current.position.x += move;
      if (cloudRef2.current.position.x > MAX_CLOUD_POSITION + LIMIT_CLOUD[2]) {
        cloudRef2.current.position.x = -MAX_CLOUD_POSITION + LIMIT_CLOUD[2];
      }
    }
    if (cloudRef3.current) {
      cloudRef3.current.position.x += move;
      if (cloudRef3.current.position.x > MAX_CLOUD_POSITION + LIMIT_CLOUD[3]) {
        cloudRef3.current.position.x = -MAX_CLOUD_POSITION + LIMIT_CLOUD[3];
      }
    }
  });

  return (
    <>
      <Cloud
        ref={cloudRef1}
        position={[-MAX_CLOUD_POSITION + LIMIT_CLOUD[1], 0, 0]}
      />
      <Cloud
        ref={cloudRef2}
        position={[-MAX_CLOUD_POSITION + LIMIT_CLOUD[2], 1, 0]}
      />
      <Cloud
        ref={cloudRef3}
        position={[-MAX_CLOUD_POSITION + LIMIT_CLOUD[3], 2, 0]}
      />
    </>
  );
};

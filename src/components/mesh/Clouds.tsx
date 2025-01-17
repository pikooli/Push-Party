import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from './Cloud';

const MAX_CLOUD_POSITION = window.innerWidth / 100; // Convert pixels to Three.js units
const SPEED = 2;
const LIMIT_CLOUD = {
  1: 0,
  2: 3,
  3: 8,
};

export const Clouds = () => {
  const cloudRef1 = useRef<any>();
  const cloudRef2 = useRef<any>();
  const cloudRef3 = useRef<any>();

  useFrame((state, delta) => {
    if (cloudRef1.current) {
      cloudRef1.current.position.x += delta * SPEED;
      if (cloudRef1.current.position.x > MAX_CLOUD_POSITION) {
        cloudRef1.current.position.x = -MAX_CLOUD_POSITION + LIMIT_CLOUD[1];
      }
    }
    if (cloudRef2.current) {
      cloudRef2.current.position.x += delta * SPEED;
      if (cloudRef2.current.position.x > MAX_CLOUD_POSITION) {
        cloudRef2.current.position.x = -MAX_CLOUD_POSITION + LIMIT_CLOUD[2];
      }
    }
    if (cloudRef3.current) {
      cloudRef3.current.position.x += delta * SPEED;
      if (cloudRef3.current.position.x > MAX_CLOUD_POSITION) {
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

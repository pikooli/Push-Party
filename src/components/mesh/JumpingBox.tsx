'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Box } from '@react-three/drei';
import {
  RigidBody,
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBodyProps,
} from '@react-three/rapier';
import { BOX_SIZE } from '@/constants';
import { useTextureStore } from '@/zustand/store';
interface JumpingBoxProps extends RigidBodyProps {
  onMount?: (rb: RapierRigidBody) => void;
}

const playSound = (strength: number = 0.5) => {
  try {
    const audio = new Audio('/sound/wood.mp3');
    audio.volume = strength;
    audio.play();
    audio.addEventListener('ended', () => {
      audio.src = ''; // Clear the source
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const JumpingBox = ({ onMount, ...props }: JumpingBoxProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { texture } = useTextureStore();

  useEffect(() => {
    if (rigidBodyRef.current && onMount) {
      onMount(rigidBodyRef.current);
    }
  }, [onMount]);

  const handleCollisionEnter = useCallback((event: CollisionEnterPayload) => {
    if (event.rigidBodyObject?.name === 'bounding-box') {
      const targetPosition = event.target?.rigidBodyObject?.position || {
        x: 0,
        y: 0,
        z: 0,
      };
      const colliderPosition = event.rigidBodyObject?.position || {
        x: 0,
        y: 0,
        z: 0,
      };

      const direction = {
        x: colliderPosition.x - targetPosition.x,
        y: colliderPosition.y - targetPosition.y,
        z: colliderPosition.z - targetPosition.z,
      };

      const distance = Math.sqrt(
        direction.x * direction.x +
          direction.y * direction.y +
          direction.z * direction.z
      );

      const impulseMagnitude = 50;
      const impulse = {
        x: direction.x * impulseMagnitude,
        y: direction.y * impulseMagnitude,
        z: direction.z * impulseMagnitude,
      };

      const strength = Math.min(distance / 5, 1);
      playSound(strength);
      rigidBodyRef.current?.applyImpulse(impulse, true);
    }
  }, []);

  return (
    <RigidBody
      {...props}
      ref={rigidBodyRef}
      type="dynamic"
      colliders="cuboid"
      restitution={0.5}
      onCollisionEnter={handleCollisionEnter}
      mass={1}
      canSleep={true}
    >
      <Box args={[BOX_SIZE.x, BOX_SIZE.y, BOX_SIZE.z]} castShadow={true}>
        <meshStandardMaterial map={texture} />
      </Box>
    </RigidBody>
  );
};

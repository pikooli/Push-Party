import { useState, useRef, useEffect } from 'react';
import { JumpingBox } from './JumpingBox';
import { useFrame, useThree } from '@react-three/fiber';
import { FLOOR_POSITION, JUMPING_BOX_NAME } from '@/constants';
import * as THREE from 'three';
import { RapierRigidBody, useRapier } from '@react-three/rapier';
import { useBoxStore } from '@/zustand/store';

const MAX_DISTANCE = 50;
const NAME = 'jumping-boxs';

export const JumpingBoxs = () => {
  const rigidBodiesRef = useRef<Map<string, RapierRigidBody>>(new Map());
  const { scene } = useThree();
  const { world } = useRapier();
  const { boxes, removeBox } = useBoxStore();
  const [removeBoxesIds, setRemoveBoxesIds] = useState<string[]>([]);
  const lastUpdateRef = useRef(false);

  useFrame(() => {
    if (lastUpdateRef.current) return;
    lastUpdateRef.current = true;

    try {
      const tmp = scene.children.find((child) => child.name === NAME);
      if (tmp) {
        const remove = tmp.children.filter((child) => {
          return FLOOR_POSITION.distanceTo(child.position) > MAX_DISTANCE;
        });
        console.log('remove length', remove.length);
        remove.forEach((child) => {
          setRemoveBoxesIds((prev) => [...prev, child.name]);
        });
      }
    } catch (error) {
      console.error('Error removing box:', error);
    }
    lastUpdateRef.current = false;
  });

  useEffect(() => {
    if (removeBoxesIds.length === 0) return;
    removeBoxesIds.forEach((id) => {
      const rigidBody = rigidBodiesRef.current.get(id);
      if (rigidBody) {
        removeBox(id);
        world.removeRigidBody(rigidBody);
        rigidBodiesRef.current.delete(id);
      }
    });
    setRemoveBoxesIds([]);
  }, [removeBoxesIds]);

  return (
    <group name={NAME}>
      {boxes.map((box) => {
        return (
          <JumpingBox
            key={box.name}
            position={box.position}
            name={box.name}
            onMount={(rb) => {
              rigidBodiesRef.current.set(box.name, rb);
            }}
          />
        );
      })}
    </group>
  );
};

import { useMemo, useCallback, useRef } from 'react';
import { BoxEntity } from '@/zustand/store';
import {
  InstancedRigidBodies,
  CollisionEnterPayload,
  InstancedRigidBodyProps,
  RapierRigidBody,
} from '@react-three/rapier';
import { useTextureStore } from '@/zustand/store';
import { BOX_SIZE } from '@/constants';

interface RapierRigidBodyWithUserData extends RapierRigidBody {
  userData: {
    name: string;
  };
}

const playSound = (strength: number = 0.5) => {
  try {
    const audio = new Audio('/sound/wood.mp3');
    audio.volume = strength;
    audio.play();
    audio.addEventListener('ended', () => {
      audio.src = '';
    });
    return audio;
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const JumpingBoxs = ({ boxes }: { boxes: BoxEntity[] }) => {
  const { texture } = useTextureStore();
  const cubes = useRef<RapierRigidBodyWithUserData[]>([]);

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];
    for (let i = 0; i < boxes.length; i++) {
      instances.push({
        key: boxes[i].name,
        position: [
          boxes[i].position.x,
          boxes[i].position.y,
          boxes[i].position.z,
        ],
        rotation: [0, 0, 0],
        userData: { name: boxes[i].name },
      });
    }

    return instances;
  }, [boxes]);

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
      const colliderHandleName = (
        event.target?.rigidBody?.userData as {
          name: string;
        }
      ).name;
      if (colliderHandleName && cubes.current) {
        const colliderInstance = cubes.current.find(
          (instance) => instance.userData.name === colliderHandleName
        );
        if (colliderInstance) {
          colliderInstance.applyImpulse(impulse, true);
        }
      }
    }
  }, []);

  return (
    <InstancedRigidBodies
      instances={instances}
      mass={1}
      onCollisionEnter={handleCollisionEnter}
      ref={cubes}
    >
      <instancedMesh
        castShadow
        receiveShadow
        args={[undefined, undefined, boxes.length]}
      >
        <boxGeometry args={[BOX_SIZE.x, BOX_SIZE.y, BOX_SIZE.z]} />
        <meshStandardMaterial map={texture} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
};

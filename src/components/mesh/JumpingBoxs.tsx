import { useMemo, useCallback, useRef } from 'react';
import { BoxEntity } from '@/zustand/store';
import {
  InstancedRigidBodies,
  CollisionEnterPayload,
  InstancedRigidBodyProps,
} from '@react-three/rapier';
import { useTextureStore } from '@/zustand/store';
import { BOX_SIZE } from '@/constants';

const playSound = (strength: number = 0.5) => {
  try {
    const audio = new Audio('/sound/wood.mp3');
    audio.volume = strength;
    audio.play();
    audio.addEventListener('ended', () => {
      audio.src = ''; // Clear the source
    });
    return audio;
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const JumpingBoxs = ({ boxes }: { boxes: BoxEntity[] }) => {
  const { texture } = useTextureStore();
  const cubes = useRef<InstancedRigidBodies>(null);

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
    // console.log(event);
    // console.log(cubes.current);
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
      console.log('event', event);
      console.log('cubes.current', cubes.current);
      const colliderHandleName = event.target?.rigidBody?.userData.name;
      // Find the instance associated with the handle
      if (colliderHandleName) {
        const colliderInstance = cubes.current.find(
          (instance) => instance.userData.name === colliderHandleName
        );
        console.log('Collider Instance:', colliderInstance);

        // Apply impulse or perform other actions on this instance
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

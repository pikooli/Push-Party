'use client';

import { Suspense, useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { Physics, RigidBody } from '@react-three/rapier';
// import { useControls } from 'leva';
import * as THREE from 'three';
import { View, Plane } from '@react-three/drei';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';
import { BoxHelper } from '@/components/mesh/BoxHelper';
import { Box } from '@/components/mesh/Box';
import { DEBUG } from '@/constants';
import { BoundingBox } from '@/components/mesh/BoundingBox';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

// const useHelper = () => {
//   const { position } = useControls({
//     position: {
//       value: { x: 0, y: 0, z: 0 },
//       step: 1,
//     },
//     screen: {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     },
//   });

//   return { position: new THREE.Vector3(position.x, position.y, position.z) };
// };

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);
  const [boxes, setBoxes] = useState<THREE.Vector3[]>([]);

  // const { position } = useHelper();

  const initMediapipe = useCallback(() => {
    mediapipeRef.current
      ?.initUserMedia(setLandmarks, () => {
        helperRef.current?.resizeCanvas(window.innerWidth, window.innerHeight);
      })
      .catch((error) => {
        console.error('Error initializing Mediapipe:', error);
      });
  }, []);

  const addBox = useCallback(() => {
    setBoxes((prev) => [...prev, new THREE.Vector3(0, 0, -4)]);
  }, []);

  return (
    <div className="h-screen">
      <div className="absolute left-0 top-0 hidden">
        <VideoMediapipe mediapipeRef={mediapipeRef} videoRef={videoRef} />
      </div>
      <HelperComponent
        helperRef={helperRef}
        landmarks={landmarks}
        showHelper={DEBUG}
      />
      <div className="absolute left-1/2 top-0 z-50 flex gap-2">
        <button className="bg-blue-500 p-4" onClick={initMediapipe}>
          Init Mediapipe
        </button>
        <button className="bg-green-500 p-4" onClick={addBox}>
          Add Box
        </button>
      </div>
      <View className="absolute left-0 top-0 h-screen w-screen">
        <Suspense fallback={null}>
          <Physics debug>
            <Common videoRef={videoRef} />
            {boxes.map((position, index) => (
              <RigidBody
                key={index}
                onCollisionEnter={(event) => {
                  console.log('collision', event);
                }}
              >
                <Box position={position} castShadow />
              </RigidBody>
            ))}
            {landmarks?.landmarks?.map((landmark, index) => (
              <BoundingBox landmarks={landmark} key={index} />
            ))}
            <RigidBody type="fixed" position={[0, -4, -4]} name="floor">
              <Plane
                args={[10, 10]}
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </RigidBody>
          </Physics>
        </Suspense>
      </View>
    </div>
  );
}

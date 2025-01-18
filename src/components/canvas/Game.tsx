'use client';

import { View } from '@react-three/drei';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { Physics } from '@react-three/rapier';
import { JumpingBoxs } from '@/components/mesh/JumpingBoxs';
import { BoundingBox } from '@/components/mesh/BoundingBox';
import { Floor } from '@/components/mesh/Floor';
import { FLOOR_POSITION } from '@/constants';
import { Buttons } from '@/components/Buttons';
import { useBoxStore } from '@/zustand/store';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

interface GameProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  landmarks: HandLandmarkerResult | null;
}
export const Game = ({ videoRef, landmarks }: GameProps) => {
  const { boxes } = useBoxStore();
  return (
    <>
      <Buttons />
      <View className="absolute left-0 top-0 h-screen w-screen">
        <Suspense fallback={null}>
          <Physics debug>
            <Common videoRef={videoRef} />
            <JumpingBoxs boxes={boxes} />
            {landmarks?.landmarks?.map((landmark, index) => (
              <BoundingBox landmarks={landmark} key={index} />
            ))}
            <Floor position={FLOOR_POSITION} />
          </Physics>
        </Suspense>
      </View>
    </>
  );
};

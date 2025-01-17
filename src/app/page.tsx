'use client';

import { Suspense, useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { Physics } from '@react-three/rapier';
import { View } from '@react-three/drei';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';
import { DEBUG, FLOOR_POSITION } from '@/constants';
import { BoundingBox } from '@/components/mesh/BoundingBox';
import { Floor } from '@/components/mesh/Floor';
import { JumpingBoxs } from '@/components/mesh/JumpingBoxs';
import { Buttons } from '@/components/Buttons';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);

  const initMediapipe = useCallback(() => {
    mediapipeRef.current
      ?.initUserMedia(setLandmarks, () => {
        helperRef.current?.resizeCanvas(window.innerWidth, window.innerHeight);
      })
      .catch((error) => {
        console.error('Error initializing Mediapipe:', error);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="absolute left-0 top-0 hidden">
        <VideoMediapipe mediapipeRef={mediapipeRef} videoRef={videoRef} />
      </div>
      <HelperComponent
        helperRef={helperRef}
        landmarks={landmarks}
        showHelper={DEBUG.showLandmarks}
      />
      <Buttons initMediapipe={initMediapipe} />
      <View className="absolute left-0 top-0 h-screen w-screen">
        <Suspense fallback={null}>
          <Physics>
            <Common videoRef={videoRef} />
            <JumpingBoxs />
            {landmarks?.landmarks?.map((landmark, index) => (
              <BoundingBox landmarks={landmark} key={index} />
            ))}
            <Floor position={FLOOR_POSITION} />
          </Physics>
        </Suspense>
      </View>
    </div>
  );
}

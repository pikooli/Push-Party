'use client';

import dynamic from 'next/dynamic';
import { Suspense, useRef, useCallback, useState } from 'react';
import { useControls } from 'leva';
import { View } from '@react-three/drei';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { Floor } from '@/components/canvas/Floor';
import { Box } from '@/components/canvas/Box';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);

  const { position, rotation } = useControls({
    position: { value: [0, 0, 0], step: 0.1 },
    rotation: { value: [0, 0, 0], step: 0.1 },
  });

  const getUserMedia = useCallback(() => {
    mediapipeRef.current?.initUserMedia(() => {
      mediapipeRef.current?.onMessage(setLandmarks);
      console.log('videoRef.current?.videoWidth', videoRef.current?.videoWidth);
      helperRef.current?.resizeCanvas(
        videoRef.current?.offsetWidth || 0,
        videoRef.current?.offsetHeight || 0
      );
    });
  }, []);

  return (
    <div className="h-screen w-screen">
      <button
        onClick={getUserMedia}
        className="absolute left-1/2 z-50 bg-blue-500 text-white"
      >
        Get User Media
      </button>
      <div className="relative -scale-x-100 transform">
        <VideoMediapipe mediapipeRef={mediapipeRef} videoRef={videoRef} />
        <HelperComponent
          helperRef={helperRef}
          landmarks={landmarks}
          showHelper={true}
        />
      </div>
      <View className="h-full w-full">
        <Suspense fallback={null}>
          <Common color="green" orbit={false} />
          <Box position={position} rotation={rotation} />
          <Floor position={[0, -1, 0]} rotation={[0, 0, 0]} />
        </Suspense>
      </View>
    </div>
  );
}

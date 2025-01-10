'use client';

import { Suspense, useRef, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useControls } from 'leva';
import * as THREE from 'three';
import { View } from '@react-three/drei';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { Cone } from '@/components/canvas/Cone';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';
import { caculePosition } from '@/utils/calculePosition';

const Common = dynamic(
  () => import('@/components/canvas/Common').then((mod) => mod.Common),
  { ssr: false }
);

const useHelper = () => {
  const { position } = useControls({
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 1,
    },
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });

  return { position: new THREE.Vector3(position.x, position.y, position.z) };
};

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);
  const [position, setPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );

  useEffect(() => {
    if (landmarks?.landmarks.length) {
      const position = caculePosition(landmarks);
      setPosition(position);
    }
  }, [landmarks]);

  // const { position } = useHelper();

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
      <div className="hidden h-screen w-screen flex-col items-center justify-center">
        <div className="relative">
          <VideoMediapipe mediapipeRef={mediapipeRef} videoRef={videoRef} />
          <HelperComponent
            helperRef={helperRef}
            landmarks={landmarks}
            showHelper={true}
          />
        </div>
      </div>
      <button
        onClick={getUserMedia}
        className="absolute left-1/2 z-50 bg-blue-500 text-white"
      >
        Get User Media
      </button>
      <View className="h-full w-full">
        <Suspense fallback={null}>
          <Common orbit={false} videoRef={videoRef} />
          <Cone position={position} scale={1} />
        </Suspense>
      </View>
    </div>
  );
}

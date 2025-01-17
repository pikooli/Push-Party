'use client';

import { useRef, useCallback, useState } from 'react';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';
import { DEBUG } from '@/constants';
import { Game } from '@/components/canvas/Game';
import { Description } from '@/components/Description';

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);
  const [isInit, setIsInit] = useState(false);

  const initMediapipe = useCallback(() => {
    mediapipeRef.current
      ?.initUserMedia(setLandmarks, () => {
        helperRef.current?.resizeCanvas(window.innerWidth, window.innerHeight);
        setIsInit(true);
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
      {!isInit && <Description initMediapipe={initMediapipe} />}
      {isInit && <Game videoRef={videoRef} landmarks={landmarks} />}
    </div>
  );
}

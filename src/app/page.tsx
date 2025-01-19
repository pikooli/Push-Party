'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';
import { VideoMediapipe } from '@/components/videoMediapipe/VideoMediapipe';
import { HelperModel } from '@/components/videoMediapipe/helper/model/helperModel';
import { HelperComponent } from '@/components/videoMediapipe/helper/HelperComponent';
import { DEBUG } from '@/constants';
import { Game } from '@/components/canvas/Game';
import { Description } from '@/components/Description';
import { useLoadingStore } from '@/zustand/store';

export default function Home() {
  const mediapipeRef = useRef<MediapipeModel>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const helperRef = useRef<HelperModel>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [landmarks, setLandmarks] = useState<HandLandmarkerResult | null>(null);
  const [isInit, setIsInit] = useState(false);
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    const handleClick = () => {
      if (!musicRef.current) return;
      musicRef.current.volume = 0.2;
      musicRef.current.play();
      setIsMusicPlaying(true);
      document.removeEventListener('click', handleClick);
    };
    document.addEventListener('click', handleClick);
  }, []);

  const initMediapipe = useCallback(() => {
    setIsLoading(true);
    mediapipeRef.current
      ?.initUserMedia(setLandmarks, () => {
        helperRef.current?.resizeCanvas(window.innerWidth, window.innerHeight);
        setIsInit(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error initializing Mediapipe:', error);
      });
  }, [setIsLoading]);

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
      <button
        className="absolute right-0 top-0 z-50 p-3"
        onClick={() => {
          if (!musicRef.current) return;
          if (isMusicPlaying) {
            musicRef.current.pause();
            setIsMusicPlaying(false);
          } else {
            musicRef.current.play();
            setIsMusicPlaying(true);
          }
        }}
      >
        {isMusicPlaying ? '🔈' : '🔇'}
      </button>
      <audio src="/Rhythm Strikes.mp3" ref={musicRef} loop={true} />
    </div>
  );
}

import { useEffect } from 'react';
import { MediapipeModel } from '@/components/videoMediapipe/model/mediapipe';

interface VideoMediapipeProps {
  mediapipeRef: React.RefObject<MediapipeModel | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isHidden: boolean;
}

export const VideoMediapipe = ({
  mediapipeRef,
  videoRef,
  isHidden,
}: VideoMediapipeProps) => {
  useEffect(() => {
    if (videoRef.current) {
      // @ts-expect-error videoRef can be null
      mediapipeRef.current = new MediapipeModel(videoRef);
    }

    return () => {
      mediapipeRef.current?.destroy();
    };
  }, [mediapipeRef, videoRef]);

  return (
    <video
      // @ts-expect-error videoRef can be null
      ref={videoRef}
      autoPlay
      playsInline
      className={`h-screen ${isHidden ? 'hidden' : ''}`}
    />
  );
};

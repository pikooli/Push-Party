import { create } from 'zustand';
import * as THREE from 'three';
import {
  stairsCoordinates,
  towerCoordinates,
  pyramidCoordinates,
  wallCoordinates,
  formCoordinates,
} from '@/utils/coordinates';
import { v4 as uuidv4 } from 'uuid';
import { JUMPING_BOX_NAME, GEOMETRY_TYPES } from '@/constants';

export interface BoxEntity {
  position: THREE.Vector3;
  name: string;
}

interface BoxStore {
  boxes: BoxEntity[];
  addBox: () => void;
  removeBox: (name: string) => void;
  removeAllBoxes: () => void;
  setSpecifyGeometry: (geometry: string) => void;
}

const generateBoxName = () => `${JUMPING_BOX_NAME}-${uuidv4()}`;

export const useBoxStore = create<BoxStore>((set) => ({
  boxes: [],
  addBox: () =>
    set((state) => ({
      boxes: [
        ...state.boxes,
        {
          position: new THREE.Vector3(0, -4, -4),
          name: generateBoxName(),
        },
      ],
    })),
  removeBox: (name: string) =>
    set((state) => ({
      boxes: state.boxes.filter((p) => p.name !== name),
    })),
  removeAllBoxes: () => set({ boxes: [] }),
  setSpecifyGeometry: (geometry: string) => {
    switch (geometry) {
      case GEOMETRY_TYPES.stairs:
        set({
          boxes: stairsCoordinates.map((position) => ({
            position,
            name: generateBoxName(),
          })),
        });
        break;
      case GEOMETRY_TYPES.tower:
        set({
          boxes: towerCoordinates.map((position) => ({
            position,
            name: generateBoxName(),
          })),
        });
        break;
      case GEOMETRY_TYPES.pyramid:
        set({
          boxes: pyramidCoordinates.map((position) => ({
            position,
            name: generateBoxName(),
          })),
        });
        break;
      case GEOMETRY_TYPES.wall:
        set({
          boxes: wallCoordinates.map((position) => ({
            position,
            name: generateBoxName(),
          })),
        });
        break;
      case GEOMETRY_TYPES.form:
        set({
          boxes: formCoordinates.map((position) => ({
            position,
            name: generateBoxName(),
          })),
        });
        break;
      default:
        set({
          boxes: stairsCoordinates.map((position) => ({
            position,
            name: generateBoxName(),
          })),
        });
        break;
    }
  },
}));

interface TextureStore {
  texture: THREE.Texture | null;
  setTexture: (texture: THREE.Texture) => void;
}

export const useTextureStore = create<TextureStore>((set) => ({
  texture: null,
  setTexture: (texture: THREE.Texture) => set({ texture }),
}));

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

interface MusicStore {
  music: HTMLAudioElement | null;
  setMusic: (music: HTMLAudioElement) => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  music: null,
  setMusic: (music: HTMLAudioElement) => {
    if (music) {
      music.loop = true;
      music.volume = 0.2;
      // music.play();
    }
    set({ music });
  },
  stopMusic: () => {
    const music = get().music;
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  },
}));

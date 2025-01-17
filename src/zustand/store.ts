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
import { RapierRigidBody } from '@react-three/rapier';

export interface BoxEntity {
  position: THREE.Vector3;
  name: string;
  rigidBody?: RapierRigidBody;
}

interface BoxStore {
  boxes: BoxEntity[];
  addBox: () => void;
  removeBox: (name: string) => void;
  removeAllBoxes: () => void;
  setSpecifyGeometry: (geometry: string) => void;
  setRigidBodies: (name: string, rigidBody: RapierRigidBody) => void;
  getRigidBody: (name: string) => RapierRigidBody | undefined;
}

const generateBoxName = () => `${JUMPING_BOX_NAME}-${uuidv4()}`;

export const useBoxStore = create<BoxStore>((set, get) => ({
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
  setRigidBodies: (name: string, rigidBody: RapierRigidBody) => {
    set((state) => {
      const box = state.boxes.find((box) => box.name === name);
      if (box) {
        box.rigidBody = rigidBody;
      }
      return state;
    });
  },
  getRigidBody: (name: string) => {
    return get().boxes.find((box) => box.name === name)?.rigidBody;
  },
}));

import * as metadata from '../../data/metadata.json';
import { GymName } from '../types';

export const getAllMetadataHelper = () => {
  return metadata;
};

export const getGymMetadataHelper = (gym: GymName) => {
  return metadata[gym];
};

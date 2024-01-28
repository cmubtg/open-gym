import * as metadata from '../../data/metadata.json';
import { gymNameType } from '../utils/constants';

export const getAllMetadataHelper = () => {
  return metadata;
};

export const getGymMetadataHelper = (gym: gymNameType) => {
  return metadata[gym];
};

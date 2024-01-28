import * as metadata from '../../data/metadata.json';
import { DAYS_OF_THE_WEEK, GYM_NAMES, gymNameType } from '../utils/constants';
import db from '../models/database';

export const getAllMetadataHelper = () => {
  return metadata;
};

export const getGymMetadataHelper = (gym: gymNameType) => {
  return metadata[gym];
};

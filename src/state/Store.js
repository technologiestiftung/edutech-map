import createStore from 'unistore';

import { getFavs } from './dataUtils';

export const subCategories = {
  'service': [
    "coachingService",
    "blendedLearningService",
    "campsService",
    "codingService",
    "courseService",
    "educationService",
    "workshopService",
    "otherService"
  ],
  'hardware': [
    "controllerHardware",
    "productHardware",
    "materialHardware",
    "deviceHardware",
    "kitsHardware",
    "otherhardware",
  ],
  'media': [
    "cmsMedia",
    "oerMedia",
    "videosMedia",
    "audioMedia",
    "socialMedia",
    "vrMedia",
    "otherMedia",
  ],
  'app': [
    "adaptiveLearningApp",
    "orgaApp",
    "backMiddleTechApp",
    "inclContentApp",
    "analyticsApp",
    "cmsApp",
    "oerApp",
    "otherApp",
  ]
}

export const filterSection = {
  categoryFilter: ['service', 'hardware', 'media', 'app'],
  subCategoryFilter: {
  'service': [
    "coachingService",
    "blendedLearningService",
    "campsService",
    "codingService",
    "courseService",
    "educationService",
    "workshopService",
    "otherService"
  ],
  'hardware': [
    "controllerHardware",
    "productHardware",
    "materialHardware"
  ],
  'media': [
    "cmsMedia",
    "otherMedia",
  ],
  'app': [
    "adaptiveLearningApp",
    "orgaApp",
    "backMiddleTechApp",
    "inclContentApp",
    "analyticsApp",
    "cmsApp",
    "oerApp",
    "otherApp",
  ]
}
};

const Store = createStore({
  isLoading: true,
  additionalData: {
    districts: []
  },
  categories: ['app', 'service', 'media', 'hardware'],
  data: null,
  info: null,
  detailData: false,
  selectedData: false,
  mapCenter: [13.4124999, 52.5040961],
  mapZoom: [10],
  subCategoryList: Object.assign({}, subCategories),
  subCategories: [],
  highlightData: false,
  tooltipPos: [0, 0],
  favs: getFavs(),
  tooltipData: false,
  colorizer: () => '#bbb',
  colorizerLight: () => '#bbb',
  filter: filterSection,
});

export default Store;

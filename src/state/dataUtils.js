import turfBbox from '@turf/bbox';
import { scaleOrdinal } from 'd3-scale';
const config = require('../../config.json');
import Store from 'store';

export const getDistrictBounds = districtFeature => (
  turfBbox(districtFeature)
);

export const getCategoryLabel = (value) => {
  const categoryDict = {
    "service": "Services / Plattformen / Dienstleistungen",
    "app": "Lehr- & Lernmaterial – Software / Apps (abgeschlossene Anwendung)",
    "media": "Lehr- & Lernmaterial – Audiovisuelle Medien (Einzelprodukte)",
    "hardware": "Hardware"
  };
  return categoryDict[value];
}

export const getSubCategoryLabel = (category, subcategory) => {
  const dict = {
    'service': {
      "coachingService": "Beratung/ Coaching",
      "blendedLearningService": "Blended Learning Angebote",
      "campsService": "Camps",
      "codingService": "Coding Angebote",
      "courseService": "Courseware (z.B. MOOCs)",
      "educationService": "Fort- & Weiterbildung",
      "workshopService": "Workshop",
      "otherService": "Andere Formate"
    },
    'hardware': {
      "controllerHardware": "Microcontroller/Platine",
      "productHardware": "Produkt/Erfindung",
      "materialHardware": "Dazugehöriges Lehrmaterial Pädagogen",
      "deviceHardware": "Endgeräte, Smartboards etc.",
      "kitsHardware": "Lernmaterial Kids/ Privatpersonen",
      "otherhardware": "Andere"
    },
    'media': {
      "cmsMedia": "LMS, CMS etc.",
      "oerMedia": "OER",
      "videosMedia": "Videos",
      "audioMedia": "Podcast/andere Audio",
      "socialMedia": "Social Media & Collaboration tools",
      "vrMedia": "VR/AR-Inhalte",
      "otherMedia": "Andere innovative Medien"
    },
    'app': {
      "adaptiveLearningApp": "Adaptive Learning",
      "orgaApp": "Administration/Organisation",
      "backMiddleTechApp": "Back/Middle technologies",
      "inclContentApp": "Inklusiver Content",
      "analyticsApp": "Learning Analytics",
      "cmsApp": "LMS, CMS etc.",
      "oerApp": "OER",
      "otherApp": "Anderer innovativer Content"
    }
  }

  return dict[category][subcategory];
}

export const getUniqueSubCategories = (data) => {
  const allCategories = data.features
    .map(d => d.properties.categoriesSelected)
    .reduce((acc, value) => acc.concat(value), []);
  return [...new Set(allCategories)];
};

export const getColorizer = (uniqueCategories, type) => {
  const t = type === 'light' ? 'colorsLight' : 'colors';

  const normalizedCategories = uniqueCategories.map(cat => cat.toLowerCase());
  const colorScale = scaleOrdinal().domain(normalizedCategories).range(config[t]);

  return (category) => {
    const loweredCategory = category ? category.toString().toLowerCase() : '';
    return normalizedCategories.includes(loweredCategory) ? colorScale(loweredCategory) : '#bbb';
  };
};

export const filterCategories = (props, categoryFilter) => {
  if (!categoryFilter || !props) {
    return false;
  }

  return !categoryFilter.some(cat => props.category.includes(cat));
};

export const filterSubCategories = (props, subCategoryFilter) => {
  if (!subCategoryFilter[props.category] || !props) {
    return false;
  }

  return !subCategoryFilter[props.category].some(cat => props.subCategoriesSelected.includes(cat));
}



export const getFavs = () => Store.get(config.localStorage.favKey) || [];

export const setFavs = favs => Store.set(config.localStorage.favKey, favs);

export default {
  getColorizer,
  filterCategories,
  filterSubCategories,
  getUniqueSubCategories,
  getFavs,
  setFavs,
  getCategoryLabel
};
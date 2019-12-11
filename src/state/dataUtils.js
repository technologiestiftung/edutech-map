import turfBbox from '@turf/bbox';
import { scaleOrdinal } from 'd3-scale';
const config = require('../../config.json');
import Store from 'store';
import idx from 'idx';

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

export const sortData = (sortBy, direction = 'asc') => (aObj, bObj) => {
  const a = idx(aObj, _ => _[sortBy]);
  const b = idx(bObj, _ => _[sortBy]);
  const type = typeof a;

  if (type === 'string' && direction === 'asc') {
    return a.localeCompare(b);
  }

  if (type === 'string' && direction === 'dec') {
    return b.localeCompare(a);
  }

  if (type === 'boolean' && direction === 'asc') {
    return (a === b) ? 0 : a ? -1 : 1; // eslint-disable-line
  }

  if (type === 'boolean' && direction === 'dec') {
    return (a === b) ? 0 : a ? 1 : -1; // eslint-disable-line
  }

  return direction === 'asc' ? a - b : b - a;
};

export const createMarkup = (content) => {
  return {__html: content};
}

export const objectSize = (obj) => {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

export const addLineBreaks = (content) => {
  return replaceAll(content, ',', ',</br>');
}

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

export const subCategoriesEmpty = {
  'service': [],
  'hardware': [],
  'media': [],
  'app': []
}

export const targetGroupTypes = [
  'private', 'institution'
];

export const targetGroups = {
  'private': [
    "family",
    "preschool",
    "lifelong",
    "pupils",
    "students",
    "elementaryPupils",
    "other",
    "none",
  ],
  'institution': [
    "eduAdministration",
    "eduInstitution",
    "coworking",
    "uni",
    "incubator",
    "network",
    "company",
    "other",
    "none"
  ]
};

export const getTargetGroupType = (value) => {
  const dict = {
    'private': 'Privat',
    'institution': 'Institionell'
  }
  return dict[value];
}

export const getTargetGroupLabel = (type, group) => {
  const dict = {
    'institution': {
      eduAdministration: "Bildungsadministration",
      eduInstitution: "Bildungsinstitution",
      coworking: "Coworking Space",
      uni: "Hochschule",
      incubator: "Inkubator",
      network: "Netzwerk",
      company: "Unternehmen",
      other: "Andere",
      none: "Nein"
    },
    'private': {
      family: "Familie",
      preschool: "Kita/Vorschule",
      lifelong: "Lifelong Learning",
      pupils: "Schüler",
      students: "Studierende",
      elementaryPupils: "Grundschule 1-3",
      other: "Andere",
      none: "Keine"
    }
  }
  return dict[type][group];
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

export const filterTargetGroupTypes = (props, targetGroupFilter) => {
  if (!targetGroupFilter || !props) {
    return false;
  }

  return !targetGroupFilter.some(cat => props.targetGroupsSelected.includes(cat));
};


export const filterTargetGroupTags = (props, targetGroupTagsFilter, type) => {
  if (!targetGroupTagsFilter[type] || !props) {
    return false;
  }

  return !targetGroupTagsFilter[type].some(cat => props.targetGroupTagsSelectedArr.includes(cat));
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
  getCategoryLabel,
  subCategories,
  targetGroups,
  getTargetGroupLabel,
  getTargetGroupType,
  filterTargetGroupTypes,
  filterTargetGroupTags,
  createMarkup,
  objectSize,
  subCategoriesEmpty
};
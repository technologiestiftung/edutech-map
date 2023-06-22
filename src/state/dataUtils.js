import turfBbox from '@turf/bbox';
import { scaleOrdinal } from 'd3-scale';
import Store from 'store';
import idx from 'idx';
import pointInPolygon from '@turf/boolean-point-in-polygon';
import config from '../../config.json';

export const getDistrictBounds = districtFeature => (
  turfBbox(districtFeature)
);

export const getCategoryLabel = (value) => {
  const categoryDict = {
    "service": "Service / Plattform / Dienstleistung",
    "app": "Lehr- & Lernmaterial – Software/Apps",
    "media": "Lehr- & Lernmaterial – Audiovis. Medien",
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
    "other",
    "none",
    "pupilsgs",
    "pupilsgstwo",
    "pupilsgssec",
    "pupilsgssectwo",
    "afternoon",
  ],
  'institution': [
    "eduInstitutions",
    "coworking",
    "uni",
    "kita",
    "museum",
    "schoolinst",
    "uniinst",
    "educators",
    "incubator",
    "network",
    "administration",
    "libraries",
    "companies",
    "inititatives",
    "other",
    "none"
  ]
};

export const targetGroupsEmpty = {
  'private': [],
  'institution': []
};

export const getTargetGroupType = (value) => {
  const dict = {
    'private': 'Privat',
    'institution': 'Institionell'
  }
  return dict[value];
}

export const getHomeschoolType = (value) => {
  const dict = {
    'false': 'Nicht aktiviert',
    'true': 'Aktiviert'
  }
  return dict[value];
}

export const getTargetGroupLabel = (type, group) => {
  const dict = {
    'institution': {
      administration: "Administration",
      libraries: "Bibliotheken",
      eduInstitutions: "Bildungsinstitutionen",
      museum: "Museen",
      educators: "Pädagog*innen",
      companies: "Unternehmen",
      inititatives: "Vereine / Initiativen",
      other: "Andere",
      kita: "Kita/Vorschule",
      schoolinst: "Schule",
      uniinst: "Hochschule",
      none: "Unbestimmt",
    },
    'private': {
      family: "Familie",
      preschool: "Kita/Vorschule",
      lifelong: "Lifelong Learning",
      pupils: "Schüler*innen",
      pupilsgs: "Schüler*innen GS 1-3",
      pupilsgstwo: "Schüler*innen GS 4-6",
      pupilsgssec: "Schüler*innen SEK I",
      pupilsgssectwo: "Schüler*innen SEK II",
      afternoon: "Nachmittagsbereich",
      students: "Studierende",
      other: "Andere",
      none: "Unbestimmt",
    }
  }

  if (!dict[type][group]) {
    return 'Unbestimmt';
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

export const filterHomeschool = (props, homeschoolFilter) => {
  if (!homeschoolFilter || !props) {
    return false;
  }

  return !homeschoolFilter.some(cat => props.homeschool === cat);
};

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

export const mailTo = (name) => {
  return `mailto:bildung@technologiestiftung-berlin.de?subject=Edutech Änderungswunsch: ${name}`
}

export const piwik = (_paq) => {
  const u="https://piwik.technologiestiftung-berlin.de/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '11']);
  let d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; 
  g.async=true; 
  g.defer=true; 
  g.src=u+'matomo.js'; 
  s.parentNode.insertBefore(g,s);

  return _paq;
}

export const getFavs = () => Store.get(config.localStorage.favKey) || [];

export const setFavs = favs => Store.set(config.localStorage.favKey, favs);

export const filterDistricts = (feature, districtFilter, districts) => {
  if (!districts || !districtFilter) {
    return false;
  }

  if (districtFilter == '13') {
    return !feature.properties.outOfBounds;
  }

  const polygon = districts.features
    .find(feat => feat.properties.spatial_name === districtFilter);

  return !pointInPolygon(feature, polygon);
};

export const featOutOfBounds = (districts, parsedData) => {
  districts.features.forEach(district => {
    parsedData.features.forEach(feat => {
      if (pointInPolygon(feat, district)) {
        feat.properties.outOfBounds = false;
      }
    })
  })
  return parsedData;
}

export const countInstPerDistrict = (districts, parsedData, districtsCenter) => {
    let arr = [];

    let otherFeat = {
      properties: {
        alias: 'Brandenburg',
        count: 0,
        id: 13
      }
    }

    districts.features.forEach(district => {
      const match = districtsCenter.bezirke.find(d => (d.id === district.properties.spatial_name));
      const obj = {
        id: district.properties.spatial_name,
        coordinates: match.pos,
        properties: {
          id: district.properties.spatial_name,
          alias: district.properties.spatial_alias,
          count: 0,
        }
      }
      arr.push(obj)
    })

    arr.push(otherFeat);

    districts.features.forEach((district, i) => {
      parsedData.features.forEach(feat => {
        if (pointInPolygon(feat, district)) {
          arr[i].properties.count += 1;
        }
      })
    })

    parsedData.features.forEach(feat => {
      if (feat.properties.outOfBounds) {
        arr[arr.length - 1].properties.count += 1;
      }
    })

    return arr;
}

export default {
  getColorizer,
  countInstPerDistrict,
  featOutOfBounds,
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
  piwik,
  filterDistricts,
  filterTargetGroupTypes,
  targetGroupsEmpty,
  filterTargetGroupTags,
  filterHomeschool,
  createMarkup,
  objectSize,
  mailTo,
  subCategoriesEmpty,
  getHomeschoolType
};

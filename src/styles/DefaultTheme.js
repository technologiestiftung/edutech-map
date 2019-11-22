const px = (d) => { return `${d}px` };

export default {
  fonts: {
    sans: 'Clan Book',
    serif: 'Georgia, Times, Times New Roman, serif',
    mono: 'monospace',
    sansBold: 'Clan Bold',
    sansMedium: 'Clan Medium'
  },
  fontSizes: [12, 13, 15, 19, 24, 32, 48, 64].map(px),
  boxShadow: `0 2px 40px 0 rgba(30,55,145,0.15)`,
  borderRadius: '2px',
  colors: {
    primary: '#e60005',
    secondary: '#1e3791',
    lightgrey: '#f5f5f5',
    midgrey: '#d8d8d8',
    textgrey: '#777'
  },
  margin: [10, 15, 25].map(px),
  padding: [5, 10, 15].map(px)
};
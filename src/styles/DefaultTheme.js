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
    primary: '#000000',
    secondary: '#e60005',
    lightgrey: '#f5f5f5',
    midgrey: '#d8d8d8',
    textgrey: '#777'
  },
  lineHeight: '140%',
  margin: [10, 15, 25, 50, 75, 100].map(px),
  padding: [5, 10, 15].map(px)
};
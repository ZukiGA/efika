const ELEM_CHIPS = [
  {
    key: 'Trabajo',
    mainColor: '#1365CF',
    brighterColor: '#9DB8DD',
    darkerColor: '#0154C1',
    status: true,
  },
  {
    key: 'Deportes',
    mainColor: '#BC0701',
    brighterColor: '#D18885',
    darkerColor: '#9D0601',
    status: false,
  },
  {
    key: 'Salud',
    mainColor: '#29BC01',
    brighterColor: '#72EC51',
    darkerColor: '#239D01',
    status: false,
  },
  {
    key: 'Cultura',
    mainColor: '#CE6213',
    brighterColor: '#FCB27E',
    darkerColor: '#C15101',
    status: false,
  },
  {
    key: 'Finanzas',
    mainColor: '#01AED5',
    brighterColor: '#70E5FF',
    darkerColor: '#0096B8',
    status: false,
  },
  {
    key: 'Higiene',
    mainColor: '#CE1365',
    brighterColor: '#E080AA',
    darkerColor: '#C10154',
    status: false,
  },
];

const ELEM_CUANTIFICATION = [
  { key: 'time', status: false },
  { key: 'repeat', status: false },
];

const ELEM_REPETITION = [
  { key: 'day', status: true },
  { key: 'week', status: false },
  { key: 'month', status: false },
];

const DAYS = [
  { key: 'D', num: 0, status: false },
  { key: 'L', num: 1, status: true },
  { key: 'Ma', num: 2, status: true },
  { key: 'Mi', num: 3, status: true },
  { key: 'J', num: 4, status: true },
  { key: 'V', num: 5, status: true },
  { key: 'S', num: 6, status: false }
];

export {
  ELEM_CHIPS,
  ELEM_CUANTIFICATION,
  ELEM_REPETITION,
  DAYS
};

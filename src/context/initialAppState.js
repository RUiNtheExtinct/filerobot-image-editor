/** Internal Dependencies */
import { TABS_TOOLS } from 'components/tools/tools.constants';
import {
  DEFAULT_ZOOM_FACTOR,
  POINTER_ICONS,
  TABS_IDS,
  TOOLS_IDS,
} from 'utils/constants';

// TODO: make some of these configurable
export default {
  options: {
    common: {
      fill: '#000000', // or should be no color? === undefined
      stroke: '#000000', // or should be no color? === undefined
      strokeWidth: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: '#000000', // or should be no color? === undefined
      shadowOpacity: 1,
      opacity: 1,
    },
    [TOOLS_IDS.TEXT]: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet tortor quis odio facilisis, id aliquet nulla facilisis. Etiam tincidunt tempor odio nec placerat.',
      fontFamily: 'Arial',
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 1,
      align: 'left', // left, center, right
      fontStyle: '', // 'bold', 'italic', 'bold italic'
    },
    [TOOLS_IDS.IMAGE]: {
      fill: undefined,
    },
    [TOOLS_IDS.RECT]: {
      cornerRadius: 0,
    },
    [TOOLS_IDS.ELLIPSE]: {},
    [TOOLS_IDS.POLYGON]: {
      sides: 3,
    },
    [TOOLS_IDS.PEN]: {
      strokeWidth: 1,
    },
    [TOOLS_IDS.LINE]: {
      lineCap: 'butt', // butt/round/square
      strokeWidth: 1,
    },
    [TOOLS_IDS.ARROW]: {
      strokeWidth: 6,
      lineCap: 'butt',
      pointerLength: undefined,
      pointerWidth: undefined,
    },
    [TABS_IDS.WATERMARK]: {
      gallery: [
        'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
        'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
        'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
        'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
        'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
      ],
    },
  },
  pointerCssIcon: POINTER_ICONS.DEFAULT,
  canvasScale: 1,
  shownImageDimensions: {},
  zoom: {
    factor: DEFAULT_ZOOM_FACTOR,
    x: null,
    y: null,
  },
  isLoadingGlobally: true,
  // --- Start of design states ---
  finetunes: [],
  finetunesProps: {},
  filter: null,
  adjustments: {
    crop: {
      absoluteX: 0,
      absoluteY: 0,
      relativeX: 0,
      relativeY: 0,
      ratio: 'original',
      width: null,
      height: null,
    },
  },
  annotations: {},
  resize: {},
  // --- End of design states ---
  selectionsIds: [],
  tabId: TABS_IDS.ADJUST,
  toolId: TABS_TOOLS[TABS_IDS.ADJUST][0],
  /* For UNDO/REDO/RESET,
   * Current/present state => considered properties related to design of the whole 1st order state.
   * `pastDesignStates` => contains the past states of those design properties (undo).
   * `futureDesignStates` => contains the future states of those design properties (redo).
   * Reset => we reset those 3 states to their initial/empty values.
   */
  pastDesignStates: [],
  futureDesignStates: [],
};
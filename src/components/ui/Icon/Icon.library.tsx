import IconArrowDown from '@/public/icons/arrow-down.svg';
import IconArrowLeft from '@/public/icons/arrow-left.svg';
import IconArrowRight from '@/public/icons/arrow-right.svg';
import IconArrowUp from '@/public/icons/arrow-up.svg';
import IconClose from '@/public/icons/close.svg';
import IconError from '@/public/icons/error.svg';
import IconGear from '@/public/icons/gear.svg';
import IconGraph from '@/public/icons/graph.svg';
import IconHint from '@/public/icons/hint.svg';
import IconHome from '@/public/icons/home.svg';
import IconHuman from '@/public/icons/human.svg';
import IconPicture from '@/public/icons/picture.svg';
import IconProfile from '@/public/icons/profile.svg';
import IconXMark from '@/public/icons/xmark.svg';

export const ICON_LIBRARY = {
  arrow_up: IconArrowUp,
  arrow_right: IconArrowRight,
  arrow_down: IconArrowDown,
  arrow_left: IconArrowLeft,
  error: IconError,
  gear: IconGear,
  graph: IconGraph,
  hint: IconHint,
  home: IconHome,
  human: IconHuman,
  picture: IconPicture,
  profile: IconProfile,
  close: IconClose,
  xmark: IconXMark,
};

export type ICON_NAME = keyof typeof ICON_LIBRARY;

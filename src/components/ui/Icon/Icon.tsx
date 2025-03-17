import clsx from 'clsx';

import { ICON_LIBRARY, ICON_NAME } from '@/components/ui/Icon/Icon.library';
import styles from './Icon.module.scss';

type TSize = number | { width: number; height: number } | 'auto';
type TCalcSize = { width: number; height: number } | null;

interface IconProps {
  name: ICON_NAME;
  color?: 'white' | 'black';
  size?: TSize;
  className?: string;
}

export const Icon = ({ name, size = 24, color, className }: IconProps) => {
  if (!name) {
    return null;
  }

  const IconComponent = ICON_LIBRARY[name];

  let calculatedIconSize: TCalcSize = null;

  if (typeof size === 'number') {
    calculatedIconSize = { width: size, height: size };
  }

  if (typeof size === 'object') {
    calculatedIconSize = { width: size.width, height: size.height };
  }

  if (size === 'auto') {
    calculatedIconSize = null;
  }

  const props = {
    ...calculatedIconSize,
    className: clsx(styles.icon, className, {
      [String(styles.iconWhite)]: color === 'white',
      [String(styles.iconBlack)]: color === 'black',
    }),
  };

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};

import clsx from 'clsx';

import styles from './Avatar.module.scss';

interface AvatarProps {
  level?: number;
  size?: number;
  image?: string;
  online?: boolean;
  renderOnlineIndicator?: boolean;
  type?: 'user' | 'team';
}

export const Avatar = ({
  level,
  size,
  image = '/img/avatar_test.jpg',
  online,
  renderOnlineIndicator,
}: AvatarProps) => {
  const avatarOnlineImgClassName = clsx(styles.avatarImg, {
    [String(styles.avatarImgOffline)]: renderOnlineIndicator && !online,
  });
  const avatarOnlineIndicatorClassName = clsx(styles.indicator, {
    [String(styles.indicatorOnline)]: online,
  });

  const dimensions = {
    avatar: { width: size, height: size },
    border: { width: Number(size) + 8, height: Number(size) + 8 },
    image: { width: size, height: size },
  };

  return (
    <div className={styles.avatar} style={dimensions.avatar}>
      <div className={styles.avatarBordered} style={dimensions.border} />
      {level ? <div className={styles.level}>{level}</div> : null}
      {renderOnlineIndicator && (
        <div className={avatarOnlineIndicatorClassName} />
      )}
      <div className={styles.image} style={dimensions.image}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="avatar" className={avatarOnlineImgClassName} />
      </div>
    </div>
  );
};

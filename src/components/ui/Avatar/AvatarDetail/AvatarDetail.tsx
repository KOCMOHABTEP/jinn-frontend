import { Avatar } from '@/components/ui/Avatar';
import styles from './AvatarDetail.module.scss';

interface ForumDetailAvatarProps {
  title: string;
  messages: string;
  src: string;
}

export const AvatarDetail = ({
  title,
  messages,
  src,
}: ForumDetailAvatarProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Avatar image={src} online={true} />
      </div>
      <div className={styles.content}>
        <div className={styles.content__title}>{title}</div>
        <div className={styles.content__description}>{messages}</div>
      </div>
    </div>
  );
};

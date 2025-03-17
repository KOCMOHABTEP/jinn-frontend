import { Icon } from '@/components/ui/Icon';
import { ICON_NAME } from '@/components/ui/Icon/Icon.library';
import styles from './UserCardMenuItem.module.scss';

interface UserCardMenuItemProps {
  label: string;
  icon: ICON_NAME;
  onSelectItem: (label: string) => void;
}

export const UserCardMenuItem = ({
  label,
  icon,
  onSelectItem,
}: UserCardMenuItemProps) => {
  return (
    <div className={styles.container} onClick={() => onSelectItem(label)}>
      <div className={styles.item}>
        <Icon name={icon} size={16} className={styles.itemIcon} />
        <div className={styles.itemLabel}>{label}</div>
      </div>
    </div>
  );
};

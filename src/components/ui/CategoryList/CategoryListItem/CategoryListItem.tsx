import Image from 'next/image';
import Link from 'next/link';

import styles from './CategoryListItem.module.scss';

interface CategoryListItemProps {
  title: string;
  description: string;
  href: string;
  image: unknown;
}

export const CategoryListItem = ({
  title,
  description,
  href,
  image,
}: CategoryListItemProps) => {
  return (
    <div className={styles.container}>
      <Link href={href} className={styles.containerLink}>
        <div className={styles.head}>
          <div className={styles.headImage}>
            <Image
              className={styles.headImageImg}
              src={image as string}
              alt={title}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{title}</div>
          <div className={styles.contentDescription}>{description}</div>
        </div>
      </Link>
    </div>
  );
};

import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { CategoryList } from '@/components/ui/CategoryList';
import { CategoryListItem } from '@/components/ui/CategoryList/CategoryListItem';
import { AppRoutesConfig } from '@/config/app-routes.config';
import AboutIllustration from '@/public/illustrations/about.jpg';
import SettingsIllustration from '@/public/illustrations/settings.jpg';
import StructureIllustration from '@/public/illustrations/structure.png';

const CATEGORIES = [
  {
    title: 'Просмотр структуры',
    description: 'Перейти к структуре компании',
    href: AppRoutesConfig.STRUCTURE,
    image: StructureIllustration,
  },
  {
    title: 'О проекте',
    description: 'Просмотр информации о проекте',
    href: AppRoutesConfig.ABOUT,
    image: AboutIllustration,
  },
  {
    title: 'Настройки',
    description: 'Перейти к настройкам',
    href: AppRoutesConfig.SETTINGS,
    image: SettingsIllustration,
  },
];

export default function Home() {
  return (
    <PrivateRoute>
      <main>
        <CategoryList>
          {CATEGORIES.map(({ title, description, href, image }, index) => (
            <CategoryListItem
              key={index}
              title={title}
              description={description}
              href={href}
              image={image}
            />
          ))}
        </CategoryList>
      </main>
    </PrivateRoute>
  );
}

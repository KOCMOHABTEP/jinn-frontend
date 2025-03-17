import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function About() {
  return (
    <PrivateRoute>
      <h1>Frontend</h1>
      <p>⚡️ Next.js 15 (App Router)</p>
      <p>⚛️ React 19</p>
      <p>⛑ TypeScript</p>
      <p>🧹 ESLint 9</p>
      <p>💅 Prettier</p>
      <p>🚀 SCSS Modules</p>
      <p>🗄 Redux toolkit</p>
      <p>📋 React-hook-form</p>
      <p>🐶 Husky</p>
      <p>! Не использовал UI библиотеки</p>
      <br />
      <br />
      <h1>Backend</h1>
      <p>⚡️ Nest.js</p>
      <p>⚡️ TypeORM</p>
      <p>⚡️ PostgreSQL</p>
      <p>⚡️ Docker</p>
      <p>⚡️ Docker-compose</p>
    </PrivateRoute>
  );
}

# Ресурсы курса "Vibecoding с нуля"

## Официальные ссылки для регистрации

### Основные платформы
- **Cursor** - https://cursor.sh/
- **Claude Code** - https://claude.ai/
- **GitHub** - https://github.com/
- **Vercel** - https://vercel.com/
- **Supabase** - https://supabase.com/
- **Clerk** - https://clerk.dev/
- **OpenAI** - https://platform.openai.com/
- **Stripe** - https://stripe.com/

### Дополнительные инструменты
- **v0.dev** - https://v0.dev/
- **Bolt** - https://bolt.new/
- **Lovable** - https://lovable.dev/
- **Replit** - https://replit.com/
- **Windsurf** - https://codeium.com/windsurf
- **TabNine** - https://www.tabnine.com/
- **Codeium** - https://codeium.com/

## Шпаргалки и справочники

### JavaScript/TypeScript
```javascript
// ES6+ Основы
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// TypeScript типы
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};
```

### React Hooks
```jsx
// useState для локального состояния
const [count, setCount] = useState(0);

// useEffect для побочных эффектов
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);

// useContext для глобального состояния
const theme = useContext(ThemeContext);

// Custom hook
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

### SQL Основы
```sql
-- Создание таблицы
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CRUD операции
INSERT INTO users (email, name) VALUES ('john@example.com', 'John Doe');

SELECT u.name, p.title 
FROM users u 
JOIN posts p ON u.id = p.user_id 
WHERE u.role = 'admin';

UPDATE users SET updated_at = NOW() WHERE id = $1;

DELETE FROM users WHERE created_at < '2023-01-01';

-- Индексы для производительности
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
```

### Git команды
```bash
# Основные команды
git init                    # Инициализация репозитория
git clone <url>            # Клонирование репозитория
git add .                  # Добавление файлов в staging
git commit -m "message"    # Коммит изменений
git push origin main       # Отправка на удаленный репозиторий
git pull origin main       # Получение изменений

# Ветки
git branch feature-auth    # Создание ветки
git checkout feature-auth  # Переключение на ветку
git checkout -b new-feature # Создание и переключение
git merge feature-auth     # Слияние ветки
git branch -d feature-auth # Удаление ветки

# Полезные команды
git status                 # Статус репозитория
git log --oneline         # Краткая история коммитов
git diff                  # Различия в файлах
git reset HEAD~1          # Отмена последнего коммита
```

## Шаблоны конфигураций

### .cursorrules для веб-разработки
```
You are an expert web developer with deep knowledge of React, Next.js, TypeScript, and modern web development practices.

Code Style Preferences:
- Use TypeScript for all React components and utilities
- Prefer functional components with hooks over class components
- Use arrow functions for components and utilities
- Use template literals for strings when interpolation is involved
- Prefer const assertions and satisfies operator when applicable

React/Next.js Preferences:
- Use Next.js App Router over Pages Router for new projects
- Prefer Server Components by default, use 'use client' only when necessary
- Use Tailwind CSS for styling with semantic class names
- Prefer shadcn/ui components over custom implementations
- Use Zustand for client state management when Context is insufficient

File Organization:
- Group related files in feature folders
- Use barrel exports (index.ts) for cleaner imports
- Keep components focused and single-responsibility
- Prefer composition over complex prop drilling

TypeScript Preferences:
- Use strict mode TypeScript configuration
- Prefer interfaces for object types
- Use utility types (Pick, Omit, Partial) when appropriate
- Always provide return types for functions

Database & API:
- Use Drizzle ORM with PostgreSQL
- Prefer tRPC for type-safe APIs when possible
- Use Zod for runtime validation
- Handle errors gracefully with proper error boundaries

Comments and Documentation:
- Write JSDoc comments for complex functions
- Use descriptive names that self-document
- Add TODO comments for future improvements
- Document API endpoints with examples
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### ESLint + Prettier конфигурация
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "error"
  }
}

// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Полезные библиотеки и пакеты

### Frontend
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-*": "latest",
    "lucide-react": "^0.263.1",
    "zustand": "^4.4.1",
    "react-hook-form": "^7.45.4",
    "@hookform/resolvers": "^3.3.1",
    "zod": "^3.22.2",
    "@tanstack/react-query": "^4.32.6",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint": "^8.47.0",
    "prettier": "^3.0.0",
    "tailwind-merge": "^1.14.0",
    "class-variance-authority": "^0.7.0"
  }
}
```

### Backend/Database
```json
{
  "dependencies": {
    "drizzle-orm": "^0.28.6",
    "postgres": "^3.3.5",
    "@neondatabase/serverless": "^0.4.24",
    "drizzle-zod": "^0.5.1",
    "@clerk/nextjs": "^4.23.2",
    "stripe": "^13.6.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.19.13",
    "@types/pg": "^8.10.2"
  }
}
```

## Примеры кода для быстрого старта

### Next.js API Route
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = CreateUserSchema.parse(body);

    const [user] = await db
      .insert(users)
      .values({ name, email })
      .returning();

    return NextResponse.json({ data: user, success: true });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', success: false },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json({ data: allUsers, success: true });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', success: false },
      { status: 500 }
    );
  }
}
```

### React Component с TypeScript
```tsx
// components/UserCard.tsx
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {user.name}
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
            {user.role}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
        <p className="text-xs text-muted-foreground">
          Joined {formatDistanceToNow(user.createdAt, { addSuffix: true })}
        </p>
        
        {(onEdit || onDelete) && (
          <div className="flex gap-2 mt-4">
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(user.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### Drizzle Schema пример
```typescript
// lib/db/schema.ts
import { pgTable, text, timestamp, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  role: varchar('role', { length: 20 }).default('user'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  published: boolean('published').default(false),
  authorId: uuid('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
```

## Environment Variables шаблон

### .env.local
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment Checklist

### Перед деплоем на Vercel
- [ ] Environment variables настроены
- [ ] Build проходит без ошибок (`npm run build`)
- [ ] TypeScript проверка пройдена (`npm run type-check`)
- [ ] Linting исправлены (`npm run lint`)
- [ ] Database миграции применены
- [ ] API endpoints протестированы
- [ ] Responsive design проверен
- [ ] Performance оптимизирован (Lighthouse score >90)
- [ ] SEO meta tags добавлены
- [ ] Error boundaries реализованы
- [ ] Loading states добавлены

## Полезные ресурсы для изучения

### Документации
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

### Инструменты и генераторы
- [shadcn/ui Components](https://ui.shadcn.com/) - копируемые React компоненты
- [Tailwind UI](https://tailwindui.com/) - премиум компоненты
- [Lucide Icons](https://lucide.dev/) - иконки для React
- [React Hook Form](https://react-hook-form.com/) - формы с валидацией
- [Zod](https://zod.dev/) - schema validation

### Community и помощь
- [Stack Overflow](https://stackoverflow.com/) - Q&A сообщество
- [GitHub Discussions](https://github.com/orgs/community/discussions) - обсуждения разработки
- [Discord серверы](https://discord.com/) - Next.js, React, TypeScript communities
- [Reddit](https://reddit.com/r/webdev) - r/webdev, r/reactjs, r/typescript

Этот файл ресурсов будет постоянно обновляться по мере прохождения курса с новыми полезными материалами и примерами кода.

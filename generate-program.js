const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } = require('docx');
const fs = require('fs');

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            // Заголовок
            new Paragraph({
                text: "VIBECODING С НУЛЯ",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
            }),
            new Paragraph({
                text: "Курс по созданию SaaS-приложений с помощью ИИ",
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            }),

            // Урок 1
            new Paragraph({
                text: "Урок 1: Введение в Vibecoding",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Знакомство с философией \"кодить через вайб\" и современными ИИ-инструментами",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Философия vibecoding vs классическое программирование",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• 10 лучших ИИ-инструментов (Cursor, Claude Code, v0.dev)",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Первое приложение за 10 минут",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• GitHub для ИИ-разработки",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Простое веб-приложение, созданное с помощью ИИ за 10 минут. Понимание того, как ИИ-инструменты ускоряют разработку в 10+ раз." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 2
            new Paragraph({
                text: "Урок 2: Мастерство Cursor",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Глубокое погружение в Cursor - главный инструмент ИИ-разработчика",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Установка, настройка и интеграции",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Chat, Tab автодополнение, Cmd+K команды",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Composer для генерации сложного кода",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• .cursorrules - персонализация ИИ-помощника",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• MCP интеграция",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Полностью настроенный Cursor с персональными правилами. Уверенное владение Chat, Composer и автодополнением для продуктивной работы." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 3
            new Paragraph({
                text: "Урок 3: Claude Code",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Альтернативный мощный ИИ-инструмент для архитектуры и планирования",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Возможности веб-интерфейса и Artifacts",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Когда использовать Claude вместо Cursor",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Генерация API, схем БД и тестов",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Гибридный подход в разработке",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Agent и Subagent системы",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• MCP интеграция",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Навык выбора правильного инструмента для задачи. Сгенерированные API схемы, структура БД и архитектурные решения для будущего проекта." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 4
            new Paragraph({
                text: "Урок 4: Современный веб-стек",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Изучение технологий для создания современных веб-приложений",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Архитектура современных веб-приложений",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• JavaScript/TypeScript экосистема",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Базы данных и SQL основы",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Регистрация во всех необходимых сервисах",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Созданные аккаунты на всех платформах (Vercel, Supabase, Clerk, Stripe, OpenAI). Понимание современной архитектуры full-stack приложений." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 5
            new Paragraph({
                text: "Урок 5: Настройка проекта",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Настройка полного технологического стека для разработки",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Next.js проект с TypeScript",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Настройка Vercel для деплоя",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Environment variables и секреты",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Интеграция всех сервисов (Supabase, Clerk, OpenAI и др)",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Полностью настроенный Next.js проект с TypeScript, подключенными сервисами и автоматическим деплоем на Vercel." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 6
            new Paragraph({
                text: "Урок 6: Бекенд",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Создание серверной части приложения с базой данных",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• API Routes в Next.js",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Drizzle ORM и PostgreSQL",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Схема базы данных и миграции",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• CRUD операции и бизнес-логика",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Рабочий бекенд с API endpoints, PostgreSQL базой данных, ORM настройками и полным набором CRUD операций." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 7
            new Paragraph({
                text: "Урок 7: Аутентификация",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Система регистрации и входа пользователей",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Настройка Clerk для аутентификации",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Email, социальные входы, MFA",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Защищенные роуты и middleware",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Синхронизация пользователей с БД",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Полноценная система аутентификации с email/социальными входами, защищенными роутами и синхронизацией данных пользователей." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 8
            new Paragraph({
                text: "Урок 8: База данных",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Глубокое погружение в Supabase и управление данными",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Supabase Dashboard и возможности",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• SQL Editor и Table Editor",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Real-time subscriptions",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Row Level Security и миграции",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Настроенная Supabase БД с таблицами, real-time обновлениями, Row Level Security для защиты данных и системой миграций." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 9
            new Paragraph({
                text: "Урок 9: Фронтенд",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Создание красивого и функционального пользовательского интерфейса",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Роутинг в Next.js App Router",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Hero, Features, Pricing, FAQ блоки",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• shadcn/ui компоненты и Tailwind CSS",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Responsive дизайн и адаптивность",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Профессиональный Landing Page с адаптивным дизайном, красивыми компонентами (Hero, Features, Pricing, FAQ) и формой регистрации." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 10
            new Paragraph({
                text: "Урок 10: API и платежи",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Интеграция платежной системы и внешних API",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• HTTP протоколы и RESTful API",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Stripe: платежи и подписки",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Webhooks для уведомлений",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Связка фронтенда и бекенда",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Интегрированная Stripe система платежей с подписками, webhooks для уведомлений и полная связка фронтенда с бекендом." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 11
            new Paragraph({
                text: "Урок 11: Финальная интеграция",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Связывание всех компонентов и деплоймент в production",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Автоматизация с помощью ИИ",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• OpenAI API и стриминг",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Тестирование полного приложения",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Production деплой и мониторинг",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Полностью работающее SaaS-приложение в production с OpenAI интеграцией, системой мониторинга и автоматическими деплоями." })
                ],
                spacing: { after: 400 }
            }),

            // Урок 12
            new Paragraph({
                text: "Урок 12: MCP и Агенты (Продвинутый уровень)",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
                text: "Создание системы ИИ-агентов для полной автоматизации разработки",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Темы урока:", bold: true })
                ],
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "• Model Context Protocol (MCP)",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Создание специализированных агентов",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Taskmaster для управления задачами",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• SuperCode - автогенерация сложных решений",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Связка MCP + .cursorrules",
                bullet: { level: 0 },
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Результат: ", bold: true }),
                    new TextRun({ text: "Настроенная система ИИ-агентов с MCP, Taskmaster для управления задачами и SuperCode для автоматической генерации сложного кода." })
                ],
                spacing: { after: 600 }
            }),

            // Итоговый результат
            new Paragraph({
                text: "ИТОГОВЫЙ РЕЗУЛЬТАТ КУРСА",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { before: 600, after: 300 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Финальный проект:", bold: true, size: 28 })
                ],
                spacing: { after: 200 }
            }),
            new Paragraph({
                text: "Полноценное веб-приложение Landing Page с:",
                spacing: { after: 150 }
            }),
            new Paragraph({
                text: "✓ Профессиональным адаптивным дизайном (Hero, Features, Pricing, FAQ)",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Системой регистрации и аутентификации (email + социальные входы)",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Админ-панелью для отслеживания пользователей",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Dashboard с аналитикой и статистикой регистраций",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ PostgreSQL базой данных на Supabase",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Real-time обновлениями данных",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Системой платежей через Stripe",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Интеграцией с OpenAI API",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Production деплоем на Vercel",
                bullet: { level: 0 },
                spacing: { after: 300 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Технологический стек:", bold: true, size: 28 })
                ],
                spacing: { after: 150 }
            }),
            new Paragraph({
                text: "• Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Backend: Next.js API Routes, Drizzle ORM, PostgreSQL",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Сервисы: Clerk Auth, Supabase, Stripe, OpenAI API",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Деплой: Vercel с автоматическим CI/CD",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "• Инструменты: Cursor, Claude Code, MCP-агенты, Taskmaster",
                bullet: { level: 0 },
                spacing: { after: 300 }
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Дополнительно:", bold: true, size: 28 })
                ],
                spacing: { after: 150 }
            }),
            new Paragraph({
                text: "✓ Портфолио из 8-10 проектов",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Навыки работы с современными ИИ-инструментами",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Система автоматизации разработки через агентов",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Готовность к работе Middle Full-stack разработчиком",
                bullet: { level: 0 }
            }),
            new Paragraph({
                text: "✓ Возможность создавать собственные стартапы",
                bullet: { level: 0 },
                spacing: { after: 400 }
            }),
            new Paragraph({
                text: "Приложение можно использовать как основу для собственного SaaS-бизнеса или добавить в портфолио для поиска работы",
                alignment: AlignmentType.CENTER,
                italics: true,
                spacing: { after: 200 }
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("/Users/admin/vibecoding-course/Программа_курса_Vibecoding.docx", buffer);
    console.log("Файл успешно создан: Программа_курса_Vibecoding.docx");
});

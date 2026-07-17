export const INITIAL_TASKS = [
  {
    id: 1,
    title: "Настроить Telegram webhook",
    description: "Получать сообщения и автоматически создавать задачи.",
    source: "Telegram",
    meta: "Сегодня",
    project: null,
    column: "todo",
    priority: "High",
    assignee: "Alex"
  },
  {
    id: 2,
    title: "Ответить клиенту",
    description: "Подготовить коммерческое предложение.",
    source: "Gmail",
    meta: "Сегодня",
    project: null,
    column: "todo",
    priority: "Medium",
    assignee: ""
  },
  {
    id: 3,
    title: "Сделать экран логина",
    description: "Добавить авторизацию через Google.",
    source: "Google Chat",
    meta: "Вчера",
    project: "NOXS",
    column: "todo",
    priority: "Medium",
    assignee: "Kate"
  },
  {
    id: 4,
    title: "Подготовить дизайн Dashboard",
    description: "Новый макет главной страницы.",
    source: "Bluedot",
    meta: "2 дня назад",
    project: "NOXS",
    column: "progress",
    priority: "High",
    assignee: "Mike"
  },
  {
    id: 5,
    title: "Написать API авторизации",
    description: "JWT + Refresh Token",
    source: "Telegram",
    meta: "Сегодня",
    project: "NOXS",
    column: "progress",
    priority: "High",
    assignee: "Alex"
  },
  {
    id: 6,
    title: "Проверить Pull Request #54",
    description: "Проверить код перед релизом.",
    source: "Claude",
    meta: "Сегодня",
    project: "NOXS",
    column: "progress",
    priority: "Medium",
    assignee: "Ivan"
  },
  {
    id: 7,
    title: "Подготовить релиз",
    description: "Собрать changelog и обновить версию.",
    source: "Gmail",
    meta: "Завтра",
    project: "NOXS",
    column: "done",
    priority: "Low",
    assignee: "Kate"
  },
  {
    id: 8,
    title: "Исправить авторизацию",
    description: "Ошибка после обновления OAuth.",
    source: "Telegram",
    meta: "Вчера",
    project: "NOXS",
    column: "done",
    priority: "High",
    assignee: "Alex"
  },
  {
    id: 9,
    title: "Обновить документацию",
    description: "Добавить новые API endpoints.",
    source: "Claude",
    meta: "3 дня назад",
    project: "Website",
    column: "todo",
    priority: "Low",
    assignee: "John"
  },
  {
    id: 10,
    title: "Нарисовать onboarding",
    description: "Экран приветствия нового пользователя.",
    source: "Bluedot",
    meta: "Сегодня",
    project: "Website",
    column: "progress",
    priority: "Medium",
    assignee: "Anna"
  },
  {
    id: 11,
    title: "Исправить баг оплаты",
    description: "Ошибка Stripe webhook.",
    source: "Telegram",
    meta: "Сегодня",
    project: "Mobile",
    column: "done",
    priority: "High",
    assignee: "Alex"
  },
  {
    id: 12,
    title: "Обновить README",
    description: "Добавить инструкции по запуску проекта.",
    source: "Claude",
    meta: "Сегодня",
    project: "Website",
    column: "done",
    priority: "Low",
    assignee: "Kate"
  }
];
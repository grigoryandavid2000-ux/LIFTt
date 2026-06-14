# LIFT

Статический многостраничный сайт Telegram-бота LIFT, готовый для GitHub Pages.

## Структура

```text
/
├── index.html
├── about.html
├── programs.html
├── calculators.html
├── games.html
├── quotes.html
├── faq.html
├── contacts.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
└── README.md
```

## Запуск

Можно открыть `index.html` двойным кликом. Для проверки через локальный сервер:

```bash
python -m http.server 8080
```

После этого открой `http://127.0.0.1:8080/`.

## GitHub Pages

Загрузи файлы из этой папки в репозиторий, затем включи Pages: `Settings → Pages → Deploy from branch → main / root`.

## Изображения

Сгенерированные визуалы лежат в `assets/images/`. При необходимости их можно заменить файлами с теми же именами, например `hero-athlete.jpg`, `about-founder.jpg`, `bench-program.jpg`, `squat-program.jpg`, `deadlift-program.jpg`, `powerlifting-program.jpg`.

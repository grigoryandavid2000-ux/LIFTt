
document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    const preloader = document.getElementById("preloader");
    document.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.dataset.page === page) link.classList.add("active");
        link.addEventListener("click", () => {
            toggle?.classList.remove("open");
            links?.classList.remove("open");
            toggle?.setAttribute("aria-expanded", "false");
        });
    });

    toggle?.addEventListener("click", () => {
        const open = !links.classList.contains("open");
        links.classList.toggle("open", open);
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    window.setTimeout(() => {
        preloader?.classList.add("preloader-hidden");
    }, 950);

    const animatedSelector = page === "faq" || page === "quotes"
        ? ""
        : "section, .card, .fact-card, .quote-card, details, .cta, .program-card-premium, .mini-principle";
    const glassSelector = page === "faq" || page === "quotes"
        ? ""
        : ".card, .fact-card, .quote-card, details, .cta, .program-card-premium, .mini-principle";

    if (animatedSelector) document.querySelectorAll(animatedSelector).forEach((el) => el.classList.add("fade-up"));
    if (glassSelector) document.querySelectorAll(glassSelector).forEach((el) => el.classList.add("glass-card"));
    document.querySelectorAll(".btn").forEach((el) => el.classList.add("ios-button"));

    window.submitFeedback = function(event) {
        event.preventDefault();
        const name = document.getElementById("feedbackName")?.value || "Аноним";
        const type = document.getElementById("feedbackType")?.value || "Сообщение";
        const text = document.getElementById("feedbackText")?.value || "";
        if (!text.trim()) {
            alert("Пожалуйста, напиши сообщение");
            return;
        }
        const form = event.target;
        const success = document.getElementById("feedbackSuccess");
        const subject = encodeURIComponent("Сообщение с сайта LIFT");
        const body = encodeURIComponent(`Имя: ${name}\nТип: ${type}\n\nСообщение:\n${text}`);
        window.open(`https://e.mail.ru/compose/?to=lifttrainerbot%40mail.ru&subject=${subject}&body=${body}`, "_blank", "noopener");

        if (form && success) {
            form.style.display = "none";
            success.style.display = "block";
            setTimeout(() => {
                form.style.display = "block";
                success.style.display = "none";
                document.getElementById("feedbackName").value = "";
                document.getElementById("feedbackText").value = "";
            }, 3000);
        }
    };

    const chat = document.getElementById("chatWindow");
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");
    window.toggleChat = function() { chat?.classList.toggle("open"); };
    function addMessage(text, type) {
        const div = document.createElement("div");
        div.className = "message " + type;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }
    const botIntents = [
        {
            keys: ["привет", "здравствуй", "добрый день", "старт", "/start", "главное меню", "назад", "back_to_main"],
            text: "Привет! Я LIFT мини-бот. Я могу подсказать по программам тренировок, технике, рекомендациям, питанию, разминке и игре Flappy Lift. Полная версия живёт в Telegram, но базовые ответы я умею дать прямо здесь.",
            buttons: [
                { label: "Выбрать программу", query: "программа тренировок" },
                { label: "Техника", query: "техника выполнения упражнений" },
                { label: "Рекомендации", query: "рекомендации" },
                { label: "Питание", query: "питание и рацион" },
                { label: "Разминка", query: "разминка" },
                { label: "Flappy Lift", query: "game" },
                { label: "О боте", query: "о боте" }
            ]
        },
        {
            keys: ["что ты умеешь", "что можешь", "что есть", "начать", "помощь", "справка"],
            text: "Я могу предложить программы тренировок, объяснить технику, дать базовые рекомендации, подсказать по питанию и разминке. Напиши тему одним словом или нажми кнопку ниже.",
            buttons: [
                { label: "Программы", query: "программа тренировок" },
                { label: "Питание", query: "питание и рацион" },
                { label: "Разминка", query: "разминка" },
                { label: "О боте", query: "о боте" }
            ]
        },
        {
            keys: ["программа", "программы", "тренировка", "тренировок", "/programs"],
            text: "Выбери направление тренировок. В Telegram-боте у каждого направления есть более подробная структура, а здесь я дам быстрый ориентир.",
            buttons: [
                { label: "Жим", query: "жим" },
                { label: "Присед", query: "присед" },
                { label: "Становая", query: "становая" },
                { label: "Троеборье", query: "троеборье" },
                { label: "Двоеборье", query: "двоеборье" },
                { label: "Бодибилдинг", query: "бодибилдинг" },
                { label: "Пауэрбилдинг", query: "пауэрбилдинг" },
                { label: "Воркаут", query: "воркаут" },
                { label: "Домашние", query: "домашние тренировки" },
                { label: "Армрестлинг", query: "армрестлинг" },
                { label: "Калистеника", query: "калистеника" },
                { label: "Гири", query: "гиревой спорт" },
                { label: "Улица", query: "уличные тренировки" },
                { label: "Руки", query: "тренировка рук" }
            ]
        },
        {
            keys: ["до 100 жим", "bench_100", "жим до 100", "до 100"],
            text: "Программы по жиму лёжа до 100 кг. В экспортированном боте для этого уровня были две таблицы: программа от Сарычева и программа от Суровецкого.",
            buttons: [
                { label: "Жим до 100 от Сарычева", url: "https://docs.google.com/spreadsheets/d/12I8EtJzLLMu8SxnDR2oUwgiwSpT4f-eNnOFEKceDz7w/edit?usp=sharing" },
                { label: "Жим от Суровецкого", url: "https://docs.google.com/spreadsheets/d/1bdrp_XOHyAAHl_AboRYMZOxkpfj0YmCz/edit?usp=sharing&ouid=100444343108925196905&rtpof=true&sd=true" },
                { label: "Главное меню", query: "главное меню" }
            ]
        },
        {
            keys: ["жим", "bench", "program_bench"],
            text: "Жим лёжа: выбери целевой вес. Для точной программы лучше открыть Telegram-бота, но базовый выбор такой: до 100, до 150, до 200 или 200+ кг.",
            buttons: [
                { label: "До 100 кг", query: "до 100 жим" },
                { label: "До 150 кг", query: "жим до 150" },
                { label: "До 200 кг", query: "жим до 200" },
                { label: "200+ кг", query: "жим 200+" },
                { label: "Назад к программам", query: "программа тренировок" }
            ]
        },
        {
            keys: ["присед", "приседание", "приседания", "squat", "program_squat"],
            text: "Приседания: выбери целевой вес и уровень. В мини-боте могу подсказать направление, а полная программа открывается в Telegram-боте.",
            buttons: [
                { label: "До 100 кг", query: "присед до 100" },
                { label: "До 150 кг", query: "программа для приседаний" },
                { label: "До 200 кг", query: "присед до 200" },
                { label: "200+ кг", query: "присед 200+" },
                { label: "Программа Суровецкого", url: "https://docs.google.com/spreadsheets/d/1GZvAb1bJevxVh0HM_H6f72CD5__qRzjI/edit?usp=drivesdk&ouid=100444343108925196905&rtpof=true&sd=true" }
            ]
        },
        {
            keys: ["становая", "становая тяга", "deadlift", "program_deadlift"],
            text: "Становая тяга: в Telegram-боте выбор идёт по целевому весу: 150+, 200+, 300+ и 350+ кг. Здесь могу подсказать направление и отправить в полный бот.",
            buttons: [
                { label: "150+ кг", query: "становая 150" },
                { label: "200+ кг", query: "становая 200" },
                { label: "300+ кг", query: "становая 300" },
                { label: "Назад к программам", query: "программа тренировок" }
            ]
        },
        {
            keys: ["троеборье", "powerlifting"],
            text: "Троеборье — это жим, присед и становая в одной системе. Для нормального подбора нужны твои 1ПМ в трёх движениях: жим, присед, становая.",
            buttons: [{ label: "Назад к программам", query: "программа тренировок" }]
        },
        {
            keys: ["двоеборье"],
            text: "Двоеборье: выбери, какая связка интересует — жим+присед, жим+становая или присед+становая. Программа строится вокруг двух главных движений и восстановления между ними.",
            buttons: [{ label: "Назад к программам", query: "программа тренировок" }]
        },
        {
            keys: ["бодибилдинг", "bodybuilding"],
            text: "Бодибилдинг: можно выбрать формат тренировок — верх/низ, сплит, фулбади, тяни-толкай-ноги или 2 по 2. Главная цель — качественная мышечная масса и пропорции.",
            buttons: [{ label: "Пауэрбилдинг", query: "пауэрбилдинг" }, { label: "Питание", query: "питание и рацион" }]
        },
        {
            keys: ["пауэрбилдинг", "powerbuilding"],
            text: "Пауэрбилдинг соединяет силовой прогресс и работу на форму: база, объём, гибридные схемы, верх/низ или 2 по 2.",
            buttons: [{ label: "Бодибилдинг", query: "бодибилдинг" }, { label: "Назад к программам", query: "программа тренировок" }]
        },
        {
            keys: ["воркаут", "workout", "подтягивания", "брусья"],
            text: "Воркаут — тренировки со своим весом: подтягивания, отжимания, брусья, статика и силовые элементы. Хороший выбор, если хочешь прогрессировать без тренажёров.",
            buttons: [{ label: "Калистеника", query: "калистеника" }, { label: "Уличные тренировки", query: "уличные тренировки" }]
        },
        {
            keys: ["калистеника", "calisthenics", "горизонт", "front lever"],
            text: "Калистеника — сила, контроль тела и сложные элементы. Фокус: база, суставы, подтягивания, брусья, статика и постепенная прогрессия.",
            buttons: [{ label: "Воркаут", query: "воркаут" }, { label: "Назад к программам", query: "программа тренировок" }]
        },
        {
            keys: ["домашние", "дом", "домашние тренировки"],
            text: "Домашние тренировки подойдут, если нет доступа к залу. Можно работать без инвентаря, с гантелями, резинками или своим весом.",
            buttons: [{ label: "Воркаут", query: "воркаут" }, { label: "Питание", query: "питание и рацион" }]
        },
        {
            keys: ["армрестлинг", "armwrestling"],
            text: "Армрестлинг: кисть, предплечья, связки, тяговая сила и специальная подготовка под стол. Здесь важно не перегружать локти и прогрессировать аккуратно.",
            buttons: [{ label: "Тренировка рук", query: "тренировка рук" }, { label: "Рекомендации", query: "рекомендации" }]
        },
        {
            keys: ["гири", "гиря", "гиревой", "гиревой спорт", "kettlebell"],
            text: "Гиревой спорт — это рывок, толчок, длинный цикл, техника дыхания и силовая выносливость. Тут важны темп, экономичность движения и регулярность.",
            buttons: [{ label: "Назад к программам", query: "программа тренировок" }]
        },
        {
            keys: ["улица", "уличные", "уличные тренировки"],
            text: "Уличные тренировки: турники, брусья, площадка, беговые элементы и круговые схемы. Хороший формат для регулярности и общей формы.",
            buttons: [{ label: "Воркаут", query: "воркаут" }, { label: "Калистеника", query: "калистеника" }]
        },
        {
            keys: ["руки", "тренировка рук", "бицепс", "трицепс", "предплечья"],
            text: "Тренировка рук: бицепс, трицепс, предплечья и грамотная специализация без перегруза локтей. Лучше сочетать объём, технику и восстановление.",
            buttons: [{ label: "Армрестлинг", query: "армрестлинг" }, { label: "Рекомендации", query: "рекомендации" }]
        },
        {
            keys: ["техника", "техника выполнения упражнений", "упражнения", "info_technique"],
            text: "Техника выполнения упражнений: в боте есть гид по базовым движениям. Мини-бот может подсказать направление, но за полным материалом лучше открыть гайд.",
            buttons: [
                { label: "Гид по технике", url: "https://kpfu.ru/staff_files/F205597698/Kamalieva_Fazleeva__Shalavina._Azbuka_trenazhernogo_zala..pdf" },
                { label: "Жим", query: "жим" },
                { label: "Присед", query: "присед" },
                { label: "Становая", query: "становая" }
            ]
        },
        {
            keys: ["рекомендации", "сон", "восстановление", "травмы", "спортпит", "бады", "/recommendations"],
            text: "Рекомендации: сон, восстановление, профилактика травм, ЖКТ, спортпит, добавки, мотивация и контроль прогресса. Всё это помогает тренироваться без хаоса.",
            buttons: [
                { label: "Гид по БАДам", url: "https://docs.google.com/document/d/13ajnZiy9odINxScdqqEvlhsdthemfhEjSwChJ7Eeq4k/edit?tab=t.0" },
                { label: "Питание", query: "питание и рацион" }
            ]
        },
        {
            keys: ["питание", "рацион", "кбжу", "калории", "info_nutrition"],
            text: "Питание и рацион: рассчитай КБЖУ, следи за белком, водой и регулярностью. Для результата питание должно поддерживать цель: набор, сушка или поддержание.",
            buttons: [
                { label: "Гид по питанию", url: "https://docs.google.com/document/d/1AkMQZHFKlnnicQT-sE6ogdAidb0ttZk66e5fcyQqiWc/edit?tab=t.0" },
                { label: "Калькуляторы", url: "https://agent-69f5072a2ba96c1fed0--leafy-capybara-438fa5.netlify.app/" }
            ]
        },
        {
            keys: ["разминка", "разогрев", "суставная", "info_warmup"],
            text: "Разминка перед тренировкой: суставная гимнастика, лёгкий кардио-разогрев, специальные упражнения и разминочные подходы. Обычно хватает 10–15 минут.",
            buttons: [
                { label: "Гид по разминке", url: "https://docs.google.com/document/d/1K2fs2PCY0HhgW_e6tz7BTmvOsOIFm3EAdPdlBu25IKY/edit?usp=sharing" },
                { label: "Техника", query: "техника выполнения упражнений" }
            ]
        },
        {
            keys: ["игра", "game", "flappy", "flappy lift"],
            text: "Flappy Lift: управляй штангой, собирай гантели и уворачивайся от бургеров. Нажми кнопку ниже, чтобы играть.",
            buttons: [{ label: "Играть", url: "https://agent-69f5c8a888365f07bd76dc64--deft-faun-8c9eca.netlify.app/" }]
        },
        {
            keys: ["о боте", "about_bot", "создатель", "lift"],
            text: "LIFT — помощник по тренировкам. Его задача — заменить хаос из разрозненных советов понятной системой: программы, техника, рекомендации, питание и разминка.",
            buttons: [{ label: "Открыть Telegram-бота", url: "https://t.me/twwoLiftbot_bot" }, { label: "Главное меню", query: "главное меню" }]
        }
    ];

    const fallbackReplies = [
        "Не совсем понимаю, о чём ты. Попробуй написать проще: например, “жим”, “питание”, “разминка” или “программа”.",
        "Можешь сказать то же самое другими словами? Я лучше всего понимаю темы: программы, техника, рекомендации, питание и разминка.",
        "Вот эта фраза мне не ясна. Нажми одну из быстрых кнопок ниже или напиши направление тренировки."
    ];

    function cleanBotText(text) {
        return text.replace(/\*/g, "").replace(/\n{3,}/g, "\n\n").trim();
    }
    function normalizeText(text) {
        return text.toLowerCase().replace(/ё/g, "е").replace(/[^\p{L}\p{N}+/@\s-]/gu, " ").replace(/\s+/g, " ").trim();
    }
    function findIntent(text) {
        const normalized = normalizeText(text);
        return botIntents.find((intent) => intent.keys.some((key) => {
            const normalizedKey = normalizeText(key);
            return normalized === normalizedKey || normalized.includes(normalizedKey);
        }));
    }
    function renderBotButtons(container, buttons = []) {
        if (!buttons.length) return;
        const actions = document.createElement("div");
        actions.className = "message-actions";
        buttons.forEach((button) => {
            const el = document.createElement(button.url ? "a" : "button");
            el.className = "chat-chip message-action";
            el.textContent = button.label;
            if (button.url) {
                el.href = button.url;
                el.target = "_blank";
                el.rel = "noopener";
            } else {
                el.type = "button";
                el.addEventListener("click", () => {
                    addMessage(button.label, "user");
                    processMessage(button.query || button.label);
                });
            }
            actions.appendChild(el);
        });
        container.appendChild(actions);
    }
    function addBotMessage(text, buttons = []) {
        const div = document.createElement("div");
        div.className = "message bot";
        div.textContent = "...";
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        setTimeout(() => {
            div.textContent = cleanBotText(text);
            renderBotButtons(div, buttons);
            messages.scrollTop = messages.scrollHeight;
        }, 450);
    }
    window.sendQuickReply = function(text) { addMessage(text, "user"); processMessage(text); };
    window.sendMessage = function() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, "user");
        input.value = "";
        processMessage(text);
    };
    window.processMessage = function(text) {
        const intent = findIntent(text);
        if (intent) {
            addBotMessage(intent.text, intent.buttons);
            return;
        }
        const fallback = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        addBotMessage(fallback, [
            { label: "Программы", query: "программа тренировок" },
            { label: "Питание", query: "питание и рацион" },
            { label: "Разминка", query: "разминка" },
            { label: "О боте", query: "о боте" }
        ]);
    };

    try {
        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
            document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));
        } else {
            document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible"));
        }
    } catch (error) {
        document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible"));
    }
});

// NAVIGATION
export const NAV_LINKS_UA = [
  { href: "/", key: "home", label: "Головна" },
  { href: "/about", key: "about", label: "Про нас" },
  { href: "/donation", key: "donation", label: "Донати" },
  { href: "/blog", key: "blog ", label: "Блог " },
  { href: "/contact", key: "contact", label: "Контакти" },
];

export const USER_MENU_UA = [
  {
    name: "Профіль",
    url: "/profile/dashboard",
  },
  {
    name: "Мої донати",
    url: "/profile/donations",
  },
];

export const ADMIN_MENU_UA = [
  {
    name: "Профіль",
    url: "/admin/dashboard",
  },
  {
    name: "Донати",
    url: "/admin/donations",
  },
  {
    name: "Кaмпанії",
    url: "/admin/campaigns",
  },
  {
    name: "Волонтери",
    url: "/admin/users",
  },
];

export const SUM_DONAT_UA = [
  { sum: 200, currency: "грн" },
  { sum: 500, currency: "грн" },
  { sum: 1000, currency: "грн" },
  { sum: 2000, currency: "грн" },
  { sum: 5000, currency: "грн" },
  { sum: 10000, currency: "грн" },
];

export const FOOTER_CONTACT_INFO_UA = [
  {
    title: "Умови та політика",
    items: ["Умови використання", "Політика конфіденційності"],
  },
  {
    title: "Компанія",
    items: ["Головна", "Про нас", "Зв'яжіться з нами"],
  },
  {
    title: "Контакт",
    items: ["(+380)099 235 79 67", "nastuly72@gmail.com", "Зв'яжіться з нами"],
  },
  {
    title: "Місцезнаходження",
    items: [
      "вулиця Січових Стрільців, 23A, Київ, 04053",
      "Бізнес-центр PALADIS",
      "Цілодобово",
      "hello@kooperativ.cc",
    ],
  },
];

export const COMMAND_UA = [
  {
    imageUrl: "/images/lady.png",
    name: "Ангел Роза",
    role: "Креативний менеджер",
    review:
      "Моє прагнення допомагати людям поєднується з моєю страстю до мистецтва та дизайну. Я вірю, що графічний дизайн може викликати емоції і спонукати людей допомагати тим, хто цього потребує.",
  },
  {
    imageUrl: "/images/lady.png",
    name: "Джон Доу",
    role: "Веб-розробник",
    review:
      "Технології можуть стати потужним інструментом для здійснення добрих справ. Я обрав розвивати цей проект, оскільки вірю в його потенціал змінити світ на краще через використання моїх навичок у веб-розробці.",
  },
  {
    imageUrl: "/images/lady.png",
    name: "Емілі Сміт",
    role: "Графічний дизайнер",
    review:
      "Я вірю, що візуальний контент може зробити доброту більш помітною та привабливою. Я хочу використовувати мої здібності у графічному дизайні, щоб зробити цей проект естетично приємним і залучити більше людей до підтримки.",
  },
];

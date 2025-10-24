'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const sections = [
  {
    id: "soloflow",
    label: "Soloflow",
    tagline: "pet project",
    title: "Soloflow — веб-приложение для личной эффективности",
    lead:
      "Комплексный инструмент, который объединяет планирование, фокус и аналитику, помогая оставаться в потоке и достигать целей без перегрузов.",
    badges: ["React", "JavaScript", "Supabase"],
    bullets: [
      "Режим «глубокой работы» с помодоро-таймером и отслеживанием перерывов.",
      "Умные списки задач: приоритеты, шаблоны повторяющихся дел и быстрые фильтры.",
      "Дашборды продуктивности с аналитикой по проектам и неделям.",
    ],
  },
  {
    id: "clipchisel",
    label: "ClipChisel",
    tagline: "pet project",
    title: "ClipChisel — AI-конструктор для соцсетей",
    lead:
      "Интерактивный сайт для массового создания коротких видео и переливания трафика с использованием ИИ.",
    badges: ["Next.js", "Golang", "OpenAI API", "Rust"],
    bullets: [
      "Модульные пресеты для TikTok, Reels и YouTube с живым предпросмотром.",
      "Редактор сценариев: подсветка ключевых эмоций, клише и call-to-action.",
      "Генерация визуальных подсказок и экспорт готовых скриптов в Notion/CSV.",
    ],
  },
  {
    id: "experience",
    label: "ISoftPro",
    tagline: "опыт работы",
    title: "Fullstack-разработчик — 6 месяцев коммерческой практики",
    lead:
      "Работал в продуктовой команде ISoftPro: доставлял клиентский функционал, внедрял дизайн-систему, оптимизировал фронтенд-процессы и самостоятельно писал полноценные проекты.",
    badges: ["React", "Next.js", "REST", "Docker", "Golang"],
    bullets: [
      "Разрабатывал интерфейсы на React и Next.js, покрывал ключевые сценарии end-to-end тестами.",
      "Интегрировал внешний API, контейнизировал и вносил правки от дизайнеров.",
      "Написал несколько коммерческих проектов полностью самостоятельно.",
      "Писал мобильные и веб-приложения, а также backend на Golang."
    ],
  },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("soloflow");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { threshold: 0.6 }
    );

    const observedElements: HTMLElement[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observedElements.push(element);
      }
    });

    return () => {
      observedElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarIntro}>
          <span className={styles.tagline}>привет, я fullstack-разработчик</span>
          <h1>Создаю продукты, которые поддерживают людей в реальной жизни</h1>
          <p>
            Мне интересно превращать идеи в ощутимые сервисы: от быстрых
            прототипов до устойчивых продакшн-решений. Ниже — пет-проекты и
            коммерческий опыт, которыми я горжусь.
          </p>
        </div>

        <nav className={styles.nav}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.navItem} ${
                activeSection === section.id ? styles.navItemActive : ""
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{section.label}</span>
              <small>{section.tagline}</small>
            </a>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p>
            Открыт к сотрудничеству и интересным техничкам. Напишите мне в
            любой мессенджер или на почту, чтобы обсудить задачу.
          </p>
        </div>
      </aside>

      <main className={styles.content}>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`${styles.panel} ${styles[`panel-${section.id}`]}`}
          >
            <header className={styles.panelHeader}>
              <span>{section.tagline}</span>
              <h2>{section.title}</h2>
              <p>{section.lead}</p>
            </header>

            <ul className={styles.badges}>
              {section.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>

            <ul className={styles.bulletList}>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}

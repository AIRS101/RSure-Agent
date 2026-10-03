import { ArrowRight, ArrowUpRight, Download, Play } from "lucide-react";
import { useEffect } from "react";
import changeVideo from "../../demo-videos/rsure-agent-demo-change-detection.mp4?url";
import objectVideo from "../../demo-videos/rsure-agent-demo-object-detection.mp4?url";
import scaleVideo from "../../demo-videos/rsure-agent-demo-scale-measurement.mp4?url";
import combinedVideo from "../../demo-videos/rsure-agent-demo-combined.mp4?url";

const BASE_URL = import.meta.env.BASE_URL;
const REPOSITORY_URL = "https://github.com/AIRS101/RSure-Agent";
const PAPER_TITLE = "Reliable Use of Tool Observations for Remote Sensing Agents";

const cases = [
  {
    id: "change-detection",
    title: { en: "Land-cover change analysis", zh: "土地覆盖变化检测" },
    description: {
      en: "Compare two time points and inspect the segmentation overlays and quantitative evidence behind the land-cover change analysis.",
      zh: "对比两个时相的遥感影像，查看土地覆盖分割叠加图，以及支持变化判断的定量证据。"
    },
    video: changeVideo,
    duration: "0:22"
  },
  {
    id: "object-detection",
    title: { en: "Object identification and detection", zh: "目标识别与检测" },
    description: {
      en: "Identify the storage tank inside the red box and follow the visual recognition and object-detection evidence used in the answer.",
      zh: "识别红框内的储罐，查看视觉识别结果和目标检测框，了解最终答案所依据的工具证据。"
    },
    video: objectVideo,
    duration: "0:21"
  },
  {
    id: "scale-measurement",
    title: { en: "Scale-based distance measurement", zh: "比例尺测距" },
    description: {
      en: "Estimate the distance between A and B using the map scale, and inspect the layout and measurement evidence.",
      zh: "根据地图比例尺估算 A、B 两点间的实际距离，查看版面识别结果与距离量测证据。"
    },
    video: scaleVideo,
    duration: "0:22"
  }
];

export default function ProjectSite() {
  const language = new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en";
  const isDemoPage = window.location.pathname.replace(/\/$/, "").endsWith("/demo");
  const t = (en: string, zh: string) => language === "en" ? en : zh;
  const paperTitle = t(PAPER_TITLE, "遥感智能体对工具观测的可靠利用");
  const comingSoon = t("Coming soon.", "敬请期待。");
  const pageUrl = (demo: boolean, lang = language) => `${BASE_URL}${demo ? "demo/" : ""}${lang === "zh" ? "?lang=zh" : ""}`;

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.title = `${isDemoPage ? t("Demos", "演示") : "RSure-Agent"} · ${isDemoPage ? "RSure-Agent" : paperTitle}`;
  }, [isDemoPage, language]);

  return (
    <div className="site-shell">
      <header className="site-header page-width">
        <a className="wordmark" href={pageUrl(false)}>RSure-Agent<span aria-hidden="true">.</span></a>
        <nav className="main-nav" aria-label={t("Main navigation", "主导航")}>
          <a href={pageUrl(false)} aria-current={!isDemoPage ? "page" : undefined}>{t("Paper", "论文")}</a>
          <a href={pageUrl(true)} aria-current={isDemoPage ? "page" : undefined}>{t("Demos", "演示")}</a>
        </nav>
        <div className="header-links">
          <a className="language-link" href={pageUrl(isDemoPage, language === "en" ? "zh" : "en")} lang={language === "en" ? "zh" : "en"}>{t("中文", "English")}</a>
          <a className="repository-link" href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
        </div>
      </header>

      {isDemoPage ? (
        <main className="demo-page page-width">
          <section className="demo-intro">
            <p className="eyebrow">{t("RECORDED DEMONSTRATIONS", "案例演示")}</p>
            <h1>{t("Three scenarios. Traceable evidence.", "三个场景，可追溯的证据。")}</h1>
            <p className="intro-copy">{t("Watch the recorded analysis and tool evidence for each remote sensing scenario.", "通过演示视频查看每个遥感场景的分析过程与工具证据。")}</p>
            <a className="inline-link" href={combinedVideo} target="_blank" rel="noreferrer"><Play size={15} />{t("Watch all three demos · 1:12", "观看三个案例合集 · 1:12")}<ArrowUpRight size={14} /></a>
          </section>

          <div className="demo-list">
            {cases.map((item, index) => (
              <article className="demo-case" id={item.id} key={item.id} aria-labelledby={`${item.id}-title`}>
                <div className="demo-case-copy">
                  <p className="eyebrow">{t("CASE", "案例")} {String(index + 1).padStart(2, "0")} <span className="duration">{item.duration}</span></p>
                  <h2 id={`${item.id}-title`}>{item.title[language]}</h2>
                  <p>{item.description[language]}</p>
                  <a className="inline-link download-link" href={item.video} download={`rsure-agent-demo-${item.id}.mp4`}><Download size={14} />{t("Download video", "下载视频")}</a>
                </div>
                <video
                  className="demo-video"
                  controls
                  playsInline
                  preload="none"
                  poster={`${BASE_URL}demo/video-posters/${item.id}.png`}
                  aria-label={item.title[language]}
                  onPlay={(event) => {
                    document.querySelectorAll("video").forEach((video) => {
                      if (video !== event.currentTarget) video.pause();
                    });
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                  <a href={item.video}>{t("Download this demo video", "下载此演示视频")}</a>
                </video>
              </article>
            ))}
          </div>
          <a className="back-link inline-link" href={pageUrl(false)}>{t("About the paper", "查看论文介绍")}<ArrowRight size={15} /></a>
        </main>
      ) : (
        <main className="paper-page page-width">
          <section className="paper-intro" aria-labelledby="paper-title">
            <p className="eyebrow">{t("RESEARCH PROJECT", "研究项目")}</p>
            <h1 id="paper-title">RSure-Agent<span>{paperTitle}</span></h1>
            <p className="authors">{t("Authors", "作者")}: <span>{comingSoon}</span></p>
            <div className="paper-actions">
              <a className="primary-link" href={pageUrl(true)}><Play size={16} />{t("View demos", "查看演示")}</a>
              <a className="secondary-link" href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={16} /></a>
            </div>
          </section>

          <div className="paper-content">
            <section className="paper-section" aria-labelledby="abstract-title">
              <h2 id="abstract-title">{t("Abstract", "摘要")}</h2>
              <p className="coming-soon">{comingSoon}</p>
            </section>
            <section className="paper-section" aria-labelledby="paper-link-title">
              <h2 id="paper-link-title">{t("Paper", "论文")}</h2>
              <p className="coming-soon">{comingSoon}</p>
            </section>
            <section className="paper-section" aria-labelledby="citation-title">
              <h2 id="citation-title">{t("Citation", "引用")}</h2>
              <div className="citation-placeholder">{comingSoon}</div>
            </section>
          </div>
        </main>
      )}

      <footer className="site-footer page-width">
        <span>RSure-Agent</span>
        <a href={isDemoPage ? pageUrl(false) : pageUrl(true)}>{isDemoPage ? t("Paper", "论文") : t("Demos", "演示")}<ArrowRight size={14} /></a>
      </footer>
    </div>
  );
}

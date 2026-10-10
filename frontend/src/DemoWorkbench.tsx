import { Activity, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, FileJson, Image as ImageIcon, Loader2, Pause, Play, RotateCcw, ShieldCheck, Workflow, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { workspaceCases, type DemoEvidence, type DemoLanguage, type DemoText, type WorkspaceCase } from "./demoCases";
import "./workspace.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const LAST_PHASE = 8;

function EmphasizedText({ text, emphasis, language }: { text: string; emphasis: DemoText[]; language: DemoLanguage }) {
  const phrases = [...new Set(emphasis.map(phrase => phrase[language]))].filter(Boolean).sort((a, b) => b.length - a.length);
  if (!phrases.length) return text;
  const pattern = new RegExp(`(${phrases.map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, index) => phrases.includes(part) ? <strong className="wb-emphasis" key={index}>{part}</strong> : part);
}

function evidenceJson(item: WorkspaceCase, record: DemoEvidence, language: DemoLanguage) {
  return JSON.stringify({ source: "demo-case", case_id: item.id, evidence_id: record.id, tool_name: record.tool, purpose: record.purpose[language], observation: record.observation[language], result: record.data, image_artifacts: record.images.map(image => image.path) }, null, 2);
}

export default function DemoWorkbench({ language }: { language: DemoLanguage }) {
  const t = (en: string, zh: string) => language === "en" ? en : zh;
  const [replay, setReplay] = useState({ caseIndex: 0, phase: 0, playing: false });
  const [toolPlanOpen, setToolPlanOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(null);
  const outputScroll = useRef<HTMLDivElement>(null);
  const item = workspaceCases[replay.caseIndex];
  const finished = replay.phase === LAST_PHASE;
  const completed = Math.min(3, Math.floor(replay.phase / 2));
  const toolIndex = Math.min(2, Math.max(0, Math.floor((replay.phase - 1) / 2)));
  const currentTool = item.records[toolIndex];
  const status = finished ? t("Complete", "已完成") : replay.phase ? replay.playing ? t("Executing", "执行中") : t("Paused", "已暂停") : t("Ready", "待命");

  useEffect(() => {
    if (!replay.playing) return;
    const caseIndex = replay.caseIndex;
    const timer = window.setInterval(() => {
      setReplay(previous => {
        if (!previous.playing || previous.caseIndex !== caseIndex) return previous;
        const phase = Math.min(LAST_PHASE, previous.phase + 1);
        return { ...previous, phase, playing: phase < LAST_PHASE };
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, [replay.playing, replay.caseIndex]);

  useEffect(() => {
    const panel = outputScroll.current;
    if (!panel) return;
    if (replay.phase === 0 || finished) panel.scrollTop = 0;
  }, [replay.caseIndex, replay.phase, finished]);

  function chooseCase(caseIndex: number) {
    setReplay({ caseIndex, phase: 0, playing: false });
    setSelectedEvidence(null);
  }

  function start() {
    setReplay(previous => ({ ...previous, phase: previous.phase === LAST_PHASE ? 1 : Math.max(1, previous.phase), playing: true }));
  }

  const events = item.records.flatMap(record => [
    { title: t(`Calling ${record.title.en}`, `正在调用${record.title.zh}工具`), detail: record.purpose[language] },
    { title: t(`${record.title.en} completed`, `${record.title.zh}工具已完成`), detail: record.observation[language] }
  ]);
  events.push({ title: t("Synthesizing the answer", "正在总结结论"), detail: t("Combine the tool observations and supporting evidence to produce the final answer.", "结合工具观测与证据，生成最终答案。") });
  events.push({ title: t("Analysis complete", "分析完成"), detail: t("The conclusion and three evidence records are ready to inspect.", "结论与三条证据已展示，可点击核查。") });
  const visibleEvents = events.slice(0, replay.phase).slice(-4);
  const stackDepth = Math.max(0, visibleEvents.length - 1);

  return (
    <section className="demo-workbench" aria-label={t("Remote sensing analysis workspace", "遥感分析工作台")}>
      <aside className="wb-input wb-glass">
        <a className="wb-source" href={asset(item.image)} target="_blank" rel="noreferrer"><img src={asset(item.image)} alt={t(`Source imagery for case ${replay.caseIndex + 1}`, `案例 ${replay.caseIndex + 1} 原始影像`)} /></a>
        <div className="wb-current-case"><div><span>{t("CURRENT CASE", "当前案例")}</span><strong>{t(`Case ${replay.caseIndex + 1}`, `案例 ${replay.caseIndex + 1}`)}</strong></div><p>{item.title[language]}</p></div>
        <div className="wb-case-picker" role="group" aria-label={t("Choose a case", "选择案例")}>
          {workspaceCases.map((entry, index) => <button key={entry.id} type="button" aria-pressed={index === replay.caseIndex} onClick={() => chooseCase(index)} className={index === replay.caseIndex ? "selected" : ""}><img src={asset(entry.image)} alt="" /><span><strong>{t(`Case ${index + 1}`, `案例 ${index + 1}`)}</strong><small>{entry.title[language]}</small></span></button>)}
        </div>
        <div className="wb-tabs" role="group" aria-label={t("Case details", "案例详情")}>
          <button type="button" className={!toolPlanOpen ? "selected" : ""} aria-pressed={!toolPlanOpen} onClick={() => setToolPlanOpen(false)}><ShieldCheck size={14} />{t("Agent", "智能体")}</button>
          <button type="button" className={toolPlanOpen ? "selected" : ""} aria-pressed={toolPlanOpen} onClick={() => setToolPlanOpen(true)}><Workflow size={14} />{t("Tool chain", "工具链")}</button>
        </div>
        <div className="wb-input-detail" key={`${item.id}-${toolPlanOpen}`} role="region" aria-label={t("Task details", "任务详情")} tabIndex={0}>
          {toolPlanOpen ? <ol className="wb-tool-plan">{item.records.map(record => <li key={record.id}><strong>{record.title[language]}</strong><code>{record.tool}</code><p>{record.purpose[language]}</p></li>)}</ol> : <div className="wb-question"><label htmlFor="demo-question">{t("Analysis task", "分析任务")}</label><textarea id="demo-question" value={item.question[language]} readOnly /></div>}
        </div>
        <div className="wb-controls">
          <button type="button" className="wb-primary" onClick={replay.playing ? () => setReplay(previous => ({ ...previous, playing: false })) : start}>{replay.playing ? <Pause size={15} /> : <Play size={15} />}{replay.playing ? t("Pause execution", "暂停执行") : finished ? t("Run again", "重新执行") : replay.phase ? t("Continue execution", "继续执行") : t("Start execution", "开始执行")}</button>
          <button type="button" className="wb-icon-button" aria-label={t("Reset task", "重置任务")} onClick={() => chooseCase(replay.caseIndex)}><RotateCcw size={15} /></button>
        </div>
      </aside>

      <section className="wb-output wb-glass" aria-labelledby="workspace-title">
        <header className="wb-output-heading"><div><p>{t("REMOTE SENSING ANALYSIS", "遥感分析")}</p><h1 id="workspace-title">{t("Analysis workspace", "分析工作区")}</h1></div><span className={`wb-status ${finished ? "complete" : replay.phase ? "active" : ""}`}>{finished ? <CheckCircle2 size={13} /> : <Activity size={13} />}{status}</span></header>
        <div className="wb-progress" aria-label={t("Execution progress", "执行进度")} role="progressbar" aria-valuemin={0} aria-valuemax={LAST_PHASE} aria-valuenow={replay.phase}><span style={{ width: `${replay.phase / LAST_PHASE * 100}%` }} /></div>
        {replay.phase > 0 ? <ol className="wb-event-stack" style={{ paddingTop: stackDepth * 22 }} aria-label={t("Tool activity", "工具执行记录")}>
          {visibleEvents.map((event, index) => {
            const current = index === stackDepth;
            return <li key={event.title} className={current ? `wb-narration wb-event-current${finished ? " complete" : ""}` : "wb-event-back"} style={current ? undefined : { top: index * 22, left: (stackDepth - index) * 7, right: (stackDepth - index) * 7 }} aria-hidden={current ? undefined : true}>
              {current ? <div aria-live="polite"><div className="wb-event-heading"><strong>{replay.playing ? <Loader2 size={15} className="wb-spin" /> : finished ? <CheckCircle2 size={15} /> : <Activity size={15} />}{event.title}</strong><span>{replay.phase} / {LAST_PHASE}</span></div><p><EmphasizedText text={event.detail} emphasis={item.emphasis} language={language} /></p>{replay.phase < 7 && <code>{currentTool.tool}</code>}</div> : <span>{event.title}</span>}
            </li>;
          })}
        </ol> : <div className="wb-narration" aria-live="polite"><strong><Activity size={15} />{t("Waiting for a task", "等待任务")}</strong><p>{t("Choose a case and start the analysis. Follow the tool workflow and inspect the evidence supporting the conclusion.", "选择案例并开始执行，查看工具分析过程、返回结果及结论依据。")}</p></div>}
        <div className="wb-output-scroll" role="region" aria-label={t("Analysis results", "分析结果")} tabIndex={0} ref={outputScroll}>
          <div className="wb-result-heading"><strong><FileJson size={14} />{t("Analysis result", "分析结果")}</strong><span>{t(`${completed} evidence records`, `${completed} 条证据可核查`)}</span></div>
          {finished ? <article className="wb-answer"><div className="wb-conclusion"><span>{t("Conclusion", "结论")}</span><h2><EmphasizedText text={item.conclusion[language]} emphasis={item.emphasis} language={language} /></h2></div><div className="wb-analysis"><strong>{t("Analysis", "分析")}</strong>{item.analysis.map(paragraph => <p key={paragraph.evidence}><EmphasizedText text={paragraph.text[language]} emphasis={item.emphasis} language={language} /> <button type="button" className="wb-citation" onClick={() => setSelectedEvidence(item.records.findIndex(record => record.id === paragraph.evidence))}>[{paragraph.evidence}]<ArrowUpRight size={11} /></button></p>)}</div></article> : <div className="wb-empty"><Workflow size={27} /><p>{replay.phase ? t("Analyzing the task…", "正在执行分析任务…") : t("Waiting for an analysis task", "等待分析任务")}</p></div>}
        </div>
        {completed > 0 && <div className="wb-evidence-buttons" aria-label={t("Collected evidence", "已展示的证据")}>{item.records.slice(0, completed).map((record, index) => <button key={record.id} type="button" onClick={() => setSelectedEvidence(index)}><span>{record.id}</span>{record.title[language]}<ArrowUpRight size={13} /></button>)}</div>}
      </section>
      {selectedEvidence !== null && <EvidenceReader key={item.id} item={item} index={selectedEvidence} available={completed} language={language} onSelect={setSelectedEvidence} onClose={() => setSelectedEvidence(null)} />}
    </section>
  );
}

function EvidenceReader({ item, index, available, language, onSelect, onClose }: { item: WorkspaceCase; index: number; available: number; language: DemoLanguage; onSelect: (index: number) => void; onClose: () => void }) {
  const t = (en: string, zh: string) => language === "en" ? en : zh;
  const dialog = useRef<HTMLDivElement>(null);
  const [artifactIndex, setArtifactIndex] = useState(0);
  const record = item.records[index];
  const selectedImage = record.images[artifactIndex];
  const json = evidenceJson(item, record, language);

  useEffect(() => setArtifactIndex(0), [index]);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") { event.preventDefault(); onClose(); }
    if (event.key === "Tab") {
      const elements = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]') || []);
      const first = elements[0]; const last = elements[elements.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }

  return <div className="wb-modal-layer">
    <button type="button" className="wb-scrim" aria-label={t("Close evidence workspace", "关闭证据工作区")} onClick={onClose} tabIndex={-1} />
    <div className="wb-evidence-reader wb-glass" role="dialog" aria-modal="true" aria-labelledby="evidence-reader-title" ref={dialog} tabIndex={-1} onKeyDown={handleKeyDown}>
      <header className="wb-reader-heading"><div><span><ShieldCheck size={12} />{t("EVIDENCE WORKSPACE", "可核查工具证据")}</span><h2 id="evidence-reader-title">{t("Evidence workspace", "证据工作区")}</h2></div><div className="wb-reader-controls"><button type="button" className="wb-icon-button" aria-label={t("Previous evidence", "上一条证据")} disabled={index === 0} onClick={() => onSelect(index - 1)}><ChevronLeft size={15} /></button><span>{index + 1} / {available}</span><button type="button" className="wb-icon-button" aria-label={t("Next evidence", "下一条证据")} disabled={index + 1 >= available} onClick={() => onSelect(index + 1)}><ChevronRight size={15} /></button><button type="button" className="wb-icon-button" aria-label={t("Close evidence", "关闭证据")} onClick={onClose}><X size={17} /></button></div></header>
      <div className="wb-reader-layout"><nav className="wb-evidence-rail" aria-label={t("Evidence chain", "证据链")}><div><strong>{t("Evidence chain", "证据链")}</strong><span>{t(`${available} records`, `${available} 条记录`)}</span></div>{item.records.slice(0, available).map((entry, entryIndex) => <button type="button" key={entry.id} aria-current={entryIndex === index ? "true" : undefined} onClick={() => onSelect(entryIndex)} className={entryIndex === index ? "selected" : ""}><span>{entry.id}</span><strong>{entry.title[language]}</strong><p>{entry.observation[language]}</p></button>)}</nav>
      <section className="wb-evidence-content"><div className="wb-record-title"><span>{record.id}</span><h3>{record.title[language]}</h3><code>{record.tool}</code></div><p className="wb-observation"><EmphasizedText text={record.observation[language]} emphasis={item.emphasis} language={language} /></p><dl className="wb-facts">{record.facts.map(fact => <div key={fact.label.en}><dt>{fact.label[language]}</dt><dd><EmphasizedText text={fact.value[language]} emphasis={item.emphasis} language={language} /></dd></div>)}</dl><h4>{t("Evidence artifacts", "证据产物")}</h4><div className="wb-artifact-tabs" role="group" aria-label={t("Choose evidence artifact", "选择证据产物")}>{record.images.map((image, imageIndex) => <button key={image.path} type="button" aria-pressed={artifactIndex === imageIndex} className={artifactIndex === imageIndex ? "selected" : ""} onClick={() => setArtifactIndex(imageIndex)}><ImageIcon size={13} />{image.label[language]}</button>)}<button type="button" aria-pressed={artifactIndex >= record.images.length} className={artifactIndex >= record.images.length ? "selected" : ""} onClick={() => setArtifactIndex(record.images.length)}><FileJson size={13} />{t("Result JSON", "结果 JSON")}</button></div>
      {selectedImage ? <figure className="wb-artifact"><figcaption><strong>{selectedImage.label[language]}</strong><a href={asset(selectedImage.path)} target="_blank" rel="noreferrer">{t("Open", "打开")}<ArrowUpRight size={13} /></a></figcaption><img src={asset(selectedImage.path)} alt={selectedImage.label[language]} /></figure> : <div className="wb-artifact wb-json"><div className="wb-artifact-heading"><strong>{t("Tool result summary", "工具结果摘要")}</strong><a href={`data:application/json;charset=utf-8,${encodeURIComponent(json)}`} download={`${item.id}-${record.id}.json`}>{t("Download JSON", "下载 JSON")}<ArrowUpRight size={13} /></a></div><pre>{json}</pre></div>}
      </section></div>
    </div>
  </div>;
}

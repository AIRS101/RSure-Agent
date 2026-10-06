export const paper = {
  "title": "RSure-Agent: Reliable Use of Tool Observations for Remote Sensing Agents",
  "arxivUrl": "https://arxiv.org/abs/2610.04836",
  "pdfUrl": "https://arxiv.org/pdf/2610.04836",
  "authors": [
    "Fuyuan Liu",
    "Nayu Liu",
    "Wenhao Yu",
    "Peijin Wang",
    "Yingchao Feng",
    "Fanglong Yao",
    "Liang Wan",
    "Wei Feng"
  ],
  "abstract": {
    "en": "Remote sensing agents rely on perception, measurement, and raster analysis tools to solve Earth observation tasks. We refer to their judgments and quantitative results about ground objects as tool observations. However, these observations are subject to substantial uncertainty and may be incorrect even when the tools execute successfully. When agents accept incorrect observations, the errors can propagate through subsequent reasoning and cause task failure. We analyze 1,229 execution trajectories across three remote sensing agent benchmarks. On each benchmark, at least 88.1% of tasks depend on tool observations. Among these tasks, at least 22.7% contain incorrect observations despite successful tool execution. These errors propagate to the final answer in at least 82.0% of affected tasks on each benchmark. To address this problem, we propose RSure-Agent, a framework for verifying tool observations and limiting error propagation. We introduce a verifiable observation protocol that requires tools to return process evidence for the agent to verify their observations. We also construct a task-tool reliability prior from offline task feedback. The prior summarizes each tool configuration's past performance across task types and provides a task-specific reference for verification. Using process evidence and this prior, RSure-Agent decides whether to accept an observation, request additional evidence, or reject it. We evaluate RSure-Agent on EarthBench, ThinkGeo, TerraLogic, and CHOICE-420. Across the three agent benchmarks, RSure-Agent reduces the error propagation rate by 21.3 to 25.9 percentage points relative to the base configuration with verification and the prior disabled. On CHOICE-420, it improves overall accuracy over direct answering by 5.71 percentage points on average across 11 backbone models. On EarthBench, it reduces the tool-call ratio by 25.9% relative to Earth-Agent.",
    "zh": "遥感智能体依赖感知、量测和栅格分析工具完成对地观测任务。本文将这些工具返回的地物判断与量化结果称为工具观测。然而，工具正常执行并不保证观测正确。智能体一旦采纳错误观测，错误便可能在后续推理中传播，导致任务失败。我们分析三个遥感智能体基准上的 1,229 条执行轨迹，发现各基准中至少 88.1% 的任务依赖工具观测。在这些任务中，至少 22.7% 出现工具正常执行但观测错误的情况。在含错误观测的任务中，错误传播至最终答案的比例均不低于 82.0%。为此，我们提出 RSure-Agent，通过核验工具观测，抑制错误在后续推理中的传播。我们设计可核验观测协议，要求工具在返回观测的同时提供过程证据，供智能体核验。我们还基于离线任务反馈构建任务工具可靠性先验，统计不同工具配置在各类任务中的历史表现，为当前任务的观测核验提供经验参考。结合过程证据与可靠性先验，RSure-Agent 决定采纳当前观测、请求补充证据或拒绝该观测。我们在 EarthBench、ThinkGeo、TerraLogic 和 CHOICE-420 上评估该框架。与不启用核验和先验的基础配置相比，RSure-Agent 在三个智能体基准上的错误传播率降低 21.3 至 25.9 个百分点。在 CHOICE-420 上，相比直接作答，11 种主干模型的总体准确率平均提高 5.71 个百分点。在 EarthBench 上，工具调用比率相对 Earth-Agent 降低 25.9%。"
  }
} as const;

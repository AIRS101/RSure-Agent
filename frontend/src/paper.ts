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
    "zh": "遥感智能体依赖感知、量测和栅格分析工具来解决地球观测任务。我们将这些工具针对地物给出的判断和定量结果称为工具观测。然而，这些观测存在显著不确定性，即使工具成功执行，也可能出现错误。智能体一旦接受错误观测，错误便可能沿后续推理传播，导致任务失败。我们分析了三个遥感智能体基准上的 1,229 条执行轨迹。在每个基准上，至少 88.1% 的任务依赖工具观测；其中，至少 22.7% 的任务在工具成功执行的情况下仍包含错误观测。这些错误在每个基准中至少 82.0% 的受影响任务里传播到了最终答案。为解决这一问题，我们提出 RSure-Agent，一种用于核验工具观测并限制错误传播的框架。我们设计了可核验观测协议，要求工具返回过程证据，以便智能体核验其观测。我们还基于离线任务反馈构建了任务—工具可靠性先验。该先验总结不同工具配置在各类任务上的历史表现，为核验提供与当前任务相关的参考。结合过程证据和可靠性先验，RSure-Agent 决定接受观测、请求补充证据或拒绝观测。我们在 EarthBench、ThinkGeo、TerraLogic 和 CHOICE-420 上评估了 RSure-Agent。与关闭核验和先验的基础配置相比，RSure-Agent 在三个智能体基准上将错误传播率降低了 21.3 至 25.9 个百分点。在 CHOICE-420 上，相较于直接作答，11 个骨干模型的总体准确率平均提高了 5.71 个百分点。在 EarthBench 上，相较于 Earth-Agent，工具调用比率降低了 25.9%。"
  }
} as const;

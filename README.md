<h1 align="center">RSure-Agent</h1>

<p align="center">
  <strong>Reliable Use of Tool Observations for Remote Sensing Agents</strong>
</p>

<p align="center">
  <strong>English</strong> &nbsp;|&nbsp; <a href="README_zh.md">中文</a>
</p>

<p align="center">
  <a href="https://arxiv.org/abs/2610.04836"><img src="https://img.shields.io/badge/arXiv-2610.04836-b31b1b" alt="arXiv: 2610.04836" /></a>
  &nbsp;
  <a href="https://github.com/AIRS101/RSure-Agent"><img src="https://img.shields.io/badge/GitHub-RSure--Agent-315ecc?logo=github&amp;logoColor=white" alt="GitHub repository" /></a>
  &nbsp;
  <a href="https://airs101.github.io/RSure-Agent/"><img src="https://img.shields.io/badge/Website-Project_Page-315ecc" alt="Project website" /></a>
  &nbsp;
  <a href="https://airs101.github.io/RSure-Agent/demo/"><img src="https://img.shields.io/badge/Demo-Videos-315ecc" alt="Demo videos" /></a>
</p>

<p align="center">
  <a href="https://airs101.github.io/RSure-Agent/"><img src="assets/readme/website-en.svg" alt="Open project website" width="211" height="48" /></a>
  &nbsp;
  <a href="https://airs101.github.io/RSure-Agent/demo/"><img src="assets/readme/demos-en.svg" alt="Watch demo videos" width="182" height="48" /></a>
</p>

<p align="center">
  RSure-Agent is a remote sensing agent that verifies tool observations to reduce error propagation in subsequent reasoning.
</p>

<p align="center">
  <a href="https://arxiv.org/pdf/2610.04836#page=1"><img src="frontend/public/paper/overview.png" alt="Illustration of RSure-Agent from Figure 1 of the paper" width="900" /></a>
</p>

<p align="center"><em>Figure 1. RSure-Agent verifies tool observations before using them in subsequent reasoning.</em></p>

## Release Plan

RSure-Agent materials will be released in stages. Release progress will be updated in this repository.

- [x] Publish the project website and English and Chinese READMEs.
- [x] Publish English and Chinese demo videos and compilations for change detection, object identification, and scale-based distance measurement.
- [x] Add paper information, a paper overview figure, and citation information.
- [ ] Release the RSure-Agent core code, including tool-calling and observation-verification modules.
- [ ] Provide environment setup, installation instructions, and guides for running example cases.
- [ ] Release evaluation scripts, experiment configurations, and reproduction documentation.

## Demo Video

<p align="center">
  <a href="https://github.com/AIRS101/RSure-Agent/blob/main/demo-videos/rsure-agent-demo-combined.mp4"><img src="demo-videos/rsure-agent-demo-preview.gif" alt="Animated preview of three RSure-Agent cases" width="900" /></a>
</p>

<p align="center">
  <strong><a href="https://github.com/AIRS101/RSure-Agent/blob/main/demo-videos/rsure-agent-demo-combined.mp4">Watch the full demo (~63 seconds)</a></strong>
</p>

<p align="center">
  The animated preview shows highlights from the three cases. Click it to open the complete MP4 video.
</p>

| Scenario | Demonstration |
| --- | --- |
| [Land-cover change analysis](demo-videos/rsure-agent-demo-change-detection.mp4) | Segmentation overlays and quantitative evidence from two time points. |
| [Object identification and detection](demo-videos/rsure-agent-demo-object-detection.mp4) | Visual recognition and detection evidence for a storage tank. |
| [Scale-based distance measurement](demo-videos/rsure-agent-demo-scale-measurement.mp4) | Map-scale and measurement evidence for the distance between A and B. |

## Paper

**[RSure-Agent: Reliable Use of Tool Observations for Remote Sensing Agents](https://arxiv.org/abs/2610.04836)**

Authors: Fuyuan Liu, Nayu Liu, Wenhao Yu, Peijin Wang, Yingchao Feng, Fanglong Yao, Liang Wan, Wei Feng.

[arXiv](https://arxiv.org/abs/2610.04836) · [PDF](https://arxiv.org/pdf/2610.04836) · [BibTeX](CITATION.bib)

### Abstract

Remote sensing agents rely on perception, measurement, and raster analysis tools to solve Earth observation tasks. We refer to their judgments and quantitative results about ground objects as tool observations. However, these observations are subject to substantial uncertainty and may be incorrect even when the tools execute successfully. When agents accept incorrect observations, the errors can propagate through subsequent reasoning and cause task failure. We analyze 1,229 execution trajectories across three remote sensing agent benchmarks. On each benchmark, at least 88.1% of tasks depend on tool observations. Among these tasks, at least 22.7% contain incorrect observations despite successful tool execution. These errors propagate to the final answer in at least 82.0% of affected tasks on each benchmark. To address this problem, we propose RSure-Agent, a framework for verifying tool observations and limiting error propagation. We introduce a verifiable observation protocol that requires tools to return process evidence for the agent to verify their observations. We also construct a task-tool reliability prior from offline task feedback. The prior summarizes each tool configuration's past performance across task types and provides a task-specific reference for verification. Using process evidence and this prior, RSure-Agent decides whether to accept an observation, request additional evidence, or reject it. We evaluate RSure-Agent on EarthBench, ThinkGeo, TerraLogic, and CHOICE-420. Across the three agent benchmarks, RSure-Agent reduces the error propagation rate by 21.3 to 25.9 percentage points relative to the base configuration with verification and the prior disabled. On CHOICE-420, it improves overall accuracy over direct answering by 5.71 percentage points on average across 11 backbone models. On EarthBench, it reduces the tool-call ratio by 25.9% relative to Earth-Agent.

### Citation

Please cite the paper if you use or build upon this work.

```bibtex
@misc{liu2026rsureagentreliableusetool,
  title={RSure-Agent: Reliable Use of Tool Observations for Remote Sensing Agents},
  author={Fuyuan Liu and Nayu Liu and Wenhao Yu and Peijin Wang and Yingchao Feng and Fanglong Yao and Liang Wan and Wei Feng},
  year={2026},
  eprint={2610.04836},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2610.04836},
}
```

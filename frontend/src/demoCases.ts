export type DemoLanguage = "en" | "zh";
export type DemoText = Record<DemoLanguage, string>;

export type DemoEvidence = {
  id: string;
  tool: string;
  title: DemoText;
  purpose: DemoText;
  observation: DemoText;
  facts: { label: DemoText; value: DemoText }[];
  images: { path: string; label: DemoText }[];
  data: Record<string, unknown>;
};

export type WorkspaceCase = {
  id: string;
  image: string;
  title: DemoText;
  question: DemoText;
  conclusion: DemoText;
  analysis: { text: DemoText; evidence: string }[];
  records: DemoEvidence[];
};

const text = (en: string, zh: string): DemoText => ({ en, zh });
const source = (path: string, en: string, zh: string) => ({ path, label: text(en, zh) });

// Results retained from the published case replays; this is not a live tool run.
export const workspaceCases: WorkspaceCase[] = [
  {
    id: "000362",
    image: "demo/000362.png",
    title: text("Land-cover change", "土地覆盖变化检测"),
    question: text("Compare the two remote-sensing images, describe the main land-cover change, and provide quantitative evidence.", "请比较左右两个时相的遥感影像，说明主要土地覆盖变化，并给出可量化依据。"),
    conclusion: text("The clearest change is a substantial expansion of built-up area.", "左右两个时相之间最显著的变化是建筑用地显著增加。"),
    analysis: [
      { text: text("The before and after segmentation overlays show the change in land-cover regions.", "前后时相的土地覆盖分割叠加图展示了地物区域的变化。"), evidence: "E002" },
      { text: text("The building share rose from 1.01% to 70.09%, an increase of approximately 69.07 percentage points. The background share fell from 63.86% to 0.74%.", "建筑类占比从 1.01% 增至 70.09%，增加约 69.07 个百分点；背景类占比从 63.86% 降至 0.74%。"), evidence: "E003" }
    ],
    records: [
      {
        id: "E001", tool: "rs_intent_router", title: text("Task routing", "任务路由"),
        purpose: text("Identify the task and select the change-analysis tool chain.", "识别任务类型，选择变化分析工具链。"),
        observation: text("An open land-cover change task requiring two-time-point comparison and class-share measurements.", "识别为开放式土地覆盖变化检测任务，需要对比两个时相并量化类别变化。"),
        facts: [{ label: text("Task", "任务类型"), value: text("Land-cover change", "土地覆盖变化检测") }, { label: text("Inputs", "输入"), value: text("Two time points", "两个时相") }],
        images: [], data: { task_type: "land_cover_change", time_points: ["before", "after"], selected_tools: ["rs_change_pair_segment", "rs_landcover_change_quantifier"] }
      },
      {
        id: "E002", tool: "rs_change_pair_segment", title: text("Change segmentation", "变化分割"),
        purpose: text("Separate the paired image into before and after views and segment land cover in both.", "将左右两个时相拆分为前时相和后时相，分别生成土地覆盖语义分割结果。"),
        observation: text("Before and after land-cover segmentation overlays are available for inspection.", "已生成前、后时相土地覆盖分割叠加图，可分别查看。"),
        facts: [{ label: text("Operation", "操作"), value: text("Paired-image segmentation", "双时相分割") }, { label: text("Outputs", "输出"), value: text("Before / after overlays", "前、后时相分割叠加图") }],
        images: [source("demo/evidence/000362_before_seg.png", "Before segmentation", "前时相分割"), source("demo/evidence/000362_after_seg.png", "After segmentation", "后时相分割")],
        data: { operation: "paired_land_cover_segmentation", outputs: ["000362_before_seg.png", "000362_after_seg.png"] }
      },
      {
        id: "E003", tool: "rs_landcover_change_quantifier", title: text("Change quantification", "变化量化"),
        purpose: text("Compare class shares in the two segmentation results and calculate their changes.", "比较两个时相分割结果中的类别占比，计算变化量。"),
        observation: text("Building share: 1.01% → 70.09%; background share: 63.86% → 0.74%.", "建筑类占比从 1.01% 增至 70.09%；背景类占比从 63.86% 降至 0.74%。"),
        facts: [{ label: text("Building · before", "建筑类 · 前时相"), value: text("1.01%", "1.01%") }, { label: text("Building · after", "建筑类 · 后时相"), value: text("70.09%", "70.09%") }, { label: text("Building · change", "建筑类 · 变化"), value: text("+69.07 percentage points", "+69.07 个百分点") }, { label: text("Background", "背景类"), value: text("63.86% → 0.74%", "63.86% → 0.74%") }],
        images: [], data: { building: { before_fraction: 0.010146, after_fraction: 0.700886, change_percentage_points: 69.074 }, background: { before_percent: 63.86, after_percent: 0.74 } }
      }
    ]
  },
  {
    id: "000885", image: "demo/000885.png", title: text("Object identification", "目标识别与检测"),
    question: text("Identify the object inside the red box and explain the visual evidence supporting the answer.", "请判断遥感图像红色框中的目标是什么，并说明主要视觉依据。"),
    conclusion: text("The object inside the red box is a storage tank.", "红色框内目标是储罐。"),
    analysis: [
      { text: text("The target has a regular circular outline and sits within an industrial-facility setting, consistent with a storage tank.", "红框内目标呈规则的圆形工业构筑物外观，其轮廓和周边设施场景符合储罐特征。"), evidence: "E002" },
      { text: text("The detection overlay labels the same target as a storage tank. Inspect the box and its position on the source image.", "检测叠加图在相同位置标出储罐，可对照原始影像核查目标框及其位置。"), evidence: "E003" }
    ],
    records: [
      {
        id: "E001", tool: "rs_intent_router", title: text("Task routing", "任务路由"),
        purpose: text("Identify the target-recognition task and select visual inspection and object detection.", "识别目标识别任务，选择视觉问答与目标检测工具。"),
        observation: text("Visual inspection and object detection are selected to cross-check the red-box target.", "识别为开放式遥感目标识别任务，采用视觉观察与目标检测交叉核查。"),
        facts: [{ label: text("Task", "任务类型"), value: text("Object identification", "目标识别") }, { label: text("Region", "关注区域"), value: text("Red-box target", "红框内目标") }],
        images: [], data: { task_type: "object_identification", region: "red_box", selected_tools: ["rs_vlm_qa", "rs_object_detect"] }
      },
      {
        id: "E002", tool: "rs_vlm_qa", title: text("Visual question answering", "视觉问答"),
        purpose: text("Inspect the target's shape and surrounding context in the source image.", "观察原图中目标的形态和周边场景，给出判断依据。"),
        observation: text("The target has a large circular industrial structure with characteristics consistent with a storage tank.", "红框内目标具有大型圆形工业设施外观，形态和场景均符合储罐特征。"),
        facts: [{ label: text("Observation", "地物判断"), value: text("Storage tank", "储罐") }, { label: text("Visual basis", "视觉依据"), value: text("Circular outline; industrial setting", "圆形轮廓、工业设施场景") }],
        images: [source("demo/000885.png", "Source image", "原始影像")], data: { object: "storage tank", visual_evidence: ["circular outline", "industrial setting"] }
      },
      {
        id: "E003", tool: "rs_object_detect", title: text("Object detection", "目标检测"),
        purpose: text("Locate objects in the image and return a labeled detection overlay.", "检测影像中的目标位置与类别，返回带目标框的叠加图。"),
        observation: text("The detection overlay identifies a storage tank inside the red box.", "检测叠加图在红框内标出了 storage tank（储罐）。"),
        facts: [{ label: text("Target class", "目标类别"), value: text("Storage tank", "储罐") }, { label: text("Output", "输出"), value: text("Detection overlay", "检测叠加图") }],
        images: [source("demo/evidence/000885_detection.png", "Detection overlay", "检测叠加图"), source("demo/000885.png", "Source image", "原始影像")],
        data: { target_class: "storage tank", target_region: "red_box", output: "000885_detection.png" }
      }
    ]
  },
  {
    id: "000925", image: "demo/000925.png", title: text("Scale-based distance", "比例尺测距"),
    question: text("Estimate the actual distance between A and B using the map scale and explain the measurement evidence.", "请根据图中比例尺估算 A、B 两点间的实际距离，并说明量测依据。"),
    conclusion: text("The distance between A and B is approximately 280.2 m.", "A、B 两点间的实际距离约为 280.2 m。"),
    analysis: [
      { text: text("OCR and layout parsing locate A, B, and the 50 m scale bar in the map.", "OCR 与版面识别定位 A、B 两点和图中的 50 m 比例尺。"), evidence: "E002" },
      { text: text("The scale measurement result is 280.214 m. The overlay shows the point locations and scale used for the calculation.", "比例尺量测结果为 280.214 m，量测叠加图展示了计算所依据的点位与比例尺。"), evidence: "E003" }
    ],
    records: [
      {
        id: "E001", tool: "rs_intent_router", title: text("Task routing", "任务路由"),
        purpose: text("Identify the distance-measurement task and choose layout parsing and scale measurement.", "识别距离量测任务，选择版面识别与比例尺量测工具。"),
        observation: text("This is an open map-scale distance task between points A and B.", "识别为开放式地图比例尺距离量测任务，需要定位 A、B 两点与比例尺。"),
        facts: [{ label: text("Task", "任务类型"), value: text("Distance measurement", "距离量测") }, { label: text("Points", "量测点位"), value: text("A → B", "A → B") }],
        images: [], data: { task_type: "scale_distance", selected_tools: ["rs_vlm_ocr_layout", "rs_scale_bar_distance"] }
      },
      {
        id: "E002", tool: "rs_vlm_ocr_layout", title: text("Layout recognition", "版面识别"),
        purpose: text("Read map labels and locate the points and the scale bar.", "识别地图标注，定位点位和比例尺信息。"),
        observation: text("Points A and B and the 50 m scale bar are located.", "已定位 A、B 两点与 50 m 比例尺，为后续量测提供位置依据。"),
        facts: [{ label: text("Point A (px)", "A 点像素"), value: text("278, 340", "278, 340") }, { label: text("Point B (px)", "B 点像素"), value: text("1320, 228", "1320, 228") }, { label: text("Scale", "比例尺"), value: text("50 m", "50 m") }],
        images: [source("demo/000925.png", "Source map", "原始地图")], data: { point_a_px: [278, 340], point_b_px: [1320, 228], scale_value: 50, scale_unit: "m" }
      },
      {
        id: "E003", tool: "rs_scale_bar_distance", title: text("Scale measurement", "比例尺量测"),
        purpose: text("Convert the point-to-point pixel distance to physical distance using the scale bar.", "根据比例尺与点位像素几何，将像素距离换算为实际距离。"),
        observation: text("The scale-based distance between A and B is approximately 280.214 m.", "基于比例尺像素几何测得 A、B 两点间实际距离约 280.214 m。"),
        facts: [{ label: text("Actual distance", "实际距离"), value: text("280.214 m", "280.214 m") }, { label: text("Scale", "比例尺"), value: text("50 m / 187 px", "50 m / 187 px") }, { label: text("Scale endpoints (px)", "比例尺端点像素"), value: text("1169, 895 → 1356, 895", "1169, 895 → 1356, 895") }],
        images: [source("demo/evidence/000925_scale.png", "Measurement overlay", "比例尺量测叠加图"), source("demo/000925.png", "Source map", "原始地图")],
        data: { distance: 280.214, distance_unit: "m", point_a_px: [278, 340], point_b_px: [1320, 228], scale_value: 50, scale_unit: "m", scale_bar_pixels: 187, scale_endpoints_px: [[1169, 895], [1356, 895]] }
      }
    ]
  }
];

---
title: 'Autonomous Data Mining: Multi-Modal Quantum Schematic Extraction'
titleDe: 'Autonomes Data Mining: Multimodale Extraktion von Quantenschaltplänen'
summary: 'End-to-end Python pipeline that extracts and validates 250 quantum circuit schematics from 660+ arXiv papers using yolov8m-doclaynet and 4-bit quantized Qwen2-VL-7B on an 8 GB VRAM GPU.'
summaryDe: 'End-to-End-Python-Pipeline zur autonomen Extraktion und Validierung von 250 Quantenschaltplänen aus über 660 arXiv-Papern mit yolov8m-doclaynet und 4-Bit-quantisiertem Qwen2-VL-7B auf 8 GB VRAM.'
period: 'Dec 2025'
periodDe: 'Dez. 2025'
role: 'AI Engineer'
roleDe: 'AI Engineer'
status: 'Completed'
metrics: '250 validated circuits from 660+ arXiv papers · 88% detection precision · 75% VRAM reduction'
metricsDe: '250 validierte Schaltpläne aus 660+ arXiv-Papern · 88 % Erkennungspräzision · 75 % VRAM-Reduktion'
tags: ['YOLOv8', 'Qwen2-VL-7B', 'NF4 Quantization', 'CoT Prompting', 'Python', 'Computer Vision']
featured: true
order: 3
---

## End-to-End Pipeline Engineering

Built an autonomous Python data-mining pipeline to extract, filter, and validate a high-quality dataset of **250 quantum circuit schematics** from **660+ arXiv research papers** without relying on external paid vision APIs.

## Key Engineering Components

- **Layout-Invariant Detection (`yolov8m-doclaynet`):** Integrated `yolov8m-doclaynet` to isolate technical circuit diagrams from complex single- and multi-column academic PDF layouts, achieving **88% precision** in circuit identification.
- **Low-VRAM Local Deployment:** Deployed **Qwen2-VL-7B** locally on **8 GB VRAM hardware (RTX 2080)** using **4-bit NormalFloat (NF4) quantization**, cutting memory overhead by **75%** while preserving complex visual reasoning accuracy.
- **VLM Orchestration with Chain-of-Thought (CoT):** Designed a structured Chain-of-Thought prompting pipeline for Qwen2-VL-7B to autonomously identify and normalize quantum gates alongside their surrounding algorithmic context.

## Key Takeaways

- Decoupling layout localization (`yolov8m-doclaynet`) from multimodal semantic parsing (`Qwen2-VL-7B`) cuts visual token cost and eliminates distractions from dense surrounding paper text.
- Combining 4-bit NF4 quantization with structured CoT validation turns commodity 8 GB GPUs into viable local dataset-curation engines.

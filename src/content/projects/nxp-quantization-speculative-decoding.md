---
title: 'Quantization & Speculative Decoding Synergies for Edge AI'
titleDe: 'Synergien von Quantisierung und Speculative Decoding für Edge AI'
summary: 'Master’s thesis at NXP Semiconductors investigating the interaction between low-bit quantization and EAGLE-3 speculative decoding for small LLMs (Qwen3-1.7B, Llama-3.2-1B) on CPU / ONNX Runtime.'
summaryDe: 'Masterarbeit bei NXP Semiconductors zum Zusammenspiel von Niedrigbit-Quantisierung und EAGLE-3 Speculative Decoding für kompakte LLMs (Qwen3-1.7B, Llama-3.2-1B) auf CPU / ONNX Runtime.'
period: 'May 2026 – Nov 2026'
periodDe: 'Mai 2026 – Nov. 2026'
role: 'Master’s Thesis · NXP Semiconductors'
roleDe: 'Masterarbeit · NXP Semiconductors'
status: 'Research'
metrics: 'Up to 6.6× end-to-end CPU throughput over FP32; 1-bit QAT draft matches FP32 acceptance rate'
metricsDe: 'Bis zu 6,6× End-to-End-CPU-Durchsatz gegenüber FP32; 1-Bit-QAT-Draft erreicht FP32-Akzeptanzrate'
tags: ['Quantization (QAT / GPTQ / RTN)', 'EAGLE-3', 'ONNX Runtime', 'vLLM Speculators', 'Olive', 'Edge AI']
featured: true
order: 1
---

## Research Scope

Edge deployment of small Large Language Models (**Qwen3-1.7B**, **Llama-3.2-1B**) requires combining compression techniques without letting them cancel each other out. In my Master’s thesis at **NXP Semiconductors**, I systematically studied how **quantization** and **speculative decoding (EAGLE-3)** interact on **ONNX Runtime** by quantizing the target model (FP32 down to 2-bit) and draft model (FP32 down to 1-bit) independently across a full precision matrix.

## Quantization-Aware Training (QAT) for EAGLE-3 Drafts

Post-training quantization (PTQ) severely degrades lightweight draft models—causing up to an **80% drop in token acceptance rate** at aggressive bit-widths.

To solve this, I extended the **vLLM Speculators** framework with **Quantization-Aware Training (QAT)** using fake quantization and the Straight-Through Estimator (STE):

$$
\frac{\partial \mathcal{L}}{\partial w} \approx \frac{\partial \mathcal{L}}{\partial \hat{w}}, \quad \hat{w} = s \cdot \operatorname{clip}\left(\operatorname{round}\left(\frac{w}{s}\right), q_{\min}, q_{\max}\right)
$$

Training EAGLE-3 drafts with QAT down to **1-bit** recovered the acceptance rate of full-precision FP32 draft models.

## Edge Inference Optimization

- **Model Quantization via Olive:** Quantized models to **W8A8** and **W4A8** using RTN and GPTQ pipelines in Microsoft Olive for ONNX Runtime execution.
- **Draft LM Head Pruning:** Pruned the draft model’s vocabulary projection head from **128k to 32k tokens**, cutting per-step drafting overhead significantly.
- **Throughput Gains:** Turned an initial speculative slowdown on quantized targets into a **1.10–1.33× speed-up**, reaching **up to 6.6× end-to-end throughput over FP32 on CPU**.

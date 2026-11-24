---
title: 'Master Thesis Notes: Quantization & Speculative Decoding (EAGLE-3) for Edge AI'
titleDe: 'Notizen zur Masterarbeit: Quantisierung & Speculative Decoding (EAGLE-3) für Edge AI'
description: 'Core concepts from my Master’s thesis at NXP Semiconductors on combining low-bit quantization (RTN, GPTQ, QAT) with EAGLE-3 speculative decoding on ONNX Runtime.'
descriptionDe: 'Kernkonzepte meiner Masterarbeit bei NXP Semiconductors zur Kombination von Niedrigbit-Quantisierung (RTN, GPTQ, QAT) und EAGLE-3 Speculative Decoding auf ONNX Runtime.'
pubDate: 2026-11-24
category: 'Master Thesis'
tags: ['Quantization', 'Speculative Decoding', 'EAGLE-3', 'QAT', 'ONNX Runtime']
featured: true
---

> **Editable Notes Template:** Expand or duplicate this file in `src/content/blog/` to turn your Master’s thesis chapters into a public knowledge-summary series.

## 1. Why Study Quantization + Speculative Decoding Together?

Both **quantization** and **speculative decoding** speed up LLM inference, yet combining them naively on edge CPUs can actually slow down generation. When a target model is quantized (e.g., W4A8 or W8A8), its memory bottleneck shrinks—meaning any overhead from the draft model or drop in token acceptance rate hurts net throughput immediately.

In my thesis at **NXP Semiconductors**, I evaluated **Qwen3-1.7B** and **Llama-3.2-1B** paired with **EAGLE-3** drafts across an independent target (FP32 → 2-bit) and draft (FP32 → 1-bit) precision matrix on **ONNX Runtime**.

## 2. Quantization-Aware Training (QAT) with Straight-Through Estimator

Post-training quantization (PTQ) on compact draft heads can lose up to **80%** of baseline acceptance rate at ultra-low bit-widths. By introducing fake quantization during training with the Straight-Through Estimator (STE), gradients flow cleanly through the non-differentiable rounding operator:

$$
\hat{w} = s \cdot \operatorname{clip}\left(\operatorname{round}\left(\frac{w}{s}\right), q_{\min}, q_{\max}\right), \qquad \frac{\partial \mathcal{L}}{\partial w} \approx \frac{\partial \mathcal{L}}{\partial \hat{w}}
$$

Below is a minimal PyTorch illustration of symmetric fake quantization using the STE trick:

```python
import torch

def fake_quantize_ste(w: torch.Tensor, num_bits: int = 4) -> torch.Tensor:
    """Symmetric per-tensor fake quantization using the Straight-Through Estimator."""
    qmax = (1 << (num_bits - 1)) - 1
    scale = w.abs().amax().clamp(min=1e-8) / qmax
    w_q = torch.clamp(torch.round(w / scale), -qmax, qmax) * scale
    return w + (w_q - w).detach()
```

## 3. Key System-Level Findings

| Optimization Step | Target Effect | Observed Outcome |
| :--- | :--- | :--- |
| PTQ on EAGLE-3 Draft | Fast offline compression | Up to 80% acceptance rate drop at extreme low bits |
| QAT via vLLM Speculators | Train draft down to 1-bit | Recovers FP32 draft acceptance rate |
| Olive W8A8 / W4A8 + LM Head Pruning (128k → 32k) | Cut CPU drafting overhead | 1.10–1.33× speed-up on quantized targets; up to 6.6× vs. FP32 CPU |

## Next Posts in This Series

- Deep dive into extending **vLLM Speculators** with QAT modules.
- Profiling **ONNX Runtime** CPU bottlenecks and LM-head vocabulary pruning.

---
title: 'Industrial ML: Regime Segmentation & Automated Rule Extraction'
titleDe: 'Industrielles ML: Regime-Segmentierung & Automatisierte Regelextraktion'
summary: 'Mixture-of-Experts (MoE) framework with XGBClassifier gating, shallow decision-tree regime discovery, and local linear regressors on a 10,000-sample, 273-feature industrial dataset requiring 16-decimal-place target precision.'
summaryDe: 'Mixture-of-Experts-(MoE)-Framework mit XGBClassifier-Gating, flachen Entscheidungsbäumen zur Regime-Erkennung und lokalen linearen Regressoren auf 10.000 Samples × 273 Features mit 16 Nachkommastellen Zielpräzision.'
period: 'Jan 2026'
periodDe: 'Jan. 2026'
role: 'ML Engineer'
roleDe: 'ML Engineer'
status: 'Completed'
metrics: 'Test R² = 0.944 across operating regimes with interpretable local linear rules'
metricsDe: 'Test-R² = 0,944 über Betriebsregime hinweg mit interpretierbaren lokalen linearen Regeln'
tags: ['Mixture-of-Experts', 'XGBoost', 'Scikit-learn', 'Python', 'Rule Extraction']
featured: true
order: 2
---

## Dataset & Precision Requirements

Trained on a high-dimensional industrial sensor dataset consisting of **10,000 samples and 273 features**, with a continuous target requiring **16-decimal-place precision**. Because physical equipment switches across distinct operating regimes, a single global regressor struggled at regime transitions and failed to yield interpretable rules.

## Architecture & Logic Mining

I designed a hybrid **Mixture-of-Experts (MoE)** and rule-extraction pipeline:

1. **Gating Network (`XGBClassifier`):** Routes each high-dimensional sensor observation $x \in \mathbb{R}^{273}$ to its corresponding specialized regressor expert.
2. **Regime Identification (Shallow Decision Trees):** Uses depth-constrained decision-tree regressors to partition the input space into interpretable operational regimes.
3. **Local Linear Regressors:** Fits localized linear models inside each regime to extract explicit feature–target relationships for domain engineers.

$$
\hat{y}(x) = \sum_{k=1}^{K} g_k(x) \cdot f_k(x)
$$

## Key Results

- Achieved a final test **$R^2 = 0.944$**, demonstrating strong predictive reliability for predictive maintenance workflows.
- Produced human-readable operating regime boundaries and linear feature attributions rather than an opaque black-box predictor.

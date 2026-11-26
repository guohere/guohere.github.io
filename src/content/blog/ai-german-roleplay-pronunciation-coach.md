---
title: 'Building an Inline AI German Roleplay & Pronunciation Coach'
titleDe: 'Entwicklung eines KI-gestützten Deutsch-Rollenspiel- & Aussprache-Coaches'
description: 'How I engineered a turn-by-turn German speaking roleplay module in Next.js & TypeScript with resilient browser STT capture, context-disambiguated fuzzy matching, and syllable-stress / vowel-length phonetic coaching.'
descriptionDe: 'Wie ich ein rundenbasiertes Deutsch-Sprechtraining in Next.js & TypeScript entwickelt habe – mit robuster Browser-Spracherkennung, kontextbasiertem Fuzzy-Matching sowie Betonungs- und Vokallängen-Coaching.'
pubDate: 2026-11-26
category: 'Projects'
tags: ['Next.js', 'TypeScript', 'Web Speech API', 'German NLP', 'AI Coaching', 'Evals']
featured: true
---

Reading German dialogues silently from a textbook rarely fixes real-time speaking hesitations. Ahead of my December German B1 exam, I built an inline **AI Roleplay & Pronunciation Coach** (*„KI-Rollenspiel & Aussprache-Check“*) inside my German coaching web app so I can practice realistic turn-by-turn conversations with live word-level alignment and phonetic feedback.

<!--
Demo video embed (uncomment and replace YOUR_YOUTUBE_VIDEO_ID once uploaded):
<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID"
    title="AI German Roleplay & Pronunciation Coach Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
-->

## 1. Inline Turn-by-Turn Workflow

Instead of locking the user inside an isolated modal, the roleplay runs **inline directly inside the dialogue list** so the entire conversation remains visible in flow:

- Active speaker cards smoothly scroll into view and highlight by role (`Du bist dran` on your turn, `KI spricht` on the AI’s turn).
- On AI turns, the app plays natural German TTS (`de-DE-FlorianMultilingualNeural` or `de-DE-SeraphinaMultilingualNeural` at `0.95×` speed) and automatically advances when playback finishes.
- On user turns, live speech recognition highlights matched words inline in real time and advances once the completion gate is satisfied (with a manual *„Gesprochen / Weiter“* button always available).
- After the final turn, collected turn transcripts are evaluated via `POST /api/ai/roleplay-feedback` to generate a word-level pronunciation diagnostic report.

```text
1. Inline Role Selection (handleStartRoleplay)
   └─▶ 2. Decoupled Turn Dispatcher (useEffect on currentTurnIdx)
         ├─▶ AI Turn   : playAiTurn() ─▶ speakGerman() ─▶ advanceTurn()
         └─▶ User Turn : spawnRecognitionInstance()
                           ├─▶ Persistent Voice Collection (merge final + interim across pauses)
                           ├─▶ Two-Pass Context Matcher & Completion Gate (evaluateCompletion)
                           │     ├─▶ Paused or < 80% / not at end ─▶ Respawn fresh STT (120ms)
                           │     └─▶ >= 80% + >= 75% body + final 2 words ─▶ advanceTurn()
                           └─▶ Manual fallback ("Gesprochen / Weiter") ─▶ advanceTurn()
   └─▶ 3. All Turns Complete ─▶ finishAndDiagnose() ─▶ POST /api/ai/roleplay-feedback
```

## 2. Core Engineering Challenges & Solutions

### A. Resilient Continuous Speech Capture Across Pauses

Browser `SpeechRecognition` streams terminate automatically during brief thinking pauses or `no-speech` timeouts, which breaks natural language practice if handled naively.

- **Monotonic Session Guards:** Each capture cycle is tracked via a monotonically increasing `listeningSessionIdRef`. When `onend` fires mid-turn, any captured final and interim speech is merged into `accumulatedPriorTranscriptRef`, and `spawnRecognitionInstance()` spins up a **fresh** `SpeechRecognition` instance `120ms` later without losing earlier words.
- **Ref-Decoupled Turn Lifecycle:** Turn transitions depend solely on turn-level state (`currentTurnIdx`, `hasStarted`, `userSpeaker`) rather than live transcript updates, ensuring React never tears down the microphone while you speak.

### B. Context-Disambiguated German Speech Matching

Naive bag-of-words matching breaks down quickly in real German dialogue:

- Short stopwords (`es`, `die`, `du`) or repeated words (`arbeiten`, `zu`) light up future occurrences prematurely.
- Transient interim browser guesses flash false matches and stay stuck if locked too early.
- Long compound nouns (`Arbeitszeiten`, 13 chars) can falsely match shorter verb stems (`arbeiten`, 8 chars).
- Standalone punctuation like em-dashes (`–`) inflates word counts and traps completion ratios below threshold ($17 / 18 = 94\%$).

**How `evaluateCompletion` & `isSingleSpokenMatch` solve all four:**

1. **Speakable Index Mapping (`speakableIndices`):** Filters out standalone punctuation and dashes before counting or scoring while preserving natural paragraph rendering.
2. **Preceding-Word Context Scoring (`prevContextScore`):** Scores candidate matches against the preceding 1–3 spoken words (`spokenTokens[sIdx - 3 .. sIdx - 1]`) and enforces **1-to-1 token consumption** (`consumedSpokenIdx`), so speaking `"arbeiten"` once never highlights a second `"arbeiten"` later in the turn.
3. **Two-Pass Matching (Sequential + Finalized-Only Recovery):**
   - *Pass 1* walks tokens sequentially with tight lookahead (`+2` words for short tokens $\le 3$ chars, `+5` for longer words).
   - *Pass 2* recovers out-of-order content words ($\ge 5$ chars) *only* from finalized (`isFinal`) transcripts with matching preceding context, preventing noisy interim ghosts.
4. **German Phonetic & Length-Guarded Matching:** Normalizes umlauts and eszett (`ä/ö/ü/ß`), maps spoken digits to words (`2` ↔ `zwei`, `3 mal` ↔ `dreimal`), merges split compounds (`vor genommen` ↔ `vorgenommen`), and pairs Levenshtein edit distance with strict stem-length tolerances ($\le 3$ chars difference).
5. **Body + Tail Completion Gate:** Auto-advance waits until you genuinely finish the turn—requiring $\ge 80\%$ total words matched, $\ge 75\%$ of the body matched, **and** at least one of the final 2 words spoken.

### C. Phonetic Stress & Vowel-Length Coaching

Instead of generic "try again" prompts, `src/lib/german-phonetics.ts` (`analyzeGermanWordPhonetics` and `buildStressPattern`) pairs with `/api/ai/roleplay-feedback` and `/api/ai/pronunciation-check` to deliver targeted German pronunciation guidance in both LLM-backed and offline/demo modes:

- **Syllable Stress Patterns:** Highlights stressed separable prefixes (`EIN-le-be`), `-ieren` stems (`stu-DIE-ren`), inseparable prefixes (`ge-SPRO-chen`), and compound roots (`FAHRT-zeit`).
- **Vowel Length Rules:** Distinguishes lengthening markers (`ie`, `aa/ee/oo`, silent `h` such as `ah` in `Fahrt`, vowels before `ß`) from short crisp vowels before double consonants (`ff` in `Homeoffice`, `ll` in `schnell`).
- **Listen → Mic → Check Drill Loop:** Each word card runs a dedicated state machine (`listening` → `recording` → `checking` → `result`) using `speakGerman(..., { rate: 0.78 })` followed by an echo-guarded recording window and instant phonetic verification.

## 3. Tech Stack & Verification

| Layer | Implementation |
| :--- | :--- |
| **Frontend** | Next.js (App Router), React, TypeScript, Tailwind CSS |
| **Speech I/O** | Browser Web Speech API (`de-DE`, continuous + interim) & Edge/Browser TTS |
| **AI Backend Routes** | `POST /api/ai/roleplay-feedback` (turn diagnostics) & `POST /api/ai/pronunciation-check` (word drill verification) |
| **Quality & Evals** | Strict TypeScript type-checking (`0` errors) + `npm run eval:ai` (`17/17` evaluation benchmarks passing) |

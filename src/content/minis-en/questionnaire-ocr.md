---
title: Questionnaire Recognition and Data Preparation
kind: practice
category: workflow-ai
icon: questionnaire
order: 1
visibility: public
summary: A helper tool built with AI that turns scans of paper questionnaires into data in a set format. A person then checks the results.
role: I found the problem, designed the process, built the tool with AI, handed it over, and adjusted it.
problem: There were many anonymous paper questionnaires filled in by students. Everything was typed in by hand, one by one. Both the checked boxes and the handwritten answers had to be entered into a data table.
built: The tool was built with AI help. The first version used Google AI Studio. I found it hard to use, so I rewrote it with Antigravity and connected it to the Gemini API.
steps:
  - Before scanning, a person checks the questionnaires. Scribbled ones, ones with personal information, and ones written too faintly are picked out. If needed, faint handwriting is traced over with a black pen, so the tool can read it.
  - Scan the questionnaires into files and upload them to the tool.
  - The tool connects to the Gemini API to read the content, and outputs it in the set data format.
  - A person checks the results before they are used.
estimate: |-
  Use started in April–May 2026. Colleagues use it whenever the team has questionnaires. One run is about 30–60 questionnaires, and the most in one run is about 80.
  Before: about 30 questionnaires for one class, and typing them in by hand took about 30–60 minutes, depending on how much handwriting there was.
  Now: one batch of 30 takes about 5–10 minutes, including checking for errors.
limits:
  - Most reading errors come from children's messy handwriting, where the AI reads a word as a different word. Unclear check marks are less common. So a person still checks the results.
  - The API key and the program are stored separately, and a usage limit is set.
  - The tool is not online for the public. It is used only inside the team as an HTML file, with simple instructions, and it has been handed over to colleagues.
  - AI models and API versions get updated, so the team has to maintain and adjust the tool on its own.
---

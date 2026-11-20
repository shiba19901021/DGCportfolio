---
title: Prototype for Course Registration and Certificate Tracking
kind: practice
category: workflow-ai
icon: registration
order: 4
visibility: public
summary: A Google Sheets prototype that brings data scattered across several registration forms and a separate register into one sheet, which creates to-dos automatically and shows how far each learner has come.
role: I analyzed the existing files, decided the approach, designed the structure, built the prototype with AI, and showed it in person.
problem: "A training organization took registrations through several online forms (open classes, advanced courses, courses for past students, internships, and refresher training), and also kept its own certificate register with formulas. For a learner, registration, assessment, internship, and getting the certificate are really one process, but it was split across different forms. The organization also wanted sign-in sheets, insurance data sheets, automatic emails after registration, reminders when certificates expire, and statistics across courses."
decisions:
  - title: Leave the original data alone, and keep manual work to a minimum
    text: The registration forms and original data stay as they are, and the forms were not rebuilt. Only one sheet needs to be filled in by hand, and everything else is automated. When something needs a person, the system shows a reminder.
  - title: Bring everything into one main sheet
    text: From registration to getting the certificate, a learner goes through one process, but it was split across different forms. Bringing it together makes it easier to manage and shows where each learner is. The fewer tabs there are, the less likely it is to get messy later.
  - title: Use a spreadsheet, not a separate web page
    text: I did not know how far the organization's system permissions went, so I designed it with the Google Sheets they already use. Later I learned that they have their own website. In the future, the registration form might be built into the website, which would allow more uses.
  - title: Do not merge automatically when unsure
    text: A form cannot confirm whether two registrations are from the same person. Records are merged only when both the ID number and the name match. If they do not match, it is unclear, so they are kept separate, marked, and checked by a person.
built: "Built with Claude: Google Sheets formulas plus Google Apps Script (automatic syncing, menus, form windows, and email). Automatic checks were also written for the core logic."
steps:
  - The original registration data stays as it is and is not edited by hand.
  - A script reads the registration data and builds the learner sheet automatically. When it is unclear whether two records are the same person, it is marked in a "Reminder" column, and merged only after a person checks it.
  - Based on registration and progress, to-dos are created automatically in an "Event Log" (payment check, assessment, internship attendance, issuing certificates, mailing certificates, and so on). A person only fills in the result, and the status updates automatically.
  - The Event Log works out each learner's "next step," and an overview shows how many learners are at each stage, with a course dashboard.
  - "Other features: choose a session to create a sign-in sheet and an insurance data sheet automatically (cancelled learners are left out), certificate expiry reminders, and emails that are previewed before sending."
usage:
  - This is a prototype tested with data for about a hundred fake learners. It is not a live system.
  - I showed it to the organization in person in November 2026.
  - They liked the design and decided to first build their own version based on it.
limits:
  - Business rules are left for the organization to decide. The prototype only makes assumptions, for example about retake limits and deadlines, how the certification rate is counted, and how old data is imported.
  - After handover, the organization maintains it. The files and data belong to them, and I do not touch their permission settings.
  - Emails are in test mode by default and are not sent to learners directly.
  - How the scripts run on the organization's real spreadsheet has not been confirmed.
---

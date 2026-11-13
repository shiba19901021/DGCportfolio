---
title: Batch Sending System for Promotional Emails
kind: practice
category: workflow-ai
icon: email
order: 3
visibility: public
summary: Google Apps Script written with AI help that connects list updates, unsubscribing, and batch sending into one process that colleagues can take over.
role: I found the problem, designed the process, built it with AI, and wrote the handover guide.
problem: I am in charge of sending the center's promotional emails. The list comes from forms filled in by participants who agreed to receive emails. The free email account sends 450 emails a day, keeping part of its daily quota for the center's everyday use, but the list is longer than that, so emails must be sent in batches over several days. Before, I had to copy the email addresses from the form by hand, write them into drafts batch by batch, and set a send time for each one. New addresses had to be added by hand, invalid addresses had to be removed by hand, and there was no way to unsubscribe.
built: I wrote Google Apps Script with help from Claude, together with Google Sheets and Google Forms.
steps:
  - The list is kept in a fixed format. New addresses from the questionnaire are added to the list automatically, and invalid addresses are removed automatically.
  - "Unsubscribing uses a Google Form: a person enters the address they want to remove, and the system stops sending to it. If they want to change their address, it is updated automatically."
  - Write a draft in the email account and press one button.
  - The system schedules 450 emails a day, and stops by itself after the whole list has been sent once.
  - If something goes wrong, sending can be paused by hand at any time.
estimate: |-
  It is live, and the first round of sending is in progress. The list takes several days to finish, so there are no results yet.
  Before: each time, copying the list, writing drafts, and setting the send times took about 1 hour, not counting the small bits of time spent updating the list.
  Now: after writing the draft, press one button, and emails are sent in batches every day.
limits:
  - It uses a free email account, not a paid email service, so there is no built-in unsubscribe feature. Unsubscribing is handled with a separate Google Form.
  - The list is longer than one day's sending, so one full round takes several days.
  - A handover guide has been written, and colleagues can all use it.
---

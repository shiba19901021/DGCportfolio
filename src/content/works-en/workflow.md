---
title: Workflow Improvement and Automation
category: project
order: 4
featured: true
visibility: public
detail: true
topics:
  - Information design
  - Data reuse
  - Tool integration
problems:
  - flow
summary: First mapped where data comes from and which tasks use it. Then used formulas and linked sheets to reduce repeated upkeep, while keeping the document output that is needed.
challenge: Business records, statistics, work logs, and documents use the same information, but it was kept in many places and checked again and again.
decision: Redesigned how data is sourced and used, with formulas and linked sheets, while keeping the documents and print formats that colleagues need.
delivered: Existing data can be used across workflows, and it produces reports, charts, and search information. One of the business statistics is done in about one hour or less. This is a rough estimate from the original draft, and it applies only to that task.
boundary: Some interfaces were made with AI help. This does not mean every system syncs automatically. The original internal forms and real business data are not shown.
role: I noticed repeated work in the workflow, designed how data is linked and how documents are handled, and built the management interface with AI. I kept adjusting it based on real use.
related: []
contexts: {}
blocks:
  - type: narrative
    id: repeated-records
    title: Why was the same business record organized again and again?
    markdown: |-
      The center's overall business execution record lists the courses, events, and sessions that have been done. This information is used to manage courses and events. It also appears in work logs, in different kinds of business statistics, and in administrative documents such as mid-term reports.

      At first, the different sheets had too few links between them, so the same record often had to be copied, organized, and checked by hand. When one item changed, I might have to edit five or six places. If I missed one, the numbers did not match. Each time I prepared a report, I also had to look up the data again to check that every record agreed.
  - type: gallery
    id: excel-records-image
    layout: single
    images:
      - src: /images/workflow/excel-records.png
        approved: true
        preview: false
        alt: Anonymized remake of the first-stage Excel business execution record, showing columns such as course, service, and fee. The text in the image is in Chinese.
        caption: "First-stage interface, anonymized remake for illustration: business records organized in Excel sheets. The text in the image is in Chinese."
        ratio: natural
        fit: contain
  - type: narrative
    id: reusable-records
    title: First get the data in order, so logs and statistics can use it
    markdown: |-
      The original Excel file already used simple formulas for adding, subtracting, multiplying, and dividing. But between the sheets, a lot of data still had to be moved by hand. I started from the existing files and mapped how each set of data relates to the others. Step by step, I used formulas such as VLOOKUP so that sheets could refer to information that had already been filled in.

      Later I moved to Google Sheets and added QUERY and cross-sheet links for different work needs. For example, the date and course name already in the business record can be used by the work log. Different kinds of business statistics can also be built from the existing course, event, and session data, so there is no need to copy it again each time.

      These references were added one by one during use. After the main business data is entered, the sheets that need it use it. Other work items in the log are still added by hand, and the original records and the statistics are still checked when needed.
  - type: gallery
    id: sheets-records-image
    layout: single
    images:
      - src: /images/workflow/sheets-records.png
        approved: true
        preview: false
        alt: Anonymized remake of the second-stage Google Sheets business records, showing category columns and sheets for different uses. The text in the image is in Chinese.
        caption: "Second-stage interface, anonymized remake for illustration: business columns organized in Google Sheets, so that different tasks can use them. The text in the image is in Chinese."
        ratio: natural
        fit: contain
  - type: narrative
    id: keep-familiar-input
    title: No forced change of tools. Let the data keep moving to the next step
    markdown: |-
      Spreadsheets let the data be reused. But there was still room to simplify how to search management information and how to prepare report statistics and charts. I used AI to help build a management website. I decided which functions were needed from the real work, then tested and adjusted how the data is shown and how it is used.

      At first, I wanted my colleague to enter business records directly on the website. But the colleague who actually keeps the records was more used to Google Sheets and felt the original tables were easier to control. I did not ask the colleague to give up a familiar tool. Instead, I separated data entry from later analysis.

      In the end, the colleague in charge of business records keeps entering and managing them in Google Sheets. After each month ends, the data for that month is downloaded and uploaded to the management website. The website then handles searching, statistics, analysis, and report information. This keeps my colleague's way of working, and the organized data can keep being used in the next step.
  - type: gallery
    id: management-interface-image
    layout: single
    images:
      - src: /images/workflow/management-interface.png
        approved: true
        preview: false
        alt: Anonymized remake of the third-stage management website, showing business record search, categories, and navigation. The interface text in the image is in Chinese.
        caption: "Third-stage interface, anonymized remake for illustration: the management website offers search and organized information for business records. The interface text in the image is in Chinese."
        ratio: natural
        fit: contain
  - type: narrative
    id: report-use
    markdown: |-
      ### Let business reports use the organized data

      When writing a business report, I need to gather the number of sessions and the statistics for different kinds of business, and prepare the related numbers, charts, and analysis. In the early days, this often took several hours of looking up, sorting, checking, and making charts. Sometimes it took most of a day, or a whole day.

      Later, after the business data was imported into the website, the statistics and charts needed for the report could be produced first, and then used in the formal report. Based on a rough estimate from actual work experience, this statistics work went from several hours to about one hour or less. Writing the report then uses the organized results.

      The management website is now used for the number of business sessions, weekly meeting and course review information, and the searches and analysis needed for reports. For the multi-year statistics function that is only needed at year end, I will build it when there is a real need.
  - type: narrative
    id: leave-documents
    title: Leave forms are still required, but no need to refill each one
    markdown: |-
      Leave documents were a separate and fairly independent improvement. At first the leave forms were made in Word, and each one had to be filled in again. The organization still needs formal documents, so I kept the original format and changed how the data is prepared and how the documents are produced.

      I keep the leave data in one place in Excel, check the substitute and the dates, and then use Word mail merge to produce the forms. At the end of the month, many forms can be handled together. This reduces filling in the same data one form at a time, and it keeps the format needed for approval and the manual checks.
  - type: comparison
    id: leave-document-comparison
    before:
      label: Before
      text: Each Word leave form was filled in separately, then checked and printed one by one.
    after:
      label: After
      text: Leave data is organized in Excel, with the substitute and dates checked. Word mail merge then produces the formal documents in a batch.
  - type: gallery
    id: leave-mail-merge
    layout: single
    images:
      - src: /images/workflow/leave-mail-merge.webp
        approved: true
        preview: false
        alt: Anonymized example of a leave form. It keeps merge fields such as name, reason, type of leave, and start and end time, and it contains no real personal data. The form text is in Chinese.
        caption: "Anonymized example of the merge fields in a leave form: the formal form format is kept, and fields such as name, reason, and start and end time are filled in from the organized data. The form text in the image is in Chinese."
        ratio: natural
        fit: contain
  - type: narrative
    id: everyday-use
    title: Other tasks also start with one less round of organizing
    markdown: |-
      Weekly meeting notes were first kept in Word. Later I moved them to Google Sheets, so they are easy to collect and search together, and the needed print format is kept. Work schedules are handled with existing tools such as Google Calendar. Some weekly meeting and course review information is also added to the website, so records are quicker to find when needed.

      About five colleagues in the office already use the related business forms. They still do their daily work with the existing forms. I mainly take care of adjusting the formulas and editing the website, and I keep adjusting them as people use them.

      These improvements were not one finished system build. They came from daily work: step by step, as new needs and experience with use appeared.
detailIntro:
  title: Workflow Improvement and Automation
  subtitle: From filling in the same records again and again, to letting the data feed work logs and reports
  introduction: Over many years of daily work, I gradually organized how business records refer to each other, so work logs and statistics no longer needed the same information filled in again and again. Later I built a management website with AI help. It keeps the table input that my colleagues know, and the data is imported regularly for search, statistics, and reports. Administrative documents such as leave forms were improved separately, based on real needs.
---

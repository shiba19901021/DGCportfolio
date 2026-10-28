---
title: Rainwater Collection System at an Elementary School
category: project
order: 2
featured: true
visibility: public
detail: true
detailIntro:
  title: Rainwater Collection System at an Elementary School
  subtitle: From an idea of collecting rain to a school facility that can be used for teaching
  introduction: An elementary school wanted to build a rainwater collection system on campus, so students could see how rainwater is collected and used. I first learned about the site and the teaching needs. Then I planned the pipes based on the existing facilities, the materials available, and the building conditions, and arranged for students to take part in some of the assembly. After the equipment was finished, I used AI to help make an interactive teaching tool, so students can see how water flows under different operations.
topics:
  - Campus demonstration
  - Needs analysis
  - Physical system
problems:
  - clarify
  - iterate
summary: Started from the idea of "collecting rain" and worked out that it was for teaching and display. Connected existing materials, student help in building, and digital explanation, and fixed the water path after the water-release test.
challenge: The school wanted to collect rainwater, but the purpose would affect the size of the equipment, the layout, and how students could take part.
decision: Used the existing collection point and planned the route around the camera and the existing pipes. After water was released, the first flush of rain might enter the barrel too early, so the branch pipe into the barrel was raised.
delivered: The physical system and an interactive website were completed. Students took part in assembly and observation, while adults did the work at height and other higher-risk work. The water-release test and the fix were done.
boundary: Student guide training and later handover are not counted as finished results.
role: I was in charge of the site assessment and the plan. I arranged the student hands-on work and adjusted the pipes based on the test. The interactive teaching tool was made with AI help. Adults did the work at height.
related: []
contexts: {}
blocks:
  - type: summary
    id: overview
    title: Project overview
    columns: two
    items:
      - label: Site
        value: An elementary school
      - label: Project type
        value: Campus rainwater collection and environmental education
      - label: Equipment size
        value: 200-liter storage barrel, for teaching display and extra water
      - label: Work
        value: Site assessment, system planning, hands-on teaching, adjusting the building work, interactive teaching tool design
  - type: narrative
    id: existing-site
    title: "Site observation: using the collection conditions already there"
    markdown: |-
      The site already had a partly covered roof, a short gutter, and a drain pipe. The short gutter was originally used to handle rainwater at the joint of the roofs.

      I saw that part of the roof rainwater was already gathered here, so I used the existing collection point and connected the new equipment to the existing setup. A joint in the old drain pipe was already broken, and it was also repaired in this work.
  - type: gallery
    id: existing-site-photos
    layout: pair
    images:
      - src: /images/rainwater/courtyard-before.png
        approved: true
        preview: false
        alt: A corner of the campus before building. The covered roof, the short gutter at the roof joint, and the drain pipe on the right can be seen.
        caption: "Before building: the short gutter and the drain pipe on the right were already there, and the new system uses this collection point."
        ratio: natural
        fit: contain
      - src: /images/rainwater/broken-joint.jpg
        approved: true
        preview: false
        alt: A gap where the old horizontal drain pipe joins the vertical pipe, which was already broken
        caption: The old horizontal pipe was already broken where it joins the vertical pipe. It was repaired when the pipes were reconnected.
        ratio: natural
        fit: contain
  - type: narrative
    id: design-choices
    title: "Design choices: fit the site, and make the equipment easy to use"
    markdown: |-
      ### Follow the existing pipes and avoid the camera

      The pipe from the short gutter first goes around to the right, then turns back to the settling pipe. This fits the existing pipes and also avoids the camera.

      ### Drain the first flush of rain first, then start collecting

      The middle of the settling pipe is widened to 3.5 inches, to give dirt more room to settle. A drain valve at the bottom lets the first flush of rain drain away first. When it is time to collect, the drain valve is closed so rainwater goes into the storage barrel.

      ### Pipes that can be taken apart make later care easier

      Detachable joints are placed at the water inlet and outlet, so the barrel and the pipes can be separated for cleaning and care. The 200-liter barrel is mainly teaching and display equipment for the school. It can also supply a small amount of rainwater for watering and cleaning.
  - type: gallery
    id: completed-equipment
    layout: single
    images:
      - src: /images/rainwater/system.jpg
        approved: true
        preview: false
        alt: The finished rainwater equipment. A raised branch pipe enters the top of the black storage barrel, the settling pipe is on the right, and there are three taps at the lower left.
        caption: "Finished layout: the pipe that goes along the eaves connects to the settling pipe on the right, and then to the storage barrel."
        ratio: natural
        fit: contain
  - type: narrative
    id: student-participation
    title: "Student participation: making the building work part of the lesson"
    markdown: |-
      Besides finishing the equipment, I also proposed a plan to let students take part in the building, and the school accepted it. Students worked in groups to put PVC pipe parts together, then went to the real equipment to look at the pipe layout and talk about it. Adults did the work at height and the higher-risk work.

      The plan is to finish student guide training by the end of November 2026, so students can learn more about the equipment and explain the rainwater collection system to others.
  - type: gallery
    id: student-illustration
    layout: single
    images:
      - src: /images/rainwater/student-participation-illustration.png
        approved: true
        preview: false
        alt: "Illustration of student participation: students look at the equipment, and put PVC pipe parts together in groups"
        caption: "Illustration of student participation: putting PVC pipe parts together in groups, and looking at the site after it was finished."
        ratio: natural
        fit: contain
  - type: comparison
    id: inlet-revision
    title: "Change during building: the first flush of rain entered the barrel earlier than expected"
    before:
      label: Before the change | The branch pipe into the barrel was lower
      text: When water was released for the first time, some water might flow along the pipe wall into the lower side branch pipe, and go toward the barrel before we were ready to collect. This affected the plan to drain the first flush of rain first.
      image:
        src: /images/rainwater/original-tee.png
        approved: true
        preview: false
        alt: "Site photo before the change. A mark points to the lower branch pipe into the barrel on the side of the settling pipe. The label in the image is in Chinese."
        caption: "① The lower side branch pipe leads to the top of the barrel, so the first flush of rain might enter the barrel too early. The label in the image is in Chinese."
        ratio: natural
        fit: contain
        annotations:
          - label: ① Lower branch pipe
            x: 36.7
            y: 45
    after:
      label: After the change | The branch pipe into the barrel was raised
      text: The branch pipe to the barrel was raised, so water has to rise to a higher point before it can flow to the storage barrel. This fits the order of draining first and then collecting.
      image:
        src: /images/rainwater/maintenance-system.png
        approved: true
        preview: false
        alt: "Site photo after the change. A mark points to the raised branch pipe above the top of the barrel. The label in the image is in Chinese."
        caption: "② The branch pipe first goes up, then turns back to the top of the barrel. The label in the image is in Chinese."
        ratio: natural
        fit: contain
        annotations:
          - label: ② Raised branch pipe
            x: 54.5
            y: 28.5
    note: ""
  - type: narrative
    id: interactive-teaching
    title: "Interactive website: seeing what happens inside the pipes"
    markdown: |-
      Photos can show what the equipment looks like, but it is hard to see how water moves in the pipes. So I used AI to help make an interactive teaching website. Students can operate the equipment directly and see how the water flow changes in different situations.

      The website first uses real photos to introduce the original site, then uses a diagram of the equipment to explain what each section of pipe does. Users can operate the rain, the drain valve, and three separate taps. Through animation, they can see the first flush of rain being drained, dirt settling, water being stored, and overflow.

      A simple operating manual was also made, for teachers to use in class and on site.
  - type: gallery
    id: teaching-screen
    layout: single
    images:
      - src: /images/rainwater/teaching-operation.png
        approved: true
        preview: false
        alt: "Screenshot of the interactive teaching tool: controls for rain and the drain valve, one diagram of the equipment, three taps that can be opened and closed separately, and a diagram of the water level. Text in the screenshot is in Chinese."
        caption: "The interactive tool in use: rain, closing the drain valve, and using the taps one by one to see the water flow and the diagram of the water level. Text in the screenshot is in Chinese."
        ratio: natural
        fit: contain
  - type: narrative
    id: teaching-links
    markdown: "[Try the interactive tool (in Chinese) ↗](https://shiba19901021.github.io/rainwater-prototype/index.html)　／　[View the simple operating manual (in Chinese) ↗](https://shiba19901021.github.io/rainwater-prototype/manual.html)"
  - type: results
    id: completed-and-next
    title: Results so far and next steps
    groups:
      - label: Done so far
        items:
          - The campus rainwater equipment was completed, along with the assembly and observation activities with student participation.
          - Based on what we found when water was released, the structure of the branch pipe into the barrel was changed.
          - An interactive teaching website and a simple operating manual were completed.
      - label: Planned use
        items:
          - To be used as teaching display and extra water equipment, for watering and suitable cleaning on campus.
      - label: Next steps
        items:
          - Student guide training is planned to be finished by the end of November 2026.
  - type: narrative
    id: media-note
    markdown: ""
---

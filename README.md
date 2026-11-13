# InternshipHub — Responsive Internship Board

A responsive, accessible internship listing interface built with **semantic HTML, CSS, and vanilla JavaScript** (no frontend framework).

## Live demo

Add your deployed URL here after publishing: `https://your-project-name.netlify.app`

## Features

- Responsive layout for mobile, tablet, and desktop.
- Reusable internship data stored separately from the DOM rendering logic.
- Live keyword search across titles, domains, locations, IDs, descriptions, and skills.
- Domain and work-mode filters, including a reset action.
- Internship detail dialog with keyboard-accessible controls.
- Loading, empty-results, and error/retry states.
- Semantic landmarks, skip link, explicit form labels, visible keyboard focus, and live result announcements.
- Reduced-motion preference support.

## Tech stack

- HTML5
- CSS3 (Grid, Flexbox, media queries)
- Vanilla JavaScript (DOM APIs)

## Run locally

No build tools or dependencies are required.

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.

## Project structure

```text
responsive-internship-board/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
```

## Internship seed data

The five fictional internship records are based on the supplied task dataset. The original IDs are preserved:

- INT-101 — Frontend Intern
- INT-102 — API Engineering Intern
- INT-103 — UI/UX Intern
- INT-104 — Data Analyst Intern
- INT-105 — Security Operations Intern

The frontend uses local JavaScript data for this first milestone. No backend or real application submission is connected in Task 1.

## Accessibility and responsive checks

- Keyboard: Tab through navigation, filters, detail buttons, and dialog controls. Use Enter/Space to activate controls and Escape to close the dialog.
- Labels: Search and select inputs have programmatic labels.
- Status: Result count uses an `aria-live` region; loading and error states are announced.
- Responsive widths to verify in browser developer tools:
  - 360px — narrow mobile
  - 768px — tablet
  - 1440px — desktop
- Confirm there is no horizontal page scrolling at 360px.

## Screenshots

After running the app, capture screenshots and save them in `assets/`:

- `assets/desktop.png`
- `assets/tablet.png`
- `assets/mobile.png`

Then add them below:

### Desktop
![Desktop screenshot](assets/desktop.png)

### Tablet
![Tablet screenshot](assets/tablet.png)

### Mobile
![Mobile screenshot](assets/mobile.png)

## Deployment

You can deploy this static project using GitHub Pages or Netlify. For GitHub Pages:

1. Push the project to a public GitHub repository.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Wait for the deployment URL to appear and add it to the Live demo section above.

## Author

Created as a submission for the Responsive Internship Board task.

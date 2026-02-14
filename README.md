<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
# RoomRadar
RoomRadar is a lightweight static web app to search room availability in real time and manage class schedules via an admin panel. The app stores schedules in the browser (`localStorage`) so you can run it locally without a backend.
## Short description (for GitHub repo description)
RoomRadar — static room availability search and admin schedule manager (localStorage-backed).
## Features
- Student search: type a room (e.g. `201`) to see if it's currently occupied (shows teacher and subject) or free now.
- Admin scheduling: add/delete schedules, with automatic conflict detection to prevent overlapping classes in the same room.
- Room name normalization: legacy names like "Lab A" map to numeric codes like `201`.
- Safe seed data: example schedules are added on first load to demonstrate behavior.
## Quick start
1. Open `index.html` in a modern browser (no server required).
2. Use the search box in **Student View** to find rooms.
3. Switch to **Admin View** to add schedules (room, subject, teacher, start/end time, day).

## Data
- Data persists in `localStorage` under the key `roomSchedules`.
- To reset example data: clear site storage (DevTools → Application → Clear Storage) and reload.

## Developer notes
- Main files: `index.html`, `script.js`, `style.css`.
- The canonical data model is the `schedules` array in `script.js`.
- There was legacy `timetables` code which has been removed to avoid duplication.

## Contributing
PRs and issues welcome. Suggested improvements: server-backed persistence, user authentication, improved styling.

## License
MIT

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Name 1]: [Specific contributions - e.g., Frontend development, API integration, etc.]
- [Name 2]: [Specific contributions - e.g., Backend development, Database design, etc.]
- [Name 3]: [Specific contributions - e.g., UI/UX design, Testing, Documentation, etc.]

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub

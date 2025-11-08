# ob1-sandbox

Sandbox repo for testing ob1 AI-generated pull requests.

- Frontend scaffold: Vite + React in `frontend/`
- Default branch: `main`
- QA workflow: GitHub Actions builds + runs Playwright (`npm run qa:test`), records a login demo video, and invokes the Claude QA agent (needs `CLAUDE_API_KEY` repo secret) to leave a review comment on every PR.

# Aither Calculator

A fast, mobile-first calculator by Aither.

## Version

**5.1.0**

## Shared Aither Account

Aither Calculator uses the same AitherBackend account service as the other Aither apps. Use the same email and password to sign in to the same Aither account across services.

- Register: `/api/auth/register`
- Login: `/api/auth/login`
- Session: `/api/auth/session`
- Logout: `/api/auth/logout`
- Default backend: `https://aither-backend.onrender.com`

## What's new in 5.1

- Added shared Aither account sign-in and account creation
- Added session restore and sign-out
- Connected the account client to the common AitherBackend service
- Kept calculator data and history local to the device

## Features

- Basic arithmetic: addition, subtraction, multiplication, and division
- Percentage, sign, reciprocal, and backspace controls
- Scientific mode with sin, cos, tan, square root, square, cube, absolute value, factorial, exponent, log, ln, pi, e, and Ans
- DEG and RAD angle modes
- Calculator memory: MC, MR, M+, and M−
- Calculation history stored locally on the device
- Unit converter with length, mass, temperature, and speed
- Light and dark themes
- Optional haptic feedback
- Optional sound effects
- Optional automatic clipboard copying after calculations
- Copy result to clipboard
- Keyboard support on desktop
- Responsive layout designed for iPhone, Android, tablet, and desktop
- PWA manifest and offline service worker
- Settings modal with a working Force Update button
- Shared Aither account
- No calculator API key required

## Run

Open `index.html` in a browser, or deploy the repository with GitHub Pages.

## Files

- `index.html` — app structure, calculator, settings, converter, and install UI
- `style.css` — responsive UI, themes, converter, and mobile layout
- `app.js` — calculator engine, scientific functions, memory, history, settings, unit conversion, and PWA install handling
- `aither-account.js` — shared AitherBackend account client
- `manifest.json` — web app metadata
- `sw.js` — offline cache and update worker

## License

MIT

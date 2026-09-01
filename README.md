# Aither Calculator

A fast, mobile-first calculator by Aither.

## Version

**5.0.0**

## What's new in 5.0

- Cleaner, denser mobile keypad
- Parenthesis controls added to the main keypad
- Reciprocal (`1/x`) shortcut
- One-tap result copying from the keypad
- Install-to-home-screen support when the browser supports PWA installation
- Offline caching through a service worker
- Web app manifest for a more app-like iPhone/Android experience
- Unit converter retained with length, mass, temperature, and speed categories
- Scientific mode, memory, Ans, history, themes, haptics, sound, and auto-copy retained
- Version text synchronized to 5.0.0

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
- No external libraries or API keys required

## Run

Open `index.html` in a browser, or deploy the repository with GitHub Pages.

## Files

- `index.html` — app structure, calculator, settings, converter, and install UI
- `style.css` — responsive UI, themes, converter, and mobile layout
- `app.js` — calculator engine, scientific functions, memory, history, settings, unit conversion, and PWA install handling
- `manifest.json` — web app metadata
- `sw.js` — offline cache and update worker

## License

MIT

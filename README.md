# Countdown

A cinematic countdown timer that runs in the browser. Pick a date, drop in a photo, and it turns into a full-screen ticking countdown with the photo behind it.

I wanted something better-looking than the plain countdown widgets you usually find, something I could leave open on a screen and actually enjoy looking at. It's a single `index.html` file with no build step and no dependencies to install.

## Features

- **Multiple countdowns.** Keep as many as you like (exams, trips, birthdays, launches) and see them all as cards on one screen, sorted by what's coming up next.
- **Your own image as the background.** Upload a photo and it fills the countdown screen behind a dark, grainy, vignette overlay.
- **Auto theme from the image.** The app samples the photo and picks an accent color that suits it. You can switch this off and choose the accent and text colors yourself.
- **Live days : hours : minutes : seconds.** Big Bebas Neue numbers that tick every second.
- **A note for the day.** Write a message (up to 500 characters) that appears with the countdown, so you can leave something to read when the moment arrives.
- **Alerts when it ends.** A chime plays, the tab title flashes, an on-screen toast appears, and you can also enable a browser notification.
- **Counts up afterwards.** Once the target time passes, it shows how much time has gone by since.
- **Edit anytime.** Change the date, time, note or theme while a countdown is running.
- **Full-screen mode**, for wall displays or a second monitor.
- **Old data carries over.** If you used the earlier single-countdown version, it migrates your countdown automatically.

## Usage

There's nothing to install. Clone the repo and open `index.html` in a browser.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
# open index.html
```

1. Click **New Countdown**.
2. Upload an image (optional), set the target date and time, and add a title and note if you want.
3. Hit **Start Countdown**.

To keep it online, GitHub Pages works: *Settings → Pages → deploy from the `main` branch*.

## Where the data is stored

Everything stays in your browser, and nothing is uploaded anywhere.

- Countdown details (title, date, note, colors) are in `localStorage`.
- Images are stored in `IndexedDB`, because they're too big for `localStorage`.

Two consequences. Clearing site data will delete your countdowns, and they won't sync between devices or browsers.

## Notifications

Browser notifications only fire while the tab is still open, and you have to allow them the first time you turn them on. The sound, title flash and on-screen toast work regardless of that permission.

## Built with

- Vanilla HTML, CSS and JavaScript
- Canvas API, to pull colors from the uploaded image
- IndexedDB and localStorage, for storage
- Google Fonts (Bebas Neue and Inter), so the fonts need an internet connection on first load

## Ideas for later

- Export and import countdowns as a file
- Preset backgrounds for when you don't want to upload a photo
- Shareable links

## License

MIT. Fork it and change it however you like.

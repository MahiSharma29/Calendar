# Hindu Panchang 🪔📅

A lightweight, fully static Hindu calendar (Panchang) website built with plain HTML, CSS and JavaScript. It calculates tithi, nakshatra, yoga, karana, Hindu months, muhurat timings and festivals directly in the browser, with a clean, responsive Hindi/English interface. No backend, database or build step required.

## 🌐 Live Deployment

* **Live URL:** <https://mahisharma29.github.io/Calendar/>

> *Note: Hosted on GitHub Pages. After a new commit, it can take 1–2 minutes for changes to appear. Use a hard refresh (`Ctrl + Shift + R`) if the old version is still showing.*

## ✨ Key Features

* **Monthly Hindu Calendar:** Every date shows its tithi, paksha and a live moon-phase icon. Navigate any month from 1950 to 2100.

* **Daily Panchang:** Tithi, nakshatra, yoga and karana with their end times, moon sign, sun sign, sunrise/sunset, and Vikram & Shaka Samvat.

* **Muhurat & Choghadiya:** Day and night Choghadiya with a live "Now" highlight, Rahu Kaal, Yamaganda, Gulika Kaal, Abhijit Muhurat and Brahma Muhurat.

* **Festivals & Vrats:** Major festivals plus Ekadashi, Pradosh, Sankashti Chaturthi, Purnima, Amavasya, Sankranti and Ravi/Guru Pushya yoga.

* **Regional Filter:** North India, Rajasthan/Mewar, Gujarat, Maharashtra, Bengal, Odisha and South India.

* **Adhika Maas & Month System:** Detects Adhika Maas automatically, with an Amanta / Purnimanta toggle.

* **Bilingual & Themed:** Hindi / English toggle, light and dark themes, 14 city presets, print-friendly layout, and keyboard navigation (← →).

* **Zero Dependencies:** Runs by simply opening `index.html`. Preferences (language, city, region, theme) are remembered in the browser.

## 🛠️ Architecture & Tech Stack

| Layer | Technologies | 
| ----- | ----- | 
| **Frontend** | HTML5, CSS3 (CSS variables, Grid, Flexbox), Vanilla JavaScript (ES6+) | 
| **Calculation Engine** | Astronomical formulas for Sun & Moon longitude, Lahiri ayanamsha, IST | 
| **Fonts** | Google Fonts (Hind, Tiro Devanagari Hindi) with system-font fallback | 
| **Storage** | Browser `localStorage` for user preferences | 
| **Deployment Platform** | GitHub Pages (any static host works) | 

## 📁 Repository Structure

```
Calendar/
├── index.html           # Page structure and script/style includes
├── css/
│   └── style.css        # Layout, light/dark themes, responsive and print styles
├── js/
│   ├── data.js          # Hindi/English names, city list, festival definitions
│   ├── calc.js          # Tithi, nakshatra, yoga, karana, maas, muhurat, festival logic
│   └── app.js           # UI rendering, language toggle, calendar and panchang panels
└── README.md            # Project documentation
```

## 🚀 Getting Started Locally

### Prerequisites

* Any modern browser (Chrome, Edge, Firefox, Safari)

* Git installed (only if you want to clone the repository)

### 1. Clone the Repository

```
git clone https://github.com/APNA-USERNAME/Calendar.git
cd Calendar
```

### 2. Run the Website

No installation needed. Open `index.html` by double-clicking it, or serve the folder locally:

```
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## ➕ Customisation

* **Add a festival:** Edit the `FEST` array in `js/data.js`.

```
  [month, tithi, "Hindi name", "English name", "region", "time-rule"]
  // month: 0 = Chaitra ... 11 = Phalguna (Amanta)
  // tithi: 1-15 Shukla, 16-30 Krishna
  // region: pan, north, raj, guj, mah, ben, odi, south (comma separated)
  // time-rule (optional): sr (sunrise), md (midday), ap (afternoon), pd (pradosh), ni (nishita)
```

* **Add a city:** Add `["Hindi", "English", latitude, longitude]` to the `CITIES` array in `js/data.js`.

* **Change colours:** Edit the CSS variables at the top of `css/style.css`.

## 🚢 GitHub Pages Deployment Summary

1. **Upload:** Make sure `index.html` is in the **root** of the repository, not inside a sub-folder.

2. **Enable Pages:** Go to **Settings → Pages**.

3. **Source:** Choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then click **Save**.

4. **Validation:** Open `https://APNA-USERNAME.github.io/Calendar/` and confirm the calendar loads.

The same folder can also be deployed on Netlify, Vercel or Cloudflare Pages without any changes.

## ⚠️ Accuracy Note

Calculations are based on approximate astronomical formulas (Lahiri ayanamsha, Indian Standard Time) and are not taken from an official published Panchang. Festival dates use the tithi at sunrise, pradosh, nishita, midday or afternoon as per each festival's rule, so local traditions may differ by one day. For weddings, griha pravesh and other special rites, please confirm with your pandit or a published Panchang.

## 📄 License

Add a `LICENSE` file (for example, MIT) to the repository to specify how others may use this project.

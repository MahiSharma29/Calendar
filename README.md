# हिन्दू पंचांग · Hindu Panchang (Hindu Calendar Website)

Ek pura static website – koi server, database ya installation nahi chahiye.

## Kaise chalayein
1. Zip ko extract karein.
2. `index.html` par double-click karein (Chrome / Edge / Safari / Firefox).
3. Internet ho to Devanagari Google Fonts load hote hain; internet na ho to bhi site chalti hai (system font use hota hai).

## Folder structure
```
hindu-panchang/
├── index.html        # page ka structure
├── css/style.css     # design, light/dark theme, print style
├── js/data.js        # Hindi/English naam, shehar, tyohaar ki list (yahin naye tyohaar jodein)
├── js/calc.js        # khagoliya ganana: tithi, nakshatra, yog, karan, maas, muhurat
├── js/app.js         # UI, Hindi/English toggle, calendar, panchang panel
└── README.md
```

## Features
- Monthly Hindu calendar (tithi, paksha, moon phase har din), 1950–2100
- Din ka panchang: tithi, nakshatra, yog, karan (end time ke saath), chandra/surya rashi, sunrise/sunset, Vikram & Shaka Samvat
- Adhik maas, Amanta / Purnimanta toggle
- Chaughadiya (din + raat, "अभी" highlight), Rahu Kaal, Yamaganda, Gulika, Abhijit & Brahma Muhurat
- Tyohaar + vrat (Ekadashi, Pradosh, Sankashti, Purnima, Amavasya, Sankranti, Ravi/Guru Pushya)
- Regional filter: North, Rajasthan/Mewar, Gujarat, Maharashtra, Bengal, Odisha, South
- 14 shehar (sunrise/sunset ke hisaab se), Hindi/English toggle, Dark/Light theme, Print, mobile responsive
- Keyboard: ← → se mahina badlein

## Naya tyohaar / shehar jodna
- `js/data.js` mein `FEST` array: `[maas(0=चैत्र…11=फाल्गुन), tithi(1–15 shukla, 16–30 krishna), "Hindi", "English", "kshetra", "samay"]`
- `CITIES` array mein `[Hindi, English, latitude, longitude]` jodein.

## Online dikhane / host karne ke aasaan tareeke
- **Netlify Drop** (app.netlify.com/drop): folder drag-and-drop karein, link mil jayega.
- **GitHub Pages**: repo mein upload → Settings → Pages.
- **Vercel / Cloudflare Pages**: folder import karein.

## Zaroori note
Ganana approximate khagoliya formulas (Lahiri ayanamsha, IST) par based hai, kisi official panchang ka data nahi. Tyohaar ki dates local paramparaon ke karan 1 din alag ho sakti hain. Vivah / griha pravesh jaise vishesh muhurat ke liye pandit ya pramanik panchang se milan karein.

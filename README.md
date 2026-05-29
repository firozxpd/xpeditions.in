# Xpeditions IT Solutions — Static Website

Pure HTML / CSS / JS. Drop the folder on any static host (Netlify, Cloudflare Pages,
GitHub Pages, S3, plain nginx/Apache, or your existing PHP server). No build step.

## Pages
- `index.html` — Home
- `about.html` — About + Vision + Alliance
- `services.html` — 7 service lines
- `products.html` — adXpert / ctvXpert / erpXpert
- `ai.html` — AI capabilities (the three pillars + model library)
- `portfolio.html` — Portfolio
- `clients.html` — Clients + testimonials
- `contact.html` — Contact form (see below)

## Contact form — Web3Forms setup (5 minutes)

The contact form on `contact.html` posts to **Web3Forms**, a free relay that
forwards submissions to `mail@xpeditions.in`. To activate it:

1. Go to **https://web3forms.com**
2. Enter `mail@xpeditions.in` and click "Create Access Key".
3. Check that inbox — Web3Forms will email you an **access key**
   (a long UUID-style string).
4. Open `contact.html` and find this line:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
   Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key from your inbox.
5. Save and re-deploy. Done — submissions will now arrive at `mail@xpeditions.in`.

**Free tier:** 250 submissions per month, unlimited forms, spam filtering included.

### Want to use Formspree instead?
Replace the `action` URL in `contact.html` from
`https://api.web3forms.com/submit` to your Formspree endpoint
(`https://formspree.io/f/YOUR_ID`) and remove the hidden `access_key` /
`botcheck` inputs. The JS works either way as long as the response is JSON
with a `success` field.

### Want server-side PHP mail instead?
Change the form's `action` to `mail.php` and write your own handler — the JS
will still POST the form data and parse the JSON response.

## File layout
```
.
├── *.html                 # 8 pages
├── README.md
└── assets/
    ├── css/style.css      # single stylesheet
    ├── js/main.js         # nav + contact form
    └── images/
        ├── logo.png
        └── favicon.ico
```

## Brand
- Corporate teal: `#19647d`  (deepest: `#0f4a5e`, lighter: `#3ca0b4`)
- Accent gold: `#e89a1a`
- Type: Manrope (sans) + Lora (serif italic accents)
- All colors live as CSS variables in `assets/css/style.css` — edit there to retheme.

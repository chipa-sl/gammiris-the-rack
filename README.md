# Gammiris — The Rack Website

A simple, responsive, three-page static website for **Gammiris** and its product concept **The Rack — Smart Kitchen Organizer**.

## Pages

- `index.html` — home page with the supplied brand banner, product intro, key benefits, and calls to action.
- `product.html` — product overview, intended weight-based workflow, feature cards, and interactive FAQ.
- `about.html` — brand story, values, logo, and product link.

## Run locally

No build tools, Node.js, or server are required.

1. Extract the ZIP.
2. Open the `Gammiris_The_Rack_Website` folder.
3. Double-click `index.html` to open it in a browser.
4. Use the navigation to move between Home, The Rack, and Our Story.

For a local development server, you can also open a terminal in this folder and run `python -m http.server 8000`, then visit `http://localhost:8000`.

## Assets

Your provided images are included in `assets/`:

- `gammiris-banner.jpeg`
- `gammiris-logo.jpeg`
- `the-rack.jpeg`

To replace an image, overwrite the corresponding file while keeping its filename, or update the image paths in the HTML.

## Interactions

- Responsive mobile navigation.
- Smooth in-page navigation and scroll-reveal effects.
- FAQ accordion on the product page.
- Current year in the footer.

## Notes

This is a front-end website only. It does not contain a backend, e-commerce checkout, account system, or live ESP32/Firebase integration. Copy describes The Rack as a product concept where hardware/cloud functionality is still planned or being developed.

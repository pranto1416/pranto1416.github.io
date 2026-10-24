# Prantoverse

Portfolio of **Mutakabbirul Islam Pranto**: game designer, XR researcher, and co-founder of patiHash Creative.

The site is noir cinema crossed with a shader lab. An astronaut drifts through a kaleidoscope tunnel and falls into a black hole as you scroll. Everything renders live in WebGL.

It has two views: **Academic** (the default, research first) and **Studio** (work first), toggled from the menu.

## Run locally
Double-click `index.html`, or run `python3 -m http.server` and open http://localhost:8000.

## Deploy (GitHub Pages)
1. Push this folder to a repo. For a root URL, name the repo `pranto1416.github.io`.
2. Go to Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. Optional, but recommended once: `python3 tools/localize_images.py`
   This downloads every image still hosted on the old Google Site / YouTube into `assets/remote/`, so the site never depends on them. Commit the results.

## Edit
| What | Where |
|---|---|
| Games, reels, art, photos, VFX clips, workshop decks, skills | `js/data.js` |
| All text, case studies, research, leadership | `index.html` |
| Archive (academic projects, full honors, full toolkit) | `archive.html` |
| Section order per view, scroll choreography | `js/main.js` (`ORDER`, and "the film") |
| Tunnel / black hole / astronaut | `js/universe.js` |
| Colors & fonts | `:root` in `css/style.css` |

No build step. Libraries (Three.js, GSAP + ScrollTrigger, Lenis) are vendored in `vendor/`.

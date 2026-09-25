---
version: 1
slug: "src-routes-portfolio-svelte"
primary_target: "src/routes/portfolio.svelte"
related_targets: ["src/routes/portfolio-item.svelte","src/routes/projects.svelte","src/routes/project-item.svelte"]
---

## Scope

Section 03. Projects (client work, portfolio.svelte + portfolio-item.svelte), the open-source projects block (projects.svelte + project-item.svelte), and the project preview (replaces the bigger-picture lightbox). Visitor mode: Experience. Extension of the established site world; no new identity.

## Audience and job

Freelance clients judging whether the past work matches their project, then contacting hi@wfelipe.com. Only existing content: name, tags, preview, full-page screenshot with real dimensions, optional YouTube video; open-source items add description and GitHub/gnome-look links.

## Direction contract

THESIS: A project is a whole website, not a crop. Each card is a scroll frame that travels through the full-page screenshot, and the preview is a reader built for very tall sites. Refuses the category default: cropped thumbnail grid plus generic image lightbox.

OWN-WORLD: Inherited. Navy ground oklch(12% .04 250) with the dot grid, Plane mono for data and labels in the bracket notation of the header ([03/10], [ Esc ]), Canela Deck for project names, neon cyan only for scroll progress and scrub state, hue-250 highlight for actions, 1px border-color-1 hairlines, 0.5rem radius, tag pills unchanged.

STORY: The visitor sees how deep each site goes, scrubs through it in place, opens the reader, reads the whole site at real width with a minimap, moves to the next project with arrows, and meets the contact line in the reader footer.

FIRST VIEWPORT: Section heading "03. Projects" and intro unchanged. Two-column masonry of scroll frames (4:5). In each frame: the screenshot, a 2px cyan progress rail on the right edge, a mono readout bottom-left with the real pixel size (1878 × 12857). Under the frame: [01] index, name in Canela Deck, tags, and actions "Read site" (primary) and "Video" when one exists.

FORM: Extension of the incumbent surface (no concept roll). Signature interaction: pointer scrub (vertical pointer position scrolls the whole site inside the frame) with scroll-driven auto-travel on touch; the reader opens with a view-transition morph from the frame, has a draggable minimap, video tab, keyboard navigation (←/→, Esc) and a native <dialog>.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

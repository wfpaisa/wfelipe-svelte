---
version: 1
slug: "src-routes-lang-lang-page-svelte"
primary_target: "src/routes/[[lang=lang]]/+page.svelte"
related_targets: ["src/routes/hero.svelte","src/routes/about.svelte","src/routes/work.svelte","src/routes/layout-header.svelte","src/routes/+layout.svelte"]
---

## Scope

Whole home page (hero, about, experience, client projects, open-source projects, new contact close, header and chrome). Visitor mode: Experience. Restructure inside the established world; the project reader, ScrollFrame, the neon striped h1 and all existing EN/ES copy stay untouched. Shell commands, line numbers and `total N` counts are the only new text.

## Audience and job

Freelance clients deciding if Felipe's work fits, then writing to hi@wfelipe.com. Problem named by the user: the page felt like a generic portfolio.

## Direction contract

THESIS: The page is one terminal session: each section is a command and its output, numbered in a gutter like an editor. Refuses the stock hero → about → timeline → grid stack with decorative dividers.

OWN-WORLD: Inherited. Navy oklch(12% .04 250), dot grid in the hero only, Plane mono for prompts, gutter numbers, readouts; Canela Deck for headings and project names; hue-250 highlight for prompt paths and actions; neon cyan only for "where you are" (active gutter line, scroll progress, scrub); 1px border-color-1 hairlines; tag pills unchanged.

STORY: `$ whoami` prints the neon name; `$ cat about.md` prints the story, photo and `ls stack/`; `$ git log` prints experience 05→01 with HEAD on today; `$ ls -l projects/` prints the ten sites; `$ ls open-source/` the two themes; `$ mail hi@wfelipe.com` closes with the contact line and a blinking cursor.

FIRST VIEWPORT: Statusline on top (logo, [EN/ES], prompt path of current section, [01. 02. 03.] nav, socials, read %, 1px cyan progress). Gutter hairline with 01, 02… left of the column. Prompt `felipe@wfelipe:~$ whoami` typed, then greeting, neon h1 at xxxl, intro; bottom: a fresh prompt with a blinking caret.

FORM: Registro de despliegue, grounded candidate 6 of 6, dealt by seed e22f9c68. Signature interaction: the gutter line crossing the viewport center lights cyan while the statusline path follows the section; commands type themselves as they scroll in.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

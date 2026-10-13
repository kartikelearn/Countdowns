COUNTDOWN SITE + SHORT SHARE LINKS (Netlify)

Folder layout (keep it exactly like this):
  public/index.html                 <- your site
  netlify/functions/share.mjs       <- the backend (stores shared countdowns)
  netlify.toml, package.json        <- Netlify settings

DEPLOY (pick one)
A) GitHub (easiest, no commands):
   1. Put these files in a GitHub repo (keep the folders).
   2. Netlify > Add new site > Import from Git > choose the repo.
      Build command: leave empty.  Publish directory: public  (netlify.toml sets it).
   3. Deploy. Every push redeploys automatically.

B) Netlify CLI:
   npm i -g netlify-cli
   netlify login
   netlify deploy --prod      (run inside this folder)

NOTE: drag-and-drop of just index.html does NOT run the backend. The site still
works that way (self-contained links), but short links need A or B.

CHECK IT WORKS
Open  https://YOUR-SITE.netlify.app/api/share?id=test
You should see {"error":"not found"} (that means the backend is alive).

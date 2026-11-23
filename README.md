# patelheet.com

Personal site of Heet Patel. Projects are released under [Patel's Labs](https://github.com/Patels-Labs).

Plain HTML, CSS and a little JavaScript; no build step. Run it locally with:

```bash
python3 -m http.server 8788
```

Deployed to Cloudflare Workers (static assets) on every push to `main`; config is in `wrangler.jsonc`, and `.assetsignore` keeps repo files off the site.

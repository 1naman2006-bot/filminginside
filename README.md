# FILMING INSIDE Website

Premium static HTML/CSS/JavaScript agency website and Supabase-ready admin dashboard for Sahil Khurana.

## Files

- `index.html` - public website
- `style.css` - public design system and responsive layout
- `script.js` - frontend rendering, animations, filters, video player, case studies, forms
- `admin.html` - protected CMS dashboard shell
- `admin.css` - admin dashboard UI
- `admin.js` - auth hooks, portfolio/media/blog/review/settings managers, scheduler/trash/version fallback logic
- `supabase.js` - project keys and public configuration
- `data/supabase-schema.sql` - Supabase tables and starter RLS policies
- `robots.txt`, `sitemap.xml` - technical SEO files

## Setup

1. Create a Supabase project.
2. Run `data/supabase-schema.sql` in the Supabase SQL editor.
3. Put your Supabase URL and anon key in `supabase.js`.
4. Create an admin user in Supabase Auth.
5. Upload videos and heavy media to Cloudinary. Paste Cloudinary URLs in the admin dashboard.
6. Deploy the folder to any static host.

## Automation

Use Make.com or Zapier:

- Instagram trigger: new post/reel.
- Upload media to Cloudinary when direct playback is restricted.
- Insert a row into `portfolio` with thumbnail, caption, date, category, and original permalink.
- YouTube trigger/API: fetch latest uploads and insert or render them as video records.

## Security Notes

Use Supabase Auth, RLS, role checks, signed Cloudinary uploads, server-side reCAPTCHA validation, and environment variables for production secrets.

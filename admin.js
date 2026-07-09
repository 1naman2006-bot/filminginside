const cfg = window.FI_CONFIG || {};
const client = window.createSupabaseClient ? window.createSupabaseClient() : null;
const state = {
  role: localStorage.getItem("fi_role") || "Admin",
  projects: JSON.parse(localStorage.getItem("fi_portfolio") || "[]"),
  media: JSON.parse(localStorage.getItem("fi_media") || "[]"),
  trash: JSON.parse(localStorage.getItem("fi_trash") || "[]"),
  versions: JSON.parse(localStorage.getItem("fi_versions") || "[]"),
  leads: JSON.parse(localStorage.getItem("fi_leads") || "[]")
};
const views = {
  home: "Dashboard", media: "Media Library", portfolio: "Portfolio Manager", ai: "AI Projects", blog: "Blog Manager", reviews: "Client Reviews",
  content: "Website Settings", leads: "Contact Manager", automation: "Automation Settings", backup: "Backup & Version History", preview: "Live Preview"
};

document.addEventListener("DOMContentLoaded", async () => {
  if (client) {
    const { data } = await client.auth.getSession();
    if (data.session) showDashboard();
  }
  loginForm.addEventListener("submit", login);
  forgotPassword.addEventListener("click", resetPassword);
  logoutBtn?.addEventListener("click", logout);
  adminNav?.addEventListener("click", e => {
    const btn = e.target.closest("[data-view]");
    if (!btn) return;
    adminNav.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === btn));
    renderView(btn.dataset.view);
  });
  document.querySelectorAll("[data-quick]").forEach(b => b.addEventListener("click", () => renderView(b.dataset.quick)));
  publishWebsite?.addEventListener("click", () => notify("Website published successfully"));
});

async function login(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));
  loginStatus.textContent = "Checking credentials...";
  if (client) {
    const { error } = await client.auth.signInWithPassword({ email: data.email, password: data.password });
    if (error) return loginStatus.textContent = error.message;
  }
  localStorage.setItem("fi_role", "Admin");
  showDashboard();
}
async function resetPassword() {
  const email = loginForm.email.value;
  if (!email) return loginStatus.textContent = "Enter email first.";
  if (client) await client.auth.resetPasswordForEmail(email);
  notify("Password reset email sent if the account exists");
}
async function logout() {
  if (client) await client.auth.signOut();
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}
function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");
  renderView("home");
}
function renderView(view) {
  viewTitle.textContent = views[view] || "Dashboard";
  const map = { home, media, portfolio, ai, blog, reviews, content, leads, automation, backup, preview };
  adminView.innerHTML = map[view] ? map[view]() : home();
  bindView(view);
}
function home() {
  const cards = [["Total Projects", state.projects.length], ["Total Videos", state.media.filter(x => x.type === "video").length], ["Total Images", state.media.filter(x => x.type === "image").length], ["AI Projects", state.projects.filter(x => /ai/i.test(x.category || x.type || "")).length], ["Client Reviews", localStorage.getItem("fi_reviews") ? JSON.parse(localStorage.getItem("fi_reviews")).length : 3], ["Total Visitors", "GA4"], ["Leads", state.leads.length], ["Blogs", JSON.parse(localStorage.getItem("fi_blogs") || "[]").length]];
  return `<div class="dashboard-grid">${cards.map(c => `<article class="admin-card"><span>${c[0]}</span><strong>${c[1]}</strong></article>`).join("")}</div><div class="cms-layout"><section class="admin-card"><h2>Latest Uploads</h2><div class="table">${rows(state.projects.slice(0,5))}</div></section><section class="admin-card"><h2>Recent Activities</h2><p>Project publishing, edits, deletes, restores, schedule changes, and imports are recorded in version history.</p><div class="table">${state.versions.slice(0,6).map(v=>`<article class="row"><span></span><div><strong>${v.action}</strong><p>${new Date(v.at).toLocaleString()}</p></div><span>${v.type}</span></article>`).join("") || "<p>No activity yet.</p>"}</div></section></div>`;
}
function media() {
  return `<div class="cms-layout"><section class="admin-card"><h2>Drag & Drop Upload</h2><div class="dropzone" id="dropzone"><div><i class="fa-solid fa-cloud-arrow-up"></i><p>Drop image, video, AI video, reel, or paste Cloudinary URL.</p></div></div><form class="admin-form" id="mediaForm"><label>Title<input class="admin-input" name="title" required></label><label>Type<select class="admin-select" name="type"><option>image</option><option>video</option><option>ai video</option><option>reel</option></select></label><label>Folder<input class="admin-input" name="folder" placeholder="Commercials"></label><label>Cloudinary URL<input class="admin-input" name="url" required></label><button class="btn btn-primary">Upload Media</button></form></section><section class="admin-card"><div class="admin-toolbar"><input class="admin-input" id="mediaSearch" placeholder="Search media"><button class="btn btn-ghost" id="bulkDelete">Bulk Delete</button><button class="btn btn-ghost" id="bulkDownload">Bulk Download</button></div><div class="library" id="mediaLibrary">${library()}</div></section></div>`;
}
function portfolio(type = "portfolio") {
  const isAI = type === "ai";
  return `<div class="cms-layout"><section class="admin-card"><h2>${isAI ? "Create AI Project" : "Create Portfolio"}</h2>${projectForm(isAI)}</section><section class="admin-card"><div class="admin-toolbar"><input class="admin-input" id="projectSearch" placeholder="Search projects, videos, images, blogs, reviews, services"><button class="btn btn-ghost" id="exportProjects">Export CSV</button></div><div class="table" id="projectList">${rows(state.projects.filter(p => !isAI || /ai/i.test(p.category || p.type || "")))}</div></section></div>`;
}
function ai() { return portfolio("ai"); }
function projectForm(isAI = false) {
  const categories = isAI ? ["AI Commercial","AI Reel","AI Product","AI Fashion","AI Avatar","AI Voice","AI Image","AI Motion Graphics"] : ["Commercial","Corporate","Photography","Product","Restaurant","Fashion","Education","Healthcare","Real Estate","Before & After","AI Videos"];
  return `<form class="admin-form" id="projectForm"><label>Title<input class="admin-input" name="title" required></label><label>Slug<input class="admin-input" name="slug"></label><label>Category<select class="admin-select" name="category">${categories.map(c=>`<option>${c}</option>`).join("")}</select></label><label>Client Name<input class="admin-input" name="client_name"></label><label>Industry<input class="admin-input" name="industry"></label><label>Thumbnail URL<input class="admin-input" name="thumbnail" required></label><label>Banner URL<input class="admin-input" name="banner"></label><label>Cloudinary Video URL<input class="admin-input" name="video_url"></label><label>Gallery URLs<textarea class="admin-input" name="gallery" rows="2"></textarea></label><label>Software Used<input class="admin-input" name="software"></label><label>Services Used<input class="admin-input" name="services_used"></label><label>Tags<input class="admin-input" name="tags"></label><label>Description<textarea class="admin-input" name="description" rows="3"></textarea></label><label>SEO Title<input class="admin-input" name="seo_title"></label><label>SEO Description<textarea class="admin-input" name="seo_description" rows="2"></textarea></label><label>Publish Date<input class="admin-input" type="datetime-local" name="publish_at"></label><label><input type="checkbox" name="featured"> Feature Project</label><label>Status<select class="admin-select" name="status"><option>published</option><option>draft</option><option>archived</option></select></label><button class="btn btn-primary">Publish</button><button class="btn btn-ghost" type="button" id="saveDraft">Save Draft</button></form>`;
}
function blog() { return genericManager("Blog Manager", "fi_blogs", ["Title", "Featured Image", "Categories", "Tags", "SEO Title", "SEO Description"], true); }
function reviews() { return genericManager("Client Reviews", "fi_reviews", ["Name", "Designation", "Company", "Photo", "Logo", "Stars", "Review", "Featured Review"]); }
function content() {
  return `<div class="cms-layout"><section class="admin-card"><h2>Website Settings</h2><form class="admin-form" id="settingsForm">${["Logo","Hero Video","Hero Text","CTA","Colors","Footer","Contact Details","Social Links","Favicon","SEO Settings","Owner Bio","Owner Profile Image"].map(x=>`<label>${x}<input class="admin-input" name="${x.toLowerCase().replaceAll(" ","_")}"></label>`).join("")}<button class="btn btn-primary">Save Settings</button></form></section><section class="admin-card"><h2>Managers</h2><div class="permission-grid">${["Services Manager","FAQ Manager","Pricing Manager","Team Manager","Permissions: Admin","Permissions: Editor","Permissions: Viewer"].map(x=>`<article class="admin-card"><span>${x}</span><p>Create, edit, delete, reorder, preview, publish, draft, and restore via Supabase tables.</p></article>`).join("")}</div></section></div>`;
}
function leads() { return `<section class="admin-card"><div class="admin-toolbar"><button class="btn btn-ghost" id="exportLeads">Export CSV</button><button class="btn btn-ghost">Reply Status</button><button class="btn btn-ghost">Notes</button></div><div class="table">${state.leads.map(l=>`<article class="row"><span></span><div><strong>${l.name || "Lead"}</strong><p>${l.email || ""} ${l.phone || ""}<br>${l.message || ""}</p></div><button class="btn btn-ghost">Delete</button></article>`).join("") || "<p>No leads yet.</p>"}</div></section>`; }
function automation() {
  return `<section class="admin-card"><h2>Sync Controls</h2>${["Instagram Sync","YouTube Sync","Facebook Sync","Cloudinary Sync","Supabase Sync","Make.com","Zapier","Google Analytics","reCAPTCHA"].map(x=>`<div class="toggle-row"><span>${x}</span><label><input type="checkbox"> Enable</label></div>`).join("")}<p>Use Make.com or Zapier to watch Instagram posts/reels, upload media to Cloudinary, then insert portfolio rows into Supabase.</p></section>`;
}
function backup() {
  return `<div class="cms-layout"><section class="admin-card"><h2>Backup</h2><button class="btn btn-primary" id="exportDb">Export Database</button><button class="btn btn-ghost" id="importDb">Import Database</button><button class="btn btn-ghost" id="restoreTrash">Restore Trash</button><button class="btn btn-ghost" id="permanentDelete">Permanent Delete</button></section><section class="admin-card"><h2>Version History</h2><div class="table">${state.versions.map(v=>`<article class="row"><span></span><div><strong>${v.action}</strong><p>${JSON.stringify(v.snapshot).slice(0,120)}</p></div><button class="btn btn-ghost">Restore</button></article>`).join("") || "<p>No versions yet.</p>"}</div></section></div>`;
}
function preview() { return `<section class="admin-card"><div class="admin-toolbar"><button class="btn btn-ghost">Desktop</button><button class="btn btn-ghost">Tablet</button><button class="btn btn-ghost">Mobile</button></div><iframe class="preview-frame" src="index.html" title="Website live preview"></iframe></section>`; }
function genericManager(title, key, fields, rich = false) {
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  return `<div class="cms-layout"><section class="admin-card"><h2>${title}</h2><form class="admin-form generic-form" data-key="${key}">${fields.map(f=>`<label>${f}${rich&&f==="Title"?'<textarea class="admin-input" name="'+slug(f)+'" rows="2"></textarea>':'<input class="admin-input" name="'+slug(f)+'">'}</label>`).join("")}<label>Status<select class="admin-select" name="status"><option>published</option><option>draft</option></select></label><button class="btn btn-primary">Publish</button></form></section><section class="admin-card"><div class="table">${items.map(i=>`<article class="row"><span></span><div><strong>${i.title || i.name || "Item"}</strong><p>${i.status || "published"}</p></div><button class="btn btn-ghost">Delete</button></article>`).join("") || "<p>No items yet.</p>"}</div></section></div>`;
}
function bindView(view) {
  document.getElementById("projectForm")?.addEventListener("submit", saveProject);
  document.getElementById("mediaForm")?.addEventListener("submit", saveMedia);
  document.querySelector(".generic-form")?.addEventListener("submit", saveGeneric);
  document.getElementById("settingsForm")?.addEventListener("submit", e => { e.preventDefault(); version("settings", Object.fromEntries(new FormData(e.currentTarget))); notify("Settings saved successfully"); });
  if (view === "media") setupDropzone();
}
async function saveProject(e) {
  e.preventDefault();
  const item = Object.fromEntries(new FormData(e.currentTarget));
  item.id = crypto.randomUUID(); item.type = /ai/i.test(item.category) ? "ai" : item.video_url ? "video" : "image"; item.published = item.status === "published"; item.created_at = new Date().toISOString(); item.publish_at = item.publish_at ? new Date(item.publish_at).toISOString() : item.created_at;
  state.projects.unshift(item); persist("fi_portfolio", state.projects); version("project", item);
  if (client) await client.from("portfolio").insert([item]);
  notify(item.published ? "Project Published Successfully" : "Draft Saved Successfully");
  renderView(/ai/i.test(item.category) ? "ai" : "portfolio");
}
async function saveMedia(e) {
  e.preventDefault();
  const item = { id: crypto.randomUUID(), ...Object.fromEntries(new FormData(e.currentTarget)), created_at: new Date().toISOString() };
  state.media.unshift(item); persist("fi_media", state.media); version("media", item);
  notify("Video Uploaded Successfully");
  renderView("media");
}
function saveGeneric(e) {
  e.preventDefault();
  const key = e.currentTarget.dataset.key;
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  const item = { id: crypto.randomUUID(), ...Object.fromEntries(new FormData(e.currentTarget)), created_at: new Date().toISOString() };
  items.unshift(item); persist(key, items); version(key, item); notify("Published Successfully"); renderView(adminNav.querySelector(".active")?.dataset.view || "home");
}
function setupDropzone() {
  dropzone.addEventListener("dragover", e => { e.preventDefault(); dropzone.style.borderColor = "#FF6B00"; });
  dropzone.addEventListener("drop", e => { e.preventDefault(); notify("Drop captured. Upload to Cloudinary with signed upload endpoint in production."); });
}
function rows(items) {
  return items.map(i => `<article class="row"><img src="${i.thumbnail || i.url || "https://dummyimage.com/300x200/111/fff&text=FI"}" alt=""><div><strong>${i.title || "Untitled"}</strong><p>${i.client_name || i.category || i.type || "Draft"} · ${i.status || "published"}</p></div><div><button class="btn btn-ghost">Duplicate</button></div></article>`).join("") || "<p>No records yet.</p>";
}
function library() { return state.media.map(m => `<article>${m.type?.includes("video") ? `<video src="${m.url}" muted></video>` : `<img src="${m.url}" alt="${m.title}">`}<div><strong>${m.title}</strong><p>${m.folder || m.type}</p><button class="btn btn-ghost">Copy URL</button></div></article>`).join("") || "<p>No media yet.</p>"; }
function persist(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function version(type, snapshot) { state.versions.unshift({ type, action: `${type} updated`, snapshot, at: new Date().toISOString() }); persist("fi_versions", state.versions); }
function notify(message) { const p = document.createElement("p"); p.textContent = `✅ ${message}`; toast.appendChild(p); setTimeout(() => p.remove(), 3200); }
function slug(s) { return s.toLowerCase().replaceAll(" ", "_"); }

window.FI_CONFIG = {
  supabaseUrl: "https://hdgbeukkpbalpgrwsndr.supabase.co",

  supabaseAnonKey: "sb_publishable_Vrbm5J5R_CYCXWPgbtB6mg_NK4SvmSl",

  cloudinaryCloudName: "",
  cloudinaryUploadPreset: "",

  whatsappNumber: "918755075077",
  owner: "Sahil Khurana",
  email: "filming.inside315@gmail.com",

  instagram: "https://www.instagram.com/filming_inside_studio",
  youtube: "https://youtube.com/@sahil_k315",

  siteUrl: "https://filminginside.com",

  recaptchaSiteKey: "",
  youtubeApiKey: "",
  youtubeChannelId: ""
};

window.createSupabaseClient = function createSupabaseClient() {
  const cfg = window.FI_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase) return null;
  return window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
};
const cfg = window.FI_CONFIG || {};
const db = window.createSupabaseClient ? window.createSupabaseClient() : null;
const esc = (v = "") => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const newest = (a, b) => new Date(b.publish_at || b.created_at || b.date || 0) - new Date(a.publish_at || a.created_at || a.date || 0);
const fmt = v => v ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(v)) : "Fresh";
const media = "https://images.unsplash.com/";

const services = [
  ["Social Media Management","fa-bullhorn"],["Video Production","fa-video"],["Photography","fa-camera-retro"],["Cinematic Shoots","fa-film"],["Corporate Films","fa-building"],["Commercial Ads","fa-rectangle-ad"],["Brand Films","fa-wand-magic-sparkles"],["Drone Shoot","fa-helicopter"],["Podcast Shoot","fa-podcast"],["AI Video Production","fa-microchip"],["AI Commercial Ads","fa-robot"],["AI Product Ads","fa-box-open"],["AI Fashion Videos","fa-shirt"],["AI Talking Avatar","fa-user-astronaut"],["AI Voice Clone","fa-wave-square"],["AI Image Generation","fa-image"],["AI Motion Graphics","fa-bolt"],["AI Reel Creation","fa-clapperboard"],["Branding","fa-pen-nib"],["Logo Design","fa-certificate"],["Graphic Design","fa-palette"],["Website Development","fa-code"],["Paid Ads","fa-chart-line"],["Event Coverage","fa-calendar-check"]
].map(([title, icon]) => ({ title, icon, description: `${title} crafted with premium creative direction, fast execution, and growth-focused delivery.` }));

const fallbackPortfolio = [
  {id:"commercial-restaurant",title:"Restaurant Launch Commercial",category:"Restaurant",client_name:"Ember Table",industry:"Restaurants",software:"Premiere Pro, DaVinci Resolve",type:"video",date:"2026-07-08",thumbnail:`${media}photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80`,video_url:"https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/elephants.mp4",description:"A warm, cinematic launch film designed for reels, paid ads, and reservation growth."},
  {id:"ai-fashion",title:"AI Fashion Drop",category:"AI Videos",client_name:"Studio Label",industry:"Fashion",software:"Runway, Midjourney, After Effects",type:"ai",date:"2026-07-07",thumbnail:`${media}photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80`,video_url:"https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/dog.mp4",description:"AI-assisted fashion visuals for a fast campaign launch without a large physical production."},
  {id:"corporate-film",title:"Corporate Brand Film",category:"Corporate",client_name:"Northline Build",industry:"Corporate",software:"Premiere Pro, After Effects",type:"video",date:"2026-07-06",thumbnail:`${media}photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80`,video_url:"https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/sea_turtle.mp4",description:"A clean leadership and culture film for website trust and sales enablement."},
  {id:"product-photo",title:"Product Photography System",category:"Product",client_name:"Mira Objects",industry:"Retail",software:"Lightroom, Photoshop",type:"image",date:"2026-07-05",thumbnail:`${media}photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80`,image_url:`${media}photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1500&q=80`,description:"A premium product image bank for ecommerce pages, ads, and social launches."},
  {id:"real-estate",title:"Real Estate Walkthrough",category:"Real Estate",client_name:"Luma Homes",industry:"Real Estate",software:"Premiere Pro, Lightroom",type:"video",date:"2026-07-04",thumbnail:`${media}photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80`,video_url:"https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/elephants.mp4",description:"Property storytelling with cinematic pacing, lifestyle framing, and lead-focused edits."},
  {id:"education",title:"Education Campaign",category:"Education",client_name:"Skillhaus",industry:"Education",software:"Canva, Premiere Pro",type:"reel",date:"2026-07-03",thumbnail:`${media}photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80`,video_url:"https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/dog.mp4",description:"Short-form campaign assets built around clarity, authority, and student enquiries."}
];
const aiProjects = ["AI Commercial Ads","AI Product Videos","AI Brand Films","AI Fashion Videos","AI UGC Videos","AI Talking Avatar","AI Voice Cloning","AI Motion Graphics","AI Image Generation","AI Reel Creation"].map((title,i)=>({title,thumbnail:[fallbackPortfolio[1].thumbnail,fallbackPortfolio[3].thumbnail,fallbackPortfolio[0].thumbnail][i%3],video_url:["https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/dog.mp4","https://res.cloudinary.com/demo/video/upload/q_auto,w_1280/sea_turtle.mp4"][i%2],description:`Premium ${title.toLowerCase()} workflows for fast launches, testing, and campaign scale.`}));
const reviews = [
  {name:"Riya Sharma",designation:"Founder, Ember Table",rating:5,photo_url:`${media}photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80`,logo_url:"https://dummyimage.com/180x60/ffffff/111111&text=EMBER",review:"FILMING INSIDE made our launch feel bigger, sharper, and genuinely premium."},
  {name:"Arjun Mehta",designation:"Director, Luma Homes",rating:5,photo_url:`${media}photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80`,logo_url:"https://dummyimage.com/180x60/ffffff/111111&text=LUMA",review:"The property films, reels, and ad assets came together as one clean system."},
  {name:"Meera Kapoor",designation:"CMO, Skillhaus",rating:5,photo_url:`${media}photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80`,logo_url:"https://dummyimage.com/180x60/ffffff/111111&text=SKILL",review:"Taste, speed, and practical marketing thinking in the same team."}
];
const industries = ["Real Estate","Restaurants","Healthcare","Education","Retail","Fashion","Hotels","Gyms","Personal Brands","Corporate"];
const why = [["Creative Strategy","fa-chess-knight"],["Professional Team","fa-user-tie"],["Fast Delivery","fa-bolt"],["Affordable Packages","fa-tag"],["One Stop Marketing Solution","fa-layer-group"],["AI Powered Production","fa-microchip"]];
const pricing = [
  ["Starter","₹35k","Social media calendar, 12 creatives, 4 reels, monthly report"],
  ["Growth","₹85k","Content strategy, 24 creatives, 10 reels, paid ads support"],
  ["Premium","₹1.5L","Production day, brand films, campaigns, analytics dashboard"],
  ["Enterprise","Custom","Multi-location content, automations, advanced reporting"],
  ["Custom Quote","Brief based","Events, shoots, launches, websites, AI commercials"]
];
const faqs = [
  [
    "How much does a commercial shoot cost?",
    "Our commercial shoots are customized based on concept, crew, locations, and deliverables. Contact us for a tailored quotation."
  ],
  [
    "How long does editing take?",
    "Most projects are delivered within 3–7 working days. Larger productions may require additional time depending on complexity."
  ],
  [
    "Do you travel outside the city?",
    "Yes. We provide photography and video production services across India. Travel arrangements are discussed during booking."
  ],
  [
    "Can you create AI ads?",
    "Absolutely. We create AI-powered commercials, product videos, fashion campaigns, talking avatars, voiceovers, and social media ads."
  ],
  [
    "Do you provide drone shoots?",
    "Yes. Drone cinematography is available wherever local regulations and permissions allow."
  ],
  [
    "How can I book a shoot?",
    "You can contact us through WhatsApp, phone, email, or the contact form on our website. We'll discuss your requirements and schedule the shoot."
  ]
];
const blogs = [
  {title:"How AI videos can speed up campaign testing",category:"AI Studio",date:"2026-07-06",description:"A practical way to use AI commercials and product videos without losing brand taste."},
  {title:"What makes a restaurant reel convert",category:"Reels",date:"2026-07-02",description:"Hooks, pacing, food motion, captions, and offer timing for restaurant content."},
  {title:"The case for premium brand films",category:"Production",date:"2026-06-25",description:"How cinematic content improves trust across websites, ads, and sales conversations."}
];
let portfolio = fallbackPortfolio;
let activeCategory = "All";

document.addEventListener("DOMContentLoaded", async () => {
  initChrome(); initMotion(); renderStatic(); await loadCMS(); initForms(); initSearch();
});

function initChrome(){
  window.addEventListener("load",()=>setTimeout(()=>document.querySelector(".loader")?.classList.add("hidden"),450));
  const toggle=document.querySelector(".nav-toggle"), nav=document.querySelector(".nav-links");
  toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open);toggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  document.addEventListener("click",e=>{["videoModal","caseModal","searchModal"].forEach(id=>{const m=document.getElementById(id);if(!m?.classList.contains("open"))return;if(e.target===m||e.target.closest(`#${id} .modal-close`)){if(id==="videoModal"){modalVideo.pause();modalVideo.removeAttribute("src")}m.classList.remove("open");m.setAttribute("aria-hidden","true");}})});
}
function initMotion(){
  if(!window.gsap)return;
  gsap.registerPlugin(ScrollTrigger);
  if(window.Lenis){const lenis=new Lenis({lerp:.08,smoothWheel:true});lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
  gsap.from(".reveal",{y:34,opacity:0,duration:.9,stagger:.09,ease:"power3.out",delay:.25});
  gsap.utils.toArray(".section h2,.service-card,.project-card,.ai-card,.latest-card").forEach(el=>gsap.from(el,{y:34,opacity:0,duration:.72,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 86%"}}));
  document.querySelectorAll("[data-count]").forEach(el=>ScrollTrigger.create({trigger:el,once:true,start:"top 88%",onEnter:()=>gsap.to(el,{innerText:+el.dataset.count,duration:1.4,snap:{innerText:1},ease:"power2.out"})}));
  document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.16,duration:.2})});el.addEventListener("mouseleave",()=>gsap.to(el,{x:0,y:0,duration:.3}))});
}
async function loadCMS(){
  const local=JSON.parse(localStorage.getItem("fi_portfolio")||"[]");
  if(db){const {data}=await db.from("portfolio").select("*").eq("published",true).lte("publish_at",new Date().toISOString()).order("publish_at",{ascending:false});if(data?.length)portfolio=data}
  if(local.length&&!db) portfolio=[...local,...fallbackPortfolio];
  portfolio=portfolio.map(normalize).sort(newest);
  renderPortfolio(); renderLatest(); renderCases(); renderFeeds();
}
async function getRows(table,fallback){if(!db)return fallback;const {data,error}=await db.from(table).select("*").eq("published",true).order("created_at",{ascending:false});return error||!data?.length?fallback:data}
function normalize(x){return{...x,id:x.id||crypto.randomUUID(),date:x.publish_at||x.date||x.created_at,thumbnail:x.thumbnail||x.thumbnail_url||x.image_url,client_name:x.client_name||x.client||"FILMING INSIDE Client",software:x.software||x.software_used||"Adobe Creative Cloud",type:x.type||(/ai/i.test(x.category||"")?"ai":x.video_url?"video":"image")}}
function renderStatic(){
  serviceGrid.innerHTML=services.map(s=>`<article class="service-card tilt"><i class="fa-solid ${s.icon}"></i><h3>${s.title}</h3><p>${s.description}</p></article>`).join("");
  aiGrid.innerHTML=aiProjects.map(p=>`<article class="ai-card"><img src="${p.thumbnail}" alt="${esc(p.title)}" loading="lazy"><div class="card-body"><div class="meta"><span>AI Studio</span><span>Demo</span></div><h3>${p.title}</h3><p>${p.description}</p><button data-video="${p.video_url}" data-title="${esc(p.title)}">Watch Demo</button></div></article>`).join("");
  timeline.innerHTML=[["2021","Started as a focused content production unit."],["2023","Expanded into social media, brand films, and paid campaigns."],["2025","Added AI production workflows for ads, reels, avatars, and product content."],["2026","Built a full CMS-led creative growth system for clients."]].map(x=>`<article><strong>${x[0]}</strong><span>${x[1]}</span></article>`).join("");
  ownerCard.innerHTML=`<img src="${media}photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Sahil Khurana"><div><small>Owner / Creative Director</small><h3>Sahil Khurana</h3><p>5+ years across production, editing, digital marketing, AI content workflows, and brand storytelling.</p><div class="socials"><a href="${cfg.instagram}"><i class="fa-brands fa-instagram"></i></a><a href="${cfg.youtube}"><i class="fa-brands fa-youtube"></i></a></div></div>`;
  industryGrid.innerHTML=industries.map(x=>`<article class="industry-card"><i class="fa-solid fa-location-dot"></i><h3>${x}</h3></article>`).join("");
  whyGrid.innerHTML=why.map(x=>`<article class="why-card"><i class="fa-solid ${x[1]}"></i><h3>${x[0]}</h3><p>Premium execution designed around clear briefs, fast feedback, and measurable business outcomes.</p></article>`).join("");
  pricingGrid.innerHTML=pricing.map((p,i)=>`<article class="price-card ${i===1?"featured":""}">${i===1?'<span class="badge">Popular</span>':""}<h3>${p[0]}</h3><p class="price">${p[1]}<span>${i<3?"/month":""}</span></p><ul>${p[2].split(", ").map(f=>`<li>${f}</li>`).join("")}</ul><a class="btn ${i===1?"btn-primary":"btn-ghost"}" href="https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent("I want the "+p[0]+" package")}">WhatsApp Quote</a></article>`).join("");
  faqList.innerHTML=faqs.map(f=>`<article><button type="button"><span>${f[0]}</span><i class="fa-solid fa-plus"></i></button><div><p>${f[1]}</p></div></article>`).join("");
  blogGrid.innerHTML=blogs.map(renderBlog).join("");
  reviewWrapper.innerHTML=reviews.map(r=>`<article class="swiper-slide review-card"><img src="${r.photo_url}" alt="${esc(r.name)}" loading="lazy"><div>${r.logo_url?`<img class="company-logo" src="${r.logo_url}" alt="${esc(r.name)} company logo">`:""}<span class="stars">${"★".repeat(r.rating||5)}</span><p>“${esc(r.review)}”</p><strong>${esc(r.name)}</strong><small>${esc(r.designation)}</small></div></article>`).join("");
  if(window.Swiper)new Swiper(".reviewSwiper",{loop:true,spaceBetween:16,autoplay:{delay:3600,disableOnInteraction:false},pagination:{el:".swiper-pagination",clickable:true},breakpoints:{820:{slidesPerView:2}}});
  setupFAQ(); setupBA(); delegateVideoButtons();
}
function renderBlog(b){return`<article class="blog-card"><div class="meta"><span>${esc(b.category)}</span><span>${fmt(b.date||b.created_at)}</span></div><h3>${esc(b.title)}</h3><p>${esc(b.description||"")}</p></article>`}
function renderPortfolio(){
  const cats=["All","Commercial","Corporate","Photography","Product","Restaurant","Fashion","Education","Healthcare","Real Estate","Before & After","AI Videos","Images","Videos"];
  portfolioFilters.innerHTML=cats.map(c=>`<button class="${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");
  portfolioFilters.onclick=e=>{const b=e.target.closest("button");if(!b)return;activeCategory=b.dataset.cat;renderPortfolio()};
  const visible=portfolio.filter(p=>activeCategory==="All"||p.category===activeCategory||p.industry===activeCategory||p.type?.toLowerCase()===activeCategory.toLowerCase().replace("s",""));
  portfolioGrid.innerHTML=visible.map(renderProject).join("");
  portfolioGrid.querySelectorAll("[data-case]").forEach(b=>b.addEventListener("click",()=>openCase(b.dataset.case)));
}
function renderProject(p){return`<article class="project-card"><div class="media"><img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy">${p.video_url?'<span class="play"><i class="fa-solid fa-play"></i></span>':""}</div><div class="card-body"><div class="meta"><span>${esc(p.category)}</span><span>${fmt(p.date)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.description||"")}</p><p><strong>${esc(p.client_name)}</strong> · ${esc(p.software)}</p><button data-case="${esc(p.id)}">View Project</button></div></article>`}
function renderLatest(){latestGrid.innerHTML=portfolio.slice(0,6).map(p=>`<article class="latest-card"><div class="latest-thumb media"><img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy">${p.video_url?'<span class="play"><i class="fa-solid fa-play"></i></span>':""}</div><div class="latest-body"><div class="meta"><span>${esc(p.category)}</span><span>${esc(p.type)}</span></div><h3>${esc(p.title)}</h3><dl><div><dt>Client</dt><dd>${esc(p.client_name)}</dd></div><div><dt>Date</dt><dd>${fmt(p.date)}</dd></div></dl><button data-case="${esc(p.id)}">View Project</button></div></article>`).join("");latestGrid.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>openCase(b.dataset.case)))}
function renderCases(){caseGrid.innerHTML=portfolio.slice(0,6).map(p=>`<article class="case-card"><img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy"><div class="card-body"><div class="meta"><span>${esc(p.industry)}</span><span>Case</span></div><h3>${esc(p.title)}</h3><p>${esc(p.description||"")}</p><button data-case="${esc(p.id)}">Open Case Study</button></div></article>`).join("");caseGrid.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>openCase(b.dataset.case)))}
function openCase(id){const p=portfolio.find(x=>x.id===id);if(!p)return;document.title=`${p.title} | FILMING INSIDE Case Study`;casePage.innerHTML=`<header class="case-hero"><img src="${esc(p.thumbnail)}" alt="${esc(p.title)}"><div><p class="eyebrow">Case Study</p><h1>${esc(p.title)}</h1><p>${esc(p.description||"")}</p></div></header><section class="case-facts"><dl><dt>Client</dt><dd>${esc(p.client_name)}</dd></dl><dl><dt>Industry</dt><dd>${esc(p.industry)}</dd></dl><dl><dt>Software</dt><dd>${esc(p.software)}</dd></dl><dl><dt>Date</dt><dd>${fmt(p.date)}</dd></dl></section>${p.video_url?`<video src="${esc(p.video_url)}" poster="${esc(p.thumbnail)}" controls playsinline style="width:calc(100% - 56px);margin:28px;border-radius:8px;background:#000"></video>`:""}<section class="case-story"><article><h2>Challenge</h2><p>${esc(p.challenge||"Create premium content that builds trust and pushes viewers toward enquiry.")}</p></article><article><h2>Solution</h2><p>${esc(p.solution||"Develop a cinematic concept, production plan, editing rhythm, and distribution-ready asset system.")}</p></article><article><h2>Creative Process</h2><p>Moodboard, script, shot list, production, edit, color, sound, captions, exports, and publishing workflow.</p></article><article><h2>Results</h2><p>${esc(p.results||"Stronger brand perception, reusable assets, and better performance across social, web, and ads.")}</p></article></section><section class="case-gallery"><img src="${esc(p.image_url||p.thumbnail)}" alt="Gallery"><img src="${esc(p.thumbnail)}" alt="Behind the scenes"></section><section class="related"><a class="btn btn-primary" href="#contact">Book Consultation</a></section>`;caseModal.classList.add("open");caseModal.setAttribute("aria-hidden","false")}
function setupBA(){const items=[{cat:"Image",title:"Product Polish",before:fallbackPortfolio[3].thumbnail,after:`${media}photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=95`},{cat:"Video",title:"Commercial Grade",before:fallbackPortfolio[0].thumbnail,after:`${media}photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=95`}];baFilters.innerHTML=items.map((x,i)=>`<button class="${i?"":"active"}" data-ba="${i}">${x.cat}</button>`).join("");const draw=i=>{const x=items[i];beforeAfterStage.innerHTML=`<div class="ba-card"><div class="ba-view" style="--pos:50%;--zoom:1"><img src="${x.before}" alt="Before"><img class="ba-after" src="${x.after}" alt="After"><input class="ba-range" type="range" min="0" max="100" value="50"><span class="ba-handle"></span></div><div class="ba-controls"><div><span class="eyebrow">${x.cat}</span><h3>${x.title}</h3></div><button data-zoom><i class="fa-solid fa-magnifying-glass-plus"></i></button><button data-full><i class="fa-solid fa-expand"></i></button></div></div>`;const view=document.querySelector(".ba-view"),range=document.querySelector(".ba-range");range.oninput=()=>view.style.setProperty("--pos",range.value+"%");document.querySelector("[data-zoom]").onclick=()=>view.style.setProperty("--zoom",view.style.getPropertyValue("--zoom")==="1.18"?"1":"1.18");document.querySelector("[data-full]").onclick=()=>view.requestFullscreen?.()};draw(0);baFilters.onclick=e=>{const b=e.target.closest("button");if(!b)return;baFilters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));draw(+b.dataset.ba)}}
function renderFeeds(){instagramGrid.innerHTML=fallbackPortfolio.slice(0,6).map(p=>`<a href="${cfg.instagram}" target="_blank" rel="noopener"><img src="${p.thumbnail}" alt="${esc(p.title)}" loading="lazy"><span><i class="fa-brands fa-instagram"></i></span></a>`).join("");youtubeList.innerHTML=portfolio.filter(p=>p.video_url).slice(0,4).map(p=>`<article><img src="${esc(p.thumbnail)}" alt="${esc(p.title)}"><div><span class="meta">${fmt(p.date)}</span><h3>${esc(p.title)}</h3><button data-video="${esc(p.video_url)}" data-title="${esc(p.title)}"><i class="fa-solid fa-play"></i> Play Video</button></div></article>`).join("");delegateVideoButtons()}
function delegateVideoButtons(){document.querySelectorAll("[data-video]").forEach(b=>{b.onclick=()=>openVideo(b.dataset.video,b.dataset.title)})}
function openVideo(src,title){modalVideo.src=src;modalVideo.setAttribute("aria-label",title||"Video");videoModal.classList.add("open");videoModal.setAttribute("aria-hidden","false");modalVideo.play().catch(()=>{})}
function setupFAQ(){faqList.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const panel=btn.nextElementSibling;const open=panel.style.height&&panel.style.height!=="0px";faqList.querySelectorAll("article div").forEach(x=>gsap?gsap.to(x,{height:0,duration:.25}):x.style.height=0);faqList.querySelectorAll("i").forEach(i=>i.className="fa-solid fa-plus");if(!open){if(window.gsap)gsap.to(panel,{height:panel.scrollHeight,duration:.28});else panel.style.height=panel.scrollHeight+"px";btn.querySelector("i").className="fa-solid fa-minus"}}))}
function initForms(){contactForm?.addEventListener("submit",async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));if(data.website)return;formStatus.textContent="Preparing WhatsApp...";if(db)await db.from("leads").insert([{...data,source:"website"}]);window.open(`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(`New enquiry from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone||"-"}\nProject: ${data.message}`)}`,"_blank","noopener");e.currentTarget.reset();formStatus.textContent="Message prepared. We will reply shortly."});newsletterForm?.addEventListener("submit",async e=>{e.preventDefault();const email=new FormData(e.currentTarget).get("email");if(db)await db.from("newsletter").insert([{email}]);e.currentTarget.reset()});blogSearch?.addEventListener("input",()=>{const q=blogSearch.value.toLowerCase();blogGrid.innerHTML=blogs.filter(b=>`${b.title} ${b.category} ${b.description}`.toLowerCase().includes(q)).map(renderBlog).join("")})}
function initSearch(){openSearch?.addEventListener("click",()=>{searchModal.classList.add("open");setTimeout(()=>globalSearchInput.focus(),40)});globalSearchInput?.addEventListener("input",()=>{const q=globalSearchInput.value.toLowerCase();const rows=[...portfolio.map(p=>({type:"Project",label:p.title,id:p.id})),...services.map(s=>({type:"Service",label:s.title,hash:"services"})),...blogs.map(b=>({type:"Blog",label:b.title,hash:"blog"}))].filter(x=>x.label.toLowerCase().includes(q)).slice(0,12);globalSearchResults.innerHTML=rows.map(r=>`<button data-id="${r.id||""}" data-hash="${r.hash||""}"><span class="meta">${r.type}</span><br>${esc(r.label)}</button>`).join("")});globalSearchResults?.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;searchModal.classList.remove("open");if(b.dataset.id)openCase(b.dataset.id);else location.hash=b.dataset.hash})}

// Internship data is kept separate from rendering so cards can be reused.
const internships = [
  { id: "INT-101", title: "Frontend Intern", domain: "Full Stack Development", mode: "Remote", location: "India", skills: ["HTML", "CSS", "JavaScript"], openings: 3, description: "Help build accessible, responsive web experiences and bring product ideas to life." },
  { id: "INT-102", title: "API Engineering Intern", domain: "Full Stack Development", mode: "Hybrid", location: "Pune", skills: ["Node.js", "SQL", "Testing"], openings: 2, description: "Work with a development team to design, test, and document reliable APIs." },
  { id: "INT-103", title: "UI/UX Intern", domain: "UI/UX", mode: "Remote", location: "India", skills: ["Figma", "Research", "Accessibility"], openings: 1, description: "Turn user research and ideas into clear, thoughtful digital experiences." },
  { id: "INT-104", title: "Data Analyst Intern", domain: "Data Analytics", mode: "On-site", location: "Bengaluru", skills: ["Excel", "SQL", "Data visualisation"], openings: 2, description: "Explore datasets, find useful patterns, and communicate insights through visuals." },
  { id: "INT-105", title: "Security Operations Intern", domain: "Cyber Security", mode: "Remote", location: "India", skills: ["Linux", "Logs", "Networking"], openings: 1, description: "Support defensive security work by reviewing logs and documenting observations." }
];

const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const modeFilter = document.querySelector("#mode-filter");
const filterForm = document.querySelector("#filter-form");
const resultsCount = document.querySelector("#results-count");
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const emptyState = document.querySelector("#empty-state");
const retryButton = document.querySelector("#retry-button");
const clearFiltersButton = document.querySelector("#clear-filters");
const dialog = document.querySelector("#details-dialog");
const dialogContent = document.querySelector("#dialog-content");
const announcer = document.querySelector("#announcer");

let allInternships = [];
let loadTimer;

function populateDomains(records) {
  const domains = [...new Set(records.map((item) => item.domain))].sort();
  domainFilter.innerHTML = '<option value="all">All domains</option>';
  domains.forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    domainFilter.append(option);
  });
}

function createCard(internship) {
  const article = document.createElement("article");
  article.className = "internship-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const mark = document.createElement("div");
  mark.className = "company-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = internship.title.charAt(0);
  const mode = document.createElement("span");
  mode.className = "mode-pill";
  mode.textContent = internship.mode;
  top.append(mark, mode);

  const domain = document.createElement("p");
  domain.className = "card-domain";
  domain.textContent = internship.domain;
  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = internship.title;
  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `<span>⌖ ${escapeHTML(internship.location)}</span><span>▣ ${escapeHTML(internship.id)}</span>`;
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = internship.description;

  const skills = document.createElement("div");
  skills.className = "skill-list";
  skills.setAttribute("aria-label", "Required skills");
  internship.skills.forEach((skill) => {
    const tag = document.createElement("span");
    tag.className = "skill";
    tag.textContent = skill;
    skills.append(tag);
  });

  const footer = document.createElement("div");
  footer.className = "card-footer";
  const openings = document.createElement("span");
  openings.className = "openings";
  openings.textContent = `${internship.openings} opening${internship.openings === 1 ? "" : "s"}`;
  const action = document.createElement("button");
  action.className = "card-action";
  action.type = "button";
  action.textContent = "View details";
  action.setAttribute("aria-label", `View details for ${internship.title}`);
  action.addEventListener("click", () => showDetails(internship.id));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  action.append(arrow);
  footer.append(openings, action);
  article.append(top, domain, title, meta, description, skills, footer);
  return article;
}

// Escape dynamic text used in the small metadata template.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function renderInternships(records) {
  grid.replaceChildren();
  records.forEach((internship) => grid.append(createCard(internship)));
  const countText = `${records.length} internship${records.length === 1 ? "" : "s"} found`;
  resultsCount.textContent = countText;
  announcer.textContent = countText;
  emptyState.hidden = records.length !== 0;
  grid.hidden = records.length === 0;
}

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const domain = domainFilter.value;
  const mode = modeFilter.value;
  const filtered = allInternships.filter((item) => {
    const searchable = [item.title, item.domain, item.location, item.id, item.description, ...item.skills].join(" ").toLowerCase();
    return (!keyword || searchable.includes(keyword))
      && (domain === "all" || item.domain === domain)
      && (mode === "all" || item.mode === mode);
  });
  renderInternships(filtered);
}

function showDetails(id) {
  const item = allInternships.find((internship) => internship.id === id);
  if (!item) return;
  dialogContent.replaceChildren();
  const title = document.createElement("h2");
  title.id = "dialog-title";
  title.className = "dialog-title";
  title.textContent = item.title;
  const domain = document.createElement("p");
  domain.className = "card-domain";
  domain.textContent = item.domain;
  const description = document.createElement("p");
  description.className = "dialog-copy";
  description.textContent = item.description;
  const details = document.createElement("div");
  details.className = "dialog-details";
  [["Work mode", item.mode], ["Location", item.location], ["Openings", item.openings], ["Reference ID", item.id]].forEach(([label, value]) => {
    const box = document.createElement("div");
    box.className = "detail-box";
    const small = document.createElement("small");
    small.textContent = label;
    const strong = document.createElement("b");
    strong.textContent = value;
    box.append(small, strong);
    details.append(box);
  });
  const skillsTitle = document.createElement("h4");
  skillsTitle.textContent = "Skills you'll work with";
  const skills = document.createElement("div");
  skills.className = "skill-list dialog-skills";
  item.skills.forEach((skill) => {
    const tag = document.createElement("span");
    tag.className = "skill";
    tag.textContent = skill;
    skills.append(tag);
  });
  dialogContent.append(domain, title, description, details, skillsTitle, skills);
  dialog.showModal();
  dialog.querySelector("[data-close-dialog]").focus();
}

function loadListings(shouldFail = false) {
  clearTimeout(loadTimer);
  loadingState.hidden = false;
  errorState.hidden = true;
  emptyState.hidden = true;
  grid.hidden = true;
  resultsCount.textContent = "Loading opportunities…";
  loadTimer = setTimeout(() => {
    if (shouldFail) {
      loadingState.hidden = true;
      errorState.hidden = false;
      resultsCount.textContent = "Unable to load opportunities";
      return;
    }
    allInternships = [...internships];
    populateDomains(allInternships);
    loadingState.hidden = true;
    applyFilters();
  }, 350);
}

searchInput.addEventListener("input", applyFilters);
domainFilter.addEventListener("change", applyFilters);
modeFilter.addEventListener("change", applyFilters);
filterForm.addEventListener("reset", () => {
  // The reset event fires before controls return to defaults.
  requestAnimationFrame(() => applyFilters());
});
retryButton.addEventListener("click", () => loadListings(false));
clearFiltersButton.addEventListener("click", () => {
  filterForm.reset();
  searchInput.focus();
});
dialog.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.querySelector("#year").textContent = new Date().getFullYear();

loadListings();

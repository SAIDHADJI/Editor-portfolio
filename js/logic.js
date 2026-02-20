const ProjectsData = [
  {
    id: 1,
    title: "Urban Pulse",
    categoryDate: "Commercial • 2024",
    description:
      "A high-energy brand film designed to capture movement, rhythm, and identity. Built around sharp pacing and dynamic transitions, this piece transforms everyday motion into a compelling visual narrative.",
    videoSrc: "videos/v.mp4",
  },
  {
    id: 2,
    title: "Midnight Echoes",
    categoryDate: "Music Video • 2023",
    description:
      "A cinematic exploration of mood and atmosphere. Through intentional lighting and immersive color grading, the story unfolds frame by frame, blending emotion with visual depth.",
    videoSrc: "videos/v.mp4",
  },
  {
    id: 3,
    title: "Between Frames",
    categoryDate: "Documentary • 2024",
    description:
      "A character-driven story focused on authenticity and subtle expression. Minimal cuts, deliberate silence, and intimate close-ups shape a narrative that feels raw and human.",
    videoSrc: "videos/v.mp4",
  },
];

const UI = {
  nav: {
    root: document.getElementById("nav-items"),
    labels: ["Home", "Work", "About", "Services", "Contact"],
  },
  mobileNav: {
    root: document.getElementById("mobile-navBar"),
    openButton: document.getElementById("open-navBar"),
    closeButton: document.getElementById("close-navBar"),
  },
  work: {
    container: document.querySelector(".videos"),
    icons: document.querySelectorAll(".icon"),
  },
  overlay: {
    container: document.getElementById("overlay"),
    closeBtn: document.querySelector("[data-close-overlay-btn]"),
    videoPlayer: document.querySelector("[data-overlay-video]"),
  },
  contact: {
    textarea: document.getElementById("message"),
  },
};

function renderNav(root, labels) {
  labels.forEach((label) => {
    const linkWrapper = document.createElement("div");
    linkWrapper.className = "relative h-5 flex flex-col overflow-hidden group";

    const defaultLink = document.createElement("span");
    defaultLink.className =
      "text-white/80 cursor-pointer group-hover:-translate-y-5 duration-200";
    defaultLink.textContent = label;

    const hoverLink = document.createElement("a");
    hoverLink.href = `#${label}`;
    hoverLink.className =
      "text-indigo-500 group-hover:-translate-y-6 duration-200";
    hoverLink.textContent = label;

    linkWrapper.append(defaultLink, hoverLink);
    root.appendChild(linkWrapper);
  });
}

renderNav(UI.nav.root, UI.nav.labels);

function initMobileNav(navEl, openBtn, closeBtn) {
  openBtn.addEventListener("click", () => {
    navEl.classList.remove("translate-x-full");
  });

  closeBtn.addEventListener("click", () => {
    navEl.classList.add("translate-x-full");
  });
}

initMobileNav(
  UI.mobileNav.root,
  UI.mobileNav.openButton,
  UI.mobileNav.closeButton,
);

function createProjectCard(project, container) {
  if (!container) return;
  const { id, title, categoryDate, description, videoSrc } = project;

  const projectWrapper = document.createElement("div");
  projectWrapper.className =
    id % 2 === 0
      ? "flex flex-col lg:flex-row-reverse gap-8"
      : "flex flex-col lg:flex-row gap-8";

  const detailsWrapper = document.createElement("div");
  detailsWrapper.className = "w-full flex flex-col justify-center gap-8";

  const titleDateWrapper = document.createElement("div");
  titleDateWrapper.className = "space-y-4";

  const titleEl = document.createElement("h1");
  titleEl.className = "text-white text-4xl font-medium";
  titleEl.textContent = title;

  const categoryDateEl = document.createElement("span");
  categoryDateEl.className = "text-white/80";
  categoryDateEl.textContent = categoryDate;

  const descriptionEl = document.createElement("p");
  descriptionEl.className = "text-white/50 text-justify leading-8";
  descriptionEl.textContent = description;

  const videoWrapper = document.createElement("div");
  videoWrapper.className =
    "relative w-full flex justify-center items-center rounded-2xl overflow-hidden cursor-pointer group";

  const videoEl = document.createElement("video");
  videoEl.dataset.video = id;

  const sourceEl = document.createElement("source");
  sourceEl.src = videoSrc;
  sourceEl.type = "video/mp4";

  const fallbackText = document.createElement("span");
  fallbackText.textContent = "Your browser does not support the video tag.";

  const toggleVideoBtn = document.createElement("button");
  toggleVideoBtn.dataset.playVideoBtn = id;
  toggleVideoBtn.className =
    "absolute w-16 h-16 flex justify-center items-center rounded-full bg-black/50 cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 duration-500";

  const playIcon = document.createElement("i");
  playIcon.className = "icon fa-solid fa-play text-white text-lg";

  titleDateWrapper.append(titleEl, categoryDateEl);
  detailsWrapper.append(titleDateWrapper, descriptionEl);

  videoEl.append(sourceEl, fallbackText);
  toggleVideoBtn.append(playIcon);
  videoWrapper.append(videoEl, toggleVideoBtn);

  projectWrapper.append(detailsWrapper, videoWrapper);
  container.append(projectWrapper);
}

function renderProjects(projects, container) {
  projects.forEach((project) => createProjectCard(project, container));
}

renderProjects(ProjectsData, UI.work.container);

function handleVideoPlayback(container) {
  if (!container) return;

  container.addEventListener("click", (e) => {
    const playBtn = e.target.closest("[data-play-video-btn]");
    if (!playBtn) return;

    const id = playBtn.dataset.playVideoBtn;
    const icon = playBtn.querySelector("i");
    const allVideos = container.querySelectorAll("video");

    allVideos.forEach((v) => {
      const btn = container.querySelector(
        `[data-play-video-btn="${v.dataset.video}"]`,
      );
      const btnIcon = btn.querySelector("i");

      if (v.dataset.video === id) {
        if (v.paused) {
          v.play();
          playBtn.classList.add("opacity-0");
          icon.className = "fa-solid fa-pause text-white text-lg";
        } else {
          v.pause();
          playBtn.classList.remove("opacity-0");
          icon.className = "fa-solid fa-play text-white text-lg";
        }
      } else {
        v.pause();
        btn.classList.remove("opacity-0");
        btnIcon.className = "fa-solid fa-play text-white text-lg";
      }
    });
  });
}

handleVideoPlayback(UI.work.container);

function openOverlay(container, overlayEl, videoPlayer) {
  const videos = container.querySelectorAll("video");
  videos.forEach((v) => {
    v.addEventListener("click", () => {
      const src = v.querySelector("source").src;
      videoPlayer.src = src;
      videoPlayer.load();
      videoPlayer.play();
      overlayEl.classList.remove("hidden");
    });
  });
}

function closeOverlay(overlayEl, videoPlayer, closeBtn) {
  overlayEl.addEventListener("click", () => {
    videoPlayer.pause();
    overlayEl.classList.add("hidden");
  });

  closeBtn.addEventListener("click", () => {
    videoPlayer.pause();
    overlayEl.classList.add("hidden");
  });

  videoPlayer.addEventListener("click", (e) => e.stopPropagation());
}

openOverlay(UI.work.container, UI.overlay.container, UI.overlay.videoPlayer);
closeOverlay(UI.overlay.container, UI.overlay.videoPlayer, UI.overlay.closeBtn);

function enableTextareaAutoResize(textarea, maxHeight = 300) {
  if (!textarea) return;

  const resize = () => {
    textarea.style.height = "auto";

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + "px";

    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  textarea.addEventListener("input", resize);
  resize();
}

enableTextareaAutoResize(UI.contact.textarea, 300);

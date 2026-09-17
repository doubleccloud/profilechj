gsap.registerPlugin(ScrollTrigger);

// header load
const tl = gsap.timeline({defaults:{ease:"power4.out"}});
tl.to(".main-title .word span", {
  y:0,
  duration:1,
  stagger:0.07
})
.to("#headerSub", {opacity:1, duration:0.6}, "-=0.3")
.from(".scroll-cue", {opacity:0, duration:0.6}, "-=0.2")
.from("nav", {opacity:0, y:-10, duration:0.6}, "-=0.8");

// SECTION RULE DRAW ON SCROLL
gsap.utils.toArray("[data-rule]").forEach(rule=>{
  gsap.fromTo(rule, {scaleX:0}, {
    scaleX:1,
    duration:1,
    ease:"power2.out",
    scrollTrigger:{
      trigger:rule,
      start:"top 85%",
    }
  });
});

/*ABOUT PHOTO + LINES*/
gsap.from(".about-photo-wrap", {
  opacity:0,
  x:-90,
  duration:1.2,
  ease:"power4.out",
  scrollTrigger:{
    trigger:".about",
    start:"top 75%",
  }
});

gsap.from(".photo-main", {
  opacity: 0,
  y: 60,
  rotate: -8,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".about-photo-wrap",
    start: "top 78%",
  }
});

gsap.from(".photo-accent", {
  opacity: 0,
  y: 40,
  scale: 0.8,
  rotate: 18,
  duration: 0.9,
  delay: 0.25,
  ease: "back.out(1.8)",
  scrollTrigger: {
    trigger: ".about-photo-wrap",
    start: "top 78%",
  }
});

gsap.to(".about-line", {
  opacity:1,
  y:0,
  duration:1.1,
  stagger:0.2,
  ease:"power4.out",
  scrollTrigger:{
    trigger:".lines",
    start:"top 78%",
  }
});

/* WORKS 스크롤 리빌*/
gsap.utils.toArray(".work-card").forEach((card, i)=>{
  const fromX = i % 2 === 0 ? -60 : 60;
  gsap.fromTo(card,
    {opacity:0, x:fromX, y:40},
    {
      opacity:1, x:0, y:0,
      duration:1,
      ease:"power4.out",
      scrollTrigger:{
        trigger:card,
        start:"top 85%",
      }
    }
  );
});




// section 배경
const bgLayer = document.getElementById("bgLayer");
const bgColors = {
  header:  "#4898EE",
  about:   "#F5F8FC",
  works:   "#E8F0FB",
  skills:  "#F5F8FC",
  contact: "#4898EE"
};

Object.keys(bgColors).forEach(id=>{
  const el = document.getElementById(id);
  if(!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: "top 55%",
    end: "bottom 55%",
    onEnter: () => gsap.to(bgLayer, {backgroundColor: bgColors[id], duration:1, ease:"power2.inOut"}),
    onEnterBack: () => gsap.to(bgLayer, {backgroundColor: bgColors[id], duration:1, ease:"power2.inOut"}),
  });
});

/* section 타이틀 패럴록스 */
gsap.utils.toArray(".section-title").forEach(title=>{
  gsap.from(title, {
    opacity:0,
    y:60,
    scale:0.94,
    duration:1.1,
    ease:"power4.out",
    scrollTrigger:{
      trigger:title,
      start:"top 88%",
    }
  });
});

/* work 카드 마우스 태그 인터랙션 */
document.querySelectorAll(".work-card").forEach(card=>{
  const tags = card.querySelectorAll(".work-tags span");

  card.addEventListener("mousemove", (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");
  });

  card.addEventListener("mouseenter", ()=>{
    gsap.fromTo(tags,
      {y:12, opacity:0.4},
      {y:0, opacity:1, stagger:0.05, duration:0.45, ease:"back.out(2.2)"}
    );
  });
});

document.querySelectorAll(".work-card").forEach(card=>{
  const tags = card.querySelectorAll(".work-link span");

  card.addEventListener("mousemove", (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");
  });

  card.addEventListener("mouseenter", ()=>{
    gsap.fromTo(tags,
      {y:12, opacity:0.4},
      {y:0, opacity:1, stagger:0.05, duration:0.45, ease:"back.out(2.2)"}
    );
  });
});

/* skills 리빌*/
gsap.to(".skill-card", {
  opacity:1,
  y:0,
  duration:1,
  stagger:0.15,
  ease:"power4.out",
  scrollTrigger:{
    trigger:".skills-grid",
    start:"top 82%",
  }
});


/* contact 타이틀 리빌*/
gsap.from(".contact-title", {
  opacity:0,
  y:70,
  scale:0.95,
  duration:1.2,
  ease:"power4.out",
  scrollTrigger:{
    trigger:".contact-title",
    start:"top 80%",
  }
});

/* work 팝업 */

const modal = document.getElementById('workModal');
const modalGif = document.getElementById('modalGif');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalFeatures = document.getElementById('modalFeatures');
const modalLink = document.getElementById('modalLink');

document.querySelectorAll('.work-arrow').forEach(arrow => {
  arrow.addEventListener('click', () => {
    modalGif.src = arrow.dataset.gif;
    modalTitle.textContent = arrow.dataset.title;
    modalDesc.textContent = arrow.dataset.desc;
    modalLink.href = arrow.dataset.link;

    // "|" 구분자로 넣은 기능 리스트 파싱
    modalFeatures.innerHTML = '';
    arrow.dataset.features.split('|').forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    modal.classList.add('active');
  });
});

function closeModal() {
  modal.classList.remove('active');
}
document.getElementById('workModalClose').addEventListener('click', closeModal);
document.querySelector('.work-modal-overlay').addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
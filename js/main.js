const GH = 'your-github-username'; // REPLACE with your real GitHub username

/* NAV */
const nav=document.getElementById('mainNav');
const menu=document.getElementById('navMenu');
const burger=document.getElementById('burgerBtn');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>80);
  document.getElementById('topBtn').classList.toggle('show',scrollY>700);
},{passive:true});
burger.addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
document.getElementById('topBtn').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

/* ACTIVE NAV */
document.querySelectorAll('section[id]').forEach(s=>{
  new IntersectionObserver(en=>en.forEach(e=>{
    if(e.isIntersecting)document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
  }),{threshold:.35}).observe(s);
});

/* REVEAL */
const ro=new IntersectionObserver(en=>en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v');}),{threshold:.1});
document.querySelectorAll('.r').forEach(el=>ro.observe(el));

/* SKILL BARS */
const so=new IntersectionObserver(en=>en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v');}),{threshold:.3});
document.querySelectorAll('.sk-row').forEach(el=>so.observe(el));

/* COUNTERS */
function animCount(el,t){
  let c=0;const inc=t/50;
  const step=()=>{c+=inc;if(c>=t){el.textContent=t+(t===100?'%':'+');return;}el.textContent=Math.floor(c)+(t===100?'%':'+');requestAnimationFrame(step);};
  step();
}
const co=new IntersectionObserver(en=>en.forEach(e=>{if(e.isIntersecting){animCount(e.target,+e.target.dataset.count);co.unobserve(e.target);}}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* TYPING */
const roles=['devops_engineer','cloud_engineer','automation_specialist','linux_admin'];
const tel=document.getElementById('typed');
let ri=0,ci=0,del=false;
function type(){const w=roles[ri];if(!del){ci++;tel.textContent=w.slice(0,ci);if(ci===w.length){del=true;setTimeout(type,1300);return;}}else{ci--;tel.textContent=w.slice(0,ci);if(ci===0){del=false;ri=(ri+1)%roles.length;}}setTimeout(type,del?38:82);}
type();

/* MARQUEE */
const words=['AWS','Docker','Kubernetes','Terraform','Jenkins','Ansible','Linux','Bash','Python','Git','CI/CD','Infrastructure as Code','VPC','IAM','CloudWatch'];
const all=[...words,...words];
document.getElementById('marq').innerHTML=all.map(w=>`<div class="mitem">${w}<span class="sep"> ✦ </span></div>`).join('');

/* FILTER */
document.getElementById('filterBar').addEventListener('click',e=>{
  const b=e.target.closest('.fb');if(!b)return;
  document.querySelectorAll('.fb').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  const f=b.dataset.f;
  document.querySelectorAll('.pcard').forEach(c=>c.classList.toggle('hidden',f!=='all'&&!c.dataset.tags.includes(f)));
});

/* CONTACT FORM */
document.getElementById('cForm').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('cN'),em=document.getElementById('cE'),m=document.getElementById('cM');
  const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let ok=true;
  const chk=(id,bad)=>{document.getElementById(id).classList.toggle('bad',bad);if(bad)ok=false;};
  chk('fg-n',!n.value.trim());chk('fg-e',!re.test(em.value.trim()));chk('fg-m',!m.value.trim());
  if(!ok)return;
  const msg=document.getElementById('formOk');msg.classList.add('show');e.target.reset();
  setTimeout(()=>msg.classList.remove('show'),5000);
});

/* GITHUB */
document.getElementById('ghImg').src=`https://ghchart.rshah.org/8fbe9f/${GH}`;
(async()=>{
  const g=document.getElementById('repoGrid');
  if(GH==='your-github-username')return;
  try{
    const r=await fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=6`);
    if(!r.ok)throw 0;
    const repos=await r.json();
    if(!repos.length){g.innerHTML='<div class="gh-empty">No public repos found.</div>';return;}
    g.innerHTML=repos.map(x=>`<div class="rcard"><div class="r-name">${x.name}</div><div class="r-desc">${(x.description||'No description.').slice(0,80)}</div><div class="r-meta"><span>\u2605 ${x.stargazers_count}</span><span>${x.language||'\u2014'}</span></div></div>`).join('');
  }catch{g.innerHTML='<div class="gh-empty">Set your GitHub username in the script to load live repos.</div>';}
})();

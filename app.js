const signals = [
  { level: 'red', title: 'Cross-case connection identified', text: 'CF-2026-184 and CF-2026-156 share a device and two locations.', score: '94%' },
  { level: 'orange', title: 'Unusual communication pattern', text: 'A 3x increase in linked-device activity was observed overnight.', score: '82%' },
  { level: 'orange', title: 'New entity overlap', text: 'Alias “Mosaic” appears in two newly processed reports.', score: '76%' }
];
const signalList = document.querySelector('#signal-list');
signalList.innerHTML = signals.map(s => `<article class="signal"><i class="${s.level}"></i><div><h3>${s.title}</h3><p>${s.text}</p></div><small>${s.score}</small></article>`).join('');

function nodes(target, full = false) {
  const data = [['n1 person','RS'],['n2 phone focus','D-'],['n3 person','NK'],['n4 org','AT'],['n5 phone','L-']];
  target.innerHTML = data.map(([classes,label]) => `<span class="node ${classes}">${label}</span>`).join('');
  if (full) target.insertAdjacentHTML('beforeend', '<span class="node person" style="left:57%;top:76%">AR</span><span class="node org" style="left:8%;top:13%">RK</span>');
}
nodes(document.querySelector('#mini-graph'));
nodes(document.querySelector('#full-graph'), true);

const titles = {overview:['OVERVIEW','Good morning, Analyst.'],graph:['KNOWLEDGE GRAPH','Network investigation'],cases:['CASE INTELLIGENCE','Evidence-linked findings'],map:['GEO INTELLIGENCE','Location intelligence']};
function switchView(name) {
  document.querySelectorAll('.content-view').forEach(v => v.classList.toggle('active', v.id === name));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  [document.querySelector('#section-kicker').textContent, document.querySelector('#page-title').textContent] = titles[name];
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));btn.classList.add('active')}));
const modal = document.querySelector('#modal');
document.querySelector('#ingest-btn').onclick = () => modal.classList.add('open');
document.querySelector('#close-modal').onclick = () => modal.classList.remove('open');
modal.onclick = e => { if(e.target === modal) modal.classList.remove('open') };
document.querySelector('#run-analysis').onclick = () => { modal.classList.remove('open'); showToast('Analysis started. Entities will appear in the graph shortly.'); };
document.querySelector('#assign-btn').onclick = () => showToast('Case assigned to your review queue.');
document.querySelector('#focus-link').onclick = () => {const n=document.querySelector('#full-graph .focus'); n.animate([{transform:'scale(1)'},{transform:'scale(1.22)'},{transform:'scale(1)'}],{duration:700});showToast('High-risk connection path highlighted.');};
function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)}

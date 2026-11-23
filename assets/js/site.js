(() => {
  const $ = (s) => document.querySelector(s);
  let lang = localStorage.getItem('hg-portfolio-lang') || 'vi';
  const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (v='') => /^(https?:\/\/|assets\/|mailto:)/i.test(v) ? v : '';
  function setLang(next) {
    lang = next; localStorage.setItem('hg-portfolio-lang', lang); document.documentElement.lang = lang;
    document.querySelectorAll('[data-vi][data-en]').forEach(el => { el.innerHTML = el.dataset[lang]; });
    $('#langSwitch').textContent = lang === 'vi' ? 'EN' : 'VI';
    render(window.portfolioData || {});
  }
  function cardImage(src, alt) { return src ? `<img class="dynamic-image" src="${esc(safeUrl(src))}" alt="${esc(alt)}" loading="lazy">` : `<div class="dynamic-placeholder"><span>3D / RE</span></div>`; }
  function render(data) {
    const projects = data.projects || [], gallery = data.gallery || [], courses = data.courses || [], cv = data.cv || {}, p = data.profile || {};
    $('#projectList').innerHTML = projects.length ? projects.map(x => `<article class="dynamic-card">${cardImage(x.image, lang==='vi'?x.titleVi:x.titleEn)}<div class="dynamic-card-body"><small>${esc(lang==='vi'?x.categoryVi:x.categoryEn)}</small><h3>${esc(lang==='vi'?x.titleVi:x.titleEn)}</h3><p>${esc(lang==='vi'?x.descriptionVi:x.descriptionEn)}</p>${x.tools?`<span class="tag">${esc(x.tools)}</span>`:''}${safeUrl(x.link)?`<a class="text-link" href="${esc(x.link)}" target="_blank" rel="noopener">${lang==='vi'?'Xem chi tiết ↗':'View details ↗'}</a>`:''}</div></article>`).join('') : '<p class="empty-state">Chưa có dự án. Thêm dự án tại trang quản trị.</p>';
    $('#galleryList').innerHTML = gallery.length ? gallery.map(x => `<article class="gallery-card">${x.type==='video' && safeUrl(x.url) ? `<a href="${esc(x.url)}" target="_blank" rel="noopener" class="video-thumb">▶<span>${esc(x.title||'Video')}</span></a>` : `<a href="${esc(safeUrl(x.image))}" target="_blank" rel="noopener">${cardImage(x.image,x.title)}</a>`}<div class="dynamic-card-body"><h3>${esc(x.title||'')}</h3><p>${esc(x.caption||'')}</p></div></article>`).join('') : '<p class="empty-state">Chưa có ảnh hoặc video. Bạn có thể tải ảnh và thêm liên kết video trong trang quản trị.</p>';
    $('#courseList').innerHTML = courses.length ? courses.map(x => `<article class="course-card"><span class="course-index">COURSE / ${esc(x.software||'')}</span><h3>${esc(lang==='vi'?x.titleVi:x.titleEn)}</h3><p>${esc(lang==='vi'?x.descriptionVi:x.descriptionEn)}</p><div class="course-meta">${esc(lang==='vi'?x.levelVi:x.levelEn)}</div>${safeUrl(x.link)?`<a class="text-link" href="${esc(x.link)}" target="_blank" rel="noopener">${lang==='vi'?'Thông tin khóa học ↗':'Course details ↗'}</a>`:''}</article>`).join('') : '<p class="empty-state">Chưa có khóa học được đăng tải.</p>';
    $('#cvLinks').innerHTML = `<a class="cv-download" href="${esc(safeUrl(cv.vi)||'#')}" ${safeUrl(cv.vi)?'download':'aria-disabled="true"'}><span>CV</span><b>Hồ sơ tiếng Việt / Vietnamese CV</b><strong>↓</strong></a><a class="cv-download" href="${esc(safeUrl(cv.en)||'#')}" ${safeUrl(cv.en)?'download':'aria-disabled="true"'}><span>CV</span><b>English Curriculum Vitae</b><strong>↓</strong></a>`;
    const links = [p.email?`<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`:'',p.phone?`<a href="tel:${esc(p.phone.replace(/[^+\d]/g,''))}">${esc(p.phone)}</a>`:'',p.linkedin?`<a target="_blank" rel="noopener" href="${esc(safeUrl(p.linkedin))}">LinkedIn ↗</a>`:'',p.fiverr?`<a target="_blank" rel="noopener" href="${esc(safeUrl(p.fiverr))}">Fiverr ↗</a>`:'',p.upwork?`<a target="_blank" rel="noopener" href="${esc(safeUrl(p.upwork))}">Upwork ↗</a>`:''];
    $('#contactDetails').innerHTML = `<span>${esc(p.location||'Đà Nẵng, Việt Nam')}</span>${links.filter(Boolean).join('<span class="contact-sep">·</span>')}`;
    window.quoteEmail = p.quoteEmail || p.email || '';
  }
  async function load() { try { const r=await fetch('data/content.json?v='+Date.now()); if(!r.ok) throw new Error('HTTP '+r.status); window.portfolioData=await r.json(); render(window.portfolioData); } catch(e) { console.error(e); } }
  $('#langSwitch').addEventListener('click',()=>setLang(lang==='vi'?'en':'vi'));
  $('#menuToggle')?.addEventListener('click',()=>$('#navLinks').classList.toggle('open'));
  document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));
  $('#quoteForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const email=window.quoteEmail||'';if(!email){$('#formStatus').textContent=lang==='vi'?'Chủ website chưa cấu hình email nhận báo giá.':'The site owner has not configured a quotation email.';return;}const subject=encodeURIComponent(`[Portfolio] ${f.get('service')} – ${f.get('name')}`);const body=encodeURIComponent(`Họ tên / Name: ${f.get('name')}\nEmail: ${f.get('email')}\nĐiện thoại / Phone: ${f.get('phone')}\nDịch vụ / Service: ${f.get('service')}\n\nChi tiết / Details:\n${f.get('details')}`);window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;$('#formStatus').textContent=lang==='vi'?'Đã tạo nội dung email. Vui lòng nhấn gửi trong ứng dụng email.':'Email draft prepared. Please send it from your email application.';});
  $('#year').textContent=new Date().getFullYear(); load().then(()=>setLang(lang));
})();

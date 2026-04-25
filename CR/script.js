// ========== بيانات المشتركين والعمليات ==========
function loadSubscribers() {
    const saved = localStorage.getItem('subscribersDB');
    return saved ? JSON.parse(saved) : {
        'فهد بن خالد': { fullName:'فهد بن خالد العتيبي', iban:'SA9430022016445678901824', displayIban:'SA943 0022 0164 4567 8901 824', joinDate:'2025-08-10', totalProfit:'15,500 ر.س', withdrawable:'11,000 ر.س', status:'نشط', email:'fahad8465@gmail.com', phone:'0501234567', lastActive:'2026-04-19', accountType:'ذهبي', pendingFee:'3,500 ر.س' },
        'أحمد العتيبي': { fullName:'أحمد محمد العتيبي', iban:'SA4637090163451739018365', displayIban:'SA463 7090 1634 5173 9018 365', joinDate:'2025-11-22', totalProfit:'3,450 ر.س', withdrawable:'2,200 ر.س', status:'نشط', email:'ah5me5431d@gmail.com', phone:'0551122334', lastActive:'2026-04-18', accountType:'فضي', pendingFee:'2,800 ر.س' },
        'عفاف مبارك': { fullName:'عفاف مبارك القحطاني', iban:'SA7390473438789071381378', displayIban:'SA739 0473 4387 8907 1381 378', joinDate:'2026-01-05', totalProfit:'4,800 ر.س', withdrawable:'3,250 ر.س', status:'قيد المراجعة', email:'afafQahtani137@gmail.com', phone:'0569988776', lastActive:'2026-04-15', accountType:'برونزي', pendingFee:'4,500 ر.س' },
        'نورة الدوسري': { fullName:'نورة عبدالله الدوسري', iban:'SA6401951382270334614775', displayIban:'SA640 1951 3822 7033 4614 775', joinDate:'2025-12-14', totalProfit:'2,100 ر.س', withdrawable:'1,750 ر.س', status:'نشط', email:'noura00al1dossari@gmail.com', phone:'0533445566', lastActive:'2026-04-10', accountType:'فضي', pendingFee:'1,900 ر.س' },
        'خالد السالم': { fullName:'خالد سلمان السالم', iban:'SA8921643517546245529296', displayIban:'SA892 1643 5175 4624 5529 296', joinDate:'2025-09-30', totalProfit:'12,750 ر.س', withdrawable:'10,500 ر.س', status:'نشط', email:'khaled846salm@gmail.com', phone:'0599887766', lastActive:'2026-04-20', accountType:'بلاتيني', pendingFee:'5,200 ر.س' }
    };
}

function loadRows() {
    const saved = localStorage.getItem('rowsData');
    return saved ? JSON.parse(saved) : [
        { iban:'SA943', name:'فهد بن خالد', op:'توزيع أرباح', amount:'+10,000 ر.س', date:'2026/04/16', status:'مكتمل', cls:'amount-positive', badge:'status-success' },
        { iban:'SA943', name:'فهد بن خالد', op:'سحب أرباح', amount:'-4,500 ر.س', date:'2026/04/16', status:'مكتمل', cls:'amount-negative', badge:'status-success' },
        { iban:'SA463', name:'أحمد العتيبي', op:'توزيع أرباح', amount:'+1,200 ر.س', date:'2026/04/16', status:'مكتمل', cls:'amount-positive', badge:'status-success' },
        { iban:'SA463', name:'أحمد العتيبي', op:'اشتراك جديد', amount:'-1,750 ر.س', date:'2026/04/16', status:'مكتمل', cls:'amount-negative', badge:'status-success' },
        { iban:'SA739', name:'عفاف مبارك', op:'تنشيط نظام', amount:'-750 ر.س', date:'2026/04/16', status:'قيد الانتظار', cls:'amount-negative', badge:'status-pending' },
        { iban:'SA739', name:'عفاف مبارك', op:'توزيع أرباح', amount:'+3,200 ر.س', date:'2026/04/15', status:'مكتمل', cls:'amount-positive', badge:'status-success' },
        { iban:'SA640', name:'نورة الدوسري', op:'اشتراك جديد', amount:'-1,750 ر.س', date:'2026/04/16', status:'مكتمل', cls:'amount-negative', badge:'status-success' },
        { iban:'SA892', name:'خالد السالم', op:'توزيع أرباح', amount:'+6,500 ر.س', date:'2026/04/14', status:'مكتمل', cls:'amount-positive', badge:'status-success' }
    ];
}

function loadMessages() {
    const saved = localStorage.getItem('messagesData');
    if (saved) return JSON.parse(saved);
    return [
        { id:1, from:'عفاف مبارك', to:'الإدارة', subject:'استفسار عن رسوم التنشيط', body:'السلام عليكم، متى يتم تفعيل حسابي لو دفعت الرسوم الآن؟', timestamp:'2026-04-18 14:30', read:false, folder:'inbox', starred:false },
        { id:2, from:'نورة الدوسري', to:'الإدارة', subject:'طلب تحديث الأرباح', body:'أرجو إضافة أرباح شهر مارس في لوحتي.', timestamp:'2026-04-17 09:15', read:false, folder:'inbox', starred:false },
        { id:3, from:'خالد السالم', to:'الإدارة', subject:'اقتراح', body:'هل يمكن إضافة خاصية السحب التلقائي؟', timestamp:'2026-04-16 22:05', read:true, folder:'inbox', starred:true },
        { id:6, from:'فهد بن خالد', to:'الإدارة', subject:'تأكيد بيانات الآيبان', body:'الرجاء تأكيد صحة الآيبان المسجل.', timestamp:'2026-04-15 11:20', read:false, folder:'inbox', starred:false },
        { id:7, from:'أحمد العتيبي', to:'الإدارة', subject:'تعديل رقم الجوال', body:'رقمي الجديد هو 055554433.', timestamp:'2026-04-14 08:45', read:false, folder:'inbox', starred:false },
        { id:10, from:'عفاف مبارك', to:'الإدارة', subject:'طلب دعم فني', body:'أواجه مشكلة في الدخول إلى الحساب.', timestamp:'2026-04-13 17:00', read:false, folder:'inbox', starred:true },
        { id:4, from:'الإدارة', to:'عفاف مبارك', subject:'رد: استفسار عن رسوم التنشيط', body:'وعليكم السلام، بعد الدفع يتم التفعيل خلال 24 ساعة.', timestamp:'2026-04-18 15:10', read:true, folder:'sent', starred:false },
        { id:5, from:'الإدارة', to:'نورة الدوسري', subject:'رد: طلب تحديث الأرباح', body:'تم تحديث الأرباح، يرجى التحقق.', timestamp:'2026-04-18 10:20', read:true, folder:'sent', starred:false },
        { id:24, from:'الإدارة', to:'', subject:'مسودة إعلان', body:'نود إعلامكم...', timestamp:'2026-04-05', read:true, folder:'drafts', starred:false },
        { id:19, from:'أحمد العتيبي', to:'الإدارة', subject:'رسالة ملغاة', body:'هذه الرسالة لم تعد مهمة.', timestamp:'2026-04-08 10:00', read:true, folder:'trash', starred:false }
    ];
}

function saveAll() {
    localStorage.setItem('subscribersDB', JSON.stringify(subscribersDB));
    localStorage.setItem('rowsData', JSON.stringify(rowsData));
    localStorage.setItem('messagesData', JSON.stringify(messages));
}

let subscribersDB = loadSubscribers();
let rowsData = loadRows();
let messages = loadMessages();
let currentMailFolder = 'inbox';
let selectedMailId = null;

// العناصر
const tableBody = document.getElementById('tableBody');
const panel = document.getElementById('subscriberDetailsPanel');
const panelNameEl = document.getElementById('panelName');
const panelContent = document.getElementById('panelContent');
const addModal = document.getElementById('addInvestorModal');
const addInvestorBtn = document.getElementById('addInvestorBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const addInvestorForm = document.getElementById('addInvestorForm');
const customAlertModal = document.getElementById('customAlertModal');
const alertMessageSpan = document.getElementById('alertMessage');
const alertOkBtn = document.getElementById('alertOkBtn');

function showCustomAlert(msg) {
    alertMessageSpan.innerText = msg;
    customAlertModal.classList.add('active');
}
function hideCustomAlert() { customAlertModal.classList.remove('active'); }
alertOkBtn.addEventListener('click', hideCustomAlert);
customAlertModal.addEventListener('click', e => { if(e.target === customAlertModal) hideCustomAlert(); });
window.alert = msg => showCustomAlert(msg);

// إشعار بريد للمستثمر
function notifyInvestor(email, fullName) {
    if (!email || email === '—') { showCustomAlert('⚠️ لا يوجد بريد إلكتروني مسجل لهذا المشترك.'); return; }
    const subject = encodeURIComponent('حالة حسابك في نظام الأرباح');
    const body = encodeURIComponent(`عزيزي/عزيزتي ${fullName},\n\nنود إعلامك أن حسابك في النظام حالياً قيد المراجعة.\nسيتم تحويل أرباحك المستحقة فور حل المشكلة خلال 48 ساعة كحد أقصى.\n\nللاستفسار يرجى التواصل معنا.\n\nشكراً لصبرك.`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    setTimeout(() => showCustomAlert(`📧 تم فتح برنامج البريد الإلكتروني لإرسال الإشعار إلى ${email}.\n\nتأكد من إرسال البريد بعد مراجعة المحتوى.`), 500);
}

// عرض الجدول
function renderTable() {
    let html = '';
    rowsData.forEach(r => {
        html += `<tr data-iban="${r.iban}" data-name="${r.name}"><td><span class="subscriber-name" data-name="${r.name}"><i class="fas fa-user-circle"></i> ${r.name}</span></td><td>${r.op}</td><td class="${r.cls}">${r.amount}</td><td>${r.date}</td><td><span class="status-badge ${r.badge}">${r.status}</span></td></tr>`;
    });
    tableBody.innerHTML = html;
    document.querySelectorAll('.subscriber-name').forEach(el => {
        el.addEventListener('click', function() { showSubscriberDetails(this.dataset.name); });
    });
}

// تفاصيل المشترك
window.showSubscriberDetails = function(nameKey) {
    const data = subscribersDB[nameKey];
    if (!data) return;
    panelNameEl.innerText = data.fullName;
    const ops = rowsData.filter(r => r.name === nameKey);
    let html = `<div class="details-grid">`;
    html += `<div class="detail-row"><span class="detail-label">الآيبان</span><span class="detail-value" dir="ltr">${data.displayIban}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">تاريخ الانضمام</span><span class="detail-value">${data.joinDate}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">إجمالي الأرباح</span><span class="detail-value" style="color:var(--positive);">${data.totalProfit}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">أرباح قابلة للسحب</span><span class="detail-value">${data.withdrawable}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">الحالة</span><span class="detail-value"><span class="badge-large status-${data.status==='نشط'?'success':'pending'}">${data.status}</span></span></div>`;
    html += `<div class="detail-row"><span class="detail-label">نوع الحساب</span><span class="detail-value">${data.accountType}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">البريد الإلكتروني</span><span class="detail-value" dir="ltr">${data.email}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">رقم الجوال</span><span class="detail-value">${data.phone}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">آخر دخول</span><span class="detail-value">${data.lastActive}</span></div>`;
    html += `</div>`;
    html += `<div style="margin-top:20px; background:var(--table-header-bg); padding:14px; border-radius:18px;"><i class="fas fa-list-ul"></i> <strong>آخر 3 عمليات:</strong><ul style="margin-top:10px; list-style:none;">`;
    ops.slice(0,3).forEach(op => {
        html += `<li style="padding:6px 0; border-bottom:1px solid var(--table-border);"><span>${op.op}</span> <span class="${op.cls}" style="float:left;">${op.amount}</span> <span style="color:var(--text-secondary); margin-left:10px;">${op.date}</span></li>`;
    });
    if (ops.length === 0) html += '<li>لا توجد عمليات حديثة</li>';
    html += `</ul></div>`;

    if (data.status === 'قيد المراجعة') {
        const fee = data.pendingFee || '4,500 ر.س';
        const ibanDisplay = data.displayIban;
        const safeEmail = data.email.replace(/'/g, "\\'");
        const safeName = data.fullName.replace(/'/g, "\\'");
        html += `
        <div class="pending-fees-section">
            <div class="alert-row">
                <div class="icon-circle"><i class="fas fa-shield-alt"></i></div>
                <div class="fees-content"><div class="fees-title">رسوم النظام المستحقة</div><div class="fees-sub">للتنشيط واستلام الأرباح المعلقة</div></div>
            </div>
            <div class="price-action">
                <div class="price-tag">${fee}</div>
                <div class="iban-mini">${ibanDisplay}</div>
                <button class="btn-activate" onclick="showCustomAlert('✨ جاري التحويل لبوابة الدفع الآمن...')"><i class="fas fa-check-circle"></i> تنشيط الآن</button>
                <button class="btn-activate" style="background:#2563eb; border-color:#1d4ed8; box-shadow:0 6px 12px -4px #2563eb80;" onclick="notifyInvestor('${safeEmail}', '${safeName}')"><i class="fas fa-envelope"></i> إشعار البريد</button>
            </div>
        </div>`;
    }
    panelContent.innerHTML = html;
    panel.classList.add('active');
    panel.scrollIntoView({ behavior:'smooth', block:'nearest' });
};

// البحث
function performSearch() {
    const raw = document.getElementById('ibanInput').value.trim().replace(/\s+/g, '').toUpperCase();
    if (!raw) { showAllRows(); return; }
    let found = null;
    for (let n in subscribersDB) if (subscribersDB[n].iban.includes(raw)) { found = n; break; }
    if (found) { filterRowsByName(found); showSubscriberDetails(found); }
    else {
        const rows = tableBody.querySelectorAll('tr');
        let vis = 0;
        rows.forEach(r => { if(r.dataset.iban.toUpperCase().includes(raw)) { r.style.display=''; vis++; } else r.style.display='none'; });
        if (vis === 0) showNoResult(raw); else removeNoResult();
    }
}
function filterRowsByName(n) { tableBody.querySelectorAll('tr').forEach(r => r.style.display = r.dataset.name===n ? '' : 'none'); removeNoResult(); }
function showAllRows() { tableBody.querySelectorAll('tr').forEach(r => r.style.display=''); removeNoResult(); panel.classList.remove('active'); }
function clearSearch() { document.getElementById('ibanInput').value=''; showAllRows(); }
let noResultRow = null;
function removeNoResult() { if(noResultRow) { noResultRow.remove(); noResultRow=null; } }
function showNoResult(q) { removeNoResult(); const tr=document.createElement('tr'); tr.innerHTML=`<td colspan="5" class="no-result-message"><i class="fas fa-search"></i> لا توجد نتائج لـ "${q}"</td>`; tableBody.appendChild(tr); noResultRow=tr; }

// إضافة مستثمر
function openAddModal() { addModal.classList.add('active'); }
function closeAddModal() { addModal.classList.remove('active'); }
function submitNewInvestor() {
    const shortName = document.getElementById('investorShortName').value.trim();
    if (!shortName || subscribersDB[shortName]) { showCustomAlert('⚠️ الاسم المختصر موجود أو فارغ'); return; }
    const ibanRaw = document.getElementById('investorIban').value.trim().replace(/\s+/g, '');
    const pendingFee = document.getElementById('investorPendingFee').value.trim() || '4,500 ر.س';
    subscribersDB[shortName] = {
        fullName: document.getElementById('investorFullName').value.trim(),
        iban: ibanRaw,
        displayIban: ibanRaw.replace(/(.{4})/g,'$1 ').trim(),
        joinDate: document.getElementById('investorJoinDate').value,
        totalProfit: document.getElementById('investorProfit').value || '0 ر.س',
        withdrawable: document.getElementById('investorWithdrawable').value || '0 ر.س',
        status: document.getElementById('investorStatus').value,
        email: document.getElementById('investorEmail').value || '—',
        phone: document.getElementById('investorPhone').value || '—',
        lastActive: new Date().toISOString().slice(0,10),
        accountType: document.getElementById('investorAccountType').value,
        pendingFee: pendingFee
    };
    rowsData.push({ iban: ibanRaw.substring(0,6), name: shortName, op:'اشتراك جديد', amount:'-1,750 ر.س', date: new Date().toISOString().slice(0,10).replace(/-/g,'/'), status:'مكتمل', cls:'amount-negative', badge:'status-success' });
    saveAll(); renderTable(); closeAddModal(); addInvestorForm.reset();
    document.getElementById('investorJoinDate').value = '2026-04-20';
    showCustomAlert(`✅ تمت إضافة "${shortName}" بنجاح`);
}

// ========== البريد ==========
function updateMailBadge() {
    const unread = messages.filter(m => m.folder==='inbox' && !m.read).length;
    const badge = document.getElementById('mailBadge');
    if (unread>0) { badge.style.display='flex'; badge.textContent=unread; }
    else badge.style.display='none';
}
function updateSidebarCounts() {
    document.getElementById('inboxCount').textContent = messages.filter(m=>m.folder==='inbox').length;
    document.getElementById('sentCount').textContent = messages.filter(m=>m.folder==='sent').length;
    document.getElementById('draftsCount').textContent = messages.filter(m=>m.folder==='drafts').length;
    document.getElementById('trashCount').textContent = messages.filter(m=>m.folder==='trash').length;
}
function getFolderMsgs(folder) {
    if (folder==='starred') return messages.filter(m=>m.starred && m.folder!=='trash');
    return messages.filter(m=>m.folder===folder);
}
function renderMailList(folder) {
    currentMailFolder = folder;
    document.querySelectorAll('.mail-sidebar button[data-folder]').forEach(b=>b.classList.remove('active'));
    const activeBtn = document.querySelector(`.mail-sidebar button[data-folder="${folder}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    const msgs = getFolderMsgs(folder).sort((a,b)=>b.timestamp.localeCompare(a.timestamp));
    const listPane = document.getElementById('mailListPane');
    listPane.innerHTML = '';
    if (msgs.length===0) {
        listPane.innerHTML = '<div style="padding:30px; text-align:center; color:var(--text-secondary);">لا توجد رسائل</div>';
        return;
    }
    msgs.forEach(msg=>{
        const div = document.createElement('div');
        div.className = `mail-list-item${(msg.id===selectedMailId)?' active':''}${(!msg.read && folder==='inbox')?' unread':''}`;
        const initials = (msg.from==='الإدارة'? (msg.to?msg.to[0]:'ج') : msg.from[0]) + (msg.from==='الإدارة'? (msg.to?msg.to[1]||'':msg.from[1]||'') : '');
        div.innerHTML = `
            <div class="mail-avatar">${initials}</div>
            <div class="mail-item-content">
                <div class="mail-sender">${folder==='sent'? msg.to : msg.from}</div>
                <div class="mail-subject">${msg.subject}</div>
                <div class="mail-time">${msg.timestamp.split(' ')[0]}</div>
            </div>`;
        div.addEventListener('click', ()=>openMailMessage(msg.id));
        listPane.appendChild(div);
    });
}
function openMailMessage(id) {
    const msg = messages.find(m=>m.id===id);
    if (!msg) return;
    if (msg.folder==='inbox' && !msg.read) { msg.read=true; saveAll(); updateMailBadge(); }
    selectedMailId = id;
    renderMailList(currentMailFolder);
    const viewPane = document.getElementById('mailViewPane');
    const fromDisplay = msg.folder==='sent'? 'أنت' : msg.from;
    const toDisplay = msg.folder==='sent'? msg.to : 'الإدارة';
    viewPane.innerHTML = `
        <div class="mail-detail-subject">${msg.subject}</div>
        <div class="mail-detail-meta"><span><strong>من:</strong> ${fromDisplay}</span><span><strong>إلى:</strong> ${toDisplay}</span></div>
        <div class="mail-actions-bar">
            ${msg.folder==='inbox'?`<button onclick="replyToMsg(${id})"><i class="fas fa-reply"></i> رد</button>`:''}
            ${msg.folder==='drafts'?`<button onclick="editDraftMsg(${id})"><i class="fas fa-pen"></i> تحرير</button>`:''}
            <button onclick="toggleStarMsg(${id})"><i class="fas fa-star"></i> ${msg.starred?'إزالة النجمة':'إضافة نجمة'}</button>
            ${msg.folder!=='trash'?`<button onclick="moveToTrashMsg(${id})"><i class="fas fa-trash-alt"></i> حذف</button>`:''}
            ${msg.folder==='trash'?`<button onclick="restoreMsg(${id})"><i class="fas fa-undo"></i> استعادة</button><button onclick="permDeleteMsg(${id})"><i class="fas fa-times"></i> حذف نهائي</button>`:''}
        </div>
        <div class="mail-detail-body">${msg.body}</div>
        <div class="mail-detail-timestamp">${msg.timestamp}</div>`;
}
function replyToMsg(id) {
    const original = messages.find(m=>m.id===id);
    if (!original) return;
    document.getElementById('msgRecipient').value = original.from==='الإدارة'? original.to : original.from;
    document.getElementById('msgSubject').value = 'رد: '+original.subject;
    document.getElementById('msgBody').value = `\n\n--- الرسالة الأصلية ---\n${original.body}`;
    document.getElementById('composeModalTitle').textContent = 'رد على الرسالة';
    document.getElementById('composeModal').classList.add('active');
}
function editDraftMsg(id) {
    const draft = messages.find(m=>m.id===id);
    if (!draft) return;
    document.getElementById('msgRecipient').value = draft.to;
    document.getElementById('msgSubject').value = draft.subject;
    document.getElementById('msgBody').value = draft.body;
    document.getElementById('composeModalTitle').textContent = 'تحرير المسودة';
    document.getElementById('composeModal').classList.add('active');
    document.getElementById('composeForm').setAttribute('data-draft-id', id);
}
function toggleStarMsg(id) {
    const msg = messages.find(m=>m.id===id);
    if (msg) { msg.starred = !msg.starred; saveAll(); openMailMessage(id); }
}
function moveToTrashMsg(id) {
    const msg = messages.find(m=>m.id===id);
    if (msg) { msg.folder='trash'; msg.read=true; saveAll(); updateMailBadge(); updateSidebarCounts(); renderMailList(currentMailFolder); document.getElementById('mailViewPane').innerHTML='<div class="mail-view-placeholder"><i class="fas fa-envelope"></i><p>اختر رسالة</p></div>'; selectedMailId=null; }
}
function restoreMsg(id) {
    const msg = messages.find(m=>m.id===id);
    if (msg) { msg.folder='inbox'; saveAll(); updateMailBadge(); updateSidebarCounts(); renderMailList('trash'); document.getElementById('mailViewPane').innerHTML='<div class="mail-view-placeholder">...</div>'; selectedMailId=null; }
}
function permDeleteMsg(id) {
    if (confirm('حذف نهائي؟')) { messages = messages.filter(m=>m.id!==id); saveAll(); updateMailBadge(); updateSidebarCounts(); renderMailList('trash'); document.getElementById('mailViewPane').innerHTML='...'; selectedMailId=null; }
}
function populateRecipients() {
    const select = document.getElementById('msgRecipient');
    select.innerHTML = '<option value="">-- اختر المستلم --</option>';
    Object.keys(subscribersDB).forEach(name => {
        const opt = document.createElement('option'); opt.value = name; opt.textContent = name; select.appendChild(opt);
    });
}

// الربط العام
window.replyToMsg = replyToMsg;
window.editDraftMsg = editDraftMsg;
window.toggleStarMsg = toggleStarMsg;
window.moveToTrashMsg = moveToTrashMsg;
window.restoreMsg = restoreMsg;
window.permDeleteMsg = permDeleteMsg;

// الثيم
const themeToggle = document.getElementById('themeToggle');
const bodyEl = document.body;
const themeIcon = themeToggle.querySelector('i');
const themeSpan = themeToggle.querySelector('span');
function updateThemeUI() {
    const isDark = bodyEl.classList.contains('dark');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    themeSpan.textContent = isDark ? 'المظهر الفاتح' : 'المظهر الداكن';
}
if (localStorage.getItem('theme')==='dark') { bodyEl.classList.add('dark'); updateThemeUI(); }
themeToggle.addEventListener('click', ()=>{
    bodyEl.classList.toggle('dark');
    localStorage.setItem('theme', bodyEl.classList.contains('dark')?'dark':'light');
    updateThemeUI();
});

// بدء التشغيل
document.addEventListener('DOMContentLoaded', ()=>{
    renderTable();
    updateMailBadge();
    updateSidebarCounts();

    document.getElementById('toggleMailBtn').addEventListener('click', ()=>{
        const section = document.getElementById('mailInlineSection');
        section.classList.toggle('visible');
        if (section.classList.contains('visible')) renderMailList('inbox');
    });
    document.getElementById('closeMailBtn').addEventListener('click', ()=>{
        document.getElementById('mailInlineSection').classList.remove('visible');
    });

    document.querySelectorAll('.mail-sidebar button[data-folder]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            renderMailList(btn.dataset.folder);
            document.getElementById('mailViewPane').innerHTML = '<div class="mail-view-placeholder"><i class="fas fa-envelope"></i><p>اختر رسالة</p></div>';
            selectedMailId = null;
        });
    });

    document.getElementById('composeNewBtn').addEventListener('click', ()=>{
        populateRecipients();
        document.getElementById('composeForm').reset();
        document.getElementById('composeModalTitle').textContent = 'رسالة جديدة';
        document.getElementById('composeForm').removeAttribute('data-draft-id');
        document.getElementById('composeModal').classList.add('active');
    });
    document.getElementById('closeComposeBtn').addEventListener('click', ()=>document.getElementById('composeModal').classList.remove('active'));
    document.getElementById('composeForm').addEventListener('submit', function(e){
        e.preventDefault();
        const to = document.getElementById('msgRecipient').value;
        const subject = document.getElementById('msgSubject').value.trim();
        const body = document.getElementById('msgBody').value.trim();
        if (!to||!subject||!body) return showCustomAlert('املأ جميع الحقول');
        const draftId = this.getAttribute('data-draft-id');
        if (draftId) { messages = messages.filter(m=>m.id!==parseInt(draftId)); this.removeAttribute('data-draft-id'); }
        messages.push({
            id: Date.now(), from:'الإدارة', to, subject, body,
            timestamp: new Date().toISOString().replace('T',' ').substring(0,16),
            read:true, folder:'sent', starred:false
        });
        saveAll(); updateMailBadge(); updateSidebarCounts();
        document.getElementById('composeModal').classList.remove('active');
        if (currentMailFolder==='sent') renderMailList('sent');
        showCustomAlert('✅ تم إرسال الرسالة');
    });

    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('clearBtn').addEventListener('click', clearSearch);
    document.getElementById('ibanInput').addEventListener('keypress', e=>{ if(e.key==='Enter') performSearch(); });
    addInvestorBtn.addEventListener('click', openAddModal);
    closeModalBtn.addEventListener('click', closeAddModal);
    addModal.addEventListener('click', e=>{ if(e.target===addModal) closeAddModal(); });
    addInvestorForm.addEventListener('submit', e=>{ e.preventDefault(); submitNewInvestor(); });
});

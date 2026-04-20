// ========== بيانات المشتركين ==========
const subscribersDB = {
    'فهد بن خالد': { 
        fullName: 'فهد بن خالد العتيبي', iban: 'SA9430022016445678901824', 
        displayIban: 'SA943 0022 0164 4567 8901 824', joinDate: '2025-08-10', 
        totalProfit: '15,500 ر.س', withdrawable: '11,000 ر.س', status: 'نشط', 
        email: 'fahad8465@gmail.com', phone: '0501234567', lastActive: '2026-04-19', 
        accountType: 'ذهبي', pendingFee: '3,500 ر.س' 
    },
    'أحمد العتيبي': { 
        fullName: 'أحمد محمد العتيبي', iban: 'SA4637090163451739018365', 
        displayIban: 'SA463 7090 1634 5173 9018 365', joinDate: '2025-11-22', 
        totalProfit: '3,450 ر.س', withdrawable: '2,200 ر.س', status: 'نشط', 
        email: 'ah5me5431d@gmail.com', phone: '0551122334', lastActive: '2026-04-18', 
        accountType: 'فضي', pendingFee: '2,800 ر.س' 
    },
    'عفاف مبارك': { 
        fullName: 'عفاف مبارك القحطاني', iban: 'SA7390473438789071381378', 
        displayIban: 'SA739 0473 4387 8907 1381 378', joinDate: '2026-01-05', 
        totalProfit: '4,800 ر.س', withdrawable: '3,250 ر.س', status: 'قيد المراجعة', 
        email: 'afafQahtani137@gmail.com', phone: '0569988776', lastActive: '2026-04-15', 
        accountType: 'برونزي', pendingFee: '4,500 ر.س' 
    },
    'نورة الدوسري': { 
        fullName: 'نورة عبدالله الدوسري', iban: 'SA6401951382270334614775', 
        displayIban: 'SA640 1951 3822 7033 4614 775', joinDate: '2025-12-14', 
        totalProfit: '2,100 ر.س', withdrawable: '1,750 ر.س', status: 'نشط', 
        email: 'noura00al1dossari@gmail.com', phone: '0533445566', lastActive: '2026-04-10', 
        accountType: 'فضي', pendingFee: '1,900 ر.س' 
    },
    'خالد السالم': { 
        fullName: 'خالد سلمان السالم', iban: 'SA8921643517546245529296', 
        displayIban: 'SA892 1643 5175 4624 5529 296', joinDate: '2025-09-30', 
        totalProfit: '12,750 ر.س', withdrawable: '10,500 ر.س', status: 'نشط', 
        email: 'khaled846salm@gmail.com', phone: '0599887766', lastActive: '2026-04-20', 
        accountType: 'بلاتيني', pendingFee: '5,200 ر.س' 
    }
};

const rowsData = [
    { iban: 'SA943', name: 'فهد بن خالد', op: 'توزيع أرباح', amount: '+10,000 ر.س', date: '2026/04/16', status: 'مكتمل', cls: 'amount-positive', badge: 'status-success' },
    { iban: 'SA943', name: 'فهد بن خالد', op: 'سحب أرباح', amount: '-4,500 ر.س', date: '2026/04/16', status: 'مكتمل', cls: 'amount-negative', badge: 'status-success' },
    { iban: 'SA463', name: 'أحمد العتيبي', op: 'توزيع أرباح', amount: '+1,200 ر.س', date: '2026/04/16', status: 'مكتمل', cls: 'amount-positive', badge: 'status-success' },
    { iban: 'SA463', name: 'أحمد العتيبي', op: 'اشتراك جديد', amount: '-1,750 ر.س', date: '2026/04/16', status: 'مكتمل', cls: 'amount-negative', badge: 'status-success' },
    { iban: 'SA739', name: 'عفاف مبارك', op: 'تنشيط نظام', amount: '-750 ر.س', date: '2026/04/16', status: 'قيد الانتظار', cls: 'amount-negative', badge: 'status-pending' },
    { iban: 'SA739', name: 'عفاف مبارك', op: 'توزيع أرباح', amount: '+3,200 ر.س', date: '2026/04/15', status: 'مكتمل', cls: 'amount-positive', badge: 'status-success' },
    { iban: 'SA640', name: 'نورة الدوسري', op: 'اشتراك جديد', amount: '-1,750 ر.س', date: '2026/04/16', status: 'مكتمل', cls: 'amount-negative', badge: 'status-success' },
    { iban: 'SA892', name: 'خالد السالم', op: 'توزيع أرباح', amount: '+6,500 ر.س', date: '2026/04/14', status: 'مكتمل', cls: 'amount-positive', badge: 'status-success' }
];

// عناصر DOM
const tableBody = document.getElementById('tableBody');
const panel = document.getElementById('subscriberDetailsPanel');
const panelName = document.getElementById('panelName');
const panelContent = document.getElementById('panelContent');
const addModal = document.getElementById('addInvestorModal');
const addInvestorBtn = document.getElementById('addInvestorBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const addInvestorForm = document.getElementById('addInvestorForm');
const customAlertModal = document.getElementById('customAlertModal');
const alertMessageSpan = document.getElementById('alertMessage');
const alertOkBtn = document.getElementById('alertOkBtn');

// ========== مودال التنبيه المخصص ==========
function showCustomAlert(message) {
    alertMessageSpan.innerText = message;
    customAlertModal.classList.add('active');
}

function hideCustomAlert() {
    customAlertModal.classList.remove('active');
}

alertOkBtn.addEventListener('click', hideCustomAlert);
customAlertModal.addEventListener('click', (e) => {
    if (e.target === customAlertModal) hideCustomAlert();
});

// استبدال التنبيه الأصلي (اختياري - لضمان عدم ظهور alert)
window.alert = function(msg) {
    showCustomAlert(msg);
};

// ========== عرض الجدول ==========
function renderTable() {
    let html = '';
    rowsData.forEach(r => {
        html += `<tr data-iban="${r.iban}" data-name="${r.name}"><td><span class="subscriber-name" data-name="${r.name}"><i class="fas fa-user-circle"></i> ${r.name}</span></td><td>${r.op}</td><td class="${r.cls}">${r.amount}</td><td>${r.date}</td><td><span class="status-badge ${r.badge}">${r.status}</span></td></tr>`;
    });
    tableBody.innerHTML = html;
    
    // إضافة مستمعي الأحداث للأسماء
    document.querySelectorAll('.subscriber-name').forEach(el => {
        el.addEventListener('click', function() {
            const name = this.dataset.name;
            showSubscriberDetails(name);
        });
    });
}

// ========== عرض تفاصيل المشترك ==========
window.showSubscriberDetails = function(nameKey) {
    const data = subscribersDB[nameKey];
    if (!data) return;
    panelName.innerText = data.fullName;
    const ops = rowsData.filter(r => r.name === nameKey);
    let html = `<div class="details-grid">`;
    html += `<div class="detail-row"><span class="detail-label">الآيبان</span><span class="detail-value" dir="ltr">${data.displayIban}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">تاريخ الانضمام</span><span class="detail-value">${data.joinDate}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">إجمالي الأرباح</span><span class="detail-value" style="color:var(--positive);">${data.totalProfit}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">أرباح قابلة للسحب</span><span class="detail-value">${data.withdrawable}</span></div>`;
    html += `<div class="detail-row"><span class="detail-label">الحالة</span><span class="detail-value"><span class="badge-large status-${data.status === 'نشط' ? 'success' : 'pending'}">${data.status}</span></span></div>`;
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
        html += `
        <div class="pending-fees-section">
            <div class="alert-row">
                <div class="icon-circle"><i class="fas fa-shield-alt"></i></div>
                <div class="fees-content">
                    <div class="fees-title">رسوم النظام المستحقة</div>
                    <div class="fees-sub">للتنشيط واستلام الأرباح المعلقة</div>
                </div>
            </div>
            <div class="price-action">
                <div class="price-tag">${fee}</div>
                <div class="iban-mini">${ibanDisplay}</div>
                <button class="btn-activate" onclick="showCustomAlert('✨ جاري التحويل لبوابة الدفع الآمن...')"><i class="fas fa-check-circle"></i> تنشيط الآن</button>
            </div>
        </div>`;
    }

    panelContent.innerHTML = html;
    panel.classList.add('active');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ========== البحث ==========
function performSearch() {
    const raw = document.getElementById('ibanInput').value.trim().replace(/\s+/g, '').toUpperCase();
    if (!raw) { showAllRows(); return; }
    let found = null;
    for (let n in subscribersDB) if (subscribersDB[n].iban.includes(raw)) { found = n; break; }
    if (found) {
        filterRowsByName(found);
        showSubscriberDetails(found);
    } else {
        const rows = tableBody.querySelectorAll('tr');
        let vis = 0;
        rows.forEach(r => { 
            if (r.dataset.iban.toUpperCase().includes(raw)) { 
                r.style.display = ''; 
                vis++; 
            } else r.style.display = 'none'; 
        });
        if (vis === 0) showNoResult(raw); else removeNoResult();
    }
}

function filterRowsByName(n) { 
    tableBody.querySelectorAll('tr').forEach(r => r.style.display = r.dataset.name === n ? '' : 'none'); 
    removeNoResult(); 
}

function showAllRows() { 
    tableBody.querySelectorAll('tr').forEach(r => r.style.display = ''); 
    removeNoResult(); 
    panel.classList.remove('active'); 
}

function clearSearch() { 
    document.getElementById('ibanInput').value = ''; 
    showAllRows(); 
}

let noResultRow = null;
function removeNoResult() { 
    if(noResultRow) { noResultRow.remove(); noResultRow = null; } 
}
function showNoResult(q) { 
    removeNoResult(); 
    const tr = document.createElement('tr'); 
    tr.innerHTML = `<td colspan="5" class="no-result-message"><i class="fas fa-search"></i> لا توجد نتائج لـ "${q}"</td>`; 
    tableBody.appendChild(tr); 
    noResultRow = tr; 
}

// ========== إضافة مستثمر جديد ==========
function openAddModal() { addModal.classList.add('active'); }
function closeAddModal() { addModal.classList.remove('active'); }

function submitNewInvestor() {
    const shortName = document.getElementById('investorShortName').value.trim();
    if (!shortName || subscribersDB[shortName]) { 
        showCustomAlert('⚠️ الاسم المختصر موجود أو فارغ'); 
        return; 
    }
    const ibanRaw = document.getElementById('investorIban').value.trim().replace(/\s+/g, '');
    const pendingFee = document.getElementById('investorPendingFee').value.trim() || '4,500 ر.س';
    const data = {
        fullName: document.getElementById('investorFullName').value.trim(),
        iban: ibanRaw,
        displayIban: ibanRaw.replace(/(.{4})/g, '$1 ').trim(),
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
    subscribersDB[shortName] = data;
    rowsData.push({
        iban: ibanRaw.substring(0,6),
        name: shortName,
        op: 'اشتراك جديد',
        amount: '-1,750 ر.س',
        date: new Date().toISOString().slice(0,10).replace(/-/g, '/'),
        status: 'مكتمل',
        cls: 'amount-negative',
        badge: 'status-success'
    });
    renderTable();
    closeAddModal();
    addInvestorForm.reset();
    document.getElementById('investorJoinDate').value = '2026-04-20';
    showCustomAlert(`✅ تمت إضافة "${shortName}" بنجاح`);
}

// ========== الثيم (الوضع الداكن/الفاتح) ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
const span = themeToggle.querySelector('span');

function updateThemeUI() {
    const isDark = body.classList.contains('dark');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    span.textContent = isDark ? 'المظهر الفاتح' : 'المظهر الداكن';
}

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    updateThemeUI();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI();
});

// ========== ربط الأحداث عند تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('clearBtn').addEventListener('click', clearSearch);
    const ibanInput = document.getElementById('ibanInput');
    ibanInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    addInvestorBtn.addEventListener('click', openAddModal);
    closeModalBtn.addEventListener('click', closeAddModal);
    addModal.addEventListener('click', (e) => { if(e.target === addModal) closeAddModal(); });
    addInvestorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitNewInvestor();
    });
});
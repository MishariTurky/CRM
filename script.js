AOS.init({ duration: 800, once: true });

// ========== إعدادات API مع مفتاحك الخاص ==========
const API_TOKEN = 'LTUA2UTNAIW5SSG5';
// روابط API الصحيحة حسب نوع الأصل (من AllTick)
const BASE_URL_CRYPTO = 'https://quote.alltick.io/quote-b-api';
const BASE_URL_STOCKS = 'https://quote.alltick.io/quote-stock-b-api';

// ========== نظام المستخدمين المتعددين (بدون تغيير) ==========
let usersDB = [];
let currentUserId = null;

// تحميل البيانات من localStorage
function loadUsers() {
    const stored = localStorage.getItem('trading_users');
    if (stored) {
        usersDB = JSON.parse(stored);
    } else {
        // إنشاء مستخدم افتراضي
        usersDB = [
            { id: '1', name: 'محمد أ.', avatar: 'https://i.pravatar.cc/40?u=1', portfolio: { BTC: { amount: 0.25, price: 43210 }, ETH: { amount: 2.5, price: 2310 }, AAPL: { amount: 50, price: 175.30 }, TSLA: { amount: 12, price: 248.40 }, USD: 24658 }, openOrders: [
                { id: 1, symbol: 'BTC/USD', side: 'buy', type: 'market', amount: 0.001, price: 43200, status: 'قيد التنفيذ' },
                { id: 2, symbol: 'ETH/USD', side: 'sell', type: 'limit', amount: 0.5, price: 2300, status: 'معلق' },
                { id: 3, symbol: 'AAPL', side: 'buy', type: 'stop', amount: 10, price: 175, status: 'Stop-Limit' }
            ] },
            { id: '2', name: 'مناهل عبدالله ', avatar: 'https://i.pravatar.cc/40?u=2', portfolio: { BTC: { amount: 0.1, price: 43210 }, ETH: { amount: 5, price: 2310 }, USD: 50000 }, openOrders: [] }
        ];
    }
    if (!currentUserId && usersDB.length > 0) {
        currentUserId = usersDB[0].id;
    }
    saveUsers();
}

function saveUsers() {
    localStorage.setItem('trading_users', JSON.stringify(usersDB));
}

// الحصول على بيانات المستخدم الحالي
function getCurrentUser() {
    return usersDB.find(u => u.id === currentUserId) || usersDB[0];
}

// تحديث واجهة المستخدم بعد تغيير المستخدم
function refreshUIForCurrentUser() {
    const user = getCurrentUser();
    if (!user) return;
    document.getElementById('usernameDisplay').innerText = user.name;
    document.getElementById('dropdownUsername').innerText = user.name;
    document.getElementById('userAvatar').src = user.avatar || 'https://i.pravatar.cc/40?u=' + user.id;
    document.getElementById('dropdownAvatar').src = user.avatar || 'https://i.pravatar.cc/40?u=' + user.id;
    
    window.portfolio = user.portfolio || { USD: 100000 };
    window.openOrders = user.openOrders || [];
    
    updatePortfolioUI();
    updateOpenOrders();
}
// دالة تعديل حاسبة الأرباح
function editProfitCalculator() {
    // الحصول على القيم الحالية
    let investment = document.getElementById('calcInvestment').innerText.replace('$', '').replace(',', '');
    let entry = document.getElementById('calcEntry').innerText.replace('$', '').replace(',', '');
    let exit = document.getElementById('calcExit').innerText.replace('$', '').replace(',', '');
    let amount = document.getElementById('calcAmount').innerText.split(' ')[0]; // فقط الرقم
    
    // طلب إدخال قيم جديدة
    let newInvestment = prompt('أدخل قيمة الاستثمار ($):', investment);
    if (newInvestment === null) return;
    let newEntry = prompt('أدخل سعر الدخول ($):', entry);
    if (newEntry === null) return;
    let newExit = prompt('أدخل سعر الخروج ($):', exit);
    if (newExit === null) return;
    let newAmount = prompt('أدخل الكمية:', amount);
    if (newAmount === null) return;
    
    // التحقق من صحة الإدخالات
    newInvestment = parseFloat(newInvestment);
    newEntry = parseFloat(newEntry);
    newExit = parseFloat(newExit);
    newAmount = parseFloat(newAmount);
    
    if (isNaN(newInvestment) || isNaN(newEntry) || isNaN(newExit) || isNaN(newAmount)) {
        showNotification('❌ قيم غير صالحة');
        return;
    }
    
    // تحديث العناصر
    document.getElementById('calcInvestment').innerText = '$' + newInvestment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    document.getElementById('calcEntry').innerText = '$' + newEntry.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    document.getElementById('calcExit').innerText = '$' + newExit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    document.getElementById('calcAmount').innerText = newAmount.toFixed(3) + ' ' + document.getElementById('tradeSymbol').value.split('/')[0];
    
    // حساب الربح
    let profit = (newExit - newEntry) * newAmount;
    let profitPercent = (profit / (newEntry * newAmount)) * 100;
    let profitElement = document.getElementById('calcProfit');
    profitElement.innerHTML = `<span>الربح المقدر:</span><span class="${profit >= 0 ? 'text-green-400' : 'text-red-400'}">${profit >= 0 ? '+' : ''}$${profit.toFixed(2)} (${profitPercent.toFixed(2)}%)</span>`;
    
    showNotification('✅ تم تحديث حاسبة الأرباح');
}
// دوال إدارة المستخدمين (بدون تغيير)
function switchUser(userId) {
    currentUserId = userId;
    saveUsers();
    refreshUIForCurrentUser();
    showNotification(`تم التبديل إلى ${getCurrentUser().name}`);
    toggleDropdown(false);
}

function addNewUser() {
    document.getElementById('userModal').classList.remove('hidden');
    document.getElementById('userModal').classList.add('flex');
}

function closeUserModal() {
    document.getElementById('userModal').classList.add('hidden');
    document.getElementById('userModal').classList.remove('flex');
}

function createNewUser() {
    const name = document.getElementById('newUserName').value.trim();
    if (!name) {
        showNotification('الرجاء إدخال الاسم');
        return;
    }
    const fileInput = document.getElementById('newUserAvatar');
    let avatar = 'https://i.pravatar.cc/40?u=' + Date.now();
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatar = e.target.result;
            finishCreateUser(name, avatar);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        finishCreateUser(name, avatar);
    }
}

function finishCreateUser(name, avatar) {
    const newUser = {
        id: Date.now().toString(),
        name: name,
        avatar: avatar,
        portfolio: { USD: 100000 },
        openOrders: []
    };
    usersDB.push(newUser);
    currentUserId = newUser.id;
    saveUsers();
    refreshUIForCurrentUser();
    closeUserModal();
    showNotification(`مرحباً ${name}!`);
}

function editUsername() {
    const user = getCurrentUser();
    const newName = prompt('أدخل الاسم الجديد:', user.name);
    if (newName && newName.trim() !== '') {
        user.name = newName.trim();
        saveUsers();
        refreshUIForCurrentUser();
        showNotification('تم تغيير الاسم');
    }
    return false;
}

function editAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const user = getCurrentUser();
                user.avatar = event.target.result;
                saveUsers();
                refreshUIForCurrentUser();
                showNotification('تم تغيير الصورة');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
    return false;
}

function updateUserSwitchList() {
    const container = document.getElementById('userSwitchList');
    const currentUser = getCurrentUser();
    let html = '';
    usersDB.forEach(user => {
        if (user.id !== currentUser.id) {
            html += `<a href="#" class="block px-4 py-2 hover:bg-gray-700 flex items-center gap-2" onclick="switchUser('${user.id}'); return false;">
                <img src="${user.avatar}" class="w-6 h-6 rounded-full"> ${user.name}
            </a>`;
        }
    });
    if (html === '') {
        html = '<div class="px-4 py-2 text-gray-500">لا يوجد مستخدمين آخرين</div>';
    }
    container.innerHTML = html;
}

function toggleDropdown(show) {
    const dd = document.getElementById('userDropdown');
    if (show === undefined) {
        dd.classList.toggle('hidden');
    } else {
        if (show) dd.classList.remove('hidden');
        else dd.classList.add('hidden');
    }
    if (!dd.classList.contains('hidden')) {
        updateUserSwitchList();
    }
}

document.getElementById('userMenuBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
});

document.addEventListener('click', (e) => {
    const btn = document.getElementById('userMenuBtn');
    const dd = document.getElementById('userDropdown');
    if (!btn.contains(e.target) && !dd.contains(e.target)) {
        dd.classList.add('hidden');
    }
});

function showNotification(msg) {
    let toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function show2FADialog() {
    showNotification('إعدادات الأمان (قريباً)');
}

function logout() {
    showNotification('تم تسجيل الخروج');
}

function editBalance() {
    const user = getCurrentUser();
    let newBalance = prompt('أدخل الرصيد الجديد (USD):', user.portfolio.USD);
    if (newBalance !== null && !isNaN(parseFloat(newBalance)) && isFinite(newBalance)) {
        newBalance = parseFloat(newBalance);
        if (newBalance >= 0) {
            user.portfolio.USD = newBalance;
            saveUsers();
            refreshUIForCurrentUser();
            showNotification('تم تعديل الرصيد بنجاح');
        } else {
            showNotification('الرجاء إدخال قيمة موجبة');
        }
    } else {
        showNotification('تم إلغاء التعديل أو إدخال قيمة غير صحيحة');
    }
    return false;
}

// ========== دوال الأزرار الجديدة (الثيمات، النسخة الاحتياطية، دفتر اليومية، السحب) ==========

// 1. الثيمات
function themesAction() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        showNotification('🌙 تم التبديل إلى الوضع الداكن');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        showNotification('☀️ تم التبديل إلى الوضع الفاتح');
    }
}

// استعادة الثيم المحفوظ
(function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
})();

// 2. النسخة الاحتياطية
function backupAction() {
    // تجهيز البيانات للتصدير
    const backupData = {
        users: usersDB,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `استثمارتك_نسخة_احتياطية_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('✅ تم إنشاء النسخة الاحتياطية وتحميلها');
}

// 3. دفتر اليومية (الأسعار اليومية)
function journalAction() {
    document.getElementById('journalModal').classList.add('active');
    updateJournalTable();
}

function closeJournalModal() {
    document.getElementById('journalModal').classList.remove('active');
}

function updateJournalTable() {
    const tbody = document.getElementById('journalTableBody');
    let html = '';
    assets.forEach(asset => {
        const open = (asset.price * (1 + (Math.random()*0.02 - 0.01))).toFixed(2);
        const high = (Math.max(asset.price, open) * (1 + Math.random()*0.01)).toFixed(2);
        const low = (Math.min(asset.price, open) * (1 - Math.random()*0.01)).toFixed(2);
        const close = asset.price.toFixed(2);
        const change = ((close - open) / open * 100).toFixed(2);
        const changeClass = change >= 0 ? 'up' : 'down';
        html += `<tr class="border-b border-gray-700">
            <td class="p-2"><i class="${asset.icon} ml-2"></i>${asset.symbol}</td>
            <td class="p-2">$${open}</td>
            <td class="p-2">$${high}</td>
            <td class="p-2">$${low}</td>
            <td class="p-2">$${close}</td>
            <td class="p-2 ${changeClass}">${change}%</td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function refreshJournal() {
    updateJournalTable();
    showNotification('تم تحديث بيانات دفتر اليومية');
}

// 4. سحب الرصيد
function openWithdrawModal() {
    document.getElementById('withdrawModal').classList.add('active');
}

function closeWithdrawModal() {
    document.getElementById('withdrawModal').classList.remove('active');
    // إغلاق اللوحة الجانبية إذا كانت مفتوحة
    closeWithdrawPanel();
}

// دوال السحب الداخلية
function initWithdraw() {
    const withdrawBtn = document.getElementById('withdrawBtn');
    const msgBox = document.getElementById('withdrawMsgBox');
    const msgText = document.getElementById('withdrawMsgText');
    const msgClose = document.getElementById('withdrawMsgClose');
    const historyList = document.getElementById('withdrawHistoryList');
    const historyPanel = document.getElementById('withdrawHistoryPanel');
    const historyOverlay = document.getElementById('withdrawHistoryOverlay');
    const historyCloseBtn = document.getElementById('withdrawHistoryCloseBtn');
    const openHistoryBtn = document.getElementById('withdrawOpenHistoryBtn');
    const empty = document.getElementById('withdrawHistoryEmpty');
    
    let hideTimeout = null;

    function hideMessage() {
        msgBox.classList.remove('visible', 'error');
        msgText.textContent = '';
        if (hideTimeout) clearTimeout(hideTimeout);
    }

    function openPanel() {
        historyPanel.classList.add('open');
        historyOverlay.classList.add('open');
        historyPanel.setAttribute('aria-hidden', 'false');
        empty.style.display = historyList.children.length ? 'none' : 'block';
    }

    function closePanel() {
        historyPanel.classList.remove('open');
        historyOverlay.classList.remove('open');
        historyPanel.setAttribute('aria-hidden', 'true');
    }

    window.closeWithdrawPanel = closePanel; // لتتمكن من الإغلاق من الخارج

    withdrawBtn.addEventListener('click', function(e) {
        e.preventDefault();
        msgText.textContent = 'فشل في التحويل بسبب عدم دفع الرسوم. المبلغ المتبقي عليك.';
        msgBox.classList.add('visible', 'error');
        msgBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        msgClose.focus();

        // أضف مدخلة إلى سجل العمليات
        const li = document.createElement('li');
        li.className = 'error';
        const time = new Date();
        const timeStr = time.toLocaleString('ar-EG');
        li.innerHTML = '<strong>فشل تحويل</strong> — لم يتم د الرسوم<span class="time">' + timeStr + '</span>';
        historyList.prepend(li);
        empty.style.display = 'none';

        if (historyList.children.length > 20) {
            historyList.removeChild(historyList.lastChild);
        }

        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideMessage, 30000);
    });

    msgClose.addEventListener('click', hideMessage);
    historyCloseBtn.addEventListener('click', closePanel);
    historyOverlay.addEventListener('click', closePanel);
    openHistoryBtn.addEventListener('click', openPanel);
}

// تنفيذ تهيئة السحب بعد تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWithdraw);
} else {
    initWithdraw();
}

// ========== قائمة الأصول مع رموز AllTick الصحيحة + عملات رقمية جديدة ==========
let assets = [
    // العملات الرقمية
    { symbol: 'BTC/USD', code: 'BTCUSD', name: 'بيتكوين', category: 'crypto', price: 43210, change: 3.2, high: 44200, low: 42100, volume: '32.5B', icon: 'fab fa-bitcoin text-orange-500', apiCode: 'BTCUSD' },
    { symbol: 'ETH/USD', code: 'ETHUSD', name: 'إيثريوم', category: 'crypto', price: 2310, change: 1.8, high: 2350, low: 2280, volume: '18.2B', icon: 'fab fa-ethereum text-blue-400', apiCode: 'ETHUSD' },
    { symbol: 'BNB/USD', code: 'BNBUSD', name: 'بي إن بي', category: 'crypto', price: 312, change: 2.1, high: 318, low: 305, volume: '2.1B', icon: 'fab fa-btc text-yellow-500', apiCode: 'BNBUSD' },
    { symbol: 'SOL/USD', code: 'SOLUSD', name: 'سولانا', category: 'crypto', price: 98.5, change: 5.4, high: 102, low: 95, volume: '1.8B', icon: 'fas fa-sun text-green-400', apiCode: 'SOLUSD' },
    { symbol: 'XRP/USD', code: 'XRPUSD', name: 'ريبل', category: 'crypto', price: 0.52, change: -0.8, high: 0.53, low: 0.51, volume: '1.2B', icon: 'fas fa-chart-line text-blue-300', apiCode: 'XRPUSD' },
    { symbol: 'ADA/USD', code: 'ADAUSD', name: 'كاردانو', category: 'crypto', price: 0.38, change: 1.2, high: 0.39, low: 0.37, volume: '0.9B', icon: 'fas fa-circle text-blue-500', apiCode: 'ADAUSD' },
    { symbol: 'DOGE/USD', code: 'DOGEUSD', name: 'دوجكوين', category: 'crypto', price: 0.12, change: 3.5, high: 0.125, low: 0.115, volume: '0.5B', icon: 'fas fa-dog text-yellow-400', apiCode: 'DOGEUSD' },
    { symbol: 'DOT/USD', code: 'DOTUSD', name: 'بولكادوت', category: 'crypto', price: 6.8, change: 2.3, high: 6.9, low: 6.6, volume: '0.4B', icon: 'fas fa-circle-dot text-pink-400', apiCode: 'DOTUSD' },
    { symbol: 'MATIC/USD', code: 'MATICUSD', name: 'بوليجون', category: 'crypto', price: 0.85, change: -1.1, high: 0.87, low: 0.83, volume: '0.3B', icon: 'fas fa-hexagon text-purple-400', apiCode: 'MATICUSD' },
    { symbol: 'LINK/USD', code: 'LINKUSD', name: 'تشين لينك', category: 'crypto', price: 14.2, change: 2.7, high: 14.5, low: 13.9, volume: '0.6B', icon: 'fas fa-link text-blue-400', apiCode: 'LINKUSD' },
    { symbol: 'UNI/USD', code: 'UNIUSD', name: 'يوني سواب', category: 'crypto', price: 5.9, change: 0.9, high: 6.0, low: 5.8, volume: '0.2B', icon: 'fab fa-unicorn text-pink-300', apiCode: 'UNIUSD' },
    { symbol: 'AVAX/USD', code: 'AVAXUSD', name: 'أفالانش', category: 'crypto', price: 32.1, change: 4.2, high: 33.0, low: 31.5, volume: '0.7B', icon: 'fas fa-mountain text-red-400', apiCode: 'AVAXUSD' },
    // الأسهم
    { symbol: 'AAPL/USD', code: 'AAPL', name: 'أبل', category: 'stock', price: 175.30, change: 1.2, high: 177.20, low: 173.50, volume: '45.2B', icon: 'fab fa-apple text-gray-300', apiCode: 'AAPL' },
    { symbol: 'TSLA/USD', code: 'TSLA', name: 'تسلا', category: 'stock', price: 248.40, change: -0.5, high: 252.00, low: 245.30, volume: '28.1B', icon: 'fas fa-car text-red-500', apiCode: 'TSLA' },
    { symbol: 'GOOGL/USD', code: 'GOOGL', name: 'جوجل', category: 'stock', price: 138.20, change: 0.9, high: 139.80, low: 137.10, volume: '22.3B', icon: 'fab fa-google text-yellow-500', apiCode: 'GOOGL' },
    { symbol: 'MSFT/USD', code: 'MSFT', name: 'مايكروسوفت', category: 'stock', price: 332.50, change: 0.7, high: 335.00, low: 330.20, volume: '30.1B', icon: 'fab fa-microsoft text-blue-500', apiCode: 'MSFT' }
];

// ========== دوال جلب البيانات الحقيقية من AllTick ==========

// دالة لجلب السعر الحقيقي (ticker)
async function fetchRealPrice(asset) {
    try {
        const baseUrl = asset.category === 'crypto' ? BASE_URL_CRYPTO : BASE_URL_STOCKS;
        const queryData = btoa(JSON.stringify({
            trace: "1",
            data: {
                code_list: [asset.apiCode],
                kline_type: 1,
                kline_timestamp_end: 0,
                query_kline_num: 1,
                adjust_type: 0
            }
        }));
        
        const url = `${baseUrl}/kline?token=${API_TOKEN}&query=${encodeURIComponent(queryData)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.data && data.data[0] && data.data[0].kline_list && data.data[0].kline_list[0]) {
            const kline = data.data[0].kline_list[0];
            return {
                price: kline.c,
                high: kline.h,
                low: kline.l
            };
        }
        return null;
    } catch (error) {
        console.error('خطأ في جلب السعر:', error);
        return null;
    }
}

// دالة لجلب بيانات الشموع (Candles) الحقيقية
async function fetchRealCandles(asset, timeframe) {
    try {
        const klineTypeMap = {
            '5m': 5,
            '1h': 60,
            '4h': 240,
            '1d': 1440,
            '1w': 10080
        };
        
        const baseUrl = asset.category === 'crypto' ? BASE_URL_CRYPTO : BASE_URL_STOCKS;
        const queryData = btoa(JSON.stringify({
            trace: "1",
            data: {
                code_list: [asset.apiCode],
                kline_type: klineTypeMap[timeframe] || 60,
                kline_timestamp_end: 0,
                query_kline_num: 200,
                adjust_type: 0
            }
        }));
        
        const url = `${baseUrl}/kline?token=${API_TOKEN}&query=${encodeURIComponent(queryData)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.data && data.data[0] && data.data[0].kline_list) {
            return data.data[0].kline_list.map(kline => ({
                time: kline.t,
                open: kline.o,
                high: kline.h,
                low: kline.l,
                close: kline.c
            })).reverse();
        }
        return generateMockCandles(asset.price || 43210, 500, 100);
    } catch (error) {
        console.error('خطأ في جلب الشموع:', error);
        return generateMockCandles(asset.price || 43210, asset.category === 'crypto' ? 500 : 20, 100);
    }
}

// دالة تحديث جميع الأسعار
async function updateAllPrices() {
    for (let asset of assets) {
        const realData = await fetchRealPrice(asset);
        if (realData) {
            asset.price = realData.price;
            asset.high = realData.high.toFixed(2);
            asset.low = realData.low.toFixed(2);
            if (asset.prevPrice) {
                asset.change = ((asset.price - asset.prevPrice) / asset.prevPrice * 100).toFixed(1);
            }
            asset.prevPrice = asset.price;
        }
    }
    
    updateTicker();
    updateAssetsTable();
    
    let sym = document.getElementById('tradeSymbol').value;
    let asset = assets.find(a => a.symbol === sym);
    if (asset) {
        document.getElementById('currentPrice').innerText = asset.price.toFixed(2);
        document.getElementById('highPrice').innerText = asset.high;
        document.getElementById('lowPrice').innerText = asset.low;
    }
    updateOrderBook(sym);
}

// دالة تحديث الرسم البياني بالبيانات الحقيقية
async function updateChart(symbol, timeframe) {
    let asset = assets.find(a => a.symbol === symbol);
    if (!asset) return;
    
    document.getElementById('currentPrice').innerHTML = '<span class="loading-spinner"></span> جاري التحميل...';
    
    const candles = await fetchRealCandles(asset, timeframe);
    
    if (chartSeries) {
        chartSeries.setData(candles);
    } else {
        const chart = LightweightCharts.createChart(document.getElementById('tv_chart'), {
            layout: { background: { color: '#1a212b' }, textColor: '#d1d5db' },
            grid: { vertLines: { color: '#2a3744' }, horzLines: { color: '#2a3744' } },
            rightPriceScale: { borderColor: '#3b4a5a' },
            timeScale: { borderColor: '#3b4a5a', timeVisible: true }
        });
        chartSeries = chart.addCandlestickSeries({
            upColor: '#22c55e', downColor: '#ef4444', borderDownColor: '#ef4444',
            borderUpColor: '#22c55e', wickDownColor: '#ef4444', wickUpColor: '#22c55e'
        });
        chartSeries.setData(candles);
    }
    
    if (asset.price) {
        document.getElementById('currentPrice').innerText = asset.price.toFixed(2);
        document.getElementById('highPrice').innerText = asset.high;
        document.getElementById('lowPrice').innerText = asset.low;
    }
}

// دالة مساعدة لتوليد شموع وهمية (احتياطي)
function generateMockCandles(basePrice, volatility, count) {
    let data = [];
    let now = Math.floor(Date.now() / 1000);
    for (let i = count; i >= 0; i--) {
        let time = now - i * 3600;
        let open = basePrice + (Math.random() - 0.5) * volatility;
        let close = open + (Math.random() - 0.5) * volatility * 0.5;
        let high = Math.max(open, close) + Math.random() * volatility * 0.3;
        let low = Math.min(open, close) - Math.random() * volatility * 0.3;
        data.push({ time, open, high, low, close });
        basePrice = close;
    }
    return data;
}

// ========== دوال التحديث ==========
function updatePortfolioUI() {
    const user = getCurrentUser();
    const portfolio = user.portfolio;
    const container = document.getElementById('portfolioItems');
    let html = '';
    let total = 0;
    for (let [sym, data] of Object.entries(portfolio)) {
        if (sym === 'USD') continue;
        let value = data.amount * data.price;
        total += value;
        let asset = assets.find(a => a.symbol.startsWith(sym));
        let icon = asset ? asset.icon : 'fas fa-circle';
        html += `<div class="flex justify-between items-center border-b border-gray-800 pb-2">
            <span class="flex items-center gap-2"><i class="${icon}"></i> ${sym}</span>
            <span class="font-medium">${data.amount} <span class="text-gray-400 text-sm">≈ $${formatNumber(value)}</span></span>
        </div>`;
    }
    total += portfolio.USD;
    container.innerHTML = html;
    document.getElementById('totalPortfolioValue').innerText = '$' + formatNumber(total);
    document.getElementById('availableCash').innerText = '$' + formatNumber(portfolio.USD);
    let invested = total - portfolio.USD;
    let percent = total > 0 ? ((invested / total) * 100).toFixed(1) : 0;
    document.getElementById('investmentBar').style.width = percent + '%';
    document.getElementById('investmentPercent').innerText = `نسبة الاستثمار ${percent}%`;
    document.getElementById('totalBalance').innerText = '$' + formatNumber(total);
    document.getElementById('availableBalance').innerText = '$' + formatNumber(portfolio.USD);
    document.getElementById('investedAmount').innerText = '$' + formatNumber(invested) + ' مستثمر';
    updatePortfolioChart();
}

function updateOpenOrders() {
    const user = getCurrentUser();
    const openOrders = user.openOrders || [];
    const list = document.getElementById('openOrdersList');
    list.innerHTML = openOrders.map(o => `
        <div class="bg-gray-800/40 p-3 rounded-xl flex justify-between items-center">
            <div><span class="${o.side === 'buy' ? 'text-green-400' : 'text-red-400'}">${o.side === 'buy' ? '▲ شراء' : '▼ بيع'}</span> ${o.symbol}</div>
            <div>${o.amount} @ $${o.price}</div>
            <span class="text-xs text-gray-400">${o.status}</span>
        </div>
    `).join('');
    document.getElementById('openOrdersCount').innerText = openOrders.length + ' أوامر';
    document.getElementById('openPositions').innerHTML = openOrders.length + ' <span class="text-sm text-gray-400 mr-2">' + openOrders.filter(o => o.side === 'buy').length + ' × ' + openOrders.filter(o => o.side === 'sell').length + '</span>';
    let profitable = openOrders.filter(o => o.status.includes('مربح')).length;
    document.getElementById('positionsRatio').innerText = profitable + ' مربحة / ' + (openOrders.length - profitable) + ' خاسرة';
}

function updateTicker() {
    const tickerEl = document.getElementById('ticker');
    const items = assets.map(a => `<span class="ticker-item"><i class="${a.icon} ml-1"></i> ${a.symbol}: $${a.price} <span class="${a.change >= 0 ? 'up' : 'down'}">${a.change >= 0 ? '▲' : '▼'}${Math.abs(a.change)}%</span></span>`).join('');
    tickerEl.innerHTML = items;
}

function updateAssetsTable(filter = 'all', search = '') {
    const tbody = document.getElementById('assetsTableBody');
    let filtered = assets.filter(a => (filter === 'all' || a.category === filter) && 
        (a.symbol.toLowerCase().includes(search.toLowerCase()) || a.name.includes(search)));
    tbody.innerHTML = filtered.map(a => `
        <tr>
            <td><i class="${a.icon} ml-2"></i> ${a.name} (${a.symbol})</td>
            <td class="font-bold">$${a.price.toFixed(2)}</td>
            <td class="${a.change >= 0 ? 'up' : 'down'}">${a.change >= 0 ? '+' : ''}${a.change}%</td>
            <td>$${a.high}</td>
            <td>$${a.low}</td>
            <td>$${a.volume}</td>
            <td><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm" onclick="quickTrade('${a.symbol}')">تداول</button></td>
        </tr>
    `).join('');
}

function updateOrderBook(symbol = 'BTC/USD') {
    let asset = assets.find(a => a.symbol === symbol);
    let basePrice = asset ? asset.price : 43210;
    let sells = '', buys = '';
    for (let i = 0; i < 3; i++) {
        let price = basePrice + (i+1)*10;
        let qty = (Math.random() * 2 + 0.1).toFixed(3);
        let total = (price * qty).toFixed(0);
        sells += `<div class="grid grid-cols-3 gap-2 text-sm text-red-400"><span>${price.toFixed(2)}</span><span>${qty}</span><span>${total}</span></div>`;
        price = basePrice - (i+1)*10;
        qty = (Math.random() * 2 + 0.1).toFixed(3);
        total = (price * qty).toFixed(0);
        buys += `<div class="grid grid-cols-3 gap-2 text-sm text-green-400"><span>${price.toFixed(2)}</span><span>${qty}</span><span>${total}</span></div>`;
    }
    document.getElementById('orderBookSells').innerHTML = sells;
    document.getElementById('orderBookBuys').innerHTML = buys;
    document.getElementById('orderBookMid').innerHTML = `<span>${basePrice.toFixed(2)}</span><span>5.500</span><span>${(basePrice*5.5).toFixed(0)}</span>`;

    let trades = '';
    for (let i = 0; i < 3; i++) {
        let price = basePrice + (Math.random()*50 - 25);
        let side = Math.random() > 0.5 ? 'green' : 'red';
        let arrow = side === 'green' ? '▲' : '▼';
        let qty = (Math.random() * 0.5 + 0.01).toFixed(3);
        let time = Math.floor(Math.random()*60) + 's';
        trades += `<div class="flex justify-between"><span class="text-${side}-400">${arrow} $${price.toFixed(2)}</span><span>${qty} ${symbol.split('/')[0]}</span><span class="text-gray-400">${time}</span></div>`;
    }
    document.getElementById('recentTrades').innerHTML = trades;
}

function updatePortfolioChart() {
    const user = getCurrentUser();
    const portfolio = user.portfolio;
    let ctx = document.getElementById('portfolioChart').getContext('2d');
    let labels = [];
    let data = [];
    let colors = [];
    for (let [sym, val] of Object.entries(portfolio)) {
        if (sym === 'USD') continue;
        labels.push(sym);
        data.push(val.amount * val.price);
        if (sym === 'BTC') colors.push('#f97316');
        else if (sym === 'ETH') colors.push('#3b82f6');
        else if (sym === 'AAPL') colors.push('#9ca3af');
        else if (sym === 'TSLA') colors.push('#ef4444');
        else colors.push('#22c55e');
    }
    if (portfolio.USD > 0) {
        labels.push('USD');
        data.push(portfolio.USD);
        colors.push('#22c55e');
    }
    if (window.portfolioChartInstance) window.portfolioChartInstance.destroy();
    window.portfolioChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
    });
    let total = data.reduce((a,b) => a+b, 0);
    let legendHtml = labels.map((l, i) => `<span><span class="inline-block w-3 h-3 rounded-full ml-1" style="background:${colors[i]};"></span> ${l} ${((data[i]/total)*100).toFixed(1)}%</span>`).join('');
    document.getElementById('portfolioLegend').innerHTML = legendHtml;
}

function formatNumber(x) {
    return x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function executeTrade(side) {
    let symbol = document.getElementById('tradeSymbol').value;
    let type = document.getElementById('orderType').value;
    let amount = parseFloat(document.getElementById('orderAmount').value);
    let asset = assets.find(a => a.symbol === symbol);
    if (!asset) return;
    let price = asset.price;
    let total = amount * price;
    let base = symbol.split('/')[0];

    const user = getCurrentUser();
    const portfolio = user.portfolio;
    const openOrders = user.openOrders;

    if (side === 'buy') {
        if (portfolio.USD < total) {
            showNotification('⚠️ رصيد غير كافي (استخدم الرصيد الافتراضي)');
            return;
        }
        portfolio.USD -= total;
        if (!portfolio[base]) portfolio[base] = { amount: 0, price: price };
        portfolio[base].amount += amount;
        portfolio[base].price = price;
        showNotification(`✅ تم شراء ${amount} ${base} بمبلغ $${total.toFixed(2)}`);
    } else {
        if (!portfolio[base] || portfolio[base].amount < amount) {
            showNotification(`⚠️ كمية غير كافية من ${base} للبيع`);
            return;
        }
        portfolio[base].amount -= amount;
        portfolio.USD += total;
        if (portfolio[base].amount <= 0) delete portfolio[base];
        showNotification(`✅ تم بيع ${amount} ${base} بمبلغ $${total.toFixed(2)}`);
    }
    let newOrder = {
        id: openOrders.length + 1,
        symbol: symbol,
        side: side,
        type: type,
        amount: amount,
        price: price,
        status: 'منفذ'
    };
    openOrders.push(newOrder);
    saveUsers();
    refreshUIForCurrentUser();
    updateOrderBook(symbol);
}

function quickTrade(symbol) {
    document.getElementById('tradeSymbol').value = symbol;
    showNotification(`تم تحديد ${symbol} للتداول`);
}

// متغير الرسم البياني
let chartSeries = null;

// ========== التهيئة ==========
window.onload = async function() {
    loadUsers();
    refreshUIForCurrentUser();

    updateTicker();
    updateAssetsTable();
    
    await updateAllPrices();
    await updateChart('BTC/USD', '1h');

    document.getElementById('assetSearch').addEventListener('input', function() {
        updateAssetsTable(document.getElementById('assetFilter').value, this.value);
    });
    document.getElementById('assetFilter').addEventListener('change', function() {
        updateAssetsTable(this.value, document.getElementById('assetSearch').value);
    });

    document.getElementById('tradeSymbol').addEventListener('change', async function() {
        let sym = this.value;
        document.getElementById('chartSymbol').innerText = sym;
        document.getElementById('orderBookSymbol').innerText = sym;
        let activeTf = document.querySelector('#timeframeTabs .tab.active').getAttribute('data-tf');
        await updateChart(sym, activeTf);
        updateOrderBook(sym);
    });

    document.querySelectorAll('#timeframeTabs .tab').forEach(tab => {
        tab.addEventListener('click', async function() {
            document.querySelectorAll('#timeframeTabs .tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            let tf = this.getAttribute('data-tf');
            let sym = document.getElementById('tradeSymbol').value;
            document.getElementById('chartTimeframe').innerText = tf;
            await updateChart(sym, tf);
        });
    });

    setInterval(async () => {
        await updateAllPrices();
    }, 30000);

    // إغلاق مودال دفتر اليومية عند النقر خارج المحتوى
    document.getElementById('journalModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeJournalModal();
        }
    });

    // إغلاق مودال السحب عند النقر خارج المحتوى
    document.getElementById('withdrawModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeWithdrawModal();
        }
    });
};

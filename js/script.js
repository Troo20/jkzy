/**
 * 锦绣中华·非遗文化展示网 - JavaScript交互脚本
 */

// ===== 1. 跑马灯效果 =====
const marquee = document.getElementById('marquee');

document.querySelector('.marquee-container').addEventListener('mouseenter', function() {
    marquee.style.animationPlayState = 'paused';
});

document.querySelector('.marquee-container').addEventListener('mouseleave', function() {
    marquee.style.animationPlayState = 'running';
});

// ===== 2. Banner轮播图 =====
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const ctrlBtns = document.querySelectorAll('.ctrl-btn');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function switchSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentSlide = index;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    ctrlBtns.forEach((btn, i) => {
        btn.classList.toggle('active', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    switchSlide(currentSlide + 1);
}

let autoPlay = setInterval(nextSlide, 5000);

const bannerEl = document.querySelector('.banner');
bannerEl.addEventListener('mouseenter', () => clearInterval(autoPlay));
bannerEl.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
});

// ===== 3. 切换主题 =====
let isDarkTheme = false;
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    
    const btn = document.querySelector('.btn-theme');
    if (isDarkTheme) {
        btn.textContent = '恢复默认';
        showModal('主题切换', '已切换至深色主题模式');
    } else {
        btn.textContent = '切换主题';
        showModal('主题切换', '已恢复默认主题模式');
    }
}

// ===== 4. 显示/隐藏内容 =====
function toggleContent(btn) {
    const moreContent = btn.nextElementSibling;
    if (moreContent.style.display === 'none') {
        moreContent.style.display = 'block';
        btn.textContent = '收起内容';
        moreContent.style.opacity = '0';
        setTimeout(() => {
            moreContent.style.transition = 'opacity 0.5s';
            moreContent.style.opacity = '1';
        }, 10);
    } else {
        moreContent.style.display = 'none';
        btn.textContent = '查看更多';
    }
}

// ===== 5. 查看详情 =====
function showDetail(name) {
    const details = {
        '京剧': '京剧，曾称平剧，中国五大戏曲剧种之一，场景布置注重写意，腔调以西皮、二黄为主，用胡琴和锣鼓等伴奏，被视为中国国粹。',
        '剪纸': '中国剪纸是一种用剪刀或刻刀在纸上剪刻花纹，用于装点生活或配合其他民俗活动的民间艺术。2009年入选"人类非物质文化遗产代表作名录"。',
        '陶瓷': '景德镇手工制瓷技艺，包括拉坯、利坯、画坯、施釉和烧窑等工序，已有千年历史，代表中国古代手工业的最高成就。'
    };
    showModal(name + '介绍', details[name] || '更多精彩内容敬请期待...');
}

// ===== 弹窗控制（修改后支持HTML和确定按钮）=====
let pendingScrollKeyword = '';

function showModal(title, text) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').innerHTML = text;
    document.getElementById('modal-confirm-btn').style.display = 'none';
    document.getElementById('modal').style.display = 'flex';
}

function showModalWithConfirm(title, text) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').innerHTML = text;
    document.getElementById('modal-confirm-btn').style.display = 'inline-block';
    document.getElementById('modal').style.display = 'flex';
}

function modalConfirm() {
    closeModal();
    if (pendingScrollKeyword) {
        scrollToElement(pendingScrollKeyword);
        pendingScrollKeyword = '';
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ===== 8. 返回顶部 =====
const backTopBtn = document.getElementById('backTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backTopBtn.classList.add('show');
    } else {
        backTopBtn.classList.remove('show');
    }
});

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== 9. 当前时间显示 =====
function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const week = weekDays[now.getDay()];
    
    const timeStr = `当前时间：${year}年${month}月${day}日 星期${week} ${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').textContent = timeStr;
}

setInterval(updateTime, 1000);
updateTime();

// ===== 10. 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    console.log('锦绣中华·非遗文化展示网 加载完成');
});

// ===== 视频播放控制 =====
function playVideo(overlay) {
    const video = overlay.previousElementSibling;
    if (video) {
        video.play();
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    }
}

document.querySelectorAll('.master-video video').forEach(video => {
    video.addEventListener('play', function() {
        const overlay = this.nextElementSibling;
        if (overlay && overlay.classList.contains('video-overlay')) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }
    });
    
    video.addEventListener('pause', function() {
        const overlay = this.nextElementSibling;
        if (overlay && overlay.classList.contains('video-overlay')) {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        }
    });
});

// ===== 留言板功能 =====
const defaultMessages = [
    {
        name: '李明',
        contact: '138****1234',
        project: '京剧',
        message: '京剧艺术博大精深，希望能有更多年轻人了解并传承这门国粹艺术。期待能有机会到现场观看康万生老师的演出！',
        time: '2026-05-18 14:30:25'
    },
    {
        name: '王小红',
        contact: 'wx_xiaohong',
        project: '剪纸',
        message: '小时候奶奶教过我剪纸，现在看到这门手艺被列入非遗名录，感到非常自豪。希望能开设更多剪纸体验课程，让更多人感受传统文化的魅力。',
        time: '2026-05-19 09:15:08'
    },
    {
        name: '张建国',
        contact: '139****5678',
        project: '陶瓷烧制',
        message: '景德镇陶瓷名扬天下，去年去过一次，亲眼看到老师傅们拉坯、施釉的过程，非常震撼。希望能保护好这些传统技艺，不要让它们失传。',
        time: '2026-05-20 16:45:33'
    }
];

let messages = JSON.parse(localStorage.getItem('heritageMessages')) || [...defaultMessages];

function renderMessages() {
    const messageList = document.getElementById('message-list');

    if (messages.length === 0) {
        messageList.innerHTML = '<div class="empty-message">暂无留言，快来发表第一条留言吧！</div>';
        return;
    }

    messageList.innerHTML = messages.map((msg, index) => `
        <div class="message-item" data-index="${index}">
            <div class="message-header">
                <div>
                    <span class="message-author">${escapeHtml(msg.name)}</span>
                    ${msg.project ? `<span class="message-project">${escapeHtml(msg.project)}</span>` : ''}
                </div>
                <span class="message-time">${msg.time}</span>
            </div>
            <div class="message-content">${escapeHtml(msg.message)}</div>
            <div class="message-contact">联系方式：${escapeHtml(msg.contact)}</div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function saveMessages() {
    localStorage.setItem('heritageMessages', JSON.stringify(messages));
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const project = document.getElementById('project').value;
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        showModal('验证失败', '姓名不能为空，请填写您的姓名！');
        document.getElementById('name').focus();
        return false;
    }

    if (contact === '') {
        showModal('验证失败', '联系方式不能为空，请填写手机号或微信！');
        document.getElementById('contact').focus();
        return false;
    }

    if (message === '') {
        showModal('验证失败', '留言内容不能为空，请填写您的留言或预约需求！');
        document.getElementById('message').focus();
        return false;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    const wxRegex = /^[a-zA-Z0-9_-]{6,20}$/;
    if (!phoneRegex.test(contact) && !wxRegex.test(contact)) {
        showModal('验证失败', '联系方式格式不正确，请输入有效的手机号或微信号！');
        return false;
    }

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    messages.unshift({
        name: name,
        contact: contact,
        project: project || '未选择',
        message: message,
        time: timeStr
    });

    saveMessages();
    renderMessages();
    document.getElementById('messageForm').reset();
    showModal('提交成功', '您的留言已发布！感谢您对非遗文化的关注。');
    return false;
}

function resetForm() {
    document.getElementById('messageForm').reset();
    messages = [];
    saveMessages();
    renderMessages();
    showModal('重置成功', '表单已清空，所有留言已删除。');
}

document.addEventListener('DOMContentLoaded', function() {
    renderMessages();
});

// ===== 搜索功能（修改后）=====
const searchData = [
    { name: '京剧', category: '传统戏剧', keywords: '京剧 国粹 戏剧 戏曲 北京 西皮 二黄' },
    { name: '剪纸', category: '传统美术', keywords: '剪纸 民间艺术 手工 刻刀 花纹 窗花' },
    { name: '陶瓷烧制', category: '传统技艺', keywords: '陶瓷 景德镇 瓷器 烧制 窑火 手工 拉坯 施釉' },
    { name: '皮影戏', category: '传统戏剧', keywords: '皮影 皮影戏 陕西 华县 光影' },
    { name: '古琴艺术', category: '传统音乐', keywords: '古琴 音乐 七弦 琴棋书画' },
    { name: '端午节', category: '民俗', keywords: '端午 端午节 屈原 粽子 龙舟 湖北 秭归' },
    { name: '康万生', category: '传承人', keywords: '康万生 京剧 表演艺术家 非遗传承人 霸王别姬 贵妃醉酒' }
];

function performSearch() {
    const keyword = document.getElementById('searchInput').value.trim();
    
    if (!keyword) {
        showModal('搜索提示', '请输入搜索关键词！');
        return;
    }
    
    const results = searchData.filter(item => 
        item.name.includes(keyword) || 
        item.category.includes(keyword) || 
        item.keywords.includes(keyword)
    );
    
    if (results.length === 0) {
        showModal('搜索结果', '未找到与 "' + keyword + '" 相关的非遗项目。<br><br>您可以尝试搜索：京剧、剪纸、陶瓷、皮影、古琴、端午节等');
        return;
    }
    
    const resultText = results.map(r => '• ' + r.name + '（' + r.category + '）').join('<br>');
    pendingScrollKeyword = results[0].name;
    showModalWithConfirm('搜索结果', '找到 ' + results.length + ' 个相关项目：<br><br>' + resultText + '<br><br>点击"确定"跳转到第一个匹配项目。');
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function scrollToElement(keyword) {
    const heritageItems = document.querySelectorAll('.heritage-item');
    const tableRows = document.querySelectorAll('#heritageTable tbody tr');
    
    clearSearchHighlight();
    
    let found = false;
    
    heritageItems.forEach(item => {
        const searchAttr = item.getAttribute('data-search') || '';
        const title = item.querySelector('h3').textContent;
        
        if (searchAttr.includes(keyword) || title.includes(keyword)) {
            if (!found) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
            item.style.boxShadow = '0 0 20px #FFD700';
            item.style.transform = 'scale(1.02)';
            setTimeout(() => {
                item.style.boxShadow = '';
                item.style.transform = '';
            }, 3000);
        }
    });
    
    tableRows.forEach(row => {
        const searchAttr = row.getAttribute('data-search') || '';
        const cells = row.querySelectorAll('td');
        let rowMatch = false;
        
        cells.forEach(cell => {
            if (cell.textContent.includes(keyword) || searchAttr.includes(keyword)) {
                rowMatch = true;
                const originalHTML = cell.innerHTML;
                const regex = new RegExp('(' + keyword + ')', 'gi');
                cell.innerHTML = originalHTML.replace(regex, '<span class="search-highlight">$1</span>');
            }
        });
        
        if (rowMatch && !found) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
            row.style.background = '#FFE4B5';
            setTimeout(() => {
                row.style.background = '';
            }, 3000);
        }
    });
    
    if (keyword.includes('康万生') || keyword.includes('传承人')) {
        const masterSection = document.getElementById('masters');
        if (masterSection && !found) {
            masterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
        }
    }
}

function clearSearchHighlight() {
    document.querySelectorAll('.search-highlight').forEach(el => {
        const parent = el.parentNode;
        parent.textContent = parent.textContent;
    });
}
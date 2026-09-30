// ===== STATE =====
const state = {
    template: 'classic',
    customImage: null,
    names: [],
    config: {
        fontFamily: 'Poppins',
        fontSize: 48,
        fontWeight: 'bold',
        fontColor: '#1a1a2e',
        textAlign: 'center',
        posX: 800,
        posY: 550,
        outline: false,
        outlineColor: '#ffffff'
    }
};

// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderBuiltinPreviews();
    setupNavigation();
    setupTemplateUpload();
    setupBuiltinTemplates();
    setupNameInput();
    setupCustomization();
    setupDownload();
    updateCanvas();
});

// ===== BUILT-IN TEMPLATE RENDERERS =====
function drawBuiltinTemplate(canvas, type, isPreview = true) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    switch (type) {
        case 'classic':
            drawClassicTemplate(ctx, w, h, isPreview);
            break;
        case 'modern':
            drawModernTemplate(ctx, w, h, isPreview);
            break;
        case 'elegant':
            drawElegantTemplate(ctx, w, h, isPreview);
            break;
        case 'minimal':
            drawMinimalTemplate(ctx, w, h, isPreview);
            break;
    }
}

function drawClassicTemplate(ctx, w, h, isPreview) {
    // Background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#fdf6e3');
    grad.addColorStop(1, '#f5e6c8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Border
    const borderW = w * 0.03;
    ctx.strokeStyle = '#DAA520';
    ctx.lineWidth = borderW;
    ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

    // Inner border
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = borderW * 0.4;
    ctx.strokeRect(borderW * 1.8, borderW * 1.8, w - borderW * 3.6, h - borderW * 3.6);

    // Corner decorations
    const corner = w * 0.06;
    ctx.strokeStyle = '#DAA520';
    ctx.lineWidth = 2;
    drawCornerDecor(ctx, borderW * 2.5, borderW * 2.5, corner, 1, 1);
    drawCornerDecor(ctx, w - borderW * 2.5, borderW * 2.5, corner, -1, 1);
    drawCornerDecor(ctx, borderW * 2.5, h - borderW * 2.5, corner, 1, -1);
    drawCornerDecor(ctx, w - borderW * 2.5, h - borderW * 2.5, corner, -1, -1);

    if (!isPreview) {
        // Title
        ctx.fillStyle = '#8B4513';
        ctx.font = `bold ${w * 0.04}px Georgia`;
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE', w / 2, h * 0.18);

        ctx.fillStyle = '#DAA520';
        ctx.font = `${w * 0.025}px Georgia`;
        ctx.fillText('— OF ACHIEVEMENT —', w / 2, h * 0.24);

        // "This is to certify that"
        ctx.fillStyle = '#5D4E37';
        ctx.font = `${w * 0.018}px Poppins, sans-serif`;
        ctx.fillText('This is proudly presented to', w / 2, h * 0.38);

        // Line under name area
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.25, h * 0.58);
        ctx.lineTo(w * 0.75, h * 0.58);
        ctx.stroke();

        // Description
        ctx.fillStyle = '#5D4E37';
        ctx.font = `${w * 0.014}px Poppins, sans-serif`;
        ctx.fillText('in recognition of outstanding performance and dedication', w / 2, h * 0.66);

        // Date & Signature lines
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(w * 0.12, h * 0.85);
        ctx.lineTo(w * 0.38, h * 0.85);
        ctx.stroke();
        ctx.font = `${w * 0.012}px Poppins, sans-serif`;
        ctx.fillText('Date', w * 0.25, h * 0.89);

        ctx.beginPath();
        ctx.moveTo(w * 0.62, h * 0.85);
        ctx.lineTo(w * 0.88, h * 0.85);
        ctx.stroke();
        ctx.fillText('Signature', w * 0.75, h * 0.89);
    } else {
        ctx.fillStyle = '#8B4513';
        ctx.font = `bold ${w * 0.07}px Georgia`;
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE', w / 2, h * 0.35);
        ctx.fillStyle = '#DAA520';
        ctx.font = `${w * 0.04}px Georgia`;
        ctx.fillText('of Achievement', w / 2, h * 0.5);
        ctx.fillStyle = '#B8860B';
        ctx.font = `${w * 0.035}px Poppins, sans-serif`;
        ctx.fillText('Name Here', w / 2, h * 0.72);
    }
}

function drawModernTemplate(ctx, w, h, isPreview) {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Blue header strip
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, '#1a73e8');
    grad.addColorStop(1, '#4285F4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h * 0.12);

    // Blue footer strip
    const grad2 = ctx.createLinearGradient(0, 0, w, 0);
    grad2.addColorStop(0, '#4285F4');
    grad2.addColorStop(1, '#1a73e8');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, h * 0.92, w, h * 0.08);

    // Side accent
    ctx.fillStyle = '#e8f0fe';
    ctx.fillRect(0, h * 0.12, w * 0.02, h * 0.8);

    // Geometric shapes
    ctx.fillStyle = 'rgba(66, 133, 244, 0.08)';
    ctx.beginPath();
    ctx.arc(w * 0.9, h * 0.25, w * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.1, h * 0.8, w * 0.08, 0, Math.PI * 2);
    ctx.fill();

    if (!isPreview) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${w * 0.025}px Poppins, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText('CERTIFICATE OF COMPLETION', w * 0.06, h * 0.08);

        ctx.fillStyle = '#1a73e8';
        ctx.font = `bold ${w * 0.035}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('Certificate', w / 2, h * 0.25);

        ctx.fillStyle = '#5F6368';
        ctx.font = `${w * 0.016}px Poppins, sans-serif`;
        ctx.fillText('This certificate is awarded to', w / 2, h * 0.35);

        ctx.strokeStyle = '#4285F4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.2, h * 0.58);
        ctx.lineTo(w * 0.8, h * 0.58);
        ctx.stroke();

        ctx.fillStyle = '#5F6368';
        ctx.font = `${w * 0.014}px Poppins, sans-serif`;
        ctx.fillText('for successfully completing the program requirements', w / 2, h * 0.66);

        ctx.strokeStyle = '#dadce0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.12, h * 0.84);
        ctx.lineTo(w * 0.38, h * 0.84);
        ctx.stroke();
        ctx.font = `${w * 0.012}px Poppins, sans-serif`;
        ctx.fillText('Date', w * 0.25, h * 0.88);

        ctx.beginPath();
        ctx.moveTo(w * 0.62, h * 0.84);
        ctx.lineTo(w * 0.88, h * 0.84);
        ctx.stroke();
        ctx.fillText('Authorized Signature', w * 0.75, h * 0.88);
    } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${w * 0.055}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE', w / 2, h * 0.08);

        ctx.fillStyle = '#1a73e8';
        ctx.font = `bold ${w * 0.06}px Poppins, sans-serif`;
        ctx.fillText('Modern', w / 2, h * 0.45);
        ctx.fillStyle = '#5F6368';
        ctx.font = `${w * 0.04}px Poppins, sans-serif`;
        ctx.fillText('Name Here', w / 2, h * 0.65);
    }
}

function drawElegantTemplate(ctx, w, h, isPreview) {
    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#f0fdf0');
    grad.addColorStop(1, '#e8f5e9');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Green left border
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(0, 0, w * 0.025, h);

    // Green right border
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(w - w * 0.025, 0, w * 0.025, h);

    // Top-right triangle
    ctx.fillStyle = 'rgba(46, 125, 50, 0.1)';
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(w - w * 0.3, 0);
    ctx.lineTo(w, h * 0.3);
    ctx.closePath();
    ctx.fill();

    // Bottom-left triangle
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(w * 0.3, h);
    ctx.lineTo(0, h - h * 0.3);
    ctx.closePath();
    ctx.fill();

    if (!isPreview) {
        ctx.fillStyle = '#1B5E20';
        ctx.font = `bold ${w * 0.038}px Georgia`;
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Excellence', w / 2, h * 0.2);

        // Decorative line
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w * 0.3, h * 0.24);
        ctx.lineTo(w * 0.7, h * 0.24);
        ctx.stroke();

        ctx.fillStyle = '#388E3C';
        ctx.font = `${w * 0.016}px Poppins, sans-serif`;
        ctx.fillText('This is to certify that', w / 2, h * 0.37);

        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.2, h * 0.57);
        ctx.lineTo(w * 0.8, h * 0.57);
        ctx.stroke();

        ctx.fillStyle = '#388E3C';
        ctx.font = `${w * 0.014}px Poppins, sans-serif`;
        ctx.fillText('has demonstrated exceptional skills and commitment', w / 2, h * 0.66);

        ctx.strokeStyle = '#A5D6A7';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.12, h * 0.84);
        ctx.lineTo(w * 0.38, h * 0.84);
        ctx.stroke();
        ctx.font = `${w * 0.012}px Poppins, sans-serif`;
        ctx.fillText('Date', w * 0.25, h * 0.88);

        ctx.beginPath();
        ctx.moveTo(w * 0.62, h * 0.84);
        ctx.lineTo(w * 0.88, h * 0.84);
        ctx.stroke();
        ctx.fillText('Director', w * 0.75, h * 0.88);
    } else {
        ctx.fillStyle = '#1B5E20';
        ctx.font = `bold ${w * 0.06}px Georgia`;
        ctx.textAlign = 'center';
        ctx.fillText('ELEGANT', w / 2, h * 0.4);
        ctx.fillStyle = '#388E3C';
        ctx.font = `${w * 0.04}px Poppins, sans-serif`;
        ctx.fillText('Certificate', w / 2, h * 0.58);
        ctx.fillStyle = '#4CAF50';
        ctx.font = `${w * 0.035}px Poppins, sans-serif`;
        ctx.fillText('Name Here', w / 2, h * 0.78);
    }
}

function drawMinimalTemplate(ctx, w, h, isPreview) {
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Thin border
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.04, h * 0.04, w * 0.92, h * 0.92);

    // Inner thin border
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.strokeRect(w * 0.06, h * 0.06, w * 0.88, h * 0.88);

    if (!isPreview) {
        ctx.fillStyle = '#333333';
        ctx.font = `300 ${w * 0.03}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF', w / 2, h * 0.2);

        ctx.font = `bold ${w * 0.045}px Poppins, sans-serif`;
        ctx.fillText('APPRECIATION', w / 2, h * 0.28);

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.4, h * 0.31);
        ctx.lineTo(w * 0.6, h * 0.31);
        ctx.stroke();

        ctx.fillStyle = '#666';
        ctx.font = `300 ${w * 0.015}px Poppins, sans-serif`;
        ctx.fillText('Presented to', w / 2, h * 0.4);

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.25, h * 0.57);
        ctx.lineTo(w * 0.75, h * 0.57);
        ctx.stroke();

        ctx.fillStyle = '#666';
        ctx.font = `300 ${w * 0.013}px Poppins, sans-serif`;
        ctx.fillText('For outstanding contribution and dedication to the cause.', w / 2, h * 0.66);

        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.12, h * 0.84);
        ctx.lineTo(w * 0.35, h * 0.84);
        ctx.stroke();
        ctx.font = `300 ${w * 0.011}px Poppins, sans-serif`;
        ctx.fillText('Date', w * 0.235, h * 0.88);

        ctx.beginPath();
        ctx.moveTo(w * 0.65, h * 0.84);
        ctx.lineTo(w * 0.88, h * 0.84);
        ctx.stroke();
        ctx.fillText('Signature', w * 0.765, h * 0.88);
    } else {
        ctx.fillStyle = '#333';
        ctx.font = `300 ${w * 0.055}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('MINIMAL', w / 2, h * 0.4);
        ctx.fillStyle = '#999';
        ctx.font = `300 ${w * 0.035}px Poppins, sans-serif`;
        ctx.fillText('Clean & Simple', w / 2, h * 0.58);
    }
}

function drawCornerDecor(ctx, x, y, size, dirX, dirY) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size * dirX, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size * dirY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + size * 0.3 * dirX, y + size * 0.3 * dirY);
    ctx.lineTo(x + size * 0.7 * dirX, y + size * 0.3 * dirY);
    ctx.moveTo(x + size * 0.3 * dirX, y + size * 0.3 * dirY);
    ctx.lineTo(x + size * 0.3 * dirX, y + size * 0.7 * dirY);
    ctx.stroke();
}

function renderBuiltinPreviews() {
    ['classic', 'modern', 'elegant', 'minimal'].forEach(type => {
        const canvas = $(`#preview${type.charAt(0).toUpperCase() + type.slice(1)}`);
        if (canvas) drawBuiltinTemplate(canvas, type, true);
    });
}

// ===== NAVIGATION =====
function setupNavigation() {
    // Next/Back buttons
    $$('.btn-next, .btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = parseInt(btn.dataset.next);
            goToStep(nextStep);
        });
    });

    // Step clicks
    $$('.step').forEach(step => {
        step.addEventListener('click', () => {
            const stepNum = parseInt(step.dataset.step);
            goToStep(stepNum);
        });
    });
}

function goToStep(step) {
    // Validate before going forward
    if (step === 3 && state.names.length === 0) {
        alert('Please add at least one name before proceeding!');
        return;
    }

    $$('.panel').forEach(p => p.classList.remove('active'));
    $(`#panel-${step}`).classList.add('active');

    $$('.step').forEach((s, i) => {
        s.classList.remove('active');
        if (i + 1 < step) s.classList.add('completed');
        else s.classList.remove('completed');
        if (i + 1 === step) s.classList.add('active');
    });

    if (step === 3) {
        updatePreviewNameSelect();
        updateCanvas();
        initDragHandle();
    }

    if (step === 4) {
        generatePreviews();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== TEMPLATE UPLOAD =====
function setupTemplateUpload() {
    const uploadZone = $('#uploadZone');
    const fileInput = $('#templateUpload');

    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleTemplateFile(file);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) handleTemplateFile(e.target.files[0]);
    });

    $('#removeUpload').addEventListener('click', () => {
        state.customImage = null;
        $('#uploadedPreview').style.display = 'none';
        $$('.template-card').forEach(c => c.classList.remove('selected'));
        $$('.template-card')[0].classList.add('selected');
        state.template = 'classic';
    });
}

function handleTemplateFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            state.customImage = img;
            state.template = 'custom';
            $('#uploadedImg').src = e.target.result;
            $('#uploadedPreview').style.display = 'block';
            $$('.template-card').forEach(c => c.classList.remove('selected'));
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ===== BUILT-IN TEMPLATE SELECTION =====
function setupBuiltinTemplates() {
    $$('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            $$('.template-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.template = card.dataset.template;
            state.customImage = null;
            $('#uploadedPreview').style.display = 'none';
        });
    });
}

// ===== NAME INPUT =====
function setupNameInput() {
    // Method tabs
    $$('.method-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.method-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            $$('.method-content').forEach(c => c.classList.remove('active'));
            $(`#method-${btn.dataset.method}`).classList.add('active');
        });
    });

    // Manual add
    $('#addNameBtn').addEventListener('click', addManualName);
    $('#nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addManualName();
    });

    // Paste
    $('#parsePasteBtn').addEventListener('click', () => {
        const text = $('#pasteArea').value.trim();
        if (!text) return;
        const names = text.split('\n').map(n => n.trim()).filter(n => n.length > 0);
        names.forEach(name => {
            if (!state.names.includes(name)) state.names.push(name);
        });
        $('#pasteArea').value = '';
        renderNames();
    });

    // File upload
    const csvZone = $('#csvUploadZone');
    const csvInput = $('#csvUpload');

    csvZone.addEventListener('click', () => csvInput.click());
    csvZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        csvZone.classList.add('drag-over');
    });
    csvZone.addEventListener('dragleave', () => csvZone.classList.remove('drag-over'));
    csvZone.addEventListener('drop', (e) => {
        e.preventDefault();
        csvZone.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) handleCSVFile(e.dataTransfer.files[0]);
    });
    csvInput.addEventListener('change', (e) => {
        if (e.target.files[0]) handleCSVFile(e.target.files[0]);
    });

    // Bulk actions
    $('#selectAllBtn').addEventListener('click', () => {
        $$('.name-item input[type="checkbox"]').forEach(cb => cb.checked = true);
    });

    $('#deleteSelectedBtn').addEventListener('click', () => {
        const toDelete = [];
        $$('.name-item input[type="checkbox"]').forEach((cb, i) => {
            if (cb.checked) toDelete.push(i);
        });
        state.names = state.names.filter((_, i) => !toDelete.includes(i));
        renderNames();
    });

    $('#clearAllBtn').addEventListener('click', () => {
        if (confirm('Clear all names?')) {
            state.names = [];
            renderNames();
        }
    });
}

function addManualName() {
    const input = $('#nameInput');
    const name = input.value.trim();
    if (!name) return;
    if (state.names.includes(name)) {
        alert('Name already exists!');
        return;
    }
    state.names.push(name);
    input.value = '';
    input.focus();
    renderNames();
}

function handleCSVFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv' || ext === 'txt') {
        const reader = new FileReader();
        reader.onload = (e) => {
            const lines = e.target.result.split('\n');
            lines.forEach(line => {
                const cols = line.split(',');
                const name = cols[0].trim().replace(/["']/g, '');
                if (name && name.length > 0 && !state.names.includes(name)) {
                    // Skip header-like entries
                    if (name.toLowerCase() !== 'name' && name.toLowerCase() !== 'names') {
                        state.names.push(name);
                    }
                }
            });
            renderNames();
        };
        reader.readAsText(file);
    } else if (ext === 'xlsx' || ext === 'xls') {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const workbook = XLSX.read(e.target.result, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                data.forEach((row, i) => {
                    if (i === 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('name')) return;
                    const name = String(row[0] || '').trim();
                    if (name && !state.names.includes(name)) {
                        state.names.push(name);
                    }
                });
                renderNames();
            } catch (err) {
                alert('Error reading Excel file. Please try CSV format.');
            }
        };
        reader.readAsArrayBuffer(file);
    }
}

function renderNames() {
    const list = $('#namesList');
    const count = $('#nameCount');
    count.textContent = state.names.length;

    if (state.names.length === 0) {
        list.innerHTML = '<div class="empty-state">No names added yet. Start adding names above!</div>';
        return;
    }

    list.innerHTML = state.names.map((name, i) => `
        <div class="name-item" data-index="${i}">
            <input type="checkbox">
            <span class="name-number">#${i + 1}</span>
            <span class="name-text">${name}</span>
            <button class="edit-name" onclick="editName(${i})">✎ Edit</button>
            <button class="delete-name" onclick="deleteName(${i})">✕</button>
        </div>
    `).join('');
}

function editName(index) {
    const newName = prompt('Edit name:', state.names[index]);
    if (newName && newName.trim()) {
        state.names[index] = newName.trim();
        renderNames();
    }
}

function deleteName(index) {
    state.names.splice(index, 1);
    renderNames();
}

// Make functions global
window.editName = editName;
window.deleteName = deleteName;

// ===== CUSTOMIZATION =====
function setupCustomization() {
    const cfg = state.config;

    $('#fontFamily').addEventListener('change', (e) => { cfg.fontFamily = e.target.value; updateCanvas(); });
    $('#fontSize').addEventListener('input', (e) => {
        cfg.fontSize = parseInt(e.target.value);
        $('#fontSizeVal').textContent = cfg.fontSize;
        updateCanvas();
    });
    $('#fontWeight').addEventListener('change', (e) => { cfg.fontWeight = e.target.value; updateCanvas(); });
    $('#fontColor').addEventListener('input', (e) => { cfg.fontColor = e.target.value; updateCanvas(); });
    $('#posX').addEventListener('input', (e) => {
        cfg.posX = parseInt(e.target.value);
        $('#posXVal').textContent = cfg.posX;
        updateCanvas();
        updateDragHandlePosition();
    });
    $('#posY').addEventListener('input', (e) => {
        cfg.posY = parseInt(e.target.value);
        $('#posYVal').textContent = cfg.posY;
        updateCanvas();
        updateDragHandlePosition();
    });

    $('#addOutline').addEventListener('change', (e) => {
        cfg.outline = e.target.checked;
        $('#outlineColorGroup').style.display = cfg.outline ? 'block' : 'none';
        updateCanvas();
    });
    $('#outlineColor').addEventListener('input', (e) => { cfg.outlineColor = e.target.value; updateCanvas(); });

    $$('.preset').forEach(p => {
        p.addEventListener('click', () => {
            cfg.fontColor = p.dataset.color;
            $('#fontColor').value = p.dataset.color;
            updateCanvas();
        });
    });

    $$('.align-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.align-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            cfg.textAlign = btn.dataset.align;
            updateCanvas();
        });
    });

    $('#previewNameSelect').addEventListener('change', (e) => {
        updateCanvas();
    });
}

function updatePreviewNameSelect() {
    const select = $('#previewNameSelect');
    select.innerHTML = '<option value="Sample Name">Sample Name</option>';
    state.names.forEach(name => {
        select.innerHTML += `<option value="${name}">${name}</option>`;
    });
    if (state.names.length > 0) select.value = state.names[0];
}

function updateCanvas() {
    const canvas = $('#certificateCanvas');
    const ctx = canvas.getContext('2d');
    const cfg = state.config;
    const previewName = $('#previewNameSelect')?.value || 'Sample Name';

    // Draw template
    if (state.customImage) {
        canvas.width = state.customImage.width || 1600;
        canvas.height = state.customImage.height || 1100;
        ctx.drawImage(state.customImage, 0, 0, canvas.width, canvas.height);
    } else {
        canvas.width = 1600;
        canvas.height = 1100;
        drawBuiltinTemplate(canvas, state.template, false);
    }

    // Draw name
    ctx.fillStyle = cfg.fontColor;
    ctx.font = `${cfg.fontWeight} ${cfg.fontSize}px "${cfg.fontFamily}"`;
    ctx.textAlign = cfg.textAlign;
    ctx.textBaseline = 'middle';

    let textX = cfg.posX;
    if (cfg.textAlign === 'left') textX = cfg.posX;
    else if (cfg.textAlign === 'right') textX = cfg.posX;

    if (cfg.outline) {
        ctx.strokeStyle = cfg.outlineColor;
        ctx.lineWidth = 3;
        ctx.strokeText(previewName, textX, cfg.posY);
    }

    ctx.fillText(previewName, textX, cfg.posY);

    // Update drag handle text
    const dragText = $('#dragText');
    if (dragText) {
        dragText.textContent = previewName;
        dragText.style.fontFamily = cfg.fontFamily;
    }
}

// ===== DRAG & DROP NAME POSITIONING =====
function initDragHandle() {
    const wrapper = $('#canvasWrapper');
    const handle = $('#dragHandle');
    const canvas = $('#certificateCanvas');

    if (!wrapper || !handle) return;

    updateDragHandlePosition();

    let isDragging = false;
    let offsetX, offsetY;

    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: false });

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const rect = handle.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function onDrag(e) {
        if (!isDragging) return;
        e.preventDefault();

        const wrapperRect = wrapper.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        let x = clientX - wrapperRect.left - offsetX + handle.offsetWidth / 2;
        let y = clientY - wrapperRect.top - offsetY + handle.offsetHeight / 2;

        // Clamp
        x = Math.max(0, Math.min(wrapperRect.width, x));
        y = Math.max(0, Math.min(wrapperRect.height, y));

        // Convert to canvas coordinates
        const scaleX = canvas.width / wrapperRect.width;
        const scaleY = canvas.height / wrapperRect.height;

        state.config.posX = Math.round(x * scaleX);
        state.config.posY = Math.round(y * scaleY);

        // Update sliders
        $('#posX').value = state.config.posX;
        $('#posY').value = state.config.posY;
        $('#posXVal').textContent = state.config.posX;
        $('#posYVal').textContent = state.config.posY;

        // Update handle position
        handle.style.left = (x - handle.offsetWidth / 2) + 'px';
        handle.style.top = (y - handle.offsetHeight / 2) + 'px';

        updateCanvas();
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
}

function updateDragHandlePosition() {
    const wrapper = $('#canvasWrapper');
    const handle = $('#dragHandle');
    const canvas = $('#certificateCanvas');

    if (!wrapper || !handle || !canvas) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const scaleX = wrapperRect.width / canvas.width;
    const scaleY = wrapperRect.height / canvas.height;

    const displayX = state.config.posX * scaleX;
    const displayY = state.config.posY * scaleY;

    handle.style.left = (displayX - handle.offsetWidth / 2) + 'px';
    handle.style.top = (displayY - handle.offsetHeight / 2) + 'px';
}

// ===== GENERATE & DOWNLOAD =====
function setupDownload() {
    $('#downloadAllImages').addEventListener('click', downloadAllImages);
    $('#downloadPDF').addEventListener('click', downloadPDF);
}

function generateCertificateCanvas(name) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cfg = state.config;

    const mainCanvas = $('#certificateCanvas');
    canvas.width = mainCanvas.width;
    canvas.height = mainCanvas.height;

    // Draw template
    if (state.customImage) {
        ctx.drawImage(state.customImage, 0, 0, canvas.width, canvas.height);
    } else {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        drawBuiltinTemplate(tempCanvas, state.template, false);
        ctx.drawImage(tempCanvas, 0, 0);
    }

    // Draw name
    ctx.fillStyle = cfg.fontColor;
    ctx.font = `${cfg.fontWeight} ${cfg.fontSize}px "${cfg.fontFamily}"`;
    ctx.textAlign = cfg.textAlign;
    ctx.textBaseline = 'middle';

    if (cfg.outline) {
        ctx.strokeStyle = cfg.outlineColor;
        ctx.lineWidth = 3;
        ctx.strokeText(name, cfg.posX, cfg.posY);
    }

    ctx.fillText(name, cfg.posX, cfg.posY);

    return canvas;
}

function generatePreviews() {
    const grid = $('#previewGrid');
    grid.innerHTML = '';

    if (state.names.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-light); text-align: center; grid-column: 1/-1;">No names to generate certificates for. Go back and add names.</p>';
        return;
    }

    const maxPreview = Math.min(state.names.length, 20);

    for (let i = 0; i < maxPreview; i++) {
        const name = state.names[i];
        const certCanvas = generateCertificateCanvas(name);

        const card = document.createElement('div');
        card.className = 'preview-card';

        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = certCanvas.width;
        previewCanvas.height = certCanvas.height;
        previewCanvas.getContext('2d').drawImage(certCanvas, 0, 0);

        const info = document.createElement('div');
        info.className = 'preview-card-info';
        info.innerHTML = `
            <span>${name}</span>
            <button class="btn btn-sm btn-primary" onclick="downloadSingle(${i})">⬇ Download</button>
        `;

        card.appendChild(previewCanvas);
        card.appendChild(info);
        grid.appendChild(card);
    }

    if (state.names.length > maxPreview) {
        const more = document.createElement('div');
        more.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 20px; color: var(--text-light);';
        more.textContent = `... and ${state.names.length - maxPreview} more certificates`;
        grid.appendChild(more);
    }
}

window.downloadSingle = function (index) {
    const name = state.names[index];
    const canvas = generateCertificateCanvas(name);
    const link = document.createElement('a');
    link.download = `certificate_${name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
};

async function downloadAllImages() {
    if (state.names.length === 0) return alert('No names to generate!');

    const progress = $('#progressSection');
    const fill = $('#progressFill');
    const text = $('#progressText');
    progress.style.display = 'block';

    const zip = new JSZip();

    for (let i = 0; i < state.names.length; i++) {
        const name = state.names[i];
        const canvas = generateCertificateCanvas(name);
        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];
        zip.file(`certificate_${(i + 1).toString().padStart(3, '0')}_${name.replace(/\s+/g, '_')}.png`, base64, { base64: true });

        const pct = Math.round(((i + 1) / state.names.length) * 100);
        fill.style.width = pct + '%';
        text.textContent = `Generating: ${i + 1} / ${state.names.length} (${pct}%)`;

        // Yield to UI
        await new Promise(r => setTimeout(r, 10));
    }

    text.textContent = 'Creating ZIP file...';
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.download = 'certificates.zip';
    link.href = URL.createObjectURL(blob);
    link.click();

    text.textContent = '✅ Download complete!';
    setTimeout(() => { progress.style.display = 'none'; }, 3000);
}

async function downloadPDF() {
    if (state.names.length === 0) return alert('No names to generate!');

    const progress = $('#progressSection');
    const fill = $('#progressFill');
    const text = $('#progressText');
    progress.style.display = 'block';

    const { jsPDF } = window.jspdf;
    const firstCanvas = generateCertificateCanvas(state.names[0]);
    const pdfW = firstCanvas.width;
    const pdfH = firstCanvas.height;

    const pdf = new jsPDF({
        orientation: pdfW > pdfH ? 'landscape' : 'portrait',
        unit: 'px',
        format: [pdfW, pdfH]
    });

    for (let i = 0; i < state.names.length; i++) {
        if (i > 0) pdf.addPage([pdfW, pdfH], pdfW > pdfH ? 'landscape' : 'portrait');

        const canvas = generateCertificateCanvas(state.names[i]);
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);

        const pct = Math.round(((i + 1) / state.names.length) * 100);
        fill.style.width = pct + '%';
        text.textContent = `Generating PDF: ${i + 1} / ${state.names.length} (${pct}%)`;

        await new Promise(r => setTimeout(r, 10));
    }

    text.textContent = 'Saving PDF...';
    pdf.save('certificates.pdf');

    text.textContent = '✅ PDF download complete!';
    setTimeout(() => { progress.style.display = 'none'; }, 3000);
}
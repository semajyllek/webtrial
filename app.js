let caseData = { timeline: [], arguments: [], witnesses: {}, selectedWitness: null };

function render() {
    // Render Witness List
    const wList = document.getElementById('witness-list');
    wList.innerHTML = Object.keys(caseData.witnesses || {}).map(w => 
        `<div class="witness-item ${caseData.selectedWitness === w ? 'active' : ''}" onclick="selectWitness('${w}')">• ${w}</div>`
    ).join('');

    // Render Timeline with universal key support
    const tlView = document.getElementById('timeline-view');
    tlView.innerHTML = (caseData.timeline || []).sort((a,b) => new Date(a.date || a.time) - new Date(b.date || b.time)).map(item => `
        <div class="timeline-item ${caseData.selectedWitness === item.witness ? 'highlight' : ''}" data-witness="${item.witness}">
            <div style="font-weight:bold; color:var(--accent);">${(item.date || item.time || "").replace('T', ' ')}</div>
            <div>${item.desc || item.event}</div>
        </div>
    `).join('');
}

function selectWitness(name) {
    caseData.selectedWitness = name;
    document.getElementById('cross-exam-section').style.display = 'block';
    document.getElementById('cross-header').innerText = "Cross-Exam: " + name;
    document.getElementById('cross-exam-notes').value = caseData.witnesses[name].notes || "";
    render();
}

function importCase(e) {
    const reader = new FileReader();
    reader.onload = (ev) => {
        caseData = JSON.parse(ev.target.result);
        render();
        initGame(); // Connects the game to the new data
    };
    reader.readAsText(e.target.files[0]);
}

function exportCase() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(caseData));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "trial_export.json");
    dl.click();
}

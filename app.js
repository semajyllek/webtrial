let caseData = { timeline: [], charges: [], witnesses: {}, selectedWitness: null };

function render() {
    const wList = document.getElementById('witness-list');
    wList.innerHTML = Object.keys(caseData.witnesses || {}).map(w => 
        `<div class="witness-item ${caseData.selectedWitness === w ? 'active' : ''}" onclick="selectWitness('${w}')">${w}</div>`
    ).join('');

    const tlView = document.getElementById('timeline-view');
    tlView.innerHTML = (caseData.timeline || []).map(item => `
        <div class="timeline-item">
            <div style="font-weight:bold; color:#7C866D;">${(item.date || item.time || "").replace('T', ' ')}</div>
            <div style="font-size:14px;">${item.desc || item.event}</div>
        </div>
    `).join('');
}

function selectWitness(name) {
    caseData.selectedWitness = name;
    document.getElementById('cross-exam-section').style.display = 'block';
    document.getElementById('cross-header').innerText = "Exam: " + name;
    document.getElementById('cross-exam-notes').value = caseData.witnesses[name].notes || "";
    render();
}

function updateWitnessNotes(val) {
    if(caseData.selectedWitness) caseData.witnesses[caseData.selectedWitness].notes = val;
}

function importCase(e) {
    const reader = new FileReader();
    reader.onload = (ev) => { caseData = JSON.parse(ev.target.result); render(); };
    reader.readAsText(e.target.files[0]);
}

function exportCase() {
    const blob = new Blob([JSON.stringify(caseData)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = "case_data.json"; a.click();
}

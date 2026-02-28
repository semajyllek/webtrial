let caseData = { timeline: [], charges: [], stipulations: [], witnesses: {}, selectedWitness: null };

function render() {
    renderWitnessList();
    renderTimeline();
    renderStrategy();
}

function renderWitnessList() {
    const wList = document.getElementById('witness-list');
    wList.innerHTML = Object.keys(caseData.witnesses || {}).map(w => 
        `<div class="witness-item ${caseData.selectedWitness === w ? 'active' : ''}" onclick="selectWitness('${w}')">${w}</div>`
    ).join('');
}

function renderTimeline() {
    const tlView = document.getElementById('timeline-view');
    const timeline = caseData.timeline || [];
    tlView.innerHTML = timeline.sort((a,b) => new Date(a.date || a.time) - new Date(b.date || b.time)).map(item => `
        <div class="timeline-item ${caseData.selectedWitness === item.witness ? 'highlight' : ''}">
            <div style="font-weight:bold;">${(item.date || item.time || "").replace('T', ' ')}</div>
            <div>${item.desc || item.event}</div>
            ${item.witness ? `<div style="font-size:10px; color:#666;">Witness: ${item.witness}</div>` : ''}
        </div>
    `).join('');
}


function renderStrategy() {
    const tree = document.getElementById('argument-tree');
    let html = "<h2>ARGUMENT BATTLE MAP</h2>";

    const branches = [
        {
            charge: "MANSLAUGHTER (RECKLESSNESS)",
            pro: "Taylor ignored Carmen's direct medical warning.",
            con: "Tradition was alcohol-free; reaction was unforeseeable."
        },
        {
            charge: "HAZING (COMPulsion)",
            pro: "Water was required for ESE membership status.",
            con: "Jessica was 'clowning around' and voluntary.",
            rebuttal: "STATUTORY BAR: Consent is not a defense (ORS 163.197)."
        }
    ];

    html += branches.map(b => `
        <details style="margin-bottom:15px; border-left: 2px solid #000; padding-left:10px;">
            <summary style="font-weight:bold; cursor:pointer;">${b.charge}</summary>
            <div style="margin-top:5px; font-size:12px;">
                <p><strong>PROSECUTION:</strong> ${b.pro}</p>
                <p><strong>DEFENSE COUNTER:</strong> ${b.con}</p>
                ${b.rebuttal ? `<p style="color:#666; font-style:italic;"><strong>REBUTTAL:</strong> ${b.rebuttal}</p>` : ''}
            </div>
        </details>
    `).join('');

    tree.innerHTML = html;
}


function selectWitness(name) {
    caseData.selectedWitness = name;
    document.getElementById('cross-exam-section').style.display = 'block';
    document.getElementById('cross-header').innerText = "NOTES: " + name;
    document.getElementById('cross-exam-notes').value = caseData.witnesses[name].notes || "";
    render();
}

function importCase(e) {
    const reader = new FileReader();
    reader.onload = (ev) => { caseData = JSON.parse(ev.target.result); render(); };
    reader.readAsText(e.target.files[0]);
}

function exportCase() {
    const blob = new Blob([JSON.stringify(caseData)], {type: "application/json"});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = "case_export.json"; a.click();
}

/**
 * Objection Engine: Case-Agnostic Legal Practice
 * Rules sourced from Oregon High School Mock Trial Rules of Evidence
 */

const agnosticQuestions = [
    { q: "Attorney: 'You're just lying because you hate my client, aren't you?'", a: "Argumentative", r: "Rule 38(1)" },
    { q: "Witness: 'My neighbor told me he saw the car speed away.'", a: "Hearsay", r: "Rule 801" },
    { q: "Attorney: 'What was the driver thinking when they hit the brakes?'", a: "Speculation", r: "Rule 602" },
    { q: "Attorney: 'Isn't it true you were arrested for shoplifting ten years ago?'", a: "Rule 404: Character", r: "Rule 404" },
    { q: "Witness: 'I really enjoy gardening on the weekends.' (In a trial about a bank robbery)", a: "Relevance", r: "Rule 401" },
    { q: "Attorney (on Direct): 'You saw the defendant hold the gun, right?'", a: "Leading Question", r: "Rule 611" },
    { q: "Witness: 'The weather was beautiful.' (When asked if they saw the crash happen)", a: "Non-Responsive", r: "Rule 38(5)" },
    { q: "Witness: 'The victim screamed \"He has a knife!\" right as the door broke.'", a: "Hearsay Exception", r: "Rule 803(2)" },
    { q: "Attorney: 'When did you stop stealing from your boss?' (No evidence of theft presented)", a: "Assuming Facts", r: "Rule 38(3)" },
    { q: "Attorney: 'Tell the jury your life story starting from the day you were born.'", a: "Narrative", r: "Rule 38(4)" }
];

let score = 0;

function initObjectionGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    nextScenario();
}

function nextScenario() {
    const q = agnosticQuestions[Math.floor(Math.random() * agnosticQuestions.length)];
    document.getElementById('scenario-text').innerText = q.q;
    
    const options = ["Hearsay", "Argumentative", "Speculation", "Rule 404: Character", "Relevance", "Leading Question", "Non-Responsive", "Hearsay Exception", "Assuming Facts", "Narrative"];
    document.getElementById('options-grid').innerHTML = options.map(opt => 
        `<button onclick="checkObjection('${opt}', '${q.a}', '${q.r}')">${opt}</button>`
    ).join('');
}

function checkObjection(guess, actual, rule) {
    if(guess === actual) {
        score += 10;
        alert(`Correct! Identified ${actual} under ${rule}.`);
    } else {
        alert(`Incorrect. The proper objection was ${actual}.`);
    }
    document.getElementById('score').innerText = score;
    nextScenario();
}

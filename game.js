const objections = ["Hearsay", "Rule 404: Character", "Argumentative", "Speculation", "Rule 401: Relevance"];
let score = 0;

const scenarios = [
    { text: "Sgt. Knight: 'The doctor told me Jessica passed out.'", correct: "Hearsay" },
    { text: "Prosecution: 'You wanted to be the best Pledge Master ever, right?'", correct: "Argumentative" }
];

function initGame() {
    score = 0;
    const q = scenarios[Math.floor(Math.random() * scenarios.length)];
    document.getElementById('scenario-text').innerText = q.text;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = objections.map(opt => 
        `<button onclick="checkObjection('${opt}', '${q.correct}')">${opt}</button>`
    ).join('');
}

function checkObjection(choice, correct) {
    if (choice === correct) {
        score += 10;
        alert("Correct!");
    } else {
        alert("Wrong. Correct answer: " + correct);
    }
    document.getElementById('score').innerText = score;
    initGame();
}

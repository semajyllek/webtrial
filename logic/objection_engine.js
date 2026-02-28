/**
 * Objection Engine: Logic for the WebTrial Practice Game
 * Derived from Oregon High School Mock Trial Rules of Evidence [cite: 8]
 */

let currentScore = 0;
let currentIndex = 0;
let questions = [];

// Initialize the game by fetching the questions
async function initObjectionGame() {
    try {
        const response = await fetch('data/practice_questions.json');
        questions = await response.json();
        currentScore = 0;
        currentIndex = 0;
        updateScoreUI();
        showScenario();
    } catch (error) {
        console.error("Failed to load practice questions:", error);
    }
}

function showScenario() {
    if (currentIndex >= questions.length) {
        endGame();
        return;
    }

    const q = questions[currentIndex];
    const scenarioText = document.getElementById('scenario-text');
    const optionsGrid = document.getElementById('options-grid');

    scenarioText.innerText = q.scenario;
    
    // Standard set of objections allowed in the competition [cite: 1, 8]
    const objectionTypes = [
        "Hearsay", 
        "Argumentative", 
        "Speculation / Lack of Knowledge", 
        "Rule 404: Character Evidence", 
        "Rule 403: Unduly Prejudicial",
        "Leading Question"
    ];

    optionsGrid.innerHTML = objectionTypes.map(opt => 
        `<button class="game-btn" onclick="handleGuess('${opt}')">${opt}</button>`
    ).join('');
}

function handleGuess(choice) {
    const q = questions[currentIndex];
    const isCorrect = (choice === q.correct_objection);

    if (isCorrect) {
        currentScore += q.points;
        alert(`CORRECT!\n\n${q.feedback}\n(See ${q.rule_reference})`);
    } else {
        alert(`INCORRECT.\n\nThe proper objection was: ${q.correct_objection}.\n\nReason: ${q.feedback}`);
    }

    updateScoreUI();
    currentIndex++;
    showScenario();
}

function updateScoreUI() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = currentScore;
}

function endGame() {
    const scenarioText = document.getElementById('scenario-text');
    scenarioText.innerText = `Training Complete! Final Score: ${currentScore}`;
    document.getElementById('options-grid').innerHTML = 
        `<button onclick="initObjectionGame()">Restart Training</button>`;
}

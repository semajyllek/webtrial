let score = 0;
let quizData = [];
let currentQuestion = null;

async function initObjectionGame() {
    try {
        const response = await fetch('data/practice_questions.json');
        quizData = await response.json();
        score = 0;
        document.getElementById('score').innerText = score;
        document.getElementById('start-btn').style.display = 'none';
        nextScenario();
    } catch (e) {
        console.error("Error loading questions", e);
    }
}

function nextScenario() {
    currentQuestion = quizData[Math.floor(Math.random() * quizData.length)];
    document.getElementById('scenario-text').innerText = currentQuestion.scenario;
    
    const options = [
        "Hearsay", "Argumentative", "Speculation", 
        "Rule 404: Character", "Relevance", "Leading Question", 
        "Non-Responsive", "Hearsay Exception", "Assuming Facts", "Narrative"
    ];
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = options.map(opt => 
        `<button onclick="checkAnswer('${opt}')">${opt}</button>`
    ).join('');
}

function checkAnswer(guess) {
    if (guess === currentQuestion.correct) {
        score += (currentQuestion.points || 10);
        alert(`CORRECT!\n\nRule: ${currentQuestion.rule}\n${currentQuestion.feedback}`);
    } else {
        alert(`INCORRECT.\n\nCorrect Objection: ${currentQuestion.correct}\nReason: ${currentQuestion.feedback}`);
    }
    document.getElementById('score').innerText = score;
    nextScenario();
}

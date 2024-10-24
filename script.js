const quizData = [
    {
        question: "スマートフォンは何を実現したでしょう？",
        answers: ["フェイスIDによる  顔認証", "防水性能", "ワイヤレス  充電機能","マルチタッチによる直感操作"],
        correct: 3
    },
    {
        question: "HTMLは何の略ですか？",
        answers: ["High Text Markup Language", "Hyper Text Markup Language", "Hyperlink Text Markup Language", "None of the above"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadStartScreen();
});

function loadStartScreen() {
    const startScreen = document.getElementById('startScreen');
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');
    document.body.appendChild(curtain);

    setTimeout(() => {
        curtain.remove();
        startScreen.style.display = 'block';
    }, 500);
}

document.getElementById('startButton').onclick = () => {
    const startScreen = document.getElementById('startScreen');
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');
    document.body.appendChild(curtain);

    setTimeout(() => {
        startScreen.style.display = 'none';
        curtain.remove();
        document.getElementById('quiz').style.display = 'block';
        loadQuestion();
    }, 500);
};

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const currentQuestion = quizData[currentQuestionIndex];

    const questionElement = document.createElement('h2');
    questionElement.classList.add('question', 'fade-in');
    questionElement.textContent = currentQuestion.question;
    quizContainer.appendChild(questionElement);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers');

    currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement('div');
        answerButton.textContent = answer;
        answerButton.classList.add('answer');
        answerButton.onclick = () => selectAnswer(index);

        answerButton.onmouseenter = () => {
            answerButton.classList.add('hover');
        };
        answerButton.onmouseleave = () => {
            answerButton.classList.remove('hover');
        };

        answersContainer.appendChild(answerButton);
    });

    quizContainer.appendChild(answersContainer);

    setTimeout(() => {
        questionElement.classList.add('show');
    }, 10);
}

function selectAnswer(index) {
    const currentQuestion = quizData[currentQuestionIndex];
    const answerElements = document.querySelectorAll('.answer');

    answerElements.forEach((element, i) => {
        if (i === currentQuestion.correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
            element.classList.add('shake');
        }
        element.onclick = null;
    });

    if (index === currentQuestion.correct) {
        score++;
    }

    document.getElementById('next').style.display = 'block';
}

document.getElementById('next').onclick = () => {
    const totalQuestions = quizData.length;

    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion();
        document.getElementById('next').style.display = 'none';
    } else {
        const curtain = document.createElement('div');
        curtain.classList.add('curtain');
        document.body.appendChild(curtain);

        setTimeout(() => {
            curtain.style.animation = 'curtainDown 0.5s forwards';
            document.body.style.backgroundColor = 'black';

            // スコアをチェック
            if (score === totalQuestions) {
                playSound('correctSound'); // 満点の音
                showMessage("やったね👍→右に行ってね。", "white");
            } else if (score === 0) {
                playSound('wrongSound'); // 不正解の音
                showMessage("お疲れ様👍↑前に行ってね", "white", true);
            } else {
                playSound('correctSound'); // 1/2正解の音
                showMessage("やってね👍→右に行ってね", "white");
            }
        }, 500);
    }
};

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // 再生位置を先頭に戻す
    sound.play();
}

function showMessage(message, color, isWrong = false) {
    const messageElement = document.createElement('h2');
    messageElement.textContent = message;
    messageElement.style.color = color;
    messageElement.style.textShadow = "1px 1px 5px rgba(255, 255, 255, 0.5)";
    messageElement.style.position = "fixed";
    messageElement.style.top = "50%";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translate(-50%, -50%)";
    messageElement.style.fontSize = "50px";
    messageElement.style.opacity = 0;
    messageElement.style.transition = "opacity 0.5s";
    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.style.opacity = 1;
    }, 100);

    setTimeout(() => {
        messageElement.style.opacity = 0;
        setTimeout(() => {
            messageElement.remove();
            fadeOutBackgroundAndRedirect();
        }, 500);
    }, 10000);
}

function fadeOutBackgroundAndRedirect() {
    const curtain = document.createElement('div');
    curtain.classList.add('curtain');
    document.body.appendChild(curtain);

    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "https://arako2.netlify.app/";
    }, 1000);
}

// 音声ファイルの設定
const audioElements = `
<audio id="correctSound" src="mac.wav"></audio>
<audio id="wrongSound" src="xx.wav"></audio>
`;
document.body.insertAdjacentHTML('beforeend', audioElements);

// 初期クイズをロード
loadQuestion();

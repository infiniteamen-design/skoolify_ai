function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(tab + 'Tab').style.display = 'block';
}
showTab('chat');

// Chat
async function handleChat() {
    const input = document.getElementById('chatInput');
    const query = input.value.trim();
    if (!query) return;
    const response = await researchChat(query);
    const historyDiv = document.getElementById('chatHistory');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = response;
    historyDiv.appendChild(msgDiv);
    saveItem('chats', query, response);
    input.value = '';
}

// Videos
async function handleVideos() {
    const topic = document.getElementById('videoTopic').value.trim();
    const classLevel = document.getElementById('videoClass').value.trim();
    const extra = document.getElementById('videoExtra').value.trim();
    if (!topic) return;
    const results = await findVideos(topic, classLevel, extra);
    const videoDiv = document.getElementById('videoResults');
    videoDiv.innerHTML = '';
    results.forEach(v => {
        const a = document.createElement('a');
        a.href = v.url;
        a.textContent = v.title || v.url;
        a.target = '_blank';
        videoDiv.appendChild(a);
        videoDiv.appendChild(document.createElement('br'));
    });
    saveItem('videos', topic, results);
}

// Notes
async function handleNotes() {
    const topic = document.getElementById('noteTopic').value.trim();
    const classLevel = document.getElementById('noteClass').value.trim();
    const extra = document.getElementById('noteExtra').value.trim();
    if (!topic) return;
    const notes = await generateNotes(topic, classLevel, extra);
    document.getElementById('noteResults').textContent = notes;
    saveItem('notes', topic, notes);
}

// Quiz
async function handleQuiz() {
    const topic = document.getElementById('quizTopic').value.trim();
    const classLevel = document.getElementById('quizClass').value.trim();
    const level = document.getElementById('quizLevel').value.trim();
    const extra = document.getElementById('quizExtra').value.trim();
    if (!topic) return;
    const quiz = await generateQuiz(topic, classLevel, level, extra);
    const quizDiv = document.getElementById('quizResults');
    quizDiv.innerHTML = '';
    quiz.questions.forEach(q => {
        const qDiv = document.createElement('div');
        qDiv.style.border = '1px solid #ccc';
        qDiv.style.padding = '8px';
        qDiv.style.marginTop = '10px';
        qDiv.innerHTML = `
            <p><strong>Q:</strong> ${q.question}</p>
            <ul>${q.options.map(opt => `<li>${opt}</li>`).join('')}</ul>
            <p><strong>Explanation:</strong> ${q.explanation}</p>
        `;
        quizDiv.appendChild(qDiv);
    });
    saveItem('quizzes', topic, quiz);
}

// Study
function loadStudyMaterials(topic) {
    const studyDiv = document.getElementById('studyResults');
    studyDiv.innerHTML = '';
    const notes = loadItem('notes', topic);
    const videos = loadItem('videos', topic);
    const quiz = loadItem('quizzes', topic);

    if (notes) studyDiv.innerHTML += `<h3>Notes:</h3><p>${notes}</p>`;
    if (videos && videos.length > 0) {
        const vDiv = document.createElement('div');
        vDiv.innerHTML = `<h3>Videos:</h3>`;
        videos.forEach(v => {
            const a = document.createElement('a');
            a.href = v.url;
            a.textContent = v.title || v.url;
            a.target = '_blank';
            vDiv.appendChild(a);
            vDiv.appendChild(document.createElement('br'));
        });
        studyDiv.appendChild(vDiv);
    }
    if (quiz && quiz.questions && quiz.questions.length > 0) {
        const qDiv = document.createElement('div');
        qDiv.innerHTML = `<h3>Quiz Preview:</h3><p>${quiz.questions.length} questions saved.</p>`;
        studyDiv.appendChild(qDiv);
    }
    if (!notes && (!videos || videos.length === 0) && (!quiz || quiz.questions.length === 0)) {
        studyDiv.textContent = 'No study materials found for this topic.';
    }
}

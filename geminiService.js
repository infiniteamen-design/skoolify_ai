async function callGemini(query) {
    try {
        const response = await fetch('proxy.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Gemini API error:', err);
        return {};
    }
}

async function researchChat(query) {
    const res = await callGemini(query);
    return res.response || 'No response from AI.';
}

async function findVideos(topic, classLevel, extra) {
    const query = `Find YouTube video links for topic "${topic}" for class ${classLevel}. Extra instructions: ${extra}`;
    const res = await callGemini(query);
    return res.videos || [];
}

async function generateNotes(topic, classLevel, extra) {
    const query = `Generate easy-to-understand lesson notes for topic "${topic}" for class ${classLevel}. Extra instructions: ${extra}`;
    const res = await callGemini(query);
    return res.notes || '';
}

async function generateQuiz(topic, classLevel, level, extra) {
    const query = `Create a quiz for topic "${topic}" for class ${classLevel}, level ${level}. Include detailed explanations. Extra instructions: ${extra}`;
    const res = await callGemini(query);
    return res.quiz || { questions: [] };
}

async function callGemini(query) {
    try {
        const response = await fetch('proxy.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        
        // Extract the text from the complex Gemini response object
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        return null;
    } catch (err) {
        console.error('Gemini API error:', err);
        return null;
    }
}

async function researchChat(query) {
    const res = await callGemini(query);
    return res || 'No response from AI.'; //
}

async function findVideos(topic, classLevel, extra) {
    const query = `Find 3 YouTube video links for topic "${topic}" for class ${classLevel}. Extra instructions: ${extra}. Return as a JSON list of objects with "title" and "url".`;
    const res = await callGemini(query);
    try {
        // If the AI returns a string that looks like JSON, we try to parse it
        return JSON.parse(res) || [];
    } catch {
        return []; 
    }
}

async function generateNotes(topic, classLevel, extra) {
    const query = `Generate easy-to-understand lesson notes for topic "${topic}" for class ${classLevel}. Extra instructions: ${extra}`;
    const res = await callGemini(query);
    return res || ''; //
}

async function generateQuiz(topic, classLevel, level, extra) {
    const query = `Create a 3-question quiz for "${topic}" (Class ${classLevel}, ${level} level). Return ONLY valid JSON in this format: {"questions": [{"question": "...", "options": ["...", "..."], "explanation": "..."}]}`;
    const res = await callGemini(query);
    try {
        return JSON.parse(res);
    } catch {
        return { questions: [] }; //
    }
}

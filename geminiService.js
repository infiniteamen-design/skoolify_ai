async function callGemini(query) {
    try {
        const response = await fetch('proxy.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });
        
        const data = await response.json();
        console.log("Raw API Data:", data); // Check your Browser Console (F12) to see this!

        // Handle errors sent back by our PHP proxy
        if (data.error) {
            console.error("Proxy Error:", data.error);
            return null;
        }

        // Drill down into Gemini's specific response structure
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            return data.candidates[0].content.parts[0].text;
        }
        
        return null;
    } catch (err) {
        console.error('Network/Parse error:', err);
        return null;
    }
}

async function researchChat(query) {
    const text = await callGemini(query);
    return text || 'No response from AI. Check the browser console for errors.';
}

// NOTE: Ensure your handleChat function in app.js is calling researchChat correctly.

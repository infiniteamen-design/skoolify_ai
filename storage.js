function saveItem(folder, topic, data) {
    localStorage.setItem(`${folder}/${topic}`, JSON.stringify(data));
}

function loadItem(folder, topic) {
    const item = localStorage.getItem(`${folder}/${topic}`);
    return item ? JSON.parse(item) : null;
}

function listTopics(folder) {
    const keys = Object.keys(localStorage);
    return keys.filter(k => k.startsWith(folder + '/')).map(k => k.split('/')[1]);
}

function clearFolder(folder) {
    Object.keys(localStorage).forEach(k => {
        if (k.startsWith(folder + '/')) localStorage.removeItem(k);
    });
}

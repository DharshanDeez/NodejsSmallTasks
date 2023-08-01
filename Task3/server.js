const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const app = express();
const port = 3001;

async function countWordsInFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const wordCount = data.split(/\s+/).filter(word => word !== '').length;
        return wordCount;
    } catch (err) {
        throw err;
    }
}

const fileName = path.join(__dirname, 'data.txt');

app.get('/word-count', async (req, res) => {
    try {
        const count = await countWordsInFile(fileName);
        res.json({ wordCount: count });
    } catch (err) {
        res.status(500).json({ error: 'Error reading the file.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

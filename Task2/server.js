const express = require('express');
const app = express();
const port = 3001;

// Function to calculate the sum of integers in an array
function sumOfIntegers(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array.');
    }

    return arr.reduce((sum, num) => {
        if (typeof num !== 'number') {
            throw new Error('Array must contain only integers.');
        }
        return sum + num;
    }, 0);
}

// Route to calculate and return the sum of integers in the request body
app.post('/sum', express.json(), (req, res) => {
    try {
        const { numbers } = req.body;
        if (!Array.isArray(numbers)) {
            res.status(400).json({ error: 'Input must be an array of integers.' });
            return;
        }

        const result = sumOfIntegers(numbers);
        res.json({ sum: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

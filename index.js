require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');
const needle = require('needle');
const cors = require('cors');

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;
const GITHUB_API_BASE_URL = process.env.GITHUB_API_BASE_URL;
const GITHUB_API_KEY = process.env.GITHUB_API_KEY;

app.use(cors());

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { error: "Too many requests, please try again later." },
    statusCode: 429
});

app.use(limiter);

app.get('/api/users/:username', cache('5 minutes'), async (req, res) => {
    const { username } = req.params;

    try {
        const response = await needle('get', `${GITHUB_API_BASE_URL}/users/${username}`, {
            headers: {
                'User-Agent': 'api-proxy-server',
                'Authorization': `token ${GITHUB_API_KEY}` 
            }
        });

        if (response.statusCode === 200) {
            return res.json(response.body);
        } else {
            return res.status(response.statusCode).json({ error: response.body.message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data from GitHub API." });
    }
});


app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

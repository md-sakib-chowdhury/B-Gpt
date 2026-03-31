const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
    try {
        const { text } = req.body;
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Summarize this \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if (response) {
            if (response.choices[0].text) {
                return res.status(200).json(response.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
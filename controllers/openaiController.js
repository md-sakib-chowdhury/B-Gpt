const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Summarize this \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
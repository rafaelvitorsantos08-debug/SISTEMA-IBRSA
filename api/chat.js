const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Use POST');
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = req.body.prompt;
    const result = await model.generateContent(`Aja como um assistente de gestão para igrejas. Responda de forma prestativa à seguinte solicitação: ${prompt}`);
    const text = result.response.text();
    
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao conectar com a IA' });
  }
};

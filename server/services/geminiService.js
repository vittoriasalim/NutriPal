const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function queryGeminiApi(query) {
  try {
    const response = await model.generateContent(query);
    console.log(response.response.text());
    return response.response.text();
  } catch (error) {
    console.error("Error querying Gemini API:", error.message);
    throw error;
  }
}

async function queryRAGSystem(userQuery, userInfo,clientInfo) {
  
    // Step 2: Modify the prompt by including user-specific information
    const prompt = `
      User Info: ${userInfo}  // Example: Include the user's name
      Client Info: ${clientInfo || 'N/A'}
      Query: ${userQuery}
      Answer:
    `;
  
    // Step 3: Generate an answer using the modified prompt
    const finalAnswer = await generateAnswer(prompt);
    return finalAnswer;
  }

module.exports = {
  queryGeminiApi,
};
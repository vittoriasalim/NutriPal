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
    Return response in json format. ${userQuery}. According the following information ${JSON.stringify(userInfo, null, 2)}  and ${clientInfo ? JSON.stringify(clientInfo, null, 2) : 'N/A'} 
  `;
  console.log(prompt);

  // Step 3: Generate an answer using the modified prompt
  const finalAnswer = await queryGeminiApi(prompt);
  console.log(finalAnswer);
  return finalAnswer;
}


async function generateMealPlan(clientInfo) {
  const { weight, height, healthGoals, dietaryPreferences } = clientInfo;

  const prompt = `
    Generate a week of meal plan for a person who is ${weight} kg and ${height} cm tall.
    These are their health goals: ${healthGoals.join(", ")}.
    Their dietary preferences include ${dietaryPreferences.join(", ")}. You should not include any
    food using the items that the person is allergic to.
    The calorie is in kCal, the protein, fat and carbohydrate are in grams.
    For calorie, protein, fat and carbohydrate only giving a numerical number.
    Please provide a balanced meal plan for a week.
    Please return your response in the following format...
    {
      monday: {
          breakfast: {
              name: 'Cereal',
              calorie: 5,
              protein: 5,
              fat: 5,
              carbohydrate: 5,
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
          },
          lunch: {...},
          dinner: {...}
      },
      ...
    }
    Do not return anything else.
  `;

  console.log("PROMPT", prompt);

  return queryGeminiApi(prompt);
}

module.exports = {
  queryGeminiApi,
  queryRAGSystem,
  generateMealPlan,
};
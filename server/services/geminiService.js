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


// Mock function to simulate querying the LLM API for ingredient details
const queryLLMForIngredient = async (ingredientName) => {
  try {
    // The prompt sent to the LLM to retrieve ingredient details
    const prompt = `
      Please provide the nutritional details of the ingredient: ${ingredientName}.
      I need:
      - Calorie content per 100g.
      - Protein content per 100g.
      - Fat content per 100g.
      - Carbohydrate content per 100g.
      - Unit of measurement (e.g., grams, milliliters).
      - Brief description of the ingredient.
      - Storage instructions MAX (255 characters).
      - The approximate price of 100g (or the typical unit).
      - Food_type which can be Vegetable, Meat or Seafood
      - Health Benefits information

      Please return the response in strict JSON format with double quotes around property names and values. Use this structure:

      {
        "ingredientName": "${ingredientName}",
        "calorie": 0,
        "protein": 0,
        "fats": 0,
        "carbohydrate": 0,
        "unit": "g", // Example unit
        "price": 0,  // Example price per unit
        "description": "",
        "storageInstructions": "",
        "food_type": "",
        "healthBenefits": ""
      }
    `;

    // Replace this with the actual LLM API call
    const response = await queryGeminiApi(prompt); // Replace with actual LLM API call

    // Check if the response starts with ```json and ends with ```
    if (response.startsWith('```json') && response.endsWith('```')) {
      // Remove the triple backticks from the start and end
      return response.slice(7, -3);
    }

    // Return the recipes as is, if no backticks are found
    return JSON.parse(response);
    
  } catch (error) {
    console.error('Error querying LLM for ingredient:', error);
    throw new Error('Failed to retrieve ingredient details.');
  }
};

// Async function to generate recipes using LLM based on pantry ingredients
async function generateRecipeWithIngredients(ingredients) {
  try {
    // Create the prompt to pass to the LLM
    const prompt = `
      Based on the following available ingredients: ${ingredients.join(", ")}, 
      generate recipes that can be categorized under weight gain, weight maintenance, and weight loss.
      Each category should have different recipes based on these ingredients and 3 ingredients for each category You will have to provide icons for the ingredients also provide image url.

      Each recipe should have:
      - A title.
      - A short description that is only an ingredient list (e.g., "grilled chicken with quinoa and fresh veggies"), limited to 10 words or fewer.
      - Nutrition facts, including calorie, protein, fat, and fibre (for a 500g meal).
      - A long description that provides the full nutrition facts and any additional health benefits of the meal.

      Please return the response in this JSON format:

      {
        Weight Gain: [
          {
            title: "Recipe Title for Weight Gain",
            shortDescription: "grilled chicken with quinoa and fresh veggies",
            calorie: 500, // Example value
            protein: 35,  // Example value
            fat: 20,      // Example value
            fibre: 8,     // Example value
            image: '',     // Example value
            ingredients: [
              { name: 'Tomatoes', quantity: '500g', icon: '🍅' }, // Example value
              { name: 'Cabbage', quantity: '300g', icon: '🥬' }, // Example value
              { name: 'Taco', quantity: '300g', icon: '🌮' }, // Example value
            ],
            steps: [
              'Preheat the grill to medium-high heat.', // Example value
              'Season the lamb with salt, pepper, and spices.', // Example value
              'Grill the lamb for 5-7 minutes on each side.', // Example value
            ]
          }
        ],
        Maintain: [
          {
            title: "Recipe Title for Weight Maintenance",
            shortDescription: "roasted salmon with brown rice and steamed broccoli",
            calorie: 400, // Example value
            protein: 30,  // Example value
            fat: 15,      // Example value
            fibre: 6,     // Example value
            ingredients: [
              { name: 'Taco', quantity: '300g', icon: '🌮' }, // Example value
              { name: 'Slice Bread', quantity: '300g', icon: '🍞' }, // Example value
              { name: 'Carrot', quantity: '300g', icon: '🥕' }, // Example value
            ],
            steps: [
              'Preheat the grill to medium-high heat.', // Example value
              'Season the lamb with salt, pepper, and spices.', // Example value
            ]
          }
        ],
        Weight Loss: [
          {
            title: "Recipe Title for Weight Loss",
            shortDescription: "tofu stir-fry with green beans and carrots",
            calorie: 300, // Example value
            protein: 25,  // Example value
            fat: 10,      // Example value
            fibre: 10,    // Example value
            ingredients: [
              { name: 'Tomatoes', quantity: '500g', icon: '🍅' }, // Example value
              { name: 'Cabbage', quantity: '300g', icon: '🥬' }, // Example value
            ],
            steps: [
              'Preheat the grill to medium-high heat.', // Example value
              'Season the lamb with salt, pepper, and spices.', // Example value
              'Grill the lamb for 5-7 minutes on each side.', // Example value
            ]
          }
        ]
      }

      Only include this information and nothing else in the response.
    `;

    console.log("Generated Prompt:", prompt);

    // Call the LLM API with the updated prompt
    const recipes = await queryGeminiApi(prompt);

    // Check if the response starts with ```json and ends with ```
    if (recipes.startsWith('```json') && recipes.endsWith('```')) {
      // Remove the triple backticks from the start and end
      return recipes.slice(7, -3);
    }

    // Return the recipes as is, if no backticks are found
    return JSON.parse(recipes);

  } catch (error) {
    console.error('Error generating recipe with ingredients:', error);
    throw new Error('Failed to generate recipes');
  }
}





module.exports = {
  queryGeminiApi,
  queryRAGSystem,
  generateMealPlan,

  queryLLMForIngredient,

  generateRecipeWithIngredients,

};
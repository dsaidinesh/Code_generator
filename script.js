// Replace 'YOUR_API_KEY' with your actual API key or credentials
const apiKey = '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';


const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Generate code function
async function generateCode(prompt) {

  // Call OpenAI API
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'code-davinci-002', 
      prompt: prompt,
      max_tokens: 500,
      temperature: 0,
    })
  });
  
  // Handle response  
  const data = await response.json(); 
  if(response.ok) {
    return data.choices[0].text; 
  } else {
    throw new Error(data.error.message);
  }

}

// Click handler
generateBtn.addEventListener('click', async () => {

  // Get input
  const problemStatement = document.getElementById('problemStatement');

  // Validate input
  if(!problemStatement) {
    alert('Please enter a problem statement');
    return;
  }

  // Generate prompt
  const prompt = `${problemStatement}\n\n// Write code to solve the above problem:`;

  // Call API
  try {
    const code = await generateCode(prompt);
    codeOutput.textContent = code;
  } catch(error) {
    codeOutput.textContent = 'Error generating code. Please try again.';
  }

});
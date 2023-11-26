// Replace 'YOUR_API_KEY' with your actual API key or credentials
const apiKey = '...........';


const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function generateCode(prompt) {

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
  
    
  const data = await response.json(); 
  if(response.ok) {
    return data.choices[0].text; 
  } else {
    throw new Error(data.error.message);
  }

}

generateBtn.addEventListener('click', async () => {

  const problemStatement = document.getElementById('problemStatement');

  if(!problemStatement) {
    alert('Please enter a problem statement');
    return;
  }

  const prompt = `${problemStatement}\n\n// Write code to solve the above problem:`;

  try {
    const code = await generateCode(prompt);
    codeOutput.textContent = code;
  } catch(error) {
    codeOutput.textContent = 'Error generating code. Please try again.';
  }

});

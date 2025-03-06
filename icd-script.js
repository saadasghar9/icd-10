document.getElementById('codeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    

    if (!code) {
        resultDiv.innerText = 'Please enter a code';
        resultDiv.classList.remove('error');
        resultDiv.style.display = 'block' 
        
        return;
    }

    resultDiv.innerText = 'Loading...'; 
    resultDiv.classList.remove('error');
    resultDiv.style.display = 'block'

    try {
        const response = await fetch('https://devbilnow.pythonanywhere.com/api/icd-lookup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        resultDiv.innerHTML = data.description;
        resultDiv.style.display = 'block'
       
    } catch (error) {
        resultDiv.innerText = 'Error fetching description. Please try again.';
        resultDiv.classList.add('error');
        resultDiv.style.display = 'block';  
        console.error('Error:', error);
    }
});


document.getElementById('codeInput').addEventListener('input', function() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = '';
    resultDiv.classList.remove('error');
    resultDiv.style.display = 'none'
   
});
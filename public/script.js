
async function fetchUserData() {
    const username = document.getElementById('username').value;
    const resultDiv = document.getElementById('result');

    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = await response.json();
        displayUserData(data);
        resultDiv.classList.add('show'); // Show result with animation
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        resultDiv.classList.add('show'); // Show error message with animation
    }
}

function displayUserData(data) {
    const html = `
        <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos || 0}</p>
    `;
    document.getElementById('result').innerHTML = html;
}


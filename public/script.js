
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
        resultDiv.classList.add('show'); 
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        resultDiv.classList.add('show'); 
}
}
function displayUserData(data) {
    
    const additionalInfo = [];

    if (data.location) {
        additionalInfo.push(`<p><strong>Location:</strong> ${data.location}</p>`);
    }
    if (data.email) {
        additionalInfo.push(`<p><strong>Email:</strong> ${data.email}</p>`);
    }
    if (data.bio) {
        additionalInfo.push(`<p><strong>Bio:</strong> ${data.bio}</p>`);
    }
    if (data.blog) {
        additionalInfo.push(`<p><strong>Blog:</strong> <a href="${data.blog}" target="_blank">${data.blog}</a></p>`);
    }
    if (data.company) {
        additionalInfo.push(`<p><strong>Company:</strong> ${data.company}</p>`);
    }
    if (data.twitter_username) {
        additionalInfo.push(`<p><strong>Twitter:</strong> @${data.twitter_username}</p>`);
    }
    
    const html = `
        <div class="user-card">
            <img src="${data.avatar_url || 'N/A'}" alt="${data.login}'s avatar" class="avatar">
            <h2>${data.name || 'N/A'}</h2>
            <p><strong>Username:</strong> ${data.login}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos || 0}</p>
            <p><strong>Profile URL:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            ${additionalInfo.length > 0 ? additionalInfo.join('') : '<p>No additional information available.</p>'}
        </div>
    `;

    document.getElementById('result').innerHTML = html;
}




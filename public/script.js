// document.getElementById('userForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const username = document.getElementById('username').value;

//     try {
//         const response = await fetch(`/api/users/${username}`);
//         if (response.status === 200) {
//             const data = await response.json();
//             document.getElementById('userInfo').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//         } else {
//             const errorData = await response.json();
//             document.getElementById('userInfo').innerHTML = `<pre>${JSON.stringify(errorData, null, 2)}</pre>`;
//         }
//     } catch (error) {
//         document.getElementById('userInfo').innerHTML = '<pre>Error fetching user info.</pre>';
//     }
// });
async function fetchUserData() {
    const username = document.getElementById('username').value;
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
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
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

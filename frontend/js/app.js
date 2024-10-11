window.onload = function() {
    const getForm = document.getElementById('get-user-form');
    const postsContainer = document.getElementById('user-posts');
    postsContainer.style.display = 'none';

    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let token = document.getElementById('get-token').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/userdata', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>User Name: ${data.name}</p>`;

            await fetchAllPosts(token);

            postsContainer.style.display = 'block';

        } catch (error) {
            console.log("Error fetching user data:", error);
            document.getElementById('user-data').innerHTML = `<p>Failed to get user data</p>`;
            postsContainer.style.display = 'none';
        }
    });

    async function fetchAllPosts(token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div class="post">
                            <p>Title: ${post.title}</p>
                            <p>Body: ${post.body}</p>
                        </div>
                    `;
                });
            } else {
                document.getElementById('user-posts').innerHTML = `<p>Failed to fetch posts</p>`;
            }
        } catch (error) {
            console.log(error);
        }
    }
};

window.onload = function() {
    const getForm = document.getElementById('get-user-form');
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

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                await fetchAllPosts(token);
            } else {
                document.getElementById('user-data').innerHTML = `<p>Failed to get user data</p>`;
            }

        } catch (error) {
            console.log(error);
        }
    });

    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let token = document.getElementById('create-token').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    body: document.getElementById('body').value
                })
            });
        
            const data = await response.json();

            if (response.ok) {
                document.getElementById('post-data').innerHTML = `<p>Post Created Successfully!</p>
                                                                  <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`;
                await fetchAllPosts(token);

                document.getElementById('title').value = '';
                document.getElementById('body').value = '';
            } else {
                document.getElementById('post-data').innerHTML = `<p>Failed to create post</p>`;
            }

        } catch (error) {
            console.log(error);
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

    const token = document.getElementById('get-token').value;
    if (token) {
        fetchAllPosts(token);
    }
};

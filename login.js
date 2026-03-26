async function login(event) {
  // Prevent default action ie page direction
  event.preventDefault();

  // Get form data
  const form = event.target;

  let fields = form.elements;

  const username = fields['username'].value;
  const password = fields['password'].value;

  form.reset();

  // FastAPI OAuth2 endpoint expects form-urlencoded data
  try {
    let response = await fetch(`${server}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    });

    let result = await response.json();

    if (!response.ok || ("error" in result)) {
      toast(`Login Failed: ${result.detail || result.error || 'Invalid credentials'}`);
    } else {
      toast("Login Successful");
      window.localStorage.setItem('access_token', result.access_token);
      window.location.href = 'app.html';
    }
  } catch (error) {
    toast(`Login Failed: ${error.message || 'Network error'}`);
  }

}

document.forms['loginForm'].addEventListener('submit', login);
// document.querySelector('#loginForm').onSubmit(login);

async function signup(event){
  event.preventDefault();//prevent page redirect

  let form = event.target;
  let fields = event.target.elements;
  
  let data = {
    username: fields['username'].value,
    email: fields['email'].value,
    password: fields['password'].value,
  }

  //reset form
  form.reset();

  //send data to application server
  let result = await sendRequest(`${server}/signup`, 'POST', data);
  
  if('detail' in result){
    toast("Register Failed: "+result['detail']);//show error message
  }else{
    toast("Register Successful");
    window.location.href= 'index.html';//redirect the page
  }
}

function bindSignupForm() {
  const signupForm = document.forms['signUpForm'] || document.querySelector('#signUpForm');
  if (!signupForm) {
    console.error('Signup form not found');
    return;
  }
  signupForm.addEventListener('submit', signup);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindSignupForm);
} else {
  bindSignupForm();
}

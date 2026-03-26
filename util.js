// Lab 4 FastAPI backend
const server = "http://localhost:8000";

function toast(message){
  M.toast({html: message});
}

async function sendRequest(url, method, data){
  try{
    //retrieve token from localStorage
    let token = window.localStorage.getItem('access_token');

    let headers = {
      'Content-Type' : 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;//send token in request
    }

    let options = {//options passed to fetch function
        method: method,
        headers: headers,
    };

    if(data)//data will be given for PUT & POST requests
      options.body = JSON.stringify(data);//convert data to JSON string

    let response = await fetch(url, options);
    let result = await response.json();//Get json data from response
    return result;//return the result

  }catch(error){
    return {detail: error.message || String(error)};//catch and log any errors
  }
}

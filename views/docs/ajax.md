# Using AJAX

Without ever making your users leave the website, you can easily send the form using AJAX. I've provided a few examples of making HTTP requests from some of the most popular libraries.

## Example using Fetch

```javascript
// https://github.com/github/fetch
fetch("https://justgetintouch.com/ajax/your_email@address.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: "Some Name",
        message: "I'd like to talk."
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

## Example using Axios

```javascript
// https://github.com/axios/axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.post('https://justgetintouch.com/ajax/your_email@address.com', {
    name: "Some Name",
    message: "I'd like to talk."
})
    .then(response => console.log(response))
    .catch(error => console.log(error));
```

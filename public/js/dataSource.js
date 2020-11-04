console.log('Client side js loaded correctly')
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
fetch('https://resttest.bench.co/transactions/1.json')
    .then(handleErrors)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error) );
export function fetchTests() {
  return fetch("http://localhost:8000/tests", {
    method: 'GET',
  })
  .then((res) => res.json())
  .then((data) => { 
    // console.log(data); 
    return data; 
  })
  .catch((err) => {
      console.log('error fetching tests:' + err);
      return 'error fetching tests:' + err;
  });
}
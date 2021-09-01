export default function Tests() {
    
    const fetchTests = () => {
        fetch("http://localhost:8000/tests", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
          return data; 
        })
        .catch((err) => {
            return console.log('error fetching tests:' + err);
        });
    }
}

import { useEffect, useState } from 'react';
import './App.css';

function App() {

  
  let [inputvalue, setinputvalue] = useState();
  let [countryone, setcountryone] = useState('USD');
  let [countrytwo, setcountrytwo] = useState('BGN');
  let [result, setresult] = useState('');
  let [isloadingtrue,setisloadingtrue] = useState(false)
  
  const countries = [
    "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
  ]

  const controller = new AbortController();
  
  useEffect(() => {
    async function converter(){
      setisloadingtrue(true)
      try {  
        var api = await fetch(`https://api.frankfurter.app/latest?amount=${inputvalue}&from=${countryone}&to=${countrytwo}`,{signal: controller.signal});
        var data = await api.json();
        let values = Object.values(data.rates);
        setresult(values[0]);
        setisloadingtrue(false)
      } catch (error) {
      }
    }
    inputvalue && converter();

    return ()=>{
      controller.abort()
    }
  }, [inputvalue, countryone, countrytwo])
  return (
    <div className="Maincard">
      <input type="number" onChange={(e) => {
        setinputvalue(e.target.value)
      }} value={inputvalue} />

      <select value={countryone} onChange={(e) => {
        setcountryone(e.target.value)
      }}>
        {countries.map((x, i) => <option key={i}>{x}</option>)}
      </select>

      <select value={countrytwo} onChange={(e) => {
        setcountrytwo(e.target.value)
      }}>
        {countries.map((x, i) => <option key={i}>{x}</option>)}
      </select>
      <p>{countryone === countrytwo ? <h3>{inputvalue}</h3> : isloadingtrue === true ? (<h3>Loading...</h3>) : result}</p>
    </div>
  );
}

export default App;

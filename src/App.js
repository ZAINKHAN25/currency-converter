import { useEffect, useState } from 'react';
import './App.css';

function App() {


  let [inputvalue, setinputvalue] = useState(0);
  let [countryone, setcountryone] = useState('USD');
  let [countrytwo, setcountrytwo] = useState('BGN');
  let [result, setresult] = useState('');
  let [isloadingtrue, setisloadingtrue] = useState(false)

  const countries = [
    "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
  ]

  const controller = new AbortController();

  useEffect(() => {
    async function converter() {
      setisloadingtrue(true)
      try {
        var api = await fetch(`https://api.frankfurter.app/latest?amount=${inputvalue}&from=${countryone}&to=${countrytwo}`, { signal: controller.signal });
        var data = await api.json();
        let values = Object.values(data.rates);
        setresult(values[0]);
        setisloadingtrue(false)
      } catch (error) {
      }
    }
    inputvalue && converter();

    return () => {
      controller.abort()
    }
  }, [inputvalue, countryone, countrytwo]);

  return (
    <div className="centerline">
      <h1 style={{ fontWeight: '400', fontSize: "50px" }} className='responsiveclass'>Currency Converter</h1>
      <div className='maincard'>
        <div className='heightfixed'>
          <b className='resultdiv'>
            {inputvalue === 0 ? 0 : countryone === countrytwo ? <div>{inputvalue}</div> : isloadingtrue === true ? (<div className='loading'>Loading...</div>) : (<div>
              {result}
            </div>)}
          </b>
        </div>

        <div className='singleine'>
          <h2 className='headingofcards'>Amount </h2>
          <input type="number" onChange={(e) => {
            setinputvalue(e.target.value)
          }} value={inputvalue} />
        </div>

        <div className='singleine'>
          <h2 className='headingofcards'>From </h2>
          <select value={countryone} onChange={(e) => {
            setcountryone(e.target.value)
          }}>
            {countries.map((x, i) => <option key={i}>{x}</option>)}
          </select>
        </div>
        <div className='singleine'>

          <h2 className='headingofcards'>To </h2>
          <select value={countrytwo} onChange={(e) => {
            setcountrytwo(e.target.value)
          }}>
            {countries.map((x, i) => <option key={i}>{x}</option>)}
          </select>
        </div>

      </div>
    </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import { HistoryOutlined } from '@material-ui/icons'

function App() {
  const [calc, setCalc] = useState('');
  const [previewResult, setPreviewResult] = useState('0');
  const [openHistory, setOpenHistory] = useState(false);

  const ops = ['/', '*', '-', '+', '.'];

  const history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []

  const updateCalc = (value) => { 

    if(
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1)) ||
      calc == '0' && value == '0' ||
      calc.length > 14
    ){
      return;
    }
    setCalc(calc + value);

    if(!ops.includes(value)){
      setPreviewResult(eval(calc + value).toString());
    }
  }

  const updateResult = () => {
    
    const finalCalc = eval(calc).toString()
    setCalc(finalCalc);
    setPreviewResult('');

    //SAVE IN LOCAL STORAGE
    history.push(calc, finalCalc)
    localStorage.setItem('history', JSON.stringify(history))
  }

  const deleteLastValue = () => {
    if(calc == '') return
    const value = calc.slice(0, -1);
    setCalc(value);
  }

  const createDigits = () => {
    const digits = [];

    for(let i = 1; i < 10; i++){
      digits.push(
        <button 
        key={i}
        onClick={() => updateCalc(i.toString())}
        >{i}</button>
      )
    }
    return digits
  }

  return (
     <div className="container">
       <div className="calculator">
          <button className="iconButton" onClick={ () => setOpenHistory(prev => !prev)}>
            <HistoryOutlined/>
          </button>
          <div className={`history ${openHistory ? 'open' : ''}`}>
            <h2>History</h2>
            <div>
              {history.map(item => (
                <span>{item}</span>
              ))}
            </div>
          </div>
          <div className='display'>
            <span>{previewResult ? <span>({previewResult})</span> : ''}</span>{calc || '0'}
          </div>
          <div className="operators">
            <button onClick={() => updateCalc('/')}>/</button>
            <button onClick={() => updateCalc('*')}>*</button>
            <button onClick={() => [setCalc(''), setPreviewResult('')]}>C</button>
            <button onClick={() => updateCalc('-')}>-</button>
            <button onClick={() => updateCalc('+')}>+</button>
            <button onClick={() => deleteLastValue()}>DEL</button>
          </div>

          <div className='digits'>
           {createDigits()}
           <button onClick={() => updateCalc('0')}>0</button>
           <button onClick={() => updateCalc('.')}>.</button>
           <button onClick={() => updateResult()}>=</button>
          </div>
        </div>
    </div>
  )
}

export default App

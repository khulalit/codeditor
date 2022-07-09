import {useState, useEffect} from 'react'
import CodeEditorWindow from "./Components/CodeEditorWindow";
import './App.css'
import Dropdown from "./Components/Dropdown";
import axios from 'axios'
import StdIn from './Components/StdIn';
import Output from './Components/Output';
import { defineTheme } from "./lib/defineTheme";
import ThemeDropdown from './Components/ThemeDropDown';
import Footer from './Components/Footer'
import 'react-toastify/dist/ReactToastify.css';

// const code = `#include <iostream>
// using namespace std;
// int main(){
//   cout<<"hello cpp";
//   return 0;
// }`

function App() {

  const [language, setlanguage] = useState('')
  const [language_id, setlanguage_id] = useState(63)
  const [code , setcode] = useState('')
  const [stdin, setstdin] = useState('')
  const [output, setoutput] = useState('Output comes here....')
  const [isloading, setloading] = useState(false)
  const [theme, setTheme] = useState('lazy')
  // on key press
  //
  // data
  const formData = {
    language_id: language_id,
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(stdin),
  };
  // post req options
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {base64_encoded: 'true', fields: '*'},
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': process.env.REACT_APP_API_URL,
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    },
    data: formData
  };
  const clickhandler = ()=>{
    setloading(true)
    axios.request(options).then(res=>{
      console.log(res.data.token)
      checkStatus(res.data.token)

    }).catch(err=>{
      console.log(err)
    })
  }
  const checkStatus = async (token) => {
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/'+token,
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    },
        }
      };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else if(statusId == 3) {
        console.log('response.data', response.data)
        let output = atob(response.data.stdout)
        console.log(atob(response.data.stdout))
        setoutput(output)
        setloading(false)
        // document.querySelector('#out').innerHTML = output;
        return
      } else {
        console.log(response)
        if(statusId==6)
          setoutput(atob(response.data.compile_output))
        else
          setoutput(atob(response.data.stderr))
        setloading(false)
      }
    } catch (err) {
      console.log("err", err);
      setoutput(false)
      setloading(false)
    }
  };
  // theme
  const handleThemeChange = (th)=> {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  // toast
 
  //
  return (
        <div className="p-4" >
          
          <div className='header'>
            <div className='langop'>
              <label className='h4'>Select Language</label>
            <Dropdown setlang={setlanguage} setlang_id = {setlanguage_id}/>
            
            </div>
            <div className='theme '>
              <label className='h4'>Select Theme</label>
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme}/>
            </div>
          </div>
          <div className='landing'>
            <div className="cdewin " id='codewindow'>
              <CodeEditorWindow language={language} setcode = {setcode} theme={theme} />  
            </div>
            <div className='outer-output'>
              <div className='output'>
                <Output value = {output}/>
              </div>
              <div id='result' className='stdin '>
                <StdIn setstdin = {setstdin}/>
                {isloading ? <button onClick={clickhandler} className="btn btn-danger rounded form-control" disabled>Please Wait while we are making your code.. </button>:<button onClick={clickhandler} className="btn btn-danger rounded form-control">Run </button>}
                
            
              </div>
            </div>
            
          </div>
          <div>
            
          </div>
          <Footer/>
        </div>
  );
}

export default App;

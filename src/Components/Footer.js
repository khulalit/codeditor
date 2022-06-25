import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    <div className='footer-outer'>
        <footer>
            <div className='footer-inner text-center'>
                <span className='icon-1 '>
                <a href="https://twitter.com/khulalit" title="twitter icons">
                  <img className = "twitter" src={require("../logos/twitter-sign.png")} alt = "twitter"/>
                </a>
                    
                </span>
                <span className='icon-2 '>
                <a href="https://twitter.com/khulalit" title="twitter icons">
                  <img className = "github" src={require("../logos/github-sign.png")} alt = "twitter"/>
                </a>
                </span>
                <div className='note'>This is web based code editor that compiles 40 langaues. It uses <a href='https://judge0.com'>Judge0</a> and RapidApi. Follow me on above platforms. Full code is available on <a href='https://github.com/khulalit'>Github</a>.</div>
            </div>
            
        </footer>
    </div>
  )
}

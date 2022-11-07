import { useState, useEffect } from 'react'
import './App.css'
import useApi from './hooks/useApi'


function App() {
  const [data, setQuery] = useApi()

  return (
    <div className="App">
      {
        data.map((item: number, index: number) => <div key={index}>{ item }</div>)
      }
      <input type="text" placeholder='请输入内容' onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
}

export default App

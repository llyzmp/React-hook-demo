import { useState, useEffect, useCallback } from 'react'

function Child({ callback }: any) {
  useEffect(() => {
    callback()
  }, [callback]);
  return <div>子组件</div>
}


function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [kw, setKw] = useState('')
  
  const callback = useCallback(() => {
    console.log('我是callback')
  }, [phone, name])

  return (
    <div className="App">
      <input type="text" placeholder='请输入姓名' onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder='请输入电话' onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder='请输入关键字' onChange={(e) => setKw(e.target.value)} />
      <Child callback={callback}/>
    </div>
  )
}

export default App

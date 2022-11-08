import { useState, useEffect } from 'react'

function Child({ data }: any) {
  useEffect(() => {
    console.log('条件', data)
  }, [data]);
  return <div>子组件</div>
}


function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [kw, setKw] = useState('')
  const data = [name, phone]

  return (
    <div className="App">
      <input type="text" placeholder='请输入姓名' onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder='请输入电话' onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder='请输入关键字' onChange={(e) => setKw(e.target.value)} />
      <Child data={data}/>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'

type GetData = (query: string) => Promise<number[]>
type UseApi = () => [number[], any]
// 模拟返回数据
const getList: GetData = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('参数', query)
      resolve([11, 22, 33, 44, 55, 66])
    }, 3000)
  })
}

const useApi: UseApi = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5])
  const [query, setQuery] = useState('')

  useEffect(() => {
    (async () => {
      const data = await getList(query)
      console.log('data', data)
      setData(data)
    })()
  }, [query])
  return [ data, setQuery ]
}

export default useApi
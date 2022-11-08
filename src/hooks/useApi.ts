import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios'

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

export const useApi: UseApi = () => {
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


const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { 
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isError:false,
        isLoading: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return { 
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error()
  }
}

export const useDataApi: any = (initialUrl: string, initialData: { hits: [] }) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })
  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    };

    fetchData();
    return () => {
      didCancel = true
    }
  }, [url]);

  return [state, setUrl];
};

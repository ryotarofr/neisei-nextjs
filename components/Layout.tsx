import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateNaiseiForm from './CreateNaiseiForm';
import { EvaluationType } from '../types/naiseiType'
import { Editor } from './Editor/Editor';
import Calendar from './Calendar/Calendar';

interface Item {
  id: number;
  naisei: string;
  created_at: string
  evaluation_type: EvaluationType
  // 他のプロパティがあればここに追加
}

export const Layout = () => {

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   // APIのエンドポイントを指定
  //   const apiUrl = 'http://localhost:3000/naisei';


  //   // Axiosを使用してAPIデータをフェッチ
  //   axios.get(apiUrl)
  //     .then(response => {
  //       setData(response.data);
  //       console.log("dsjdsdjksdj", data);

  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []); // 空の配列を渡すことで、コンポーネントがマウントされたときにのみ実行されるようにします。

  return (
    <div className='flex w-full'>
      <Calendar />
      <div>
        <h1 className=''>Act when you think.</h1>
        <ul>
          {/* {data.map(item => (
            <li key={item.id}>{item.naisei}:{item.created_at}:{item.evaluation_type}</li>
          ))} */}
        </ul>
        <Editor />
        {/* <CreateNaiseiForm /> */}
      </div>
    </div>
  );
}


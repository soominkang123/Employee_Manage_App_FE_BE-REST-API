import { useState } from 'react'
import asios from 'axios';
import styled from 'styled-components';
import axios from 'axios';

function App() {
   //const url = `https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=6bedce92f708cdeb65b084ee01b825c0`; 
   

  // OPEN API : 해당 지역의 날씨 정보를 출력 
  // 해당 지역
  const [location, setLocation] = useState('');

  const key = '6bedce92f708cdeb65b084ee01b825c0';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

  // API 에서 받아온 값을 주입 : JSON 
  const [result, setResult] = useState({});

  const searchWeather = async (e) => {
    if(e.key === 'Enter'){
        // axios 를 사용해서 API 통신으로 값을 받아옴.

        try {
          const data = await axios({
            method : 'get', 
            url : url,
          })
         setResult(data);
         console.log("성공 : " , data); 
      
        } catch (err) {
          console.log("에러발생 : ", err)
        }
    }

  }
  return (
    <Appwap>
      <div className='appContentWrap'>
        <h1> Open API 를 사용해서 axios를 사용해서 날씨데이터 출력 </h1>
        < p/><p />
        <input placeholder='도시명을 영문으로 입력해라.'
           type='text'
           value={location}
           onChange={(e)=>{setLocation(e.target.value)}}  
           onKeyDown={searchWeather}
           />
       <p /><p /><p />
       {/* result 값이 존재 할때 출력 ,
                  
                  참 && (반드시 실행 블락)
                  거짓 &&(쇼트 서킷 : 실행 안됨)
       */}
       
       {
        Object.keys(result).length !== 0 && (
            <div>
               <div> 도시명 : {result.data.name}</div>
               <div> 기온 : {   Math.round((result.data.main.temp - 237.15)* 10) / 10   }도(c) </div>
               <div> 날씨 : {result.data.weather[0].main}</div>
            </div>
        )
       }
      </div>

    </Appwap>
  )
}

export default App

// styled-components 라이브러리를 사용해서 css 적용
  // 컴포넌트 내부에서 css 적용 
const Appwap = styled.div`
   background-color : 1px solid red;
   width : 100vW;
   height : 100vh;

   .appContentWrap{
       left : 50% ;
       top : 50% ;
       position : absolute;
       padding :20px;
       transform : translate(-50% , -50%);
   }

       input {
        padding : 16px ;
        border : 2px block solid ;
        font-size : 20px
        border-radious : 16px ;

       }
     
   

`

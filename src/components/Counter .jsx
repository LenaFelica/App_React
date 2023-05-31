import React, { useState } from "react";

const Counter = () => {

  const [count, setCount] = useState('')
  const [value, setValue] = useState('Текст в инпуте')

  function increment() {
   setCount(count + 1)
  } 

  function decrement() {
   setCount(count - 1)
  }
   return(
     <div>
            <h1>{count}</h1> 

            <h1>{value}</h1>
            <input 
                  type="text" 
                  value={value} 
                  //* двустороннее связывание (достаем значение и помещаем его в состоние)- функци отслеживает, что пользователь вводит в поле ввода
                  //* колбэки для соытий первым параметром принимают even, у коорых есть поле target(сам дом-элемент) и value(значение, которое находится в дом элементе)
                  //* реализовали связывание состояние со значением, которое нахоится в инпуте
                  //* пишем в инпут - отражается в заголовке - доились синхронизации
                  //! Управляеме компоненты - всегда можем изменить значение омпонента, изменив состояние
                  onChange={(e) => setValue(e.target.value)}/> 

            <button onClick={increment}>Increment</button>
            {/* <button onClick={() => likes += 1}>Increment</button> */}
            <button onClick={decrement}>Decrement</button>
            {/* <button onClick={() => likes -= 1}>Decrement</button> */}
     </div>
   )
}
export default Counter;

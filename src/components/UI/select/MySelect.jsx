import React from "react";
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
      <select
         value={value}
         onChange={e => onChange(e.target.value) }
      >
         <option disabled value="">{defaultValue}</option>
         {options.map(option =>
            <option key={option.value} value={option.value}>
               {option.name}
            </option>
         )}
      </select>
    )
}
export default MySelect;

//* в корне select
//* компонент будет принимать несколько пропсов 
//* 1й и самый важный - массив опций - options
//* мы будем передавать некий мссив и на основании него в список будут добавлтьс пункты!
//* defaultValue - сортировка по
//* после по массиву опций с помощью map итерируемся
//* и для каждой опции отрисовываем html option
//* как value указываем поле value из объекта
//* то, что поестим внутрь опции, то есть текс, достам из поля name
//* то есть, объект будет у нас с 2мя полями - name и вэ лью
//* добавляем КЛЮЧ!
//* 
//* далее в арр добавляем MySelect в <div>
//* 
//* теперь надо осуществить двустороннее связывание и сделать компонент управлямым - 
//* onChange - отслеживать что пользователь вводит
//* в onchane передаем не сам ивент(event), сразу значение, которое выбра пользователь
//*          onChange={e => onchange(e.target.value) }

//* пропсаи приниаем valeu и onChange, чтобы сследить значение внутри селекта 
// const Select = ({options, defaultValue, value, onChange}) => {
//    return (
//       <select
//        value={value}
//        onChange={e => onChange(e.target.value)}
//        >
//          <option disabled value="">{defaultValue}</option>
//          {options.map(option =>
//             <option key={option.value} value={option.value}>
//                {option.name}
//             </option>
//          )}
//       </select>
//    )
// }


//const [selectedSort, setSelectedSort] = useState('')

// const sortPosts = (sort) => {
//   setSelectedSort(sort);
//* метод sort мутирует исходный массив, поэтому мы будем мутировать копию массив [...posts].sort((a,b))
//   setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
//}

//* затем в Арр вставлям наш Select и прописываем свойства
//* defaultValue
//* options={[
//   {value: 'title', name: 'по названию'}
//   {value: 'body', name: 'по описанию'}
//]}
//* value={selectedSort}
//* onChange={sort => setSelectedSort(sort)} - но в данном случае не достаточно взять и засунуть опцию в состояние
//* после того. как пользователь выбрал опцию сортировки, необходимо
//* массив отсортировать - sortPost()
//* поэтому в onChange будем принимать ее
//const sortPosts =(sort) => {
//   setSelectedSort(sort)
//   setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
//}
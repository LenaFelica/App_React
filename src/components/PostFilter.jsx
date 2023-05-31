import React from "react"; 
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
   return (
      <div>
         <MyInput 
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder="Поиск..."
         />
         <MySelect 
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Сортировать"
            options={[
               {value: 'title', name: 'По названию'},
               {value: 'body', name: 'По описанию'}
            ]}
         />
      </div> 
   )
}

export default PostFilter;

//* Здесь пропсами будем принимать filter - некоторый объект
//* и setFilter - функция, которая этот фильтер будет изменять
//* поскольку мы должны иметь доступ к этому фильтру в родительском компоненте
//* поэтому в Арр создем новое сототяние filter и setFilter
//* Там же в ретерн в PostFilter передается состояние filter и функцию, которая это состоние изменяет- setFilter
//* Далее. в саом PostFilter вносим правки
//* теперь как value для интпута получаем filter.sort и filter.query
//* так же реализуем двусстороннее связывание - по знакомой схеме
//* Возвращаем Все поля из этого объекта(filter), но заменяем дл нас нужное!!!!
//* В случае MyInput заменяем поле query:
//* onChange={e => setFilter({...filter, query: e.targe.value})}
//* В случае MySelect заменяем поле sort:
//* Select возвращает НЕ EVENT, а уже выбранный алгоритм сортировки!!!
//* onChange={selectedSort => setFilter({...filter, sort: selecedSort})}
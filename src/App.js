import React, { useMemo, useRef, useState } from "react";
import '../src/styles/App.css';
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";


function App() {
  const [posts, setPosts] = useState( [
   {id: 1, title: 'aa', body: 'descripti'},
   {id: 2, title: 'bb', body: 'frt'},
   {id: 3, title: 'dd', body: 'nhn'},
   {id: 4, title: 'cc', body: 'dqfwq'},
  ])

//* доступ к PostFilter в родительском компоненте
const[filter, setFilter] = useState({sort: '', query:''})

const [modal, setModal] = useState(false)

//* сортировка с состоянием
const sortedPosts = useMemo(() => {
   console.log('отработала функция сортед постс')
   if(filter.sort) {
      return  [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
   } else {
     return posts;
   }
},[filter.sort, posts])

const sortAndSearchPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query.toLowerCase()))
}, [filter.query, sortedPosts])

const createPost = (newPost) => {
   setPosts([...posts, newPost])
   setModal(false)
} 


// получаем пост из дочернего компонента
const removePost = (post) => {
   setPosts(posts.filter(p => p.id != post.id))
}

return (
   <div className="app">
      <MyButton style={{marginTop: 15}}
         onClick={() => setModal(true)}
      >
         Добавить пост
      </MyButton>
      <MyModal 
         visible={modal}
         setVisible = {setModal} 
      >
      <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortAndSearchPosts} title="Список постов по JavaScript"/>
   </div>
  );
}

export default App;

//* --*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//* Услоная отрисовка:
// {sortAndSearchPosts.length !== 0
//    ? <PostList remove={removePost} posts={sortAndSearchPosts} title="Список постов по JavaScript"/>
//    : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
//  }      

//* получаем данный из управляемого инпута:
// const[title, setTitle] = useState('');
// const[body, setBody] = useState('');


//* инпутов может быть много - создаем состояние post и помещаем туда объект с title и body
//* инициализируем их сразу пустыми строками
//* а в onChange - передаем объект в setPost - разворачиваем тарые посты и перезатераем нужное для насс поле
//* то есть. еще раз, мы изеняем нужное для нас поле, а весь остальной объек оставляем в неизменном виде
//* добавим id - он должен быть всегда уникальный - егополучим из текущей даты!!
//* e.preventDefault(); //проедотвращаем дефолтное поведение браузера(когда при нажатии на кнопку страница оновляетсяя и данные уходят на сервер, так как тип у кнопки submit)
//   const newPost = { - эта переменная теперь не нужна - разворачивае в setPosts вместо newPost развернем ...post, и добавим id
//      id: Date.now(), - 
//      title,
//      body,
//   }

     //!  ***   запомнить НАВСЕГЛА  - важно!! - добавление нового поста - развернуть старый массив и добавить новый пост
   //   setPosts([...posts, {...post, id: Date.now()}]) // добавляем ссозданный объект в массив постов - не изменем состояние напрямую, вызываем setPosts и передаем туда новый массив [], куда разворачиваем старый массив с постами и добавяем новый ерез запятую
   //   setTitle('') // после добавление очиаем поле ввода в инпуте для тайтла
   //   setBody('') // после добавление очиаем поле ввода в инпуте для боди
   //   setPost({title:'' , body: ''}) // теперь очищение формы после добавления посста так делаем
//* и так как мы реализоали двустороннее связывание, то инпуты при таком повдении у нас очистятся - компонент управляяемы
//
//* Так ниже мы будем проверять, если постов нет - длины постов нет - то мы будем выводить надпись - ПОСТЫ не найдены!


//*-----------------------------------------------------
//* Создаем функцию сортировки sortPosts чтобы вызвать ее в onChange
//* но мы не можем напрямую сортировать, так как метод сорт мутирует исходный массив
//* поэтому , мы разворачивае с помощь spread исходный массив постов, а таким образом мы его копируем
//* и сортируем уже копию
//* для сравнения строк используетс localeCompare()
//* setPosts([...posts].sort(a,b) => a[sort].locleCompare(b[sort]))
//* сравниваем поле из объекта а с полем из объекта b
//* Реализуем поиск searchQuery в MyInput
//* Для того чтобы удалять ненужные
//* При этом нужно реализовать фильтрацию !!
//* Механизм сортировки переносится в const sortedPosts
//*[...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
//* но там уже не просто sort используем, а само состояние selectedSort
//* и в компонент PostList будем передавать не просто ссостояние
//* а уже отсортированный массив постов - эту функцию sortedPosts
//
//* так как selectedSort  - это пустая строка, то подобная соритировка не отработает
//* так как мы оращаемся к пустому полю и выдаст undwfined 
//* мы пытаемся получить несуществующщее поле и вызываем у его ф-ю localeCompare()
//* а этого поля нет, мы получаем undefined, и соответствено пытаемся вызвать ф-ю у андефайнед
//
//* поэтому надо создать ф-ю - getSortedPosts() - и проверять
//* если selectedSort существует , если там не пустая строка
//* то мы будем возвращать отсортированны массив
//* в обратном случае просто массив постов posts
//* а в ф-ю sortedPosts мы помещаем результат getSortedPosts
//* функция sortedPosts отрабатывает
//* но если что-то написать в инпут, то на каждый ввод символа эта функция вызывается
//* на каждый рендер
//* такое нас не устраивает, если массив состоит из 1000 элементов, то это жуткий удар попроизводительности
//
//* ПОЭТОМУ!!! 
//! *** useMemo(callback, deps) **
//*колбэк должен возвращать результат каки-то выислний
//*например, отсортированный или отфильтрованный массив, какие-то математич вычисления
//* в массив зависимостей передавать переменные, поля объекта
//useMemo(() => {
//    return [...posts].sort(...)
// }, [selectedSot, posts])
// Для его это хук?
//* Производит вычисление, запоминает результат и кеширует!
//* Это называется Мемоизация
//* И на каждую перерисовку компонента, она не ортирует массив вновь, пересчитывает заново
//* Достает отсортированный массив из кеша
//* Но каждый раз когда какая-либо из зависимотей менятся
//* Например, мы выбрали другой режим сортировки - функци вновь персчитывает и кеширует новый результат
//* До тех пор, пока опять одна из зависимостей не изменится
//* Если массив зависимостей путой. то функция отработает лишь единожды. запомнит результат и болье вызвана ен будет!!!
//* кобэ будет взван в том случае, когда какая-то из зависимостей поменяет значени
//
//!  **** Реализуем поиск! *** sortAndSearhPosts - 
//* на основании отсортированного массива мы и можем деать поиск!
//
//* useMemo() - в массв заисимостей будет попадать поисковая строка и отсортированный массив
//* [seachQuery, sortedPosts]
//* Сейчас в компоннт POstList будем передавать и отсортированный и отфильтрованный массив sortAndSearchPosts
//* то есть, одовременно будет работать и поиск и сортировка
//* из колбэка внутри UseMemo мы долны вернуть результат каких-либо вычислений
//* здесь мы должны отфильтровать массив по поисковой строке - есть там что-то или нет
//* выделяем каждый пост, поле title.includes(seachQuery)
//* то есть вводим в поисковик необходимый пост, а он нам показывает есть среди постов такой или нет
//*
//*Реализовала поиск - с фукцией toLowerCase() тобы игнорировать регистр
// const sortAndSearchPosts = useMemo(() => {
//    return sortedPosts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
// }, [searchQuery, sortedPosts])
//
//* Если по поиску ни одного посста не находится, должна появляться надиссь - посты не надены
//* поэтому, услови для такой надписи надо делать дл sortAndSearchPosts.length
//* если есть, то делать отрисовку PostList
//* если нет. то надпиь - посты не найдены!
//
//!  PostFilter.jsx - отвечает за манипулции над списком постов
//* Будет отвечать за сортировки, за фильтрации
//* помимо поиска модно придумать еще кучу фильтров, все сюда
//* Далее декомпозиция - выделение сортировки и фильтрации в PostFilter()
//* и в него идет сортировка и поиск MyInput MySelect
//
//*создали PostFilter и создаем в Арр новое состояние [filter, setFilter]
//* вместо этого, что ниже
// //*создаем состояние для сортировки
// const [selectedSort, setSelectedSort] = useState('');  

// //*делаем MyInput дл поиска постов управляемым
// const[searchQuery, setSearchQuery] = useState('')
//
//* const[filter, setFilter] = useState({sort: '', query:''})
//* sort - алгоритм сортировки
//* query - поисковая строка
//
//* При этом, состояни selectedSort и seachQuery удаляем и заменяем на filter
//* Инициализируя его объектом ({sort:'', query:''})
//* И поскольку состояния selectedSort и seachQuery удалили,
//* внесем правки и заменим их в колбэках у  useMemo() на filter.sort и filter.query
//
//* Функция для получения постов и проверка, есть ли они, тогда сортировка
//
// const sortedPosts = useMemo(() => {
//    if(filter.sort) {
//      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
//    } else {
//       return posts
//    }
// }, [filter.sort, posts])

// const sortAndSEarchPosts = useMemo(() => {
//    return sortedPosts.filter((post) => post.titile.toLowerCase().includes(filter.query.toLowerCase()))
// }, [filter.query, sortedPosts])
//
//* Сейчас есть форма для создания, для фильтрации и список
//
//! Это называетс Услова отрисовка!!
// {posts.length - длина постов есть(посты есть)
//    ? <PostList remove={removePost} posts={posts} title="Список постов по JavaScript"/>
//    : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
//  }
//
//*переносим условную отрисовку в сам список постов <PostList />
//
//! **** Всплывающее Модальное окно  ****
//
//* Переносим форму для создания поста в модальное окно



import axios from "axios";
import React, { useEffect, useState } from "react";
import '../src/styles/App.css';
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/Loader";
import MyModal from "./components/UI/modal/MyModal";
import { useFetching } from "./hooks/useFetching";
import { usePosts } from "./hooks/usePosts";
import { getPageCount, getPagesArray } from "./utils/pages";


function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query:''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortAndSearchPosts = usePosts(posts, filter.sort, filter.query)

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async() => {
   const response = await PostService.getAll(limit, page);
   setPosts(response.data);
   const totalCount = response.headers['x-total-count']
   setTotalPages(getPageCount(totalCount, limit))
  })

useEffect(() => {
   fetchPosts()
}, [])


const createPost = (newPost) => {
   setPosts([...posts, newPost])
   setModal(false)
} 


// получаем пост из дочернего компонента
const removePost = (post) => {
   setPosts(posts.filter(p => p.id !== post.id))
}

return (
   <div className="app">
      {/* <MyButton onClick={fetchPosts}>Get Posts</MyButton> */}
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
      {postError &&
         <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading 
      ?<div style={{display: 'flex', justifyContent:'center', marginTop: 50}}> <Loader /></div>
      : <PostList remove={removePost} posts={sortAndSearchPosts} title="Список постов по JavaScript"/>
      }
      <div className="page__wrapper">   
      {pagesArray.map(p => 
         <span 
            onClick={() => setPage(p)}
            key={p} 
            className={p === page ? 'page page__current' : 'page'}
         >
             {p}
         </span>
      )}
      </div>
          
   </div>
  );
}

export default App;

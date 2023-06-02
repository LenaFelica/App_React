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
import { usePosts } from "./hooks/usePosts";


function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query:''})
  const [modal, setModal] = useState(false)
  const sortAndSearchPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostsLoading, setIsPostsLoading] = useState(false)


useEffect(() => {
   fetchPosts()
}, [])


const createPost = (newPost) => {
   setPosts([...posts, newPost])
   setModal(false)
} 

async function fetchPosts() {
   setIsPostsLoading(true)
   const posts = await PostService.getAll();
   setPosts(posts);
   setIsPostsLoading(false)
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
      {isPostsLoading 
      ?<div style={{display: 'flex', justifyContent:'center', marginTop: 50}}> <Loader /></div>
      : <PostList remove={removePost} posts={sortAndSearchPosts} title="Список постов по JavaScript"/>
      }
      
   </div>
  );
}

export default App;

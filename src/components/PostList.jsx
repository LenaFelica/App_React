import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {

//* Проверкана наличие постов (условная отрисока перенесена сюда)
   if(!posts?.length) {
      return (
         <h1 style={{textAlign: 'center'}}>
             Посты не найдены!
         </h1>
      )
   }

   return (
      <div>
       <h1 style={{textAlign: "center"}}>{title}</h1>
       <TransitionGroup>
            {posts.map((post, index) => 
            <CSSTransition
               key={post.id}
               timeout={500}
               classNames="post"
            >
                  <PostItem 
                        remove={remove}
                        number={index + 1} 
                        post={post} 
                        /> 
            </CSSTransition>
            )}
       </TransitionGroup>
      </div>
   )
}

export default PostList;


//* получать порядковый номер нового добавленного поста
//*и= в posts.map добавить индекс
//* и в POstItem уже получать порядковы номер number={index + 1} - чтобы отсчет начинался не с 0, а с 1
//* а в самом компоненте POstItem вместо props.post.id выводить props.number
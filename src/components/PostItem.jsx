import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {

   return(
            <div className="post">
            <div className="post__content">
               <strong>{props.post.id}. {props.post.title}</strong>
               <div>{props.post.body}</div>
            </div>
            <div className="post__btns">

               <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
            </div>
         </div>
   )
}

export default PostItem;

//* Реализуем удаление постов - MyButton
//* Реализуем функционал, который будет удалять посст
//* принцип такой же, с функцией обратного вызова
//* RemovePost() - принимает post 
//* для этого предназначени функция filter которая возвращает новый массив, отфльтрованный по какомуто условию
//* там мы проверяем id, если преданный айдишник элемента, не равен тому айдишнику, что мы передали с постом, 
//* то мы просто удаляем этот элмент из массива
               //*у поста будет id и по этому id пост будет удален из массива
//* фукцию удалени пришлось прокинуть на 2 уровня - сначала в PostList, потом в PostItem
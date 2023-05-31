import React from "react";
import cl from "./MyModal.module.css"

const MyModal = ({children, visible, setVisible}) => {

   const rootClasses = [cl.myModal]

   if(visible) {
      rootClasses.push(cl.active)
   }


   return (
      <div className={rootClasses.join(' ')} onClick={() => setVisible(false)} >
         <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
             {children}
         </div>
      </div>
   )
}

export default MyModal;

//* пропс children добавим в контентный блок, тобы можно было добавлять что угодно в модальное окно
//* теперь реализуем механизм, который позволит скрывать или открывать модально окно
//* [clModal, cl.active].join(' ') - создать массив с двумя состояниями и заджойнить попробелу
//* join возвращает строку, и в ней будет 2 класса, склеенных по пробелу
//* доавляем модалку в Арр, затемняе задний фон
//* Переносим в модалку компонент для добавления поста!!
//*     <MyModal>
//*       <PostForm create={createPost} />
//*     </MyModal>
//* Реализовать механизм, который будет скрывать, либо показывать окно!
//* Сам компонент не может этим управлять - показывать видимость или невидимость
//* этим будет управлять родительский компонет, в котором модалка использ.
//* Пропсами будем ожидать visible - видимость или нет
//* setVisibl - функция, которая будет это состояни изменять
// const rootClasses = [cl.myModal]
// if(visible) {
//    rootClasses.push(cl.active)
// }
//...
// <div className={rootClasses.join(' ')}>
//* С помощью этой конструкции опрееляем, добавлять класс active или нет
//* В Арр добавим пропсы  visible={true}
//* Если поменять значени  на false (в инструментах разработчика) - окно исчезнет
//* теперь в Арр делаем состояние, которое будет регулировать видимость
//* Чтобы мы им могли динамически управлять - показывать модальное окно при нажатии на кнопку, например
//  const [modal, setModal] = useState(false) - по умолчанию false
//* в MyModal vsible={modal} setVisible={setModal}
//* Выше кнопка - добавить пост, и при нажатии на нее будет встплывать модалка
//* Вешаем слушатель события onClick
{/* <MyButton style={{marginTop: 15}}
onClick={() => setModal(true)}
>
Добавить пост
</MyButton> */}
//
//* Реализовать закрытие окна после добавления поста!!!
//* в Арр в createPost засетить в состояние false setModal(false)
// 
//* Реализовать закрытие окна при клике на темную область!!!!
//* Идем в MyModal и там на корневой див вешаем событие onClick={()=>setVisible(false)}
//* вызывае функцию, которую мы принимаем пропсом(setVisible) и передаем false 
//
//* НО если нажимаем на контентную часть. модалка тоже закрывается
//* Чтобы такого не происходило, надо предотвратить всплытие события
//* Для этого у eventa есть функци - 
//* - stopPropagation() в конентной части
//* onClck={(e) => e.stopPropagation()}
//
//*
import React from "react";
import classes from "./MyInput.module.css"
//* для инпутов, как и для баттон также было сформиовано уникальное классовое название!!
//* чтобы добиться изоляции стилей в целях непересекаемости
const MyInput = React.forwardRef((props, ref) => {
     return (
        <input ref={ref} className={classes.myInput} {...props} />
     )
})

export default MyInput;
import React,{useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function CreateArea(props) {
  const [inputText, setInputText] = useState({title:"",content:""})

  const [closed,change] =useState(false)

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value


    // setInputText(prevValue =>{
    //   return {
    //     ...prevValue,
    //     [name]:value
    //   }
    // })
      setInputText(prevValue=>{
        if(name==="title"){
             return {
              title:value,
              content:prevValue.content
              }
        }else{
          return {
            title:prevValue.title,
            content:value
          }
        }
      })
  }
function submiteNote(e){
      e.preventDefault()
      props.addItem(inputText)
      setInputText({title:"",content:""})

      
}

  return (
    <div>
      <form className="create-note" >
        {closed? <input onChange ={handleChange} name="title" placeholder="Title" value = {inputText.title}/>:null } 
        <textarea onClick={()=>{
          change(true)
        }} onChange ={handleChange} name="content" placeholder="Take a note..." rows= {closed? 3 :1 } value= {inputText.content} />
         {closed? <Fab  onClick = {submiteNote} > <Zoom in = {true} ><AddIcon /></Zoom> </Fab>:null }  
      </form>
    </div>
  );
}

export default CreateArea;

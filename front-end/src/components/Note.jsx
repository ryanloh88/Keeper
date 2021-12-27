import React , {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

function Note(props) {

  const [contentEditable, setContentEditable] = useState(true)
  const [inputText, setInputText] = useState({title:props.title,content:props.content})
  function handleChange(event){
    var name = event.target.name 
    var value = event.target.value

    setInputText(prevValue =>{
      return {
        ...prevValue,
        [name]:value
      }
    })

  }
  return (
    <div className="note">
      <input readOnly={contentEditable} onChange={handleChange}  name = "title" value = {inputText.title}></input>
      <textarea readOnly={contentEditable}  onChange={handleChange}  name = "content" value = {inputText.content} ></textarea>
      {/* Edit has finished button */}
      {contentEditable?null:<button onClick={ ()=>{
        props.editItem(props.id,inputText.title,inputText.content)
        setContentEditable(true)
      }}> <DoneIcon></DoneIcon></button> }  

      {/* Delete item Button */}
      {contentEditable?<button onClick = {(e)=>{
        props.deleteItem(props.id)
      }}><DeleteIcon /></button>:null}

      {/* edit item Button */}
      {contentEditable?  <button onClick={ ()=>{
        setContentEditable(false)
      }}><EditIcon></EditIcon> </button>:null}   
    </div>
  );
}

export default Note;

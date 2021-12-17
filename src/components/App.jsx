import React, {useState , useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"



function App() {



  const Data = [{title:"Test 1",content:"this is a test"},{title:"2nd test",content:"this is a test"}]

  const [items, setItems] = useState(Data)
  // function fetchData() {
  //   const res = axios.get()
  // }

 


  function addItem(item){
    setItems(prevValue => {
      return [...prevValue , item ]
    })
  }
  function deleteItem(id){
    setItems(prevItems => {
      return prevItems.filter((item,index)=>{
        return index !== id
      })
    })
  }

  function editItem(id,title,content){
    setItems(prevItems =>{
      prevItems.map((item,index) =>{
        if (id === index){
          item.title = title
          item.content = content
        }
      })
      return prevItems
    })
    

  }
  return (
    <div>
      <Header />
      <CreateArea addItem ={addItem} />
      {items.map((item,index) => {
        return <Note editItem= {editItem} deleteItem = {deleteItem} key = {index} id={index} title = {item.title} content = {item.content}> </Note>
      })}
      


      <Footer />
    </div>
  );
}

export default App;

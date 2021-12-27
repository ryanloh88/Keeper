import React, {useState , useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"



function App() {
  const [items, setItems] = useState([])
  useEffect(() =>{
    axios.get("http://localhost:4000/api")
    .then(res =>{
        const data = res.data
        setItems(data)
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response)
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        console.log(err.request)
        // client never received a response, or request never left
      } else {
        console.log(err)
        // anything else
      }
  })
},[items]
)
  function addItem(item){
    axios.post("http://localhost:4000/api/post",{
      title:item.title,
      content:item.content
    })
    .then(res =>{
      console.log(res)
    })
    .catch(err => {
      console.log(err)
  })
    // setItems(prevValue => {
    //   return [...prevValue , item ]
    // })
  }
  function deleteItem(id){

    axios.post("http://localhost:4000/api/delete",{
      _id : items[id]._id
    })

    // setItems(prevItems => {
    //   return prevItems.filter((item,index)=>{
    //     return index !== id
    //   })
    // })
  }

  function editItem(id,title,content){
    axios.post("http://localhost:4000/api/update",{
      _id : items[id]._id,
      title:title,
      content:content
    })

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
    <div className="page-container">
    <div className = "content-wrap" >
      <Header />
      <CreateArea addItem ={addItem} />
      {items.map((item,index) => {
        return <Note editItem= {editItem} deleteItem = {deleteItem} key = {item._id} id={index} title = {item.title} content = {item.content}> </Note>
      })}
      </div>
      <Footer />
    </div>
  );
}

export default App;

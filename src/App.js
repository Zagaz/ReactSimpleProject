import { useState , useRef , useEffect } from 'react'
import './App.css'
import Contact from "./Components/Contact"
import { v4 as chave } from 'uuid'
//import ContactList from './Components/ContactList'


function App() {
  //useState
  const [contact , setContact] = useState({id : "" , name: "" , telephone: ""  })
  const [contactList , setContactList] = useState([])
  //useRef
  const inputName = useRef()
  const inputTelephone = useRef()

  //Methods
  function defineName(event){
    setContact({...contact, name : event.target.value})
  }

  function defineTelephone(event){
    setContact({...contact, telephone : event.target.value})
  }

  function addContact(){
    //Validation
    if(contact.name === "" || contact.telephone === "") return
    //Check if it already has this entry.
    let duplicity = contactList.find((ct)=> ct.name===contact.name && ct.telephone===contact.telephone)
    if (typeof duplicity !== "undefined") {
      alert ("⚠️This contact is already on the list!")
      inputTelephone.current.focus()
      return
    }
    
    //Add new contact
    setContactList([...contactList, {...contact, id: chave()}])

    setContact({name: "" , telephone:""})
    inputName.current.focus()
  }


  // State persistence

  useEffect(()=>{
    if(localStorage.getItem('my_contacts') !== null){
      setContactList(JSON.parse(localStorage.getItem('my_contacts')))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('my_contacts' , JSON.stringify(contactList))
  },[contactList])

  function clearStorage(){
   setContactList([])
  }

  //Remove item from list

  function removeContact(id) {
    let temp = contactList.filter(ct => ct.id !== id )

    setContactList(temp)
    
  }
  return (
    <>
      <h1>My Awesome Contact List</h1>
      <hr />
      <div>
        <label >Name:</label> <br />
          <input type = "text" ref={inputName} onChange = {defineName} value = {contact.name} />
      </div>
      <div>
      <label>Telephone:</label> <br />
          <input type = "text" ref ={inputTelephone} onChange = {defineTelephone}  value = {contact.telephone} />
      </div>
      <div>
          <button onClick={addContact} > Add contact </button>
          <button onClick={clearStorage} > Clear </button>
        </div>
        
        <hr />
       {/* Contact list  */}
          {contactList.map(ct =>{
            return <Contact name={ct.name} telephone ={ct.telephone} key = {ct.id} id = {ct.id} remove ={removeContact}/>
          })}
       
  
    </>
  );
}

export default App;

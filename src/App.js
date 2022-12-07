import { useState, useRef, useEffect } from "react";
import Contact from "./Components/Contact";
import { v4 as chave } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faCirclePlus  } from '@fortawesome/free-solid-svg-icons'
import "./App.css";

function App() {
  //useState
  const [contact, setContact]=useState({ id: "", name: "", email: "" });
  const [contactList, setContactList]=useState([]);
  //useRef
  const inputName=useRef();
  const inputEmail=useRef();

  //Methods
  function defineName(event) {
    setContact({ ...contact, name: event.target.value });
  }

  function defineEmail(event) {
    setContact({ ...contact, email: event.target.value });
  }

  function addContact() {
    //Validation
    if (contact.name===""||contact.email==="") return;
    //Check if it already has this entry.
    let duplicity=contactList.find(
      (ct) => ct.name===contact.name&&ct.email===contact.email
    );
    if (typeof duplicity!=="undefined") {
      alert("⚠️This contact is already on the list!");
      inputEmail.current.focus();
      return;
    }

    //Add new contact
    setContactList([...contactList, { ...contact, id: chave() }]);

    setContact({ name: "", email: "" });
    inputName.current.focus();
  }

  // State persistence

  useEffect(() => {
    if (localStorage.getItem("my_contacts")!==null) {
      setContactList(JSON.parse(localStorage.getItem("my_contacts")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my_contacts", JSON.stringify(contactList));
  }, [contactList]);

  function clearStorage() {
    setContactList([]);
  }

  //Remove item from list

  function removeContact(id) {
    let temp=contactList.filter((ct) => ct.id!==id);

    setContactList(temp);
  }
  return (
    <>
    <div className="full">
      <div className="container-fluid title">
        <div className="row">
          <div className="col text-center">
            <h4 className="text-center">   MY AWESOME REACT CONTACT LIST </h4>
          </div>
        </div>
      </div>

      <div className="container-fluid theform">
        <div className="row">
          <div className="col p-3">
            <div className="row justify-content-center">
              <div className="col-10 col-sm-80 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Name</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    ref={inputName}
                    onChange={defineName}
                    value={contact.name}
                  />
                </div>

                <div>
                  <label className="form-label">Email</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    ref={inputEmail}
                    onChange={defineEmail}
                    value={contact.email}
                  />
                </div>
                <div className="row mt-3 ">
                  <div className="col text-start">
                    <button
                      className="btn btn-outline-warning"
                      onClick={clearStorage}
                    >
                      <FontAwesomeIcon icon = {faTrash} />
                      {" "}
                      Clear{" "}
                    </button>
                  </div>
                  <div className="col text-end">
                    <button
                      className="btn btn-outline-info"
                      onClick={addContact}
                    >  <FontAwesomeIcon icon = {faCirclePlus} />
                      {' '} Add
                    </button>
                  </div>
                </div>

                <div className="row">

    
      {/* Contact list  */}
      {contactList.map((ct) => {
        return (
          <Contact
            name={ct.name}
            email={ct.email}
            key={ct.id}
            id={ct.id}
            remove={removeContact}
          />
        );
      })}
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
      
      

    </>
  );
}

export default App;

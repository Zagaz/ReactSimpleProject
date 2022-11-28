import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faUser, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './App.css'
//import contactlist from './Components/contactlist'
import contact from './Components/contact'
import { v4 as keyContact } from 'uuid';


export default function App() {


    const [contact, setContact]=useState({ id: '', name: '', telephone: '' })
    const [contactlist, setcontactlist]=useState([])
    //UseRef
    const inputname=useRef()

    // métodos
    function definename(event) {
        setContact({ ...contact, name: event.target.value })
    }
    function definecontact(event) {
        setContact({ ...contact, telephone: event.target.value })
    }
    function addcontact() {
        if (contact.name===''||contact.telephone==='') {

            return
        }

        let duplicado=contactlist.find((ct) =>
            ct.name===contact.name&&ct.telephone===contact.telephone)
        console.log(duplicado)

        if (typeof duplicado!=='undefined') {
            return
        }
        setcontactlist([...contactlist, { ...contact, id: keyContact() }])

        setContact({ name: "", telephone: "" })
        inputname.current.focus()

    }
    function enterAddContact(event) {
        if (event.code==="Enter") {
            addcontact()
        }

    }

    useEffect(() => {
        if (localStorage.getItem('my_contacts')!==null) {
            setcontactlist(JSON.parse(localStorage.getItem('my_contacts')))
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('my_contacts', JSON.stringify(contactlist))

    }, [contactlist])

    function clearStorage() {
        setcontactlist([])

    }
    //Remover um contact da lista
    function removeContacts(id) {
        let temp=contactlist.filter(ct => ct.id!==id)
        setcontactlist(temp)


    }

    return (
        <>
            <div className="container-fluid titulo">
                <div className="row">
                    <div className="col text-center">
                        <h4 className='text-center'> <FontAwesomeIcon icon={faList} className='me-3' /> MINHA LISTA DE contactS</h4>
                    </div>
                </div>
            </div>
            <div className="conteiner-fluid formulario">
                <div className="row">
                    <div className="col p-3">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4   ">
                                <div className='mb-3'>
                                    <div className='form-group'>
                                        <label className='form-label' > <FontAwesomeIcon icon={faUser} /> name </label> <br />
                                        <input type="text" ref={inputname} onChange={definename} value={contact.name} className="form-control" />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' > telephone </label> <br />
                                        <input type="text" onChange={definecontact} value={contact.telephone} onKeyUp={enterAddContact} className="form-control" />
                                    </div>
                                    <div className="row mt-3 ">
                                        <div className="col text-start">
                                            <button onClick={clearStorage} className="btn btn-outline-warning" >
                                                <FontAwesomeIcon icon={faTrash} className="me-2" /> Clear</button>
                                        </div>
                                        <div className="col text-end">
                                            <button onClick={addcontact} className="btn btn-outline-info">
                                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />Add </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {contactlist.map(ct => {
                return <contact key={ct.id} id={ct.id} name={ct.name} telephone={ct.telephone} remover={removeContacts} />
            })}
        </>
    )
}
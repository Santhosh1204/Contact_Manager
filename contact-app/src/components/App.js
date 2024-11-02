import React,{useState, useEffect} from "react";
import {BrowserRouter as Router,Routes,Route, useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import api from "../api/contacts";
import Header from './Header';
import ContactCard from './ContactCard';
import ContactList from './ContactList';
import AddContact from './AddContact';
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts]=useState([]);
  const Local_Storage_Key="contacts";
  const [searchTerm, setSearchTerm]=useState("");
  const [searchResults, setSearchResults]=useState([]);

  //Retrieve Contacts
  const retriveContacts=async ()=>{
    const response=await api.get("/contacts");
    return response.data;
  }

  const addContactHandler=async (contact)=>{
    console.log(contact);
    //setContacts([...contacts, {id:uuidv4(), ...contact}]);
    const request={
      id:uuidv4(),
      ...contact,
    };
    const response=await api.post("/contacts",request);
    setContacts([...contacts,response.data]);
  }

  const removeContactHandler=async (id)=>{
  await api.delete(`/contacts/${id}`) 
    const newContactList=contacts.filter((contact)=>{
      return contact.id!==id;
    });
    setContacts(newContactList);
  };
  const updateContactHandler=async (contact)=>{
    const response=await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email, phone, address}=response.data;
    setContacts(
      contacts.map((contact)=>{
        return contact.id===id ? {...response.data}:contact;

      })
    );
  };

  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm!==""){
      const newContactList=contacts.filter((contact)=>{
        return Object.values(contact)
        .join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else{
      setSearchResults(contacts);
    }
  };
  // const contacts=[
  //   {
  //     id:1,
  //     name:"Santhosh",
  //     email:"santhosh@gmail.com",
  //     phone:6361748785,
  //     address:"Ashok nagara camp"
  //   },
  //   {
  //     id:2,
  //     name:"Kumar",
  //     email:"kumara@gmail.com",
  //     phone:9972619889,
  //     address:"Nalkudre"
  //   },
  //   {
  //     id:3,
  //     name:"Googly",
  //     email:"googly@gmail.com",
  //     phone:8989898989,
  //     address:"Mayakonda"
  //   }
  // ];
  useEffect(() => {
    //const retriveContacts = JSON.parse(localStorage.getItem(Local_Storage_Key));
    //if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts=async ()=>{
      const allContacts=await retriveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
   // localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts));
  }, [contacts]);
  
  const NavigateWrapper=()=>{
    const navigate=useNavigate();
    return(<AddContact addContactHandler={addContactHandler} navigate={navigate}/>);
  }

  const NavigateWrap=()=>{
    const navigated=useNavigate();
    return(<EditContact updateContactHandler={updateContactHandler} navigated={navigated} contacts={contacts}/>);
  }
  return (
    <div className="ui container">
    <Router>
        <Header/>
        <Routes>
          <Route path="/add"  element={<NavigateWrapper/>}/>
          <Route path="/contact/:id" element={<ContactDetails contacts={contacts} />} />   
          <Route path="/edit/:id" element={<NavigateWrap/>}/>
          <Route path="/" element={<ContactList contacts={searchTerm.length<1 ? contacts:searchResults}
          getContactId={removeContactHandler}
          term={searchTerm}
          searchKeyword={searchHandler}
          />
        }/>
          </Routes> 
    </Router>
    </div>
  );
}

export default App;

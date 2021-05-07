import React from "react";
import { useState, useEffect } from "react";
import {  BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import 'firebase/auth';


import "./index.css";

import { auth } from "./services/firebase";


export default function App() {
  
  const [state, setState] = useState({
    form: true,
    user: null,
    snippets: [{ level: "CSS", snippet: "Snippet", code: "Code" }],
    newSnippet: {
      level: "CSS",
      snippet: "",
      code: "",
    },
  });

  const NotFound = (props) => <div>404 Sorry That Page Doesnt Exist</div>;

  async function getAppData() {
    try {
      const BASE_URL = "http://localhost:3001/api/snippets";

      const snippets = await fetch(BASE_URL).then((res) => res.json());
      setState((prevState) => ({
        ...prevState,
        snippets,
      }));
    } catch (error) {
      console.log(error);
    }
  }
    
    useEffect(() => {
    getAppData();

    const cancelSubscription = auth.onAuthStateChanged((user) => {
      if (user) {
        setState((prevState) => ({
          ...prevState,
          user,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          user: null,
        }));
      }
    });
    return function() { 
      cancelSubscription();
    }

  }, []);

  async function addSnippet(e) {
    if (!state.user) return;

    e.preventDefault();

    const BASE_URL = "http://localhost:3001/api/snippets"; //??

    const snippet = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(state.newSnippet),
    }).then((res) => res.json());

    // const code = await fetch(BASE_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "Application/json",
    //   },
    //   body: JSON.stringify(state.newCode),
    // }).then((res) => res.json());

    console.log(snippet);

    setState((prevState) => ({
      ...prevState,
      snippets: [...prevState.snippets, snippet],
      newSnippet: {
        level: "CSS",
        snippet: "",
        code: "",
      },
    }));
  }

  function handleChange(e) {
    setState((prevState) => ({
      ...prevState,
      newSnippet: {
        ...prevState.newSnippet,
        ...prevState.newCode,
        [e.target.name]: e.target.value,
      },
    }));
  }

  
  // function handleClick(state) {
  //   state.form = true;
  // }

  const isFormTrue = state.form;

  return (
    <>
      <Header user={state.user} />
      <main>
        <BrowserRouter>
          <Switch>
          <Route exact path="/" render={(props) => 
          <HomePage {...props} />} />
            {/* <Route
              path="/"
               />  */}
              
            </Switch>
            </BrowserRouter>
      </main>

      <>
      { isFormTrue  ?
        
        <section className="formPage">
        {state.snippets.map((s) => (
          <article key={s.snippet}>
            <div>{s.snippet}</div> <div>{s.level}</div>
            <div>{s.code}</div>
          </article>
        ))}
        {
          //  state.user &&
        <>
        {/* <hr /> */}
        <form onSubmit={addSnippet}>

        <label>
            <span>Language</span>
            &nbsp;&nbsp;&nbsp;
            <select name="level" value={state.newSnippet.level} onChange={handleChange} >
              <option value="CSS">CSS</option>
              <option value="JS">JS</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="Node">Node</option>
              </select>
            </label>
            
          

          <label>
            <span>Description</span>
            &nbsp;&nbsp;&nbsp;
            <input name="snippet" value={state.newSnippet.snippet} onChange={handleChange} />
          </label>

          <label>
            <span>Code-Block</span>
            &nbsp;&nbsp;&nbsp;
            <input name="code" value={state.newSnippet.code} onChange={handleChange} />
          </label>

          <button>Add Snippet</button>
          </form>
          </>
          
          }
        </section>
        
        : "" } 
        </>
          </>
          ); 
        };  

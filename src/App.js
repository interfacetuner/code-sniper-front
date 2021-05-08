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
      {/* { isFormTrue  ? */}
        
        <section>
        {/* {state.snippets.map((s) => (
          <article class="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4" key={s.snippet}>
            <div>{s.level}</div> <div>{s.snippet}</div>
            <div>{s.code}</div>
          </article>
        ))} */}
        {
          
        <>
        <hr />
        <div class="flex items-center justify-center h-screen">

        <form class="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-20" onSubmit={addSnippet}>

        <label>
            <p class="text-center ...">Select Topic</p>
            &nbsp;
            <select class="flex content-center justify-center text-black font-bold" name="level" value={state.newSnippet.level} onChange={handleChange} >
              <option value="CSS">CSS</option>
              <option value="JS">JS</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="Node">Node</option>
              </select>
              </label>
            &nbsp;&nbsp;
            
            <div>
          <label>
            <p class="text-center ...">Description</p>
            
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="snippet" value={state.newSnippet.snippet} onChange={handleChange} />
          </label>
          </div>

          <div class="flex items-center justify-center">
          <label>
          
            <p class="text-center ...">Code-Block</p>
           
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="code" value={state.newSnippet.code} onChange={handleChange} />
          </label>
          </div>
          &nbsp;&nbsp;
          <div>
          <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Add Snippet</button>
          </div>
          </form>
          </div>
          </>
          
          }

          {state.snippets.map((s) => (
          <article class="block text-gray-500 font-bold md:text-center mb-0 md:mb-0 pr-4 prose lg:prose-xl border-4 md:border-t-3 ..." key={s.snippet}>
            <div>{s.level}</div>
            
            <div>{s.snippet}</div>
            
            <div>{s.code}</div>
            &nbsp;
          </article>
        ))}

        </section>
        
        {/* : "" } */}
        </>
          </>
          ); 
        };  

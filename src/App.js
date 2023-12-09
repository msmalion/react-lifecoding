//this is state

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){ // 리액트의 컴퍼넌트(=사용자 정의 태그)는 반드시 대문자로 시작
  return (
    <header>
    <h1><a href='/' onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
    </header>
  )

}

function Nav(props){
  const lis = [];
  for (let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>
        {t.title}
      </a>
    </li>)
  }  
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  ) 
}

function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input name='title' type='text' placeholder='title'></input></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='create'></input></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, modeState] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'},
  ]) 
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if(mode === 'READ'){
    for(let topic of topics){
      if(id === topic.id){
        content = <Article title={topic.title} body={topic.body}></Article>
      }
    }
  } else if(mode==='CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topics];
      newTopics.push(newTopic)
      setTopics(newTopics);
    }}></Create>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        modeState("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        modeState("READ");
        setId(_id);
      }}></Nav>
      {content}
      <a href='/create' onClick={(event)=>{
        event.preventDefault();
        modeState("CREATE");
      }}>Create</a>

    </div>

  );
}

export default App;

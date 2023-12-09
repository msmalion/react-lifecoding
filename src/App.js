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

function App() {
  const [mode, modeState] = useState("WELCOME");
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'},
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if(mode === 'READ'){
    for(let topic of topics){
      if(id === topic.id){
        content = <Article title={topic.title} body={topic.body}></Article>
      }
    }
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
    </div>
  );
}

export default App;

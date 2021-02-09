import React, { FormEvent, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../Services/axiosConfig'

import LoadingBar from 'react-top-loading-bar'

import '../Styles/pages/signin.css'

function SignInPage() {

  const history = useHistory()
  const [progress, setProgress] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [profile, setProfile] = useState('')

  async function handleLogin(event: FormEvent){
  
    event.preventDefault()
    setProgress(50)

    const Formdata = {email: email, password: password, name: name, picture_url: url, profile: profile}
    
    await axios.post('/signin', Formdata)
    .then(res =>{
      setProgress(100)
    })
    .catch((err)=>{
      alert('Email já cadastrado, realize login.')})

    setTimeout(()=>{
      history.push('/')
    }, 400)
  }

  return (
    <div className="signin-content">
      <LoadingBar 
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}></LoadingBar>
      <main className="signin-field">
            <h1>Realize seu cadastro</h1>
            <form onSubmit={handleLogin} className="signin-form">
                <label htmlFor="name">Seu nome completo</label>
                <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)}/>
                <label htmlFor="email">Seu email</label>
                <input type="text" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password">Sua senha</label>
                <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                <label htmlFor="url">URL para sua foto</label>
                <input type="url" id="url" value={url} required onChange={e => setUrl(e.target.value)}/>
                <label htmlFor="profile">Perfil acadêmico</label>
                <select id="profile" required value={profile} onChange={e => setProfile(e.target.value)}>
                  <option value="Aluno Ensino médio">Aluno Ensino médio</option>
                  <option value="Aluno Ensino fundamental">Aluno Ensino fundamental</option>
                  <option value="Aluno Graduação">Aluno Graduação</option>
                  <option value="Aluno Pós-graduação">Aluno Pós-graduação</option>
                  <option value="Professor auxiliar">Professor auxiliar</option>
                  <option value="Professor assistente">Professor assistente</option>
                  <option value="Professor adjunto">Professor adjunto</option>
                  <option value="Professor titular">Professor titular</option>
                  <option value="Reitor/Gestor">Reitor/Gestor</option>
                  <option value="Aluno e Professor">Aluno e Professor</option>
                  <option value="Outro">Outro</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>
            <div className="login">
                  <h5>Ou faça login clicando <Link to="/login">aqui</Link></h5>
            </div>
      </main>
    </div>
  );
}

export default SignInPage;

import React, { Component } from 'react'
import InputSimples from '../Components/Inputs/FormSimples'
import ButtonSimples from '../Components/Button/Simples'
import axios from 'axios'
import '../index.css'


export default class GitHub extends Component {
  state = {
    username: '',
    user: [],
    repos: [],
    seguidores: [],
    seguindo: [],
    reposContainer: false,
    seguidoresContainer: false,
    seguindoContainer: false
  }

  onChangeInput = (field, value) => this.setState({ [field]: value })

  render() {
    const {
      username,
      user,
      repos,
      seguidores,
      seguindo,
      reposContainer,
      seguidoresContainer,
      seguindoContainer } = this.state;

    const searchUser = async () => {
      await axios.get(`https://api.github.com/users/${username}`)
        .then(res => {
          const response = res.data;
          this.setState({
            user: response,
            repos: []
          });
        })
      console.log(this.state.user);
    }

    const searchRepos = async () => {
      console.log(user.repos_url)
      await axios.get(user.repos_url)
        .then(res => {
          const response = res.data;
          this.setState({
            repos: response,
            reposContainer: true
          });
        })
    }

    const searchSeguidores = async () => {
      await axios.get(user.followers_url)
        .then(res => {
          const response = res.data;
          this.setState({
            seguidores: response,
            seguidoresContainer: true,
            seguindoContainer: false,
            reposContainer: false
          });
        })
    }

    const searchSeguindo = async () => {
      await axios.get(`https://api.github.com/users/${username}/following`)
        .then(res => {
          const response = res.data;
          this.setState({
            seguindo: response,
            seguidoresContainer: false,
            seguindoContainer: true,
            reposContainer: false
          });
        })
    }

    return (
      <div className='GitHub-Repos'>
        <InputSimples
          onChange={(ev) => (this.onChangeInput('username', ev.target.value))}
        />
        <ButtonSimples
          label={'Buscar'}
          onClick={searchUser} />
        <hr />
        <div className='full-width'>
          <div className='Img-User flex horizontal'>
            <img src={user.avatar_url} />
            <p>{user.name || user.login}</p>
          </div>

          <div className='Botoes flex horizontal'>
            {user.repos_url && <div>
              <ButtonSimples
                label={`Repositórios públicos ${user.public_repos}`}
                onClick={searchRepos}
              />
            </div>}
            {user.followers && <div>
              <ButtonSimples
                label={`Seguidores ${user.followers}`}
                onClick={searchSeguidores}
              />
            </div>}
            {user.following && <div>
              <ButtonSimples
                label={`Seguindo ${user.following}`}
                onClick={searchSeguindo}
              />
            </div>}
          </div>

          {reposContainer === true &&
            <div>
              {repos.map((item, idx) => {
                return (<div className='Repos flex horizontal' key={idx}>
                  <a href={item.html_url} target='_blanc'><p>{item.full_name}</p></a>
                  <div className='Star-Repos'>{item.watchers} ★</div>
                </div>)
              })}
            </div>}

          {seguidoresContainer === true &&
            <div>
              {seguidores.map((item, idx) => {
                return (<div className='Seguidores flex horizontal' key={idx}>
                  <img src={item.avatar_url} />
                  <a href={item.html_url} target='_blanc'><p>{item.login}</p></a>
                </div>)
              })}
            </div>}

          {seguindoContainer === true &&
            <div>
              {seguindo.map((item, idx) => {
                return (<div className='Seguidores flex horizontal' key={idx}>
                  <img src={item.avatar_url} />
                  <a href={item.html_url} target='_blanc'><p>{item.login}</p></a>
                </div>)
              })}
            </div>}
        </div>
      </div>
    )
  }
}
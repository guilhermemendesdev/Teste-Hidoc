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
    reposContainer: false
  }

  onChangeInput = (field, value) => this.setState({ [field]: value })

  render() {
    const { username, user, repos, reposContainer } = this.state;

    const searchUser = async () => {
      console.log(username)
      await axios.get(`https://api.github.com/users/mateusfmachado`)
        .then(res => {
          const response = res.data;
          this.setState({ user: response });
        })
      console.log(this.state.user);
    }

    const searchRepos = async () => {
      console.log(user.repos_url)
      await axios.get(user.repos_url)
        .then(res => {
          const response = res.data;
          this.setState({ repos: response, reposContainer: true });
        })
      console.log(this.state.repos);
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
        <div>
          <div className='Img-User flex horizontal'>
            <img src={user.avatar_url} />
            <p>{user.name}</p>
          </div>

          {user.name && <div>
            <ButtonSimples
              label={'Repositórios públicos'}
              onClick={searchRepos}
            />
          </div>}
          {reposContainer === true &&
            <div>
              {repos.map((item, idx) => {
                return (<div className='Repos flex horizontal' key={idx}>
                  <a href={item.html_url} target='_blanc'><p>{item.full_name}</p></a>
                  <div className='Star-Repos'>{item.watchers} ★</div>
                </div>)
              })}
            </div>}
        </div>
      </div>
    )
  }
}
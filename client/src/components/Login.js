import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    let history = useHistory()
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/list')
        }
        // eslint-disable-next-line
    }, [isAuthenticated])


    const { email, password } = user;
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        if (email === '' || password === '') {
            M.toast({ html: `Please fill in all fields to login successfully!` });
        }
        else {
            var data = JSON.stringify({ email, password });

            var config = {
                method: 'post',
                url: '/api/user/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const response = await axios(config)
            localStorage.setItem('userId', response.data._id)
            localStorage.setItem('username', response.data.name)

            console.log(response.data)
            setIsAuthenticated(true)
        }

    }

    return (
        <div>
            <section className="section section-login">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l6 offset-l3">
                            <div className="card-panel login blue darken-2 white-text center">
                                <h2>User Login</h2>
                                <form>
                                    <div className="input-field">
                                        <div className="material-icons prefix">email</div>
                                        <input type="email" name='email' value={email} id="email" onChange={onChange} />
                                        <label className="white-text" for="email">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <div className="material-icons prefix">lock</div>
                                        <input type="password" name="password" value={password} id="password" onChange={onChange} />
                                        <label className="white-text" for="password">Password</label>
                                    </div>
                                    <input type="submit" value="Login" onClick={onSubmit}
                                        className="btn btn-large waves-effect waves-blue white blue-text" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Login

import "./loginForm.css";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthMessage from "./AuthMessage";

export const DisplayContext = createContext(null);

function LoginForm () {    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const userData = 'https://jsonplaceholder.typicode.com/users';

    function updateFields() {
        setUsername(document.getElementById('username').value);
        setPassword(document.getElementById('password').value);
    }

    useEffect(() => {

        if (password.length < 8) {
            setType('error');
            setMessage('Password must be at least 8 characters');
            return;
        }
        
        fetch(userData)
            .then((response) => response.json())
            .then((users) => {
                var foundUser = null;

                users.forEach(function(user) {
                    if (user['username'] === username) {
                        foundUser = user;
                    }
                });

                if (foundUser) {
                    if (password === foundUser['email']) {
                        setType('success');
                        setMessage('Login successful! Redirecting...');
                        var interval = setInterval(function() {
                            navigate('/courses');
                            clearInterval(interval);
                        }, 2000);
                    }
                    else {
                        setType('error');
                        setMessage('Incorrect username or password');
                    }
                }
                else {
                    setType('error');
                    setMessage('Incorrect username or password');
                }
            })
            .catch(() => {
                setType('error');
                setMessage('Could not fetch user data')
            });
    }, [username, password, navigate]);

    useEffect(() => {
        setType('');
        setMessage('');
    }, []);

    return (
        <div className='loginForm'>
            <form className='loginForm'>
                <h1 className='loginForm'>Login</h1>
                <label>Username</label>
                <br/>
                <input name='username' id='username' type="text" required/>
                <br/>
                <br/>
                <label>Password</label>
                <br/>
                <input name='password' id='password' type='password' required/>
                <br/>
                <br/>
                <button type='button' onClick={updateFields}>Login</button>
                <br/>
                <br/>
                <a href='/'>Forgot Password?</a>
                <br/>
                <br/>
                <DisplayContext.Provider value={{type, message}}>
                    <AuthMessage/>
                </DisplayContext.Provider>
            </form>
            <br/>
            
        </div>
    );
}

export default LoginForm;
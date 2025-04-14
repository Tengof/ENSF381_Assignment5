import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegForm.css';

function RegForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');  
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    function validateUsername(user){
        var errors = "";

        if (user.length < 3 || user.length > 20) {
            errors += "Username must be between 3 and 20 characters long.<br>";
        }

        var firstChar = user.charAt(0);
        if (!((firstChar >= 'A' && firstChar <= 'Z') || (firstChar >= 'a' && firstChar <= 'z'))) {
            errors += "Username must start with a letter.<br>";
        }

        var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        for (var i = 0; i < user.length; i++) {
            var ch = user.charAt(i);
            if (allowed.indexOf(ch) === -1) {
                errors += "Username may only contain letters, numbers, hyphens, or underscores.<br>";
                break;
            }
        }

        return errors;
    }

    function validatePassword(password){
        var errors = "";
        if (password.length < 8) {
            errors += "Password must be at least 8 characters long.<br>";
        }

        var hasUpper = false;
        var hasLower = false;
        var hasDigit = false;
        var hasSpecial = false;
        var specialChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~";
        for (var i = 0; i < password.length; i++) {
            var ch = password.charAt(i);
            if (ch >= 'A' && ch <= 'Z') {
                hasUpper = true;

            } else if (ch >= 'a' && ch <= 'z') {
                hasLower = true;

            } else if (ch >= '0' && ch <= '9') {
                hasDigit = true;

            } else if (specialChars.indexOf(ch) !== -1) {
                hasSpecial = true;

            } else if (ch === " ") {
                errors += "Password must not contain spaces.<br>";
            }
        }

        if (!hasUpper) {
            errors += "Password must include at least one uppercase letter.<br>";
        }

        if (!hasLower) {
            errors += "Password must include at least one lowercase letter.<br>";
        }

        if (!hasDigit) {
            errors += "Password must include at least one digit.<br>";
        }

        if (!hasSpecial) {
            errors += "Password must include at least one special character.<br>";
        }

        return errors;
        }
    
    function validateEmail(email) {
        var errors = "";
        if (email.indexOf(" ") !== -1) {
            errors += "Email must not contain spaces.<br>";
        }

        var atPosition = email.indexOf('@');
        if (atPosition <= 0) {
            errors += "Email must contain an '@' symbol that is not the first character.<br>";
        }

        var domainPart = email.substring(atPosition + 1);
        if (domainPart.length === 0) {
            errors += "Email must have a domain after '@'.<br>";
        }

        var dotPosition = domainPart.indexOf(".");
        if (dotPosition <= 0) {
            errors += "The domain must contain a dot ('.') with text before it.<br>";
        }
        var validDomains = [".com", ".net", ".io"];
        var valid = false;
        for (var i = 0; i < validDomains.length; i++) {
            var ending = validDomains[i];
            if (domainPart.substring(domainPart.length - ending.length) === ending) {
                valid = true;
                break;
            }
        }

        if (!valid) {
            errors += "Email domain must end with .com, .net, or .io.<br>";
        }

        return errors;
    }

    function handleValidation() {
        var errorMessages = "";
        var userErrors = validateUsername(username);
        
        if (userErrors !== "") {
            errorMessages += "Invalid username:<br>" + userErrors;
        }
        var passErrors = validatePassword(password);
        if (passErrors !== "") {
            errorMessages += "Invalid password:<br>" + passErrors;
        }

        if (password !== confirmPassword) {
            errorMessages += "Passwords do not match.<br>";
        }
        var mailErrors = validateEmail(email);
        if (mailErrors !== "") {
            errorMessages += "Invalid email:<br>" + mailErrors;
        }

        return errorMessages;
        }

    async function handleSubmit(event) {
        event.preventDefault();
        var errors = handleValidation();
        if (errors !== "") {
            setMessage(errors);
            setMessageType("error");

        } else {
            const registrationData = { username, password, email };

            try{
                const response = await fetch("http://127.0.0.1:5000/register", 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registrationData)
                });

                const result = await response.json();
                if (result.success) {
                    setMessage("Signup successful! Redirecting to Login...");
                    setMessageType("success");
                    setTimeout(() => { navigate("/login"); }, 2000);

                } else {
                    setMessage(result.message);
                    setMessageType("error");
                }
            } catch(err){
                setMessage("Registration failed. Please try again later.");
                setMessageType("error");
            }
            
        }
    }

    function handleMouseOver() {
        setHover(true);
    }

    function handleMouseOut() {
        setHover(false);
    }

    function getMessageBox(){
        if(message === ""){
            return null;
        }

        var lines = message.split("<br>");
        var paragraphs = [];
        for(var i = 0; i < lines.length; i++){
            if((lines[i].trim()) !== ""){
                paragraphs.push(<p>{lines[i]}</p>);
            }
        }

        var classNameValue = "";
        if(messageType === "success"){
            classNameValue = "messageBoxSuccess";
        } else {
            classNameValue = "messageBoxError";
        }

        return (<div className={classNameValue}>{paragraphs}</div>);
    } 

    return(
        <form onSubmit={handleSubmit} className="formContainer">
            <div className="greyBox">
                <h2>Sign Up</h2>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
            
                <button type="submit" className="signupButton" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                Signup
                </button>
                <a className="loginLink" href="/login">Already have an account? Login here</a>
            </div>
            {getMessageBox()}

        </form>
    );
}           

export default RegForm;

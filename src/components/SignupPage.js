import React from "react";
import Header from "./Header";
import RegForm from './RegForm';
import Footer from './Footer';

function SignupPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <RegForm />
            <Footer />
        </div>
    );
}

export default SignupPage;
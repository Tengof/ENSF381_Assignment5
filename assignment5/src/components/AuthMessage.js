import { useContext } from "react";
import { DisplayContext } from "./LoginForm";
import DisplayStatus from "./DisplayStatus";

function AuthMessage () {
    var { type } = useContext(DisplayContext);
    var { message } = useContext(DisplayContext);

    return (
        <div>
            <DisplayStatus type={type} message={message}/>
        </div>
    );
}

export default AuthMessage;
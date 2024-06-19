
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../logo.svg';
/*
Fragmento de inicio de sesion
*/

const Principal = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="/sesion"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    );
}

export default Principal;


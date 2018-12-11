import React from 'react';
import {Link} from 'react-router-dom';

const Foother = () => (
    <div className="App-foother">
        <footer>
           <Sprawdz_Foother/>
        </footer>
    </div>
);

const Sprawdz_Foother = () => {
 
    var a = window.location.pathname;

    if(a!="/")
    {
        return (<Link to="/">Wróć do Strony Głównej</Link>);
    }
    else
    {
        return (<div>Strona Główna</div>);
    }
}


export default Foother;



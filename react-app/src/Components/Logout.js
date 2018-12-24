import React, { Component } from 'react';


class Logout extends Component {


    KlikniecieSubmit = async (event) => {
        event.preventDefault();

       
        this.props.onLoggedUserChange2("");
    
    }

    render() {


        return (
            <div>
                
                <form onClick={this.KlikniecieSubmit}>
                    <button>Wyloguj!</button>
                </form>
           

            </div>
        )

    }
}
export default Logout;
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Breaking Bad Characters</span>
                        <Link 
                            to="/"
                            className="navbar-brand mb-0 h1"
                        >
                            Home
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;
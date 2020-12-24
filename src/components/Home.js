import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    componentDidMount() {
        axios
            .get("https://www.breakingbadapi.com/api/characters")
            .then((res) => {
                this.props.dispatch({
                    type : "LOAD",
                    data : [...res.data]
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    handlePages = (e) => {
        this.props.dispatch({
            type : "PAGE",
            data : Number(e.target.id)
        });
    }

    handleClick = (e) => {
        this.props.dispatch({
            type : "CHAR",
            data : Number(e.target.id)
        })
    }

    render() {
        const { allCharacters, currentPage, perPage } = this.props;

        const indexOfLast = currentPage * perPage;
        const indexOfFirst = indexOfLast - perPage;
        const characters = allCharacters.slice(indexOfFirst, indexOfLast);

        const renderCharacters = characters.map((character) => (
            <tr key={character.char_id}>
                <td>{character.name}</td>
                <td>{character.occupation[0]}</td>
                <td>{character.birthday}</td>
                <td>{character.status}</td>
                <td>
                    <Link
                      to="/detail"
                      type="button"
                      id={character.char_id}
                      value={character.char_id}
                      className="btn btn-primary"
                      onClick={this.handleClick}
                    >
                      Show Details
                    </Link>
                </td>
            </tr>
        ))

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allCharacters.length / perPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePages}
                    className="page-item page-link"
                >
                    {number}
                </li>
            );
        });

        return (
            <Fragment>
                <div id="table-section">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Occupation</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCharacters}
                        </tbody>
                    </table>
                    <ul id="page-numbers" className="pagination justify-content-center">
                        {renderPageNumbers}
                    </ul>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    allCharacters : state.allCharacters,
    currentPage: state.currentPage,
    perPage: state.perPage,
    character_id : state.character_id,
    quotes : state.quotes,
    errors : state.errors,
    messages : state.messages
});
export default connect(mapStateToProps)(Home);
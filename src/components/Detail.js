import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Detail extends Component{
    componentDidMount() {
        const id = this.props.character_id;
        axios
            .get(`https://www.breakingbadapi.com/api/quotes/${id}`)
            .then((res) => {
                this.props.dispatch({
                    type : "QUOTE",
                    data : [...res.data]
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getOccupation = (characterData) => {
        var occupationList = characterData.occupation;
        if (occupationList === null) {
            return "None";
        }
        var n = occupationList.length;
        var result = '';

        if (n == 0)
        {
            return "None";
        }
        else if (n == 1)
        {
            return occupationList[0];
        }
        else if (n == 2)
        {
            result += occupationList[0];
            result += ' and ';
            result += occupationList[1];

            return result;
        }
        else
        {
            for (let i = 0; i < (n - 2); i++) {
                result += occupationList[i];
                result += ', ';
            }
            result += occupationList[n-2];
            result += ' and ';
            result += occupationList[n-1];

            return result;
        }

    }

    getSeasons = (characterData) => {
        var seasonList = characterData.appearance;
        if (seasonList === null) {
            return "None";
        }
        var n = seasonList.length;
        var result = '';

        if (n == 0)
        {
            return "None";
        }
        else if (n == 1)
        {
            return seasonList[0];
        }
        else if (n == 2)
        {
            result += seasonList[0];
            result += ' and ';
            result += seasonList[1];

            return result;
        }
        else
        {
            for (let i = 0; i < (n - 2); i++) {
                result += seasonList[i];
                result += ', ';
            }
            result += seasonList[n-2];
            result += ' and ';
            result += seasonList[n-1];

            return result;
        }
    }

    getQuotes = () => {
        var quotesList = this.props.quotes;
        if (quotesList.length == 0) {
            renderQuotes = (
                <li
                    className=""
                >
                    <h4>
                        None
                    </h4>    
                </li>
            )
        }

        var renderQuotes = quotesList.map((quote) => {
            return (
                <li
                    key={quote.quote_id}
                    id={quote.quote_id}
                    className=""
                >
                    <h4>
                        {quote.quote}
                    </h4>  
                </li>
            );
        });
    }

    render() {
        if (this.props.allCharacters.length == 0) {
            return <Redirect to = "/" />;
        }
        const id = this.props.character_id;
        var characterData = this.props.allCharacters.filter((item) => item.char_id == id);
        characterData = characterData[0];

        return (
            <div className="">

                <div className = "d-flex flex-row">
                    <div className="imgContainer wd-50 blue-bg">
                        <img src={characterData.img} />
                    </div>
                    <div className="wd-50 white-bg">
                        <div className = "ht-50 yellow-bg">
                            <h4>Name : </h4>
                        </div>
                        <div className = "ht-50 orange-bg">
                            <h4>{characterData.name}</h4>
                        </div>
                        <div className = "ht-50 green-bg">
                            <h4>Date of Birth : </h4>
                        </div>
                        <div className = "ht-50 violet-bg">
                            <h4>{characterData.birthday}</h4>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                
                <div className="d-flex flex-row white-bg">
                    <div className="wd-50 ht-50 orange-bg">
                        <h4 className="">Status : </h4>
                    </div>
                    <div className="wd-50 ht-50 green-bg">
                        <h4 className="">{characterData.status}</h4>
                    </div>
                </div>

                <div className="d-flex flex-row white-bg">
                    <div className="wd-50 ht-50 yellow-bg">
                        <h4 className="">Nickname : </h4>
                    </div>
                    <div className="wd-50 ht-50 violet-bg">
                        <h4 className="">{characterData.nickname}</h4>
                    </div>
                </div>

                <div className="d-flex flex-row white-bg">
                    <div className="wd-50 ht-50 orange-bg">
                        <h4 className="">Actor : </h4>
                    </div>
                    <div className="wd-50 ht-50 green-bg">
                        <h4 className="">{characterData.portrayed}</h4>
                    </div>
                </div>

                <div className="d-flex flex-row white-bg">
                    <div className="wd-50 ht-50 violet-bg">
                        <h4 className="">Occupation : </h4>
                    </div>
                    <div className="wd-50 ht-50 yellow-bg">
                        <h4 className="">{this.getOccupation(characterData)}</h4>
                    </div>
                </div>
                
                <div className="d-flex flex-row white-bg">
                    <div className="wd-50 ht-50 green-bg">
                        <h4 className="">Seasons : </h4>
                    </div>
                    <div className="wd-50 ht-50 violet-bg">
                        <h4 className="">{this.getSeasons(characterData)}</h4>
                    </div>
                </div>

                <br />
                <br />

                <div className="d-flex flex-row white-bg">
                    <div className="wd-50 ht-50 violet-bg">
                        <h4 className="">Quotes : </h4>
                    </div>
                    <div className="wd-50 ht orange-bg">
                        <ul className="">{this.getQuotes()}</ul>
                    </div>
                </div>

                <br />
                <br />
            </div>
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
    messages : state.messages,
});
export default connect(mapStateToProps)(Detail);
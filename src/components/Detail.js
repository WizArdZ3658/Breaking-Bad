import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";

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

    render() {
        const id = this.props.character_id;
        var characterData = this.props.allCharacters.filter((item) => item.char_id == id);
        characterData = characterData[0];
        console.log(characterData);

        return (
            <div>
                <img src={characterData.img} />

                <div className="col-md-6">
                    <h5>Name : </h5>
                </div>
                <div className="col-md-6">
                    <h5>{characterData.name}</h5>
                </div>
                
                <div className="col-md-6">
                    <h5>Date of Birth : </h5>
                </div>
                <div className="col-md-6">
                    <h5>{characterData.birthday}</h5>
                </div>

                <div className="col-md-6">
                    <h5>Occupation : </h5>
                </div>
                <div className="col-md-6">
                    {/* <h5>{characterData.occupation[0]}</h5> */}
                </div>

                <div className="col-md-6">
                    <h5>Status : </h5>
                </div>
                <div className="col-md-6">
                    <h5>{characterData.status}</h5>
                </div>

                <div className="col-md-6">
                    <h5>Nickname : </h5>
                </div>
                <div className="col-md-6">
                    <h5>{characterData.nickname}</h5>
                </div>

                <div className="col-md-6">
                    <h5>Actor : </h5>
                </div>
                <div className="col-md-6">
                    <h5>{characterData.portrayed}</h5>
                </div>

                <div className="col-md-6">
                    <h5>Seasons : </h5>
                </div>
                <div className="col-md-6">
                    {/* <h5>{characterData.appearance[0]}</h5> */}
                </div>

                <div className="col-md-6">
                    <h5>Quotes : </h5>
                </div>
                <div className="col-md-6">
                    {/* <h5>{this.props.quotes[0]}</h5> */}
                </div>

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
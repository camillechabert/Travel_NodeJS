import React from "react";
import "../../stylesheets/main.scss";
import "../../stylesheets/components/chat.scss";
import Message from "./Message";

class Chatroom extends React.Component {

    constructor(props){
        super(props)        
        
        let json = {
            name : "France",
            user : {
                id : 132224,
                username : "Greencame",
                name : "Julien",
                lastname : "Mustière",
                image : "https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f642.svg"
            }
        }
        json.chat = [
                {
                    message : "coucou c'est moi",
                    date : new Date(),
                    user : json.user
                },
                {
                    message : "bienvenue en France",
                    date : new Date(),
                    user : json.user
                },
                {
                    message : "ici c'est pas chère",
                    date : new Date(),
                    user : json.user
                }
        ]
        

        this.state = {
            name : json.name,
            user : json.user,
            chat : json.chat,

            //watcher
            textarea : ""
        }

        this.submitMessage = this.submitMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitMessage(e) {
        e.preventDefault();

        if( this.state.textarea !== "" ){            
            this.setState({
                chat: this.state.chat.concat([{
                    user: this.state.user,
                    date : new Date(),
                    message: this.state.textarea
                }]),             
                textarea : ""
            });            
        }
    }

    scrollToBot() { 
        ReactDOM.findDOMNode(this.refs["chat-box"]).scrollTop = ReactDOM.findDOMNode(this.refs["chat-box"]).scrollHeight;
    }

    handleChange(e) {
        this.setState({textarea: e.target.value});
    }
    
    render() {
        return (
            <div className="chat chat-right-aside">
                <div className="chat-main-header">
                    <div className="p-20 b-b">
                        <h3 className="box-title"> { this.state.name } </h3> 
                    </div>
                </div>
                <div className="chat-box" ref="chat-box">
                    <ul className="chat-list slimscroll p-t-30">
                    {
                        this.state.chat.map((c, i) =>
                            <Message message={c} key={"chat-"+i}/>
                        )
                    }                  
                    </ul>
                </div>          
                <div className="row send-chat-box">
                    <form onSubmit={ (e) => { this.submitMessage } }>
                        <div className="col-sm-12">
                            <textarea value={ this.state.textarea } onChange={ this.handleChange } className="form-control" />
                            <div className="custom-send"><a href="javacript:void(0)" className="cst-icon" data-toggle="tooltip" title="Insert Emojis"><i className="ti-face-smile"></i></a> <a href="javacript:void(0)" className="cst-icon" data-toggle="tooltip" title="File Attachment"><i className="fa fa-paperclip"></i></a>
                                <button className="btn btn-danger btn-rounded" type="submit">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Chatroom;
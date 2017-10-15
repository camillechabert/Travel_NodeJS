import React from "react";
import "../../stylesheets/main.scss";
import Message from "./Message";

class Chatroom extends React.Component {

    constructor(props){
        let json = {
            name : "France",
            user : {
                id : 132224,
                username : "Greencame",
                name : "Julien",
                lastname : "Mustière",
                image : "none"
            },
            chat : [
                {
                    message : "coucou c'est moi",
                    date : new Date(),
                    user : 1221354
                },
                {
                    message : "bienvenue en France",
                    date : new Date(),
                    user : 1221354
                },
                {
                    message : "ici c'est pas chère",
                    date : new Date(),
                    user : 132224
                }
            ]
        }
        super(props)        

        this.state = {
            name : json.name,
            user : json.user,
            chat : json.chat
        }

        this.submitMessage = this.submitMessage.bind(this);
    }

    submitMessage(e) {
        e.preventDefault();

        if( e.which == 13 ){            
            this.setState({
                chat: this.state.chat.concat([{
                    user: this.state.user.id,
                    date : new Date(),
                    message: ReactDOM.findDOMNode(this.refs.msg).value
                }])
            }, () => {
                ReactDOM.findDOMNode(this.refs.msg).value = "";
            });
        }

    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs["chat-box"]).scrollTop = ReactDOM.findDOMNode(this.refs["chat-box"]).scrollHeight;
    }
    
    render() {
        return (
            <div className="chat-right-aside">
                <div className="chat-main-header">
                    <div className="p-20 b-b">
                        <h3 className="box-title"> { this.state.name } </h3> 
                    </div>
                </div>
                <div className="chat-box" ref="chat-box">
                    <ul className="chat-list slimscroll p-t-30">
                    {
                        this.state.chat.map((c) =>
                            <Message message={c} />
                        )
                    }                  
                    </ul>
                </div>          
                <div className="row send-chat-box">
                    <div className="col-sm-12">
                        <textarea className="form-control" placeholder="Type your message" onKeyUp={(e) => this.submitMessage(e)}></textarea>
                        <div className="custom-send"><a href="javacript:void(0)" className="cst-icon" data-toggle="tooltip" title="Insert Emojis"><i className="ti-face-smile"></i></a> <a href="javacript:void(0)" className="cst-icon" data-toggle="tooltip" title="File Attachment"><i className="fa fa-paperclip"></i></a>
                            <button className="btn btn-danger btn-rounded" type="button" onSubmit={(e) => this.submitMessage(e)}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chatroom;
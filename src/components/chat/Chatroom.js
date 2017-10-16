import React from "react";
import "../../stylesheets/main.scss";
import "../../stylesheets/components/chat.scss";
import Message from "./Message";

class Chatroom extends React.Component {

    constructor(props){
        super(props)   
        const date = new Date();    
        
        /**
         * this.state = {
         *     name : this.props.name,
         *     user : this.props.user,
         * 
         *     textarea : ""
         * }
         */
        
        //test
        let json = {
            "name" : "France",
            "user" : {
                "id" : 132224,
                "username" : "Greencame",
                "name" : "Julien",
                "lastname" : "Mustière",
                "image" : "https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f642.svg"
            }
        }
        json["chat"] = [
                {
                    "message" : "coucou c'est moi",
                    "date" : date.toDateString(),
                    "user" : json.user
                },
                {
                    "message" : "bienvenue en France",
                    "date" : date.toDateString(),
                    "user" : json.user
                },
                {
                    "message" : "ici c'est pas chère",
                    "date" : date.toDateString(),
                    "user" : json.user
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

        this.ws = new WebSocket('ws://localhost:3080');
        this.ws.onmessage = function (e) { 
            this.setState({
                chat: this.state.chat.concat([JSON.parse(e.data)]),             
                textarea : ""
            });
        }.bind(this);
    }

    submitMessage(e) {
        e.preventDefault();

        if( this.state.textarea !== "" ){ 
            const date = new Date();
            const message =  {
                "user": this.state.user,
                "date" : date.toDateString(),
                "message": this.state.textarea
            }

            this.setState({
                chat: this.state.chat.concat([message]),             
                textarea : ""
            });
            
            this.ws.send( JSON.stringify(message) )         
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
            <div className="row">
                <div className="white-box">
                    <h3 className="box-title">{ this.state.name } </h3>
            
                    <div className="chat-box" ref="chat-box">
                        <ul className="chat-list slimscroll p-t-30">
                        {
                            this.state.chat.map((c, i) =>
                                <li className={ c.user.id === this.state.user.id ? 'odd' : '' }>  
                                    <Message message={c} key={"chat-"+i}/>
                                </li>
                            )
                        }                  
                        </ul>
                    </div>

                    <form onSubmit={ this.submitMessage }>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="input-group">
                                    <input type="text" value={ this.state.textarea } onChange={ this.handleChange } className="form-control" placeholder="Say something"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-success" type="submit">Send</button>
                                    </span> 
                                </div>
                            </div>
                        </div>         
                    </form>
                </div>
            </div>
        );
    }
}

export default Chatroom;
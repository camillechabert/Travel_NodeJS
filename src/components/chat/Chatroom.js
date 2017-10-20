import React, {Component} from "react";
import "../../stylesheets/main.scss";
import "../../stylesheets/components/chat.scss";
import Message from "./Message";
import io from 'socket.io-client';

class Chatroom extends Component {

    constructor(props) {
        super(props)
        const date = new Date();

        // Dummy items
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

        this.socket = io.connect('http://localhost:3080');
        this.socket.on('message', (data) => {
            const incomeData = JSON.parse(data);
            const userMessages = this.state.chat.slice();

            userMessages.push(incomeData);

            this.setState({
                chat: userMessages,
                textarea: ''
            })
        });

        this.submitMessage = this.submitMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitMessage(e) {
        e.preventDefault();

        let emiter;

        if ( this.state.textarea !== '' ) {
            const date = new Date();
            const message =  {
                "user": this.state.user,
                "date" : date.toDateString(),
                "message": this.state.textarea
            }

            try {
                emiter = this.socket.send( JSON.stringify(message) )
            } catch (e) {
                console.error(e);
                // Change behavior there, must apply render() / then try to emit 'message'
            } finally {
                // Depending of the situation, free-up UI.
            }
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
                    <div className="ui grid" data-html="<div className='header'>1056 Users connected</div>">
                      <div className="four column row">
                        <div className="right floated column ui piled segment">

                            <div className="sixteen wide column">
                                    <h3 className="ui header">{ this.state.name } </h3>
                                      <div className="">
                                        {
                                            this.state.chat.map((c, i) =>
                                            <div key={ c.user.id + i } className={ c.user.id === this.state.user.id ? 'ui feed ui vertical segment' : '' }>
                                            <Message message={c} key={"chat-"+i}/>
                                            </div>
                                            )
                                        }
                                      </div>
                            </div>

                            <div className="sixteen wide column">
                              <form className="ui message" onSubmit={ this.submitMessage }>
                                        <div className="ui icon input">
                                          <input type="texte" value={ this.state.textarea } onChange={ this.handleChange } placeholder="Message"/>
                                            <i className=" circular Comments icon"></i>
                                    </div>
                              </form>
                            </div>

                        </div>
                      </div>
                    </div>

        );
    }
}

export default Chatroom;

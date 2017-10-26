import React, {Component} from "react";
import "../../stylesheets/main.scss";
import "../../stylesheets/components/chat.scss";
import Message from "./Message";
import io from 'socket.io-client';
import Chat from "../../helpers/chat";
import { Dropdown, Label } from 'semantic-ui-react';

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
        // json["chat"] = [
        //     {
        //         "message" : "coucou c'est moi",
        //         "date" : date.toDateString(),
        //         "user" : json.user
        //     },
        //     {
        //         "message" : "bienvenue en France",
        //         "date" : date.toDateString(),
        //         "user" : json.user
        //     },
        //     {
        //         "message" : "ici c'est pas chère",
        //         "date" : date.toDateString(),
        //         "user" : json.user
        //     }
        // ]

        this.state = {
            user : json.user,
            textarea : ""
        }

        this.submitMessage = this.submitMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeChat = this.handleChangeChat.bind(this);
    }

    componentWillMount(){
        this.chat = new Chat(this, io.connect('http://localhost:3080'));
        
        this.chat.onMessage(() => {
            this.setState({
                textarea: ''
            })
        })

        this.chat.join('default', this.state.user);      
        this.chat.on('notifications', () => {}, true);
        this.chat.on('newUser', () => {}, true);
    }

    submitMessage(e) {
        e.preventDefault();

        let emiter;

        if ( this.state.textarea !== '' ) {
            const date = new Date();
            const data =  {
                "user": this.state.user,
                "date" : date.toDateString(),
                "message": this.state.textarea
            }

            try {
                emiter = this.chat.sendMessage( JSON.stringify(data) );        
            } catch (e) {
                console.error(e);
                // Change behavior there, must apply render() / then try to emit 'message'
            } finally {
                // Depending of the situation, free-up UI.
            }
        }
    }

    handleChangeChat(e, o) {
        this.chat.join(o.value, this.state.user);
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
                                    <h3 className="ui header">
                                        <Dropdown selection search onChange={ this.handleChangeChat } options={ this.state.rooms } value={ this.state.room } />
                                    </h3>
                                    <div className="">
                                    {
                                        this.state.history ?
                                            this.state.history.map((h, i) =>
                                                (h.type === "message") ?
                                                    <div key={ h.data.user.id + i } className={ h.data.user.id === this.state.user.id ? 'ui feed ui vertical segment' : '' }>
                                                        <Message message={h.data} key={"chat-"+i}/>
                                                    </div>
                                                :  ((h.type === "notifications") ?
                                                    <div key={ i }>
                                                        <Label as='a' >
                                                            {h.data.message}
                                                        </Label>
                                                    </div>
                                                :
                                                    <div key={ i }>
                                                        <Label as='a' image>
                                                            <img src={h.data.user.image} />
                                                            {h.data.user.username} joined
                                                        </Label>
                                                    </div>)
                                            )
                                        : ''
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

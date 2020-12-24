import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Chat = (props) => {

    const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState()

    const getCurrentChat = async () => {
        const response = await axios.get(`/api/chat/${localStorage.getItem('currentMessageUser')}`)
        console.log(response.data)
        if (response) {
            setMessages(response.data.messages)
        }
    }

    useEffect(() => {
        getCurrentChat()
        console.log(props.pusher)
        const message_channel = props.pusher.subscribe('message');
        message_channel.bind(`${localStorage.getItem('currentMessageUser')}`, function (data) {
            setMessages(oldmsg => [...oldmsg, data])
        })

        return () => {
            props.pusher.unsubscribe('message')
        }

    }, [])

    const onChange = e => {
        e.preventDefault()
        setMsg(e.target.value)
    }

    const sendMessageHandler = async () => {
        const data = JSON.stringify({
            chatId: localStorage.getItem('currentMessageUser'),
            msg,
            sender: localStorage.getItem('userId')
        })

        var config = {
            method: 'post',
            url: '/api/chat/newMessage',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios(config);
        console.log(response.data)
    }

    return (
        < div className="container" >
            {
                messages.length !== 0 && messages.map(message =>
                (
                    <div key={message._id}>
                        {message.message}-{message.sender}
                    </div>
                )
                )

            }
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6 ">
                            <input id="message" type="text" value={msg} onChange={onChange} class="validate blue-text" />
                            <label for="message" className="blue-text">Type a message</label>
                        </div>
                        <div class="input-field col s1">
                            <a className="btn blue white-text" onClick={sendMessageHandler}><i class="material-icons">send</i></a>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Chat

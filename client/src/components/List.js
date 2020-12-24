import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const List = () => {

    const [usersList, setUsersList] = useState([]);

    const getTheList = async () => {
        const userId = localStorage.getItem('userId');

        const data = JSON.stringify({ "user": userId });

        const config = {
            method: 'post',
            url: '/api/chat/getAllChats',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await axios(config);
        console.log(response.data)
        if (response) {
            setUsersList(response.data)
        }
    }

    useEffect(() => {
        getTheList()
    }, [])
    let history = useHistory()

    const onSelectHandler = (currentChatId) => {
        localStorage.setItem('currentMessageUser', currentChatId)
        history.push('/chat')
    }

    return (
        <div className="container row">
            <div className="col s12">
                {
                    usersList.length === 0 ?
                        <div className="container">
                            <div class="progress">
                                <div class="indeterminate blue"></div>
                            </div>
                        </div> :
                        <div class="collection">

                            {usersList.map(element =>
                                <div key={element._id}>
                                    <b><a className="collection-item blue-text" onClick={e => {
                                        e.preventDefault();
                                        onSelectHandler(element._id)
                                    }}>{element.user.name}</a></b>
                                </div>
                            )}
                        </div>

                }
            </div>
        </div>
    )
}

export default List

import * as React from 'react';
import {CustomTextField} from "../Components/CustomTextField";
import ColorButton from "../Components/ButtonDef";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../Contexts/UserContext";
import {CurrentPageContext} from "../Contexts/CurrentPageContext";

export default function LoginRegistration(props){
    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [user, setUser] = useContext(UserContext);
    let [currentPage, setCurrentPage] = useContext(CurrentPageContext);


    function postExistingTasks(userid){
        if(props.taskList.length === 0){
            setUser(userid)
            setCurrentPage('Home')
        }else{
            for(var i = 0; i < props.taskList.length; i++){
                (function(e){
                    axios.post(props.url + "/api/save_task?userid=" + userid, props.taskList[i]).then((response) => {
                        if(e === props.taskList.length - 1){
                            setUser(userid)
                            setCurrentPage('Home')
                        }
                    }).catch((error) => {
                        alert(error.response)
                        console.log(error.response)
                    })
                })(i)
            }
        }
    }

    return(
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20vh'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '5vw',
                marginTop: '5vh'
            }}>
                <h2 style={{marginTop: '1vh'}}>Username: </h2>
                <CustomTextField
                    id={'username-input'}
                    label={'Enter your username'}
                    multiline
                    rows={1}
                    maxRows={1}
                    sx={{width: '40vw'}}
                    focused
                    onChange={(e) => {setUsername(e.target.value)}}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '5vw',
                marginTop: '10vh'
            }}>
                <h2 style={{marginTop: '1vh'}}>Password: </h2>
                <CustomTextField
                    id={'outliend-password-input'}
                    label={'Enter your password'}
                    type="password"
                    rows={1}
                    maxRows={1}
                    sx={{width: '40vw'}}
                    focused
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '10vw',
                marginTop: '20vh'
            }}>
                <ColorButton onClick={() => {
                    if(username == null || password == null){
                        alert("Username or password cannot be null")
                    }else{
                        axios.post("http://194.193.55.245:9000/auth/login", `username=${username}&password=${password}`,
                            {headers:{
                                "Content-Type": "application/x-www-form-urlencoded"
                                }}).then((response) => {
                            if(response.data.status === 'success'){
                                postExistingTasks(response.data.user_id)
                            }else{
                                alert(response.data.reason)
                            }
                        }).catch((error) => {
                            alert(error.response)
                        })
                    }
                }}>Login</ColorButton>
                <ColorButton onClick={() => {
                    if(username == null || password == null){
                        alert("Username or password cannot be null")
                    }else{
                        axios.post("http://194.193.55.245:9000/auth/register", `username=${username}&password=${password}`,
                            {headers:{
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }}).then((response) => {
                            if(response.data.status === 'success'){
                                postExistingTasks(response.data.user_id)
                            }else{
                                alert(response.data.reason)
                            }
                        }).catch((error) => {
                            alert(error.response)
                        })
                    }
                }}>Register</ColorButton>
            </div>
        </div>
    )
}

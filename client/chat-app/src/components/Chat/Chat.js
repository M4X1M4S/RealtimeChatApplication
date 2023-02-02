import React ,{useState,useEffect}from "react";
import queryString from 'query-string';
import io from 'socket.io-client'
import { useLocation } from "react-router";


let socket

const Chat =()=>{
    const [name , setName]=useState('')
    const [room , setRoom]=useState('')
    const ENDPOINT ='localhost:5000'
    const location =useLocation()
    useEffect(()=>{

    const {name,room}=queryString.parse(location.search)
      
    
    socket=io(ENDPOINT ,{
        transports: ['websocket', 'polling', 'flashsocket'],
    })

    setName(name)
    setRoom(room)
    socket.emit('join',{name,room}, ()=>{})
    return()=>{
        socket.emit('disconnected')
        socket.off()
    }
    } , [location.search, ENDPOINT])
     
    return(
        <h1>Chat</h1>
    )
    }

export default Chat;
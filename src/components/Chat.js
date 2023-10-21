import { useState,useEffect } from "react";
import {addDoc, collection,serverTimestamp,onSnapshot,query,where,orderBy} from 'firebase/firestore'
import { db,auth} from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewNessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room),
            orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            console.log(messages);
            setMessages(messages);
        });
        return () => unsuscribe();
    }, []);
    
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewNessage("");
    };
    return (
        <div className="talkhub">
            <div className="header">
                <h1>welcome to:{room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((message) =>
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}:</span>{message.text}
                    </div>
                )}
            </div>
            <form onSubmit={handlesubmit} className="new-message-form">
                <input
                    type="text"
                    value={newMessage}
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewNessage(e.target.value)}
                    
                />
                <button type="submit" className="send-button" >send</button>
            </form>
        </div>
    );
};

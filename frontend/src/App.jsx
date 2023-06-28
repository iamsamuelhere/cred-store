import {useState} from 'react'
import axios from "axios";

const App = () => {
    const [secret, setSecret] = useState("");

    const [id, setId] = useState("");
    const [key, setKey] = useState("");

    const [response, setResponse] = useState(undefined);
    const [decryRes, setDecryRes] = useState(undefined);
    return (
        <div style={{ display: "flex", justifyContent: "center" }} >
            <div>
                <h1 style={{textAlign:"center", color:"white"}}>Cred Store🙈</h1>
                <div style={{ backgroundColor:"white", border: "1px solid black", padding: "10px", width: "50vw",margin:"10px" }}>
                    <h2 style={{textAlign:"center"}}>Encryption</h2>
                    <textarea 
                    onChange={(e)=>{
                       setSecret(e.target.value)
                    }}
                    style={{ width: "100%", height: "100%", fontSize: "20px" }} placeholder="Add your secret" />
                    <button style={{width:"100%", padding:"5px", backgroundColor:"#27AE60", color:"white", fontSize:"18px"}} onClick={async()=>{
                       const response = await axios.post("https://salmon-plumber-dqnwb.ineuron.app:3000/add-secret",{
                        "secret":secret
                       })
                       console.log("response", response);
                       setResponse(response)
                    }}>Encrypt</button>
                    
                    <h3 style={{fontSize: "20px"}}>
                       {JSON.stringify(response?.data)} 
                    </h3>
                </div>

                <div style={{ backgroundColor:"white", border: "1px solid black", padding: "10px", width: "50vw", margin:"10px"}}>
                    <h2 style={{textAlign:"center"}}>Decryption</h2>
                    <textarea 
                    onChange={(e)=>{
                        setId(e.target.value)
                    }}
                    style={{ width: "100%", height: "100%", fontSize: "20px" }} placeholder='Enter Id'/><br/>
                    <textarea
                    onChange={(e)=>{
                        setKey(e.target.value)
                    }}
                    style={{ width: "100%", height: "100%", fontSize: "20px" }} placeholder='Enter Key'/><br/>
                    <button
                    style={{width:"100%", padding:"5px", backgroundColor:"#27AE60", color:"white", fontSize:"18px"}}
                    onClick={async()=>{
                        console.log("*************************",id, key);
                        const response = await axios.get(`https://salmon-plumber-dqnwb.ineuron.app:3000/get-secret?id=${id}&key=${key}`)
                        console.log("Response", response);
                        setDecryRes(response?.data)

                    }}>Decrypt</button><br/>
                    <h3 style={{fontSize: "20px"}}>
                    {decryRes?.secret}
                    </h3>

                </div>
            </div>
        </div>
    )
}

export default App;
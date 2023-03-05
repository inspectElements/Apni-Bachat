import React, { useEffect } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
  ThemeProvider,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import Bharti from "../../assets/bharti.png";
import ChatBot from "react-simple-chatbot";
// import apiPost from "../utilities/apiCall";

const UserMessage = (props) => {
  return (
    <>
      <div className="h-auto my-2 mr-2 flex justify-end items-end">
        <div className="h-auto w-[65%] my-2 rounded-lg py-2 px-4 bg-slate-200">
          {props.msg}
        </div>
      </div>
    </>
  );
};
const BotMessage = (props) => {
  return (
    <>
      <div className="h-auto my-2 flex justify-start items-end">
        <div className="h-7 w-7 my-2 mx-2">
          <img src={Bharti}></img>
        </div>
        <div className="h-auto w-[69%] my-2 rounded-lg py-2 px-4 bg-[#ebd0ff] mr-2">
          {props.msg}
        </div>
      </div>
    </>
  );
};

const steps = [
  {
    id: "0",
    message: "Welcome to Your personal Assitant",
    trigger: "1",
  },
  {
    id: "1",
    message: "What would you like  help with?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "Accessing account details", trigger: "3" },
      { value: 2, label: "Apply for loans", trigger: "4" },
      { value: 3, label: "See my loans", trigger: "5" },
      { value: 3, label: "Exit", trigger: "8" },
    ],
  },
  {
    id: "3",
    message: "Click on My Account option on the left to access the Page",
    trigger: "6",
  },
  {
    id: "4",
    message: "Click on Apply loan option on the left to access the Page",
    trigger: "6",
  },
  {
    id: "5",
    message: "Click on my loans option on the left to access the Page",
    trigger: "6",
  },
  {
    id: "6",
    message: "Do you want any more help?",
    trigger: "7",
  },
  {
    id: "7",
    options: [
      { value: 1, label: "Yes", trigger: 1 },
      { value: 2, label: "No", trigger: 8 },
    ],
  },
  {
    id: "8",
    message: "Adios Amigo",
    trigger: "9",
  },
  {
    id: "9",
    message: "hello",
    end: true,
  },
];

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="chatbot-container__p">
      <ThemeProvider
        theme={{
          background: "white",
          botBubbleColor: "#0000ff",
          userBubbleColor: "#40a0fc",
          botFontColor: "#fff",
          userFontColor: "#fff",
        }}
      >
        <ChatBot
          opened={true}
          handleEnd={() => navigate("/dashboard")}
          steps={steps}
        />
      </ThemeProvider>
    </div>
  );

  // const [msg, setMsg] = React.useState("");
  // const [data, setData] = React.useState("");
  // const [messages, setMessages] = React.useState([]);
  // function submit(e) {
  //   // apiPost("chat/chatbot", { msg: msg }, setData);
  //   fetch("https://sanjeevni-production.up.railway.app/api/chat/chatbot", {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ msg: msg }),
  //   }).then((res)=>{
  //     console.log(res.data)
  //   })
  //   setMessages((oldArray) => [...oldArray, { msg: msg, type: "user" }]);
  //   setMsg("");
  // }
  // useEffect(() => {
  //   if (data) {
  //     if(data.out){
  //       setMessages((oldArray) => [...oldArray, { msg: data.out, type: "bot" }]);
  //     }
  //   }
  // }, [data]);
  // return (
  //   <>
  //     <div>
  //       <svg
  //         style={{
  //           marginTop: "1.25rem",
  //           marginRight: 20,
  //         }}
  //         className="w-7 absolute inset-0 mt-5 ml-5"
  //         fill="#000"
  //         xmlns="http://www.w3.org/2000/svg"
  //         viewBox="0 0 448 512"
  //         onClick={() => window.history.back()}
  //       >
  //         <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  //       </svg>
  //       <div className="w-[90vw] h-[75vh] mt-[15vh] ml-auto mr-auto shadow-2xl bg-white rounded-3xl overflow-hidden flex flex-col justify-between border-2 border-[#6b23a1]">
  //         <div className="h-[20vh] bg-[#6b23a1]">
  //           <Typography
  //             variant="h4"
  //             component="h2"
  //             color="primary.contrastText"
  //             sx={{
  //               fontSize: "2rem",
  //               fontWeight: "900",
  //               color: "#fff",
  //               textAlign: "center",
  //               pt: 2.5,
  //               mb: 1,
  //               fontFamily: "Poppins, sans-serif",
  //             }}
  //           >
  //             Namaste
  //           </Typography>
  //           <p
  //             style={{
  //               fontSize: "0.9rem",
  //               color: "#c5c5c5",
  //               textAlign: "center",
  //             }}
  //           >
  //             Ask Bharti your Doubts
  //           </p>
  //         </div>
  //         <div className="flex flex-col justify-start h-full overflow-auto">
  //           <BotMessage msg="I am Bharti, your Personal Chat Assistant" />
  //           {messages.map((message, index) => {
  //             if (message.type === "user") {
  //               return <UserMessage msg={message.msg} key={index} />;
  //             } else {
  //               return <BotMessage msg={message.msg} key={index} />;
  //             }
  //           })}
  //           <div
  //             ref={(el) => {
  //               el && el.scrollIntoView({ behavior: "smooth" });
  //             }}
  //           ></div>
  //         </div>
  //         <div className="flex justify-center border-t-2 border-[#6b23a1] bg-[#6b23a1]">
  //           <TextField
  //             label="Ask doubt"
  //             variant="outlined"
  //             fullWidth
  //             value={msg}
  //             onChange={(e) => {
  //               setMsg(e.target.value);
  //             }}
  //             sx={{
  //               mt: 2,
  //               mb: 2,
  //               width: "90%",
  //               "& fieldset": {
  //                 borderColor: "#cfcfcf !important",
  //                 borderWidth: 2,
  //                 borderRadius: "15px !important",
  //               },
  //               "&.Mui-focused .MuiInputLabel-root": {
  //                 fontSize: 18,
  //                 color: "#cfcfcf !important",
  //               },
  //               "& .MuiInputLabel-root": {
  //                 fontSize: 18,
  //                 color: "#cfcfcf !important",
  //               },
  //               "& .MuiInputBase-input": {
  //                 fontSize: 18,
  //                 color: "#cfcfcf !important",
  //               },
  //             }}
  //             InputProps={{
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton
  //                     type="submit"
  //                     aria-label="send"
  //                     onClick={(e) => submit(e)}
  //                   >
  //                     <SendIcon
  //                       style={{
  //                         color: "#cfcfcf",
  //                       }}
  //                     />
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Chat;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogoutbutstate,setLoginbutstate, jwtToken, setCartItems, totalprice} from "./Reduxslice";

function Loginpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginpagestate, setLoginpagestate] = useState("Loginpageactive");
  const [registerpagestate, setRegisterpagestate] = useState("Regpageinactive");

  const [regstatusmsg, setRegstatusmsg] = useState('');
  const [logstatusmsg, setLogstatusmsg] = useState('');

  const [loginformdetails, setLoginformdetails] = useState({
    email: "",
    password: "",
  });

  const [registerformdetails, setRegisterformdetails] = useState({
    email: "",
    name: "",
    password: "",
  });
  const Registerhandler = async () => {
    // e.preventDefault();
   setRegstatusmsg('Loading...')
    const regbody = {
      Email: registerformdetails.email,
      Password: registerformdetails.password,
      Name: registerformdetails.name,
    };
    

    const response = await fetch("http://127.0.0.1:5000/api/users/reg/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regbody),
    });

    const data = await response.json();

    if (response.status == 200) {
      // dispatch(setLogoutbutstate({ message: "Logoutactive" }))
      // dispatch(setLoginbutstate({ message: "Logininactive" }))
      // navigate('/');
      
      
      setRegisterformdetails({
        email: "",
        password: "",
        name: "",
      });
      setRegisterpagestate('Regpageinactive');
      setLoginpagestate('Loginpageactive');
         
    }
    else {
      setRegstatusmsg(data.message)
    }
  };
  const Loginhandler = async () => {
    // e.preventDefault();
    setLogstatusmsg('Loading...')
    const loginbody = {
      Email: loginformdetails.email,
      Password: loginformdetails.password,
    
    };

    const response = await fetch("http://127.0.0.1:5000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginbody),
    });

    const data =await response.json();

    if (response.status == 200) {
      dispatch(setLogoutbutstate({ message: "Logoutactive" }))
      dispatch(setLoginbutstate({ message: "Logininactive" }))
      navigate('/');
      setLoginformdetails({
        email: "",
        password: "",
      
      })
      dispatch(jwtToken({ token: data.token }))
      dispatch(setCartItems({ Items: data.cartItems }))
      dispatch(totalprice());
  
    }
      else if (response.status == 404)
      {
        setLogstatusmsg(data.message)
      }
      

      
  };

  return (
    <div id="loginpage" class={loginpagestate}>
      <div id="logincontainer">
        <div id="loginpagenav">
          <div
            style={{ color: "rgb(244, 192, 3)", fontWeight: "bold", flex: "6" }}
          >
            ShoppiFy
          </div>
          <div
            id="loghomepagebut"
            style={{ color: "white", flex: "1", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div id="loginbox">
            <div
              style={{
                marginLeft: "140px",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              LOGIN
            </div>
            <div>
              <div class="label">
                <label>Username </label>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter The Email.."
                  value={loginformdetails.email}
                  onChange={(e) => {
                    setLoginformdetails({
                      ...loginformdetails,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <div class="label">
                <label>Password </label>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter the password ..."
                  value={loginformdetails.password}
                  onChange={(e) => {
                    setLoginformdetails({
                      ...loginformdetails,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <div id="containerloginbut" onClick={() => {
                if (loginformdetails.email !== "" && loginformdetails.password !== "")
                {
                  setLogstatusmsg('');
                  Loginhandler();
                 
                  

                }
                else {
                  setLogstatusmsg('Please Fill All the Fields')
                }
              }}>Login</div>
            </div>
            <div style={{textAlign:"center",color:"red"}}>{logstatusmsg }</div>
            
            <div id="Registerpageswitch">
              Create new Account ?{" "}
              <span
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setRegisterpagestate("Regpageactive");
                  setLoginformdetails({
                    email: "",
                    password:""
                  })
                  setLoginpagestate("Loginpageinactive");
                }}
              >
                Register
              </span>
            </div>
          </div>
          <div class={registerpagestate}>
            <div id="Registerbox">
              <div
                style={{
                  marginLeft: "120px",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                REGISTER
              </div>
              <div>
                <div class="label">
                  <label>Username </label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter The Email.."
                    value={registerformdetails.email}
                    onChange={(e) => {
                      setRegisterformdetails({
                        ...registerformdetails,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <div class="label">
                  <label>Name </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter The Name.."
                    value={registerformdetails.name}
                    onChange={(e) => {
                      setRegisterformdetails({
                        ...registerformdetails,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <div class="label">
                  <label>Password </label>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter the password ..."
                    value={registerformdetails.password}
                    onChange={(e) => {
                      setRegisterformdetails({
                        ...registerformdetails,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  id="containerRegisterbut"
                  onClick={() => {
                    if (
                      registerformdetails.email !== "" &&
                      registerformdetails.password !== "" &&
                      registerformdetails.name !== ""
                    ) {
                      setRegstatusmsg('');
                      Registerhandler();
                    }
                    else {
                      setRegstatusmsg('Please Fill All The Fields')
                    }
                  }}
                >
                  Register
                </div>
              </div>
              <div style={{textAlign:"center",color:"red"}}>{ regstatusmsg}</div>
              <div id="Loginpageswitch">
                Already have a account ?{" "}
                <span
                  onClick={() => {
                    setLoginpagestate("Loginpageactive");
                    setRegisterformdetails({
                      email: "",
                      name:"",
                      password: "",
                      
                    })
                    setRegisterpagestate("Regpageinactive");
                  }}
                  style={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                    paddingLeft: "5px",
                    cursor: "pointer",
                  }}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;

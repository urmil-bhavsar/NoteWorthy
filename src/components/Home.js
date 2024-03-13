import React, { useContext } from "react";
import { Notes } from "./Notes";
import { useEffect, useState } from "react"
import AlertContext from "../context/alertContext/AlertContext";

export const Home = ({ showAlert }) => {

  const context2 = useContext(AlertContext)
  // const { showAlert } = context2



  const [credentials, setCredentials] = useState({
    email: "", password: ""
  })

  const [name, setName] = useState("")



  useEffect(() => {

    const fetchUser = async () => {


      const response = await fetch("http://localhost:5000/api/auth/getUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
      const json = await response.json()
      console.log("home user", json.name);
      setName(json.name)
    }
    fetchUser()

  }, [])

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="container my-5">
      <h1 >Welcome {capitalize(name)}!</h1>

      <Notes showAlert={showAlert} />
    </div>
  );
};

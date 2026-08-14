import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData]=useState({
    email:"",
     password:"",
      confirmPassword:""
  })

  const [error,setError]=useState("");
  const [loading, setLoading]=useState(false)

  function handleChange(event){
    const {name, value}= event.target;

    setFormData((previous)=>({
      ...previous,
      [name]:value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")

    if(!formData.email || !formData.password || !formData.confirmPassword){
      setError("Incorrect, please fill all fields.")
      return;
    }
    if(formData.password.length<6){
      setError("Password must be atleast 4 characters")
      return
    }
     if(formData.password!== formData.confirmPassword){
      setError("Passwords do not match")
      return
    }

    try{
      setLoading(true)

      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      navigate
    }
  }


  return <h1>Recipes</h1>;
}

export default Register;

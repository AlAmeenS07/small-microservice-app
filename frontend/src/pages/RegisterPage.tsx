import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import AuthCard from "../components/AuthCard"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import userRegister from "../services/user.register"

function Register() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    console.log({
      name,
      email,
      password
    })

    let res = await userRegister(name , email , password , dispatch)

    if(res == true){
        navigate("/login")
    }

  }

  return (
    <AuthCard title="Register">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button>Register</Button>
        <p className="text-center">Already have an account? <Link className="hover:underline text-blue-500" to="/login">Login</Link></p>
      </form>
    </AuthCard>
  )
}

export default Register
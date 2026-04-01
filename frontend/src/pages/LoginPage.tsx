import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import AuthCard from "../components/AuthCard"
import { Link, useNavigate } from "react-router-dom"
import userLogin from "../services/user.login"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"

function Login() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state : RootState)=> state.user)


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    let res = await userLogin(email , password , dispatch)

    if(res == true){
        navigate("/")
    }
  }

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Button>Login</Button>
        <p className="text-center">Didn't have an account? <Link className="hover:underline text-blue-500" to="/register">Register</Link></p>
      </form>
    </AuthCard>
  )
}

export default Login
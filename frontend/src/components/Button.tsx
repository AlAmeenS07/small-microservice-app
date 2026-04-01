
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

const Button = ({ children, onClick, type = "submit" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-teal-500 px-6 text-white py-3 rounded-lg hover:bg-teal-600 transition"
    >
      {children}
    </button>
  )
}

export default Button



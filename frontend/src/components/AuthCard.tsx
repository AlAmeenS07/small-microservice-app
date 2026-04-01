
type AuthCardProps = {
  title: string
  children: React.ReactNode
}

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default AuthCard
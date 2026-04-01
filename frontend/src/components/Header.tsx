import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../store/store"
import userLogout from "../services/user.logout"
import Swal from "sweetalert2"

function Header() {


    const dispatch = useDispatch()
    const user = useSelector((store: RootState) => store.user?.user)

    return (
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-bold text-teal-700">
                <Link to="/">Microservice App</Link>
            </h1>

            <div className="flex items-center gap-8">
                {
                    user &&
                    <Link to="/orders" className="text-gray-600 text-bold text-lg hover:text-teal-600">
                        MyOrders
                    </Link>
                }

                <nav className="space-x-4">
                    {user ?
                        <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            onClick={async () => {

                                const result = await Swal.fire({
                                    title: "Are you sure?",
                                    text: "You will be logged out!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes, Logout",
                                    cancelButtonText: "Cancel",
                                })

                                if (result.isConfirmed) {
                                    await userLogout(dispatch)
                                }
                            }}
                        >
                            Logout
                        </button>
                        :
                        <Link to="/login" className="text-lg text-gray-600 hover:text-blue-500">
                            Login
                        </Link>
                    }
                </nav>
            </div>

        </header>
    )
}

export default Header
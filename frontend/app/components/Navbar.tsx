'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface status {
  status : string,
  user : string
}

const Navbar: React.FC<status> = (props) =>{
  const router = useRouter()
  const handlelogout =()=>{
    localStorage.clear()
    router.push('/Login')
  }
  let log = false
  if(props.status === 'godbro' || props.status === 'noob'){
    log = true
  }
  return (
    <div className="bg-yellow-200 flex justify-between items-center h-12">
      <div className="flex items-center ml-4">
        <h1 className="text-xl font-bold">Quizzo</h1>
      </div>
      <div className="flex items-center mr-4">
        <Link href="/">Home</Link>
        <Link href="/About" className="ml-4">
          About
        </Link>
        <Link href="/yourquiz" className="ml-4">
          Your quizzes
        </Link>
        {loggedIn && (
          <Link href="/addquiz" className="ml-4">
            Add Quiz
          </Link>
        )}
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
        {!loggedIn && (
          <Link href="/Login" className="ml-4" id="log">
            Login
          </Link>
        )}
        {loggedIn && (
          <span className="ml-4">Welcome {props.user}</span>
        )}
      </div>
    </div>
  )
}

export default Navbar

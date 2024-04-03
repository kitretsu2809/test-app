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
    <div className="bg-yellow-200 flex justify-between items-center h-12 p-4">
  <div className="flex items-center">
    <div className="ml-4 mr-4">
      <h1 className="text-xl font-bold">Quizzo</h1>
    </div>
    <div className="flex space-x-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/About" className="hover:underline">
        About
      </Link>
      <Link href="/yourquiz" className="hover:underline">
        Your quizzes
      </Link>
      <Link href="/addquiz" className="hover:underline">
        Add quizzes
      </Link>
      {props.status === "godbro" && (
        <Link href="/addquiz" className="hover:underline">
          Add Quiz
        </Link>
      )}
    </div>
  </div>
  <div className="flex space-x-4">
    {log ? (
      <button
        onClick={handlelogout}
        className="bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        Logout
      </button>
    ) : null}
    <Link href="/Login" className="hover:underline" id="log">
      {log ? `Welcome ${props.user}` : "Login"}
    </Link>
  </div>
</div>

  )
}

export default Navbar

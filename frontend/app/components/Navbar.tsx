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
    <div style={{backgroundColor:'yellow',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:'3rem'}}>
        <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{marginLeft:'1rem',marginRight:'1rem'}}>
              <h1>Quizzo</h1>
            </div>
            <div>
                <Link href={'/'} style={{marginLeft:'1rem'}}>Home</Link>
              <Link href={'/About'} style={{marginLeft:'1rem'}}>About</Link>
              <Link href={'/yourquiz'} style={{marginLeft:'1rem'}}>Your quizzes</Link>
              {props.status === 'godbro' && <Link href={'/addquiz'} style={{marginLeft:'1rem'}}>Add Quiz</Link>}
            </div>
        </div>
            <div>
              {log ? (<button onClick={handlelogout} style={{marginRight:'1rem'}}>Logout</button>) : null}
              <Link href='/Login' style={{marginRight:'1rem'}} id='log'>{log ? `Welcome ${props.user}` :  'Login'}</Link>
            </div>
        </div>
  )
}

export default Navbar

import React from 'react'
import Link from 'next/link'

interface status {
  status : string
}

const Navbar: React.FC<status> = (props) =>{
  return (
    <header style={{backgroundColor:'yellow',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:'3rem'}}>
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
              <Link href='/Login' style={{marginRight:'1rem'}} id='log'>Login</Link>
            </div>
        </header>
  )
}

export default Navbar

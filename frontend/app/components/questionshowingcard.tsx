'use client'
import { quiztakingprops } from "@/types"
import { useRouter } from "next/navigation"
import '../globals.css'



const Quecard : React.FC<quiztakingprops>=(props)=>{
    const router = useRouter()
    console.log("props", props);
    

    let data = {
        quizid : props.quizid,
        token : localStorage.getItem('accessToken')
    }

    const handleclick = ()=>{
        let token = data.token
        if(!token){
            router.push('/Login')
        }

        try {
            if(props.buttontext === "take test"){
                router.push(`/takequiz/${data.quizid}`)
            }
            else{
                console.log("jhsbdfhsdbjh",data.quizid);
                
                router.push(`/getresult/${data.quizid}`)
            }
        } catch (error) {
            console.log('you are not authenticated')
            router.push('/Login')
        }
        
    }
    return(
        <div style={{height:'3rem',backgroundColor:'pink',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:'3px'}}>
            <div>
                <h3>{props.quizname}</h3>
                <h5>Topics : {props.quiztopic}</h5>
            </div>
            <button style={{backgroundColor:'aqua',borderRadius:'3pz',marginRight:'2rem',height:'2rem'}} onClick={handleclick}>{props.buttontext}</button>
        </div>
    )
}

export default Quecard
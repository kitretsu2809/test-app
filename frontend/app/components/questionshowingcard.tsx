'use client'
import { quiztakingprops } from "@/types"
import { useRouter } from "next/navigation"
import '../globals.css'



const Quecard : React.FC<quiztakingprops>=(props)=>{
    const router = useRouter()


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
                router.push(`/getresult/${data.quizid}`)
            }
        } catch (error) {
            console.log('you are not authenticated')
            router.push('/Login')
        }
        
    }
    return(
        <div className="h-12 bg-pink flex justify-between items-center p-3">
        <div>
          <h3 className="text-lg font-semibold">{props.quizname}</h3>
          <h5 className="text-sm">Topics: {props.quiztopic}</h5>
        </div>
        <button className="bg-aqua rounded-md h-8 px-3" onClick={handleclick}>
          {props.buttontext}
        </button>
      </div>
    )
}

export default Quecard
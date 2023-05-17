import { useRouter } from "next/navigation";
import { logOut } from "@/utils/auth";

function Historico() {

  const router = useRouter()
  
  const handleSignOut = async () => {
    await logOut().then((result) => {
      console.log(result)
      if(result){
        router.push("/login")
      }
    }).catch((error) => {
        console.log(error)
    })
  }


  return (
    <div>
      <h1>Histórico</h1>
      <button onClick={handleSignOut}>Sair</button>
    </div>
  )
}

export default Historico
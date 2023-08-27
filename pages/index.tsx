import { useSession, signIn, signOut } from "next-auth/react"
import { Layout } from '../components/Layout'
import AddNaisei from "../components/Naisei"
import NaiseiGetAll from "../components/Naisei"

export default function Home() {
  // const { data: session } = useSession()
  // if (session) {
  //   return <>
  //     Signed in as {session.user?.email} <br />
  //     {session.user?.name}
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <>
      {/* Not signed in <br /> */}
      {/* <button onClick={() => signIn()}>Sign in</button> */}
      <Layout />
      {/* <AddNaisei /> */}
      <div>aaa</div>
      <NaiseiGetAll />
    </>
  )
}

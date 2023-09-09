import Home from "./home-client";
import { getParticipants } from "./contract";

export default async function HomePage(): Promise<JSX.Element> {
  const participants = await getParticipants()
  return (
    <div className="w-full max-w-[500px] mx-auto min-h-screen shadow-lg shadow-primary/40">
      <Home participants={participants} />
    </div>
  )
}

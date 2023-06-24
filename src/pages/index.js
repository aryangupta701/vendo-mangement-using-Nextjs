import HomePage from './../components/home/home'

export default function Home() {
  console.log(process.env.GOOGLE_CLIENT_ID); 
  return (
    <main>
        <HomePage />
    </main>
  )
}

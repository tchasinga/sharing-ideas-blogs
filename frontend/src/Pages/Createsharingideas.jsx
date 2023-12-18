import {useSelector} from 'react-redux'


export default function Createsharingideas() {
  const currentUser = useSelector((state) => state.user && state.user.user.currentUser)


  return (
    <main className="max-w-7xl mx-auto">
      <h2></h2>
    </main>
  )
}

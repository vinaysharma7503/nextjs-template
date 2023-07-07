
const userProfile = ({params}: any) => {
  return (
    <div className="flex justify-center items-center min-h-screen">Profile page {params?.id}</div>
  )
}

export default userProfile

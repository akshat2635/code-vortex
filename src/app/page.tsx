import { SignedIn, SignedOut, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs"

const Home = () => {
  return (
    <>
    <SignedOut>
      <SignUpButton/>
    </SignedOut>
    <SignedIn>
      <SignOutButton></SignOutButton>
    </SignedIn>

    <UserButton></UserButton>
    </>
  )
}

export default Home
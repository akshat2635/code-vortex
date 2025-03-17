"use client";
import LoginButton from "@/components/LoginButton";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <>
    <SignedIn>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-6" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
    </SignedIn>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
}
export default HeaderProfileBtn;
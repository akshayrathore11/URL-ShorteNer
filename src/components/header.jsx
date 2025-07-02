import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";

const Header = () => {
  const navigate = useNavigate();

const {user,fetchUser} = UrlState();
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="Trimrr logo" />
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden ">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profilepic} className={"object-cover"}/>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LinkIcon className="mt-1 h-4 w-4" />
                  <span>My Links</span>
                </DropdownMenuItem>

                <DropdownMenuItem className={"text-red-400"}>
                  <LogOut className="mt-1 h-4 w-4" />
                  <span onClick={()=>{
                    navigate("/")
                  }}>
                    
                    Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

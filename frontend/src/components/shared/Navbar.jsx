import { setToken, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RecruiterNotifications from "../Recruiter/RecruiterNotifications";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 border-b border-border/50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full ring-1 ring-primary/30 bg-black/60 backdrop-blur flex items-center justify-center relative animate-[apexLogo_3s_ease-in-out_infinite]">
              <img
                src={new URL("../../assets/Ar.png", import.meta.url).toString()}
                alt="ApexCareers favicon"
                className="h-7 w-7 rounded-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold tracking-wide">
                <span className="text-white">Apex</span>
                <span className="text-cyan-300">Careers</span>
              </span>
            </div>
          </Link>
        </div>


        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-sm sm:text-base">

            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/recruiter/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/recruiter/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user && user.role === "recruiter" && (
            <div className="flex items-center">
              <RecruiterNotifications />
            </div>
          )}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          ) : (

            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
              <div className="flex flex-col my-2 text-muted-foreground"> 


                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 px-4 py-4 space-y-4">

          <ul className="flex flex-col font-medium gap-3">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/recruiter/companies" onClick={() => setMobileMenuOpen(false)}>Companies</Link>
                </li>
                <li>
                  <Link to="/recruiter/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user && user.role === "recruiter" && (
            <div className="flex items-center">
              <RecruiterNotifications />
            </div>
          )}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-2 border-t border-border/50">

                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>

                <div className="flex-1">
                <h4 className="font-medium">{user?.fullname}</h4>
                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
              </div>
              <div className="flex gap-2">
                {user.role === "student" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={logoutHandler}>
                  <LogOut size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

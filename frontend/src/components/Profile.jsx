import React, { useState } from "react";
import { Button } from "./ui/button";
import { BookmarkIcon, Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import BookmarkTable from "./BookmarkTable";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import useGetBookmarkedJobs from "@/hooks/useGetBookmarkedJobs";

const Profile = () => {
  useGetAppliedJobs();
  useGetBookmarkedJobs();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("applied"); // 'applied' or 'bookmarked'
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-card/70 border border-border/60 rounded-2xl my-5 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-lg sm:text-xl text-foreground">
                {user?.fullname}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="self-start"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-muted-foreground">
            <Mail />
            <span className="text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-muted-foreground">
            <Contact />
            <span className="text-foreground">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-foreground">Skills</h1>
          <div className="flex flex-wrap items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span className="text-muted-foreground">NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-400 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-muted-foreground">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-card/70 rounded-2xl px-4 sm:px-0 border border-border/60">
        <div className="flex gap-4 my-5">
          <Button 
            variant={activeTab === "applied" ? "default" : "outline"}
            onClick={() => setActiveTab("applied")}
            className={activeTab === "applied" ? "bg-[#7209b7] hover:bg-[#5f32ad]" : ""}
          >
            Applied Jobs
          </Button>
          <Button 
            variant={activeTab === "bookmarked" ? "default" : "outline"}
            onClick={() => setActiveTab("bookmarked")}
            className={activeTab === "bookmarked" ? "bg-[#7209b7] hover:bg-[#5f32ad]" : ""}
          >
            <BookmarkIcon className="mr-2 h-4 w-4" /> Bookmarked Jobs
          </Button>
        </div>
        {activeTab === "applied" ? <AppliedJobTable /> : <BookmarkTable />}
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

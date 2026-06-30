import { useEffect, useState } from "react";

import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  useEffect(() => {
    // Check if job is bookmarked when component mounts
    const checkBookmarkStatus = async () => {
      try {
        if (!user) return; // Don't check if user is not logged in

        const res = await axios.get(
          `${USER_API_END_POINT}/bookmarks/check/${job?._id}`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          setIsBookmarked(res.data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkBookmarkStatus();
  }, [job?._id, user]);

  const toggleBookmark = async (e) => {
    if (e) e.stopPropagation(); // Prevent navigation when clicking the bookmark button

    try {
      if (!user) {
        toast.error("Please login to bookmark jobs");
        return;
      }

      if (!job || !job._id) {
        toast.error("Job information is missing");
        return;
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/bookmarks/${job._id}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        setIsBookmarked(!isBookmarked);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to update bookmark");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating bookmark";
      toast.error(errorMessage);
    }
  };
  return (
<div className="p-5 rounded-md shadow-xl bg-card/70 border border-border/60 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            onClick={toggleBookmark}
            title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <Bookmark
              className={
                isBookmarked
                  ? "fill-[#00E5FF] text-[#00E5FF]"
                  : "text-muted-foreground hover:text-[#00E5FF]"
              }
            />
          </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="@shadcn" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className={"text-[#E9B3FB] font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#FF0087] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#B0FFFA] font-bold"} variant="ghost">
{(() => {
            const lpa = Number(job?.salary);
            if (!Number.isFinite(lpa)) return `${job?.salary ?? ""}BDT`;
            return `${lpa}BDT`;
          })()}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          className="rounded-lg bg-gradient-to-r from-[#00E5FF] via-[#00B8D4] to-[#00FFCC] hover:brightness-110 shadow-[0_0_0_1px_rgba(0,229,255,0.35)]"
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(e);
          }}
        >
          {isBookmarked ? "Bookmarked" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;

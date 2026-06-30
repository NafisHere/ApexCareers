import { setSingleJob } from "@/redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
  USER_API_END_POINT,
} from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, BookmarkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied = singleJob?.applications?.some(
    (application) => application.application === user?._id || false,
  );
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      setIsApplying(true);
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state

        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);

        // Redirect to profile page after successful application
        setTimeout(() => {
          navigate("/profile");
        }, 1500); // Short delay to show the success message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id, // Ensure the state is in sync with fetched data
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();

    // Check if job is bookmarked
    const checkBookmarkStatus = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/bookmarks/check/${jobId}`,
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
  }, [jobId, dispatch, user?._id]);

  const toggleBookmark = async () => {
    try {
      if (!user) {
        toast.error("Please login to bookmark jobs");
        return;
      }

      if (!jobId) {
        toast.error("Job information is missing");
        return;
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/bookmarks/${jobId}`,
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
  const goBack = () => {
    navigate("/jobs");
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900"
        onClick={goBack}
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </Button>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className={"text-[#E9B3FB] font-bold"} variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className={"text-[#FF0087] font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#B0FFFA] font-bold"} variant="ghost">
              {(() => {
                const lpa = Number(singleJob?.salary);
                if (!Number.isFinite(lpa)) return `${singleJob?.salary ?? ""} LPA`;
                const tk = Math.round(lpa * 1000);
return `${lpa}BDT`;
              })()}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={toggleBookmark}
            variant="outline"
            className="rounded-lg border border-border/60 bg-black/20"
            title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <BookmarkIcon
              className={
                isBookmarked
                  ? "h-5 w-5 fill-[#00E5FF] text-[#00E5FF]"
                  : "h-5 w-5 text-muted-foreground hover:text-[#00E5FF]"
              }
            />
          </Button>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied || isApplying}
            className={`rounded-lg bg-gradient-to-r from-[#00E5FF] via-[#00B8D4] to-[#00FFCC] shadow-[0_0_0_1px_rgba(0,229,255,0.35)] ${
              isApplied
                ? "opacity-60 cursor-not-allowed"
                : isApplying
                  ? "opacity-80" 
                  : "hover:brightness-110"
            }`}
          >
            {isApplied
              ? "Already Applied"
              : isApplying
                ? "Applying..."
                : "Apply Now"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-foreground">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-foreground">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-foreground">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-foreground">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-[#B0FFFA]">
            {(() => {
const lpa = Number(singleJob?.salary);
              if (!Number.isFinite(lpa)) return `${singleJob?.salary ?? ""}BDT`;
              return `${lpa}BDT`;
            })()}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-foreground">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-foreground">
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;

import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-10 md:my-20 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00B8D4] to-[#00FFCC]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;

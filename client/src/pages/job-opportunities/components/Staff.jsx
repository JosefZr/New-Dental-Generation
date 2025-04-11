import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useGetAllJobs } from "@/hooks/job/useGetAllJobs";
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus";

export default function Staff() {
  const { data, isLoading, isError, error } = useGetAllJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const status = useGetSubscriptionStatus();
  const navigate = useNavigate();
  const userInfo = useAuthUser();

  const filteredJobs = useMemo(() => {
    return data?.filter((job) => {
      const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === "" || genderFilter === "all" || 
        job.gender.toLowerCase() === genderFilter.toLowerCase();
      const matchesLocation = locationFilter === "" || locationFilter === "all" || 
        job.location.toLowerCase() === locationFilter.toLowerCase();
      
      return matchesSearch && matchesGender && matchesLocation;
    });
  }, [data, searchTerm, genderFilter, locationFilter]);

  const uniqueLocations = useMemo(() => [...new Set(data?.map((job) => job.location))], [data]);
  const uniqueGenders = useMemo(() => [...new Set(data?.map((job) => job.gender))], [data]);
  
  const handleLimitation = () => {
    navigate(`/profile/${userInfo.userId}`);
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1015] text-white bg-[url('https://www.jointherealworld.com/campus/images/new_hero_bg.png')] bg-cover">
      <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="blue-bg-glow crypto mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C0C0C0] mb-6 hidden md:block">
            I WANT STAFF
          </h1>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-lg md:text-xl lg:text-2xl font-urbanist">
              No Great Dentist in History became Exceptional alone. Become the leader of your Team.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-urbanist">
              You need to have more trusted dentists working around you. Give The opportunity to the ones who needs
              job, <span className="font-bold"> and grow your clinic. </span>
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center crypto hidden md:block">
          Find Your Loyal Team
        </h2>

        {status === "off" ? (
          <div className="max-w-3xl mx-auto mt-8 min-h-[60vh] flex flex-col justify-center">
            <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
              {/* Spinning loader */}
              <div className="relative h-20 w-20 sm:h-28 sm:w-28 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg font-medium">Wait… What Just Happened?</p>
                  <p className="text-sm sm:text-base text-white/80">You were about to access something BIG—but it's locked.</p>
                  <p className="text-sm sm:text-base text-white/80">Why? Because this feature is only for Zirconium Plan members—the dentists who know that playing small won't get them far.</p>
                  <p className="text-sm sm:text-base text-white/80">Now, you've got two options:</p>
                  <p className="text-sm sm:text-base text-white/80">
                    01- Close this page and pretend you didn't just see the door to next-level growth.
                  </p>
                  <p className="text-sm sm:text-base text-white/80">02- Upgrade now and unlock the cheat codes to double your monthly profit.</p>
                </div>

                <div className="w-full max-w-sm px-4 my-6">
                  <button className="buttonCheckout-limit w-full" onClick={handleLimitation}>
                    <div className="a l"></div>
                    <div className="a r"></div>
                    <div className="a t"></div>
                    <div className="a b"></div>
                    <div className="text">UPGRADE NOW & JOIN THE WINNERS!</div>
                  </button>
                </div>

                <p className="text-sm sm:text-base text-white/80 max-w-lg">
                  P.S: For less than the price of a single patient visit, you'll get access to strategies that can 10X your income.
                </p>

                <button 
                  onClick={() => console.log("close")} 
                  className="mt-4 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mt-8">
            {/* Search and Filter - Desktop */}
            <div className="hidden md:flex gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  {uniqueGenders?.map((gender) => (
                    <SelectItem key={gender} value={gender.toLowerCase()}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations?.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search and Filter - Mobile */}
            <div className="md:hidden mb-4">
              <div className="flex gap-2 mb-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-my-dark-blue"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              {isFilterOpen && (
                <div className="flex flex-col gap-3 mb-3 p-3 bg-[#131320] rounded-md">
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      {uniqueGenders?.map((gender) => (
                        <SelectItem key={gender} value={gender.toLowerCase()}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations?.map((location) => (
                        <SelectItem key={location} value={location.toLowerCase()}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Table for larger screens */}
            <div className="hidden md:block overflow-hidden shadow-md rounded-lg">
              <Table>
                <TableHeader className="bg-[#131320]">
                  <TableRow>
                    <TableHead className="text-white">Profile</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Gender</TableHead>
                    <TableHead className="text-white">Age</TableHead>
                    <TableHead className="text-white">Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-[#0B1015] divide-y divide-gray-800">
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-red-500 py-4">
                        Error: {error.message}
                      </TableCell>
                    </TableRow>
                  ) : filteredJobs?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No candidates found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobs?.map((job) => (
                      <TableRow 
                        key={job._id} 
                        className="cursor-pointer hover:bg-[#131320]/50 transition-colors"
                        onClick={() => handleCandidateClick(job)}
                      >
                        <TableCell>
                          <img
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${job.name}`}
                            alt={`${job.name}'s avatar`}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{job.name}</TableCell>
                        <TableCell>{job.gender}</TableCell>
                        <TableCell>{job.age}</TableCell>
                        <TableCell>{job.location}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Card view for mobile */}
            <div className="md:hidden space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : isError ? (
                <div className="text-center text-red-500 py-4">
                  Error: {error.message}
                </div>
              ) : filteredJobs?.length === 0 ? (
                <div className="text-center py-4">
                  No candidates found
                </div>
              ) : (
                filteredJobs?.map((job) => (
                  <div 
                    key={job._id} 
                    className="bg-[#131320] p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#1d2932] transition-colors"
                    onClick={() => handleCandidateClick(job)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${job.name}`}
                        alt={`${job.name}'s avatar`}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-lg">{job.name}</h3>
                        <p className="text-sm text-gray-400">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge  className="text-white border-none bg-slate-800">{job.gender}</Badge>
                      <Badge  className="text-white border-none bg-slate-800">{job.age} years</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Candidate Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#131320] text-white border-gray-800 max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Candidate Details</DialogTitle>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedCandidate.name}`}
                  alt={`${selectedCandidate.name}'s avatar`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedCandidate.name}</h3>
                  <p className="text-gray-400">{selectedCandidate.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-400">Gender</p>
                  <p>{selectedCandidate.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Age</p>
                  <p>{selectedCandidate.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Experience</p>
                  <p>{selectedCandidate.experience || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Diploma</p>
                  <p>{selectedCandidate.diploma || "Not specified"}</p>
                </div>
              </div>
              
              {selectedCandidate.whyJob && (
                <div className="pt-2">
                  <p className="text-sm text-gray-400 mb-1">Why they want this job</p>
                  <p className="bg-[#0B1015] p-3 rounded-md">{selectedCandidate.whyJob}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" className="text-black" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button>
                  Contact
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

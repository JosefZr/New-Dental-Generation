import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/services";
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";
import { Delete, Edit, Eye } from "lucide-react";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { Pagination } from "@/components/Pagination";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all"); // New role filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { users, setUsers } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const { onOpen } = useModal();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers();
      if (response?.success && Array.isArray(response.data)) {
        setUsers(response.data); // Ensure data is an array
        toast.success(response.message);
      } else {
        toast.error(response.message || "Invalid data format.");
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
    setIsLoading(false);
  };

const filteredUsers = useMemo(() => {
  if (!Array.isArray(users)) return []; // Return an empty array if users is not an array
  return users.filter((user) => {
    const userRole = user.role ? user.role.toString() : ""; // Ensure user.role is a string or an empty string
    const userIsPaid = user.isPaid !== null && user.isPaid !== undefined ? user.isPaid.toString() : ""; // Ensure user.isPaid is a string or an empty string
    
    if (statusFilter !== "all" && userIsPaid !== statusFilter) return false;
    if (roleFilter !== "all" && userRole !== roleFilter) return false;
    if (
      searchQuery &&
      !user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });
}, [users, statusFilter, roleFilter, searchQuery]);


  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * 10;
    return filteredUsers.slice(startIndex, startIndex + 10);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / 10);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (role) => {
    setRoleFilter(role);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading)
    return <div className="w-full h-[100vh] flex justify-center items-center">Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-6 pt-10 px-10">
        <h1 className="text-2xl font-bold text-white">Users & Profession</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary focus:text-my-black"
            />
          </div>
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-my-black">
                <FilterIcon className="w-5 h-5" />
                <span>Filter by status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleStatusFilterChange("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleStatusFilterChange("true")}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  Paid
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleStatusFilterChange("false")}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  Not Paid
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Role Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-my-black">
                <FilterIcon className="w-5 h-5" />
                <span>Filter by role</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleRoleFilterChange("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleRoleFilterChange("dentist")}>
                Dentist
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleRoleFilterChange("lab")}>Lab</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleRoleFilterChange("store")}>Store</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-auto bg-black px-10 rounded-lg">
        <table className="w-full bg-gray-900 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Role</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user._id}>
                <td className="p-3 text-sm text-my-white-gray">{user.firstName}</td>
                <td className="p-3 text-sm text-my-white-gray">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-sm text-my-white-gray">{user.email}</td>
                <td className="p-3 text-sm text-my-white-gray">{user.role}</td>
                <td className="p-3 text-sm text-my-white-gray">
                  <Badge
                    variant="outline"
                    className={`${
                      user.isPaid ? "bg-green-500 text-green-50" : "bg-red-500 text-red-50"
                    }`}
                  >
                    {user.isPaid ? "Paid" : "Not Paid"}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setUser(user);
                      onOpen(MODAL_TYPE.DELETE_USER);
                    }}
                  >
                    <Delete className="w-5 h-5 text-red-800" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setUser(user);
                      onOpen(MODAL_TYPE.PROFFESSION);
                    }}
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                  {
                    user.role ==="store" || user.role==="lab" ?(
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setUser(user);
                          onOpen(MODAL_TYPE.CREATE_STORE);
                        }}
                      >
                    <Edit className="w-5 h-5" />
                  </Button>
                    ):""
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-5 bg-gray-800">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 10 + 1} to{" "}
            {Math.min(currentPage * 10, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

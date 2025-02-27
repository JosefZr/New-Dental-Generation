import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useGetAllOtherRoles } from "@/hooks/roles/useGetAllOtherRoles";
import { useLocation } from "react-router-dom";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useAddRole } from "@/hooks/roles/useAddRole";
import { useDeleteRole } from "@/hooks/roles/useDeleteRole";

// Predefined roles
const moreRoles = [
    { name: "Business Consultant" },
    { name: "Genius Marketer" },
    { name: "Opportunity Giver" }
];

export default function AddRoleModal() {
    const userInfo = useAuthUser();
    const { userPreview } = useContext(UserContext);
    const location = useLocation();
    const { isOpen, onClose, type } = useModal();
    const isProfile = location.pathname.includes(`/profile`);

    // Determine userId based on the page context
    const userId = isProfile ? userInfo.userId : userPreview?._id;

    // Fetch roles from API
    const { data, isLoading, isError, refetch } = useGetAllOtherRoles(userId);
    
    // Extract current user roles from API response
    const currentRoles = data?.moreRole || [];
    
    // State to track UI changes
    const [localRoles, setLocalRoles] = useState([]);
    
    // Update local state when API data changes
    useEffect(() => {
        if (data?.moreRole) {
            setLocalRoles(data.moreRole);
        }
    }, [data]);
    
    // Filter roles that are not already assigned to the user
    const availableRoles = moreRoles.filter(role => 
        !localRoles.some(userRole => userRole.name === role.name)
    );

    // Set up mutations
    const addRoleMutation = useAddRole();
    const deleteRoleMutation = useDeleteRole();
    
    // Function to add a role
    const addRole = (role) => {
        addRoleMutation.mutate(
            { userId, role: role.name },
            {
                onSuccess: () => {
                    // Optimistically update the UI
                    const newRole = { name: role.name, _id: `temp-${Date.now()}` };
                    setLocalRoles([...localRoles, newRole]);
                    
                    // Then refetch to get the real data
                    refetch();
                }
            }
        );
    };

    // Function to remove a role
    const removeRole = (role) => {
        deleteRoleMutation.mutate(
            { userId, role: role.name },
            {
                onSuccess: () => {
                    // Optimistically update the UI
                    setLocalRoles(localRoles.filter(r => r._id !== role._id));
                    
                    // Then refetch to get the real data
                    refetch();
                }
            }
        );
    };

    return (
        <Dialog open={isOpen && type === MODAL_TYPE.ADD_ROLE} onOpenChange={onClose} className="border-none border-black">
            <DialogContent className="border-none rounded-none text-white p-0 overflow-hidden bg-my-dark-blue">
                <DialogHeader className="bg-slate-800 flex flex-row px-10 h-[50px] flex-shrink-0 items-center justify-between border-b border-slate-700 capitalize">
                    <DialogTitle className="flex flex-1 items-center font-bold text-my-white">
                        Change Your Role
                    </DialogTitle>
                </DialogHeader>
                <div className="p-5 space-y-4">
                    {/* User's Current Roles */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Your Roles</h3>
                        {isLoading ? (
                            <p className="text-gray-400">Loading roles...</p>
                        ) : localRoles.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                                {localRoles.map((role, index) => (
                                    <li key={role._id || index} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                                        <span>{role.name}</span>
                                        <Button 
                                            onClick={() => removeRole(role)} 
                                            className="bg-red-500 text-white px-2 py-1 text-sm"
                                            disabled={deleteRoleMutation.isLoading}
                                        >
                                            -
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">You have no roles assigned.</p>
                        )}
                    </div>

                    {/* Available Roles to Add */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Available Roles</h3>
                        {isLoading ? (
                            <p className="text-gray-400">Loading available roles...</p>
                        ) : availableRoles.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                                {availableRoles.map((role, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                                        <span>{role.name}</span>
                                        <Button 
                                            onClick={() => addRole(role)} 
                                            className="bg-green-500 text-white px-2 py-1 text-sm"
                                            disabled={addRoleMutation.isLoading}
                                        >
                                            +
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No available roles to add.</p>
                        )}
                    </div>
                </div>
                <DialogFooter className="p-4">
                    <Button onClick={onClose} className="bg-gray-600 text-white">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
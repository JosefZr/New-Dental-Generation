import Spinner from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserContext } from "@/context/UserContext"
import { useCreateQuoate } from "@/hooks/quoates/useCreateQuoates"
import { useDeleteQuoate } from "@/hooks/quoates/useDeleteQuoate"
import { useGetAllQuoates } from "@/hooks/quoates/useGetAllQuoates"
import { useIpdateQuoate } from "@/hooks/quoates/useIpdateQuoate"
import { Edit, Trash2 } from "lucide-react"
import { useContext, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"

export default function Quotes() {
  const [newItem, setNewItem] = useState('')
  const [editingId, setEditingId] = useState(null)
  const {setIsDashboardSidebarOpen } = useContext(UserContext)

  const toggleSidebar = () => {
    setIsDashboardSidebarOpen((prev) => !prev)
  }

  const { data: inventoryResponse , isLoading, isError, error } = useGetAllQuoates()
  const inventory = Array.isArray(inventoryResponse) ? inventoryResponse : []; // Ensure it's an array

  const createInventoryMutation = useCreateQuoate()
  const deleteInventoryMutation = useDeleteQuoate()
  const updateInventory = useIpdateQuoate()

  const addItem = () => {
    if (newItem.trim() !== '') {
      createInventoryMutation.mutate({ text: newItem })
      setNewItem('')
    }
  }

  const deleteItem = (id) => {
    console.log(`Delete item with ID: ${id}`)
    deleteInventoryMutation.mutate({id})
    // Add delete logic here
  }

  const startEditing = (id) => {
    setEditingId(id)
    const item = inventory.find((item) => item._id === id)
    if (item) {setNewItem(item.text)}
  }

  const updateItem = () => {
    if (editingId !== null && newItem.trim() !== '') {
      
      console.log(`Update item with ID: ${editingId}`)
      console.log({id: editingId, text: newItem})
      updateInventory.mutate({id: editingId, text: newItem})
      setEditingId(null)
      setNewItem('')
    }
  }
    return (
        <div  className="w-full">
          <button
            className="top-2 left-2 cursor-pointer z-50 p-2 hover:bg-gray-800 rounded-md transition-colors"
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu className="lg:hidden text-2xl text-white" />
          </button>
          <div
            className="max-w-md mx-auto mt-14 p-6 rounded-lg shadow-lg"
            style={{ background: 'rgb(13, 26, 37, 1)' }}
          >
            <h1 className="text-2xl font-bold mb-4 text-center">Quotes</h1>
            <div className="flex mb-4">
              <Input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add dental item..."
                className="flex-grow mr-2 border-slate-700"
              />
              <Button
                onClick={editingId !== null ? updateItem : addItem}
                className="bg-my-dark-blue hover:bg-slate-800"
              >
                {editingId !== null ? 'Update' : 'Add'}
              </Button>
            </div>
            {isLoading ? (
              <Spinner/>
            ) : isError ? (
              <p>Error: {error.message}</p>
            ) : inventory?.length === 0 ? (
              <p>No quotes availible</p>
            ) : (
              <ul className="space-y-2">
                {inventory?.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between bg-my-dark-blue p-2 rounded-xl"
                    >
                    <span
                      className="ml-2 overflow-hidden whitespace-wrap text-ellipsis"
                      // style={{ maxWidth: '70%' }}
                    >{item.text}</span>
                    
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(item._id)}
                        className="mr-2 text-blue-500 hover:text-blue-700 hover:bg-slate-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteItem(item._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-slate-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )
}

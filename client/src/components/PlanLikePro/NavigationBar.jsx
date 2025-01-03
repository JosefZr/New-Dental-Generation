
import { Settings, X } from 'lucide-react'

export function NavigationBar() {

    return (
        <nav className="fixed top-0 left-0 right-0 bg-[#0B1015] border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-center gap-8">
            
            </div>
            <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
                <X className="w-5 h-5" />
            </button>
            </div>
        </div>
        </nav>
    )
}


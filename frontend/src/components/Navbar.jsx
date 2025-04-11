import { Search, Plus } from 'lucide-react';

const Navbar = ({ setShowAddForm , searchTerm, setSearchTerm}) => {
 
  return (
    <nav className="bg-white shadow">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Student Job Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddForm(true)} 
              className="inline-flex items-center bg-violet-500 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-violet-700"
            >
              <Plus className="h-5 w-5 mr-1" /> Add Application
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

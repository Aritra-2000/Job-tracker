import React from 'react'

export const ApplicationForm = ({newJob, setNewJob,  handleAddJob, setShowAddForm}) => {
  const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='mb-8 bg-white p-6 rounded-lg shadow'>
     <h2 className='text-lg font-medium mb-4'> Add New Application</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
       <div>
         <label className='block text-sm font-medium text-gray-700 mb-1'>
          Company
          </label>
          <input 
            type="text" 
            name="company" 
            value={newJob.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Company name"
          />
       </div>
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={newJob.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Job position"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={newJob.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newJob.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
          </div>
          <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                type="url"
                name="link"
                value={newJob.link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/job"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowAddForm(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={()=>handleAddJob(newJob)}
            className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-md hover:bg-violet-700"
          >
            Save Application
          </button>
        </div>
     </div>
  )
}

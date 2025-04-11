
import { ExternalLink, MoreHorizontal, Briefcase, Trash2 } from 'lucide-react';
import { useState } from 'react';


const ApplicationGrid = ({ jobs, statusOptions, handleStatusChange , showAddForm, handleDelete}) => {

 const [openDropdownId, setOpenDropdownId] = useState(null);

 const statusColors = {
    Applied: 'bg-blue-100 text-blue-800',
    Interview: 'bg-purple-100 text-purple-800',
    Offer: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div>
        {jobs.length === 0 && !showAddForm ? (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-violet-500" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">No job applications yet</h2>
            <p className="text-gray-600">Start tracking your job search by adding your first application using the "Add Application" button in the navigation bar</p>
            </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
                <div key={job._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
                            <p className="text-gray-600">{job.role}</p>
                        </div>
                        <div className='relative'>
                            <button className="text-gray-400 hover:text-gray-500" onClick={() => toggleDropdown(job._id)}>
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                            {openDropdownId === job._id && (
                                <div className='absolute right-0 mt-0 w-32 bg-white border rounded shadow z-10'>
                                <button
                                    onClick={() => {
                                        handleDelete(job._id);
                                        setOpenDropdownId(null); // close dropdown after delete
                                    }}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                                    >
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </button>
                                    <button
                                    onClick={() => setOpenDropdownId(null)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                    >
                                    Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Applied: {new Date(job.date).toLocaleDateString()}
                    </div>
                    <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job._id, e.target.value)}
                        className={`text-sm font-medium py-1 px-2 rounded-full cursor-pointer ${statusColors[job.status]}`}
                    >
                        {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    </div>

                    {job.link && (
                    <div className="mt-4">
                        <a href={job.link} target="_blank" rel="noreferrer" className="text-sm text-violet-500 hover:text-violet-600 flex items-center">
                        View Job Posting <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                    </div>
                    )}
                </div>
                </div>
            ))}
        </div>
    )}
    </div>
  );
};

export default ApplicationGrid;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationForm } from "./components/ApplicationForm"
import ApplicationGrid from "./components/ApplicationGrid";
import Navbar from "./components/Navbar"
import { addApplication, deleteApplication, getApplication, updateApplication } from "./store/applicationSlice";
import { Toaster } from "react-hot-toast";


function App() {
  
  const dispatch = useDispatch();
  const { applications, status, error } = useSelector(state => state.tracker); 
  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: new Date().toISOString().split('T')[0],
    link: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fillterdApplications = applications.filter(app =>
    [app.company, app.role, app.status].some(field=>
        field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];

  useEffect(() =>{
    dispatch(getApplication());
  },[dispatch]);
  

  const handleStatusChange = (id, newStatus) =>{
   dispatch(updateApplication({id, status:newStatus}))
  };

  const handleAddJob = (applicationData) =>{
      dispatch(addApplication(applicationData));
      setShowAddForm(false);
      setNewJob({
        company: '',
        role: '',
        status: 'Applied',
        date: new Date().toISOString().split('T')[0],
        link: '',
      });
  };

  const handleDelete = (JobId) =>{
    dispatch(deleteApplication(JobId));
  }
  
  return (
    <>
      <div>
        <Navbar setShowAddForm={setShowAddForm} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <div className="mt-20">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showAddForm && (
              <ApplicationForm 
                  newJob={newJob} 
                  setNewJob={setNewJob}
                  handleAddJob={handleAddJob}
                  setShowAddForm={setShowAddForm}
              />
          )}
          {status === 'loading' && <div className="text-center py-4">Loading applications...</div>}
          {status === 'failed' && <div className="text-center py-4 text-red-600">Error: {error}</div>}
          <ApplicationGrid
            jobs={fillterdApplications}
            statusOptions={statusOptions}
            handleStatusChange={handleStatusChange}
            showAddForm={showAddForm}
            handleDelete={handleDelete}
          />
        </main>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

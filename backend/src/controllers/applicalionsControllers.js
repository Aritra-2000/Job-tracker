
import Application from "../models/applications.model.js"

export const addApplication = async(req, res) =>{
      
    const {company, role, status, date, link } = req.body;

    try {
        
        if(!company || !role || !date || !link){
            return res.json(400).json({message: "All fields are required"})
        }

        const application = await new Application({
            company,
            role,
            status,
            date,
            link
        });

        await application.save();

        res.status(201).json({
            _id: application.id,
            company: application.company,
            role: application.role,
            date: application.date,
            link: application.link,
        });

    } catch (error) {
        console.log("Error in application controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getApplications = async(req, res) =>{
      
    try {
        const applications = await Application.find().sort({createdAt: -1});

        res.status(201).json(applications);

    } catch (error) {
        console.log("Error in fetching application", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateStatus = async(req,res) =>{
    
    const {id} = req.params;
    const {status} = req.body;

    try {
        
        const application = await Application.findByIdAndUpdate(
            id,
            {status},
            {new: true}
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        console.log("Error in update status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteApplication = async(req,res) =>{
    
    const {id} = req.params;

    try {
        
        const application = await Application.findByIdAndDelete(id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        res.status(200).json(application);
    } catch (error) {
        console.log("Error in deleting application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
import Application from "../models/application.js";

export const CreateApplication = async (req, res) => {
    try {
        const { userID, servicesID, date, category } = req.body;

        if (!userID || !servicesID || !date || !category) {
            return res.status(400).json({ message: 'userID, servicesID, date, and category are required' });
        }

        const application = await Application.create({ userID, servicesID, date, category });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error creating application', error: error.message });
    }
};

export const getApplications = async (req, res) => {
    try {
        const applications = await Application.findAll();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};

export const getOneApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findByPk(id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching application', error: error.message });
    }
};

// Обновление заявки
export const UpdateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { userID, servicesID, date, category } = req.body;

        const application = await Application.findByPk(id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (userID) application.userID = userID;
        if (servicesID) application.servicesID = servicesID;
        if (date) application.date = date;
        if (category) application.category = category; // Исправьте `cotegory` на `category`

        await application.save();
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error updating application', error: error.message });
    }
};

// Удаление заявки
export const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findByPk(id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await application.destroy();
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting application', error: error.message });
    }
};
import Rating from '../models/rating.js';

// Создание нового рейтинга
export const CreateRating = async (req, res) => {
    try {
        const { count, userID, authorID, comment } = req.body;

        if (count === undefined || !userID || !authorID) {
            return res.status(400).json({ message: 'Count, userID, and authorID are required' });
        }

        const rating = await Rating.create({ count, userID, authorID, comment });
        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error creating rating', error: error.message });
    }
};

// Получение всех рейтингов
export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll();
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
};

// Получение одного рейтинга по ID
export const getOneRating = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await Rating.findByPk(id);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rating', error: error.message });
    }
};

// Обновление рейтинга
export const UpdateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { count, userID, authorID, comment } = req.body;

        const rating = await Rating.findByPk(id);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        if (count !== undefined) rating.count = count;
        if (userID) rating.userID = userID;
        if (authorID) rating.authorID = authorID;
        if (comment) rating.comment = comment;

        await rating.save();
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error updating rating', error: error.message });
    }
};

// Удаление рейтинга
export const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await Rating.findByPk(id);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        await rating.destroy();
        res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rating', error: error.message });
    }
};
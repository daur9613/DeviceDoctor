import Helper from "../models/helper.js";

export const CreateHelper = async (req, res) => {
  try {
    const { name, email, question } = req.body;

    if (!name || !email || !question) {
      return res
        .status(400)
        .json({ message: "name, email, and question are required" });
    }

    const helper = await Helper.create({ name, email, question });
    res.status(201).json(helper);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating helper", error: error.message });
  }
};

export const getHelpers = async (req, res) => {
  try {
    const helpers = await Helper.findAll();
    res.json(helpers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching helpers", error: error.message });
  }
};

export const getOneHelper = async (req, res) => {
  try {
    const { id } = req.params;
    const helper = await Helper.findByPk(id);

    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }

    res.status(200).json(helper);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching helper", error: error.message });
  }
};

export const UpdateHelper = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, question, answer } = req.body;

    const helper = await Helper.findByPk(id);

    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }

    if (name) helper.name = name;
    if (email) helper.email = email;
    if (question) helper.question = question;
    if (answer) helper.answer = answer;

    await helper.save();
    res.status(200).json(helper);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating helper", error: error.message });
  }
};

export const deleteHelper = async (req, res) => {
  try {
    const { id } = req.params;
    const helper = await Helper.findByPk(id);

    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }

    await helper.destroy();
    res.json({ message: "Helper deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting helper", error: error.message });
  }
};

import { shareTodoListWithUser, getSharedCategoy } from "../services/sharedService.js";

export const shareTodoList = async (req, res) => {
  try {
    const shared = await shareTodoListWithUser(req.body);
    res.status(200).json(shared);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listSharedCategoy = async (req, res) => {
  //const userSessionId = req.userId;
  try {
    const todoLists = await getSharedCategoy(req.userId);
    res.json(todoLists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

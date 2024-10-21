import db from '../models/index.js';
const Item = db.Item;
import { Op } from 'sequelize';

const createItem = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required and should not be empty' });
    }

    const createdItems = await Promise.all(
      items.map(async (itemName) => {
        if (itemName) {
          return Item.create({ itemName });
        }
      })
    );

    res.status(201).json(createdItems);
  } catch (error) {
    console.error('Error creating items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getByItemName = async (req, res) => {
  try {
    const itemName = req.params.itemName.trim();

    console.log('Searching for itemName:', itemName);

    const item = await Item.findOne({
      where: {
        itemName: {
          [Op.like]: `%${itemName}%` 
        }
      }
    });

    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error retrieving item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (itemName) {
      item.itemName = itemName;
      await item.save();
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export {
  createItem,
  getAllItems,
  getItemById,
  getByItemName,
  updateItem,
  deleteItem
};

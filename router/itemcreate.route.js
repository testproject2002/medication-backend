import express from 'express';
import {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    getByItemName,
  } from '../controllers/itemcreation.controller.js';
const router = express.Router();

router.post('/items', createItem);
router.get('/items', getAllItems);
router.get('/itemsbyid/:id', getItemById);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.get('/byname/:itemName', getByItemName);

export default router;

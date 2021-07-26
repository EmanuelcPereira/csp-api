import { Router } from 'express';

import ContactController from '../controllers/contactController';

const contactsRouter = Router();
const contactsController = new ContactController();

contactsRouter.post('/', contactsController.create);

export default contactsRouter;

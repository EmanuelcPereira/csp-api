import contactsRouter from '@modules/contacts/infra/http/routes/contacts.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/contacts', contactsRouter);

export default routes;

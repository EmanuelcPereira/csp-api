import CreateContactService from '@modules/contacts/services/CreateContactService';
import ListContactService from '@modules/contacts/services/ListContactService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ContactController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, phones } = request.body;
      const createContactService = container.resolve(CreateContactService);

      const contact = await createContactService.execute({
        firstName,
        lastName,
        email,
        phones,
      });

      return response.status(201).json(contact);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  public async ListContact(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { firstName, email } = request.query;

      const listContactService = container.resolve(ListContactService);

      const contact = await listContactService.execute({
        firstName: firstName as string,
        email: email as string,
      });

      return response.json(contact);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export default ContactController;

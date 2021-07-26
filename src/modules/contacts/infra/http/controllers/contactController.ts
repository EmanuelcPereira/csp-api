import CreateContactService from '@modules/contacts/services/CreateContactService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ContactController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, phone } = request.body;

      const createContactService = container.resolve(CreateContactService);

      const contact = await createContactService.execute({
        firstName,
        lastName,
        email,
        phone,
      });

      return response.status(201).json(contact);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export default ContactController;

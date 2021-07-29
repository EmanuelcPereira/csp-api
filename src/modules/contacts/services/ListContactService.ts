import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import Phone from '@modules/contacts/infra/typeorm/entities/Phone';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IPhonesRepository from '@modules/contacts/repositories/IPhonesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  firstName?: string;
  email?: string;
}

interface IResponse {
  contactDate: {
    contact: Contact;
    phone: Phone;
  };
}

@injectable()
class ListContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) { }

  public async execute({ firstName, email }: IRequest): Promise<IResponse> {
    const contact = await this.contactsRepository.findRegistered(
      firstName,
      email,
    );

    if (contact?.id !== undefined) {
      const contact_id = contact?.id;
      const phone = await this.phonesRepository.findById(contact_id);
      const contactData = {
        contact,
        phone,
      };

      return contactData;
    }
  }
}

export default ListContactService;

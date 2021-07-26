import ContactsRepository from '../infra/typeorm/repositories/ContactsRepository';
import CreateContactService from './CreateContactService';

let contactsRepository: ContactsRepository;
let createContactService: CreateContactService;

describe('Create contact', () => {
  beforeEach(() => {
    contactsRepository = new ContactsRepository();
    createContactService = new CreateContactService(contactsRepository);
  });

  it('should be able to create a new contact', async () => {
    const contact = await createContactService.execute({
      firstName: 'Emanuel',
      lastName: 'Pereira',
      email: 'emanuelcdpr@gmail.com',
    });

    expect(contact).toHaveProperty('id');
  });
});

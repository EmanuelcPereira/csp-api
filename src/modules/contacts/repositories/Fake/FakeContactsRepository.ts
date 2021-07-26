import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import { v4 as uuid } from 'uuid';

class FakeContactsRepository implements IContactsRepository {
  contacts: Contact[] = [];

  public async create({
    firstName,
    lastName,
    email,
  }: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact();

    contact.id = uuid();
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.email = email;

    this.contacts.push(contact);

    return contact;
  }
  public async findByEmail(email: string): Promise<Contact | undefined> {
    throw new Error('Method not implemented.');
  }
  public async findById(id: string): Promise<Contact | undefined> {
    throw new Error('Method not implemented.');
  }
}

export default FakeContactsRepository;

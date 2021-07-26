import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import { getRepository, Repository } from 'typeorm';

import Contact from '../entities/Contact';

class ContactsRepository implements IContactsRepository {
  private repository: Repository<Contact>;

  constructor() {
    this.repository = getRepository(Contact);
  }

  public async create({
    firstName,
    lastName,
    email,
  }: ICreateContactDTO): Promise<Contact> {
    const contact = this.repository.create({
      firstName,
      lastName,
      email,
    });

    await this.repository.save(contact);

    return contact;
  }
  public async findByEmail(email: string): Promise<Contact | undefined> {
    throw new Error('Method not implemented.');
  }
  public async findById(id: string): Promise<Contact | undefined> {
    throw new Error('Method not implemented.');
  }
}

export default ContactsRepository;

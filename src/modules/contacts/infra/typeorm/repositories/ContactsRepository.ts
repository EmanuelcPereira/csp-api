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
    id,
    firstName,
    lastName,
    email,
  }: ICreateContactDTO): Promise<Contact> {
    const contact = this.repository.create({
      id,
      firstName,
      lastName,
      email,
    });

    await this.repository.save(contact);

    return contact;
  }
  public async findByEmail(email: string): Promise<Contact | undefined> {
    const contact = await this.repository.findOne({ email });

    return contact;
  }
  public async findById(id: string): Promise<Contact | undefined> {
    const contact = await this.repository.findOne({ id });

    return contact;
  }

  public async findRegistered(
    firstName?: string,
    email?: string,
  ): Promise<Contact | undefined> {
    const contactQuery = this.repository.createQueryBuilder('find');

    if (firstName) {
      contactQuery.where('firstName LIKE :firstName', {
        firstName: `%${firstName}%`,
      });
    }

    if (email) {
      contactQuery.where('email LIKE :email', { email: `%${email}%` });
    }

    const contact = contactQuery.getOne();

    return contact;
  }
}

export default ContactsRepository;

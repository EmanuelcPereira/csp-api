import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateContactDTO from '../dtos/ICreateContactDTO';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactRepository: IContactsRepository,
  ) { }
  public async execute({
    firstName,
    lastName,
    email,
  }: ICreateContactDTO): Promise<Contact> {
    const contactExists = await this.contactRepository.findByEmail(email);

    if (contactExists) {
      throw new AppError('Driver already registered');
    }

    const contact = this.contactRepository.create({
      firstName,
      lastName,
      email,
    });

    return contact;
  }
}

export default CreateContactService;

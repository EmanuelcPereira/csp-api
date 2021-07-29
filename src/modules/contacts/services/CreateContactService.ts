import IPhonesRepository from '@modules/contacts/repositories/IPhonesRepository';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';

import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  phones: string;
}

@injectable()
class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactRepository: IContactsRepository,
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) { }
  public async execute({
    firstName,
    lastName,
    email,
    phones,
  }: IRequest): Promise<void> {
    const id = uuid();
    const newPhone = phones.split(',');
    const contactExists = await this.contactRepository.findByEmail(email);

    if (contactExists) {
      throw new AppError('Contact already registered');
    }
    this.contactRepository.create({
      id,
      firstName,
      lastName,
      email,
    });
    const contact_id = id;
    newPhone.forEach(phone => {
      this.phonesRepository.createPhone({
        contact_id,
        phone,
      });
    });
  }
}

export default CreateContactService;

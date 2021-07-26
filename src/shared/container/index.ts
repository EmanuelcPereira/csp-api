import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);

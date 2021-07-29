import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import PhonesRepository from '@modules/contacts/infra/typeorm/repositories/PhonesRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IPhonesRepository from '@modules/contacts/repositories/IPhonesRepository';
import { container } from 'tsyringe';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
);

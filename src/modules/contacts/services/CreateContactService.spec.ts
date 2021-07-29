import AppError from '@shared/errors/AppError';

import FakeContactsRepository from '../repositories/Fake/FakeContactsRepository';
import FakePhonesRepository from '../repositories/Fake/FakePhonesRepository';
import CreateContactService from './CreateContactService';

let fakeContactsRepository: FakeContactsRepository;
let fakePhonesRepository: FakePhonesRepository;
let createContactService: CreateContactService;

describe('Create contact', () => {
  beforeEach(() => {
    fakeContactsRepository = new FakeContactsRepository();
    fakePhonesRepository = new FakePhonesRepository();
    createContactService = new CreateContactService(
      fakeContactsRepository,
      fakePhonesRepository,
    );
  });

  it('should be able to create a new contact', async () => {
    const contact = {
      firstName: 'Emanuel',
      lastName: 'Pereira',
      email: 'emanuelcd@gmail.com',
      phones: '64999051758, 649996251072',
    };
    await createContactService.execute({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phones: contact.phones,
    });

    const createdContact = await fakeContactsRepository.findByEmail(
      contact.email,
    );

    expect(createdContact).toHaveProperty('id');
  });

  it('should not be able to create a new contact with already registered email', async () => {
    const contact = {
      firstName: 'Emanuel',
      lastName: 'Pereira',
      email: 'emanuelcd@gmail.com',
      phones: '64999051758, 649996251072',
    };
    await createContactService.execute({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phones: contact.phones,
    });

    await expect(
      createContactService.execute({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phones: contact.phones,
      }),
    ).rejects.toEqual(new AppError('Contact already registered'));
  });
});

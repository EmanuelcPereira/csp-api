import ICreatePhoneDTO from '@modules/contacts/dtos/ICreatePhoneDTO';
import IPhonesRepository from '@modules/contacts/repositories/IPhonesRepository';
import { getRepository, Repository } from 'typeorm';

import Phone from '../entities/Phone';

class PhonesRepository implements IPhonesRepository {
  private repository: Repository<Phone>;

  constructor() {
    this.repository = getRepository(Phone);
  }

  public async createPhone({
    contact_id,
    phone,
  }: ICreatePhoneDTO): Promise<Phone> {
    const phoneNumber = this.repository.create({
      contact_id,
      phone,
    });

    await this.repository.save(phoneNumber);

    return phoneNumber;
  }

  public async findById(contact_id: string): Promise<Phone | undefined> {
    const contact = await this.repository.findOne({ contact_id });

    return contact;
  }
}

export default PhonesRepository;

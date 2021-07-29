import ICreatePhoneDTO from '@modules/contacts/dtos/ICreatePhoneDTO';
import Phone from '@modules/contacts/infra/typeorm/entities/Phone';
import IPhonesRepository from '@modules/contacts/repositories/IPhonesRepository';
import { v4 as uuid } from 'uuid';

class FakePhonesRepository implements IPhonesRepository {
  phones: Phone[] = [];

  public async createPhone({
    contact_id,
    phone,
  }: ICreatePhoneDTO): Promise<Phone> {
    const phoneNumber = new Phone();

    Object.assign(phoneNumber, {
      id: uuid(),
      contact_id,
      phone,
    });

    this.phones.push(phoneNumber);

    return phoneNumber;
  }
}

export default FakePhonesRepository;

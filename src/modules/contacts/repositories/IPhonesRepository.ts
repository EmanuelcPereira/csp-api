import ICreatePhoneDTO from '@modules/contacts/dtos/ICreatePhoneDTO';

import Phone from '../infra/typeorm/entities/Phone';

interface IContactsRepository {
  createPhone(data: ICreatePhoneDTO): Promise<Phone>;
}

export default IContactsRepository;

import ICreateContactDTO from '../dtos/ICreateContactDTO';
import Contact from '../infra/typeorm/entities/Contact';

interface IContactsRepository {
  create(data: ICreateContactDTO): Promise<Contact>;
  findByEmail(email: string): Promise<Contact | undefined>;
  findById(id: string): Promise<Contact | undefined>;
}

export default IContactsRepository;

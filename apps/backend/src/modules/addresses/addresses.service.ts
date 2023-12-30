import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import Address from './entities/address.entity';
import CreateAddressRequestDto from './dtos/create-address.request.dto';
import User from '../user/entities/user.entity';
import UpdateAddressRequestDto from './dtos/update-address.request.dto';

@Injectable()
export class AddressesService {
  private contextManager: EntityManager;

  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: EntityRepository<Address>,
  ) {
    this.contextManager = addressRepo.getEntityManager();
  }

  public async create(payload: CreateAddressRequestDto, user: User) {
    const address = this.addressRepo.create({ ...payload, user });
    await this.contextManager.persistAndFlush([address]);
    return Object.assign(address, { user: undefined });
  }

  public async getAll(id: string) {
    return await this.addressRepo.find({ user: { id } });
  }

  public async getOne(userId: string, id: string) {
    try {
      return await this.addressRepo.findOneOrFail({
        id,
        user: { id: userId },
      });
    } catch {
      throw new NotFoundException('Address did not found');
    }
  }

  public async update(
    id: string,
    payload: UpdateAddressRequestDto,
    userId: string,
  ) {
    try {
      const address = await this.addressRepo.findOneOrFail({
        id,
        user: { id: userId },
      });
      Object.assign(address, payload);
      await this.contextManager.flush();
      return address;
    } catch {
      throw new NotFoundException('Address did not found');
    }
  }

  public async delete(userId: string, id: string) {
    const address = await this.addressRepo.findOne({
      id,
      user: { id: userId },
    });

    if (!address) throw new NotFoundException('Address did not found');

    this.addressRepo.getEntityManager().removeAndFlush(address);

    return true;
  }
}

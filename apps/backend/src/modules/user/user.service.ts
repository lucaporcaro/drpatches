import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import User from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import GetUserResponseDto from './dtos/update-user-information.request.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) { }

  public async getUser(id: string) {
    return await this.userRepo.findOne({ id });
  }

  public async updateUserInformation(id: string, payload: GetUserResponseDto) {
    try {
      const user = await this.userRepo.findOne({ id });
      for (const key of Object.keys(payload)) {
        const payloadValue = key !== 'phone' ? payload[key] : payload[key].replaceAll(' ', '')
        if (user[key] != payloadValue)
          user[key] = payloadValue
      }
      await this.userRepo.getEntityManager().flush();
      return await this.getUser(id);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    this.logger.debug('Searching for all users');

    return await this.userRepository.find({ relations: ['calendarEvents'] });
  }

  async findOne(id: number): Promise<User> {
    this.logger.debug(`Searching for user with id: ${id}`);

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['calendarEvents'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    this.logger.debug(`Creating user with data: ${JSON.stringify(dto)}`);

    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      this.logger.warn(`User with email ${dto.email} already exists`);
      throw new BadRequestException(
        `User with email ${dto.email} already exists`,
      );
    }

    const user = this.userRepository.create(dto);

    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<boolean> {
    this.logger.debug(`Updating user with id: ${id}`);

    const user = await this.findOne(id);

    if (!dto || Object.keys(dto).length === 0) {
      this.logger.warn('No data provided');
      throw new BadRequestException('No data provided');
    }

    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (existingUser && existingUser.id !== id) {
        this.logger.warn(
          `Email ${dto.email} is already in use by another user`,
        );
        throw new BadRequestException(
          `Email ${dto.email} is already in use by another user`,
        );
      }
    }

    await this.userRepository.update(id, dto);

    return true;
  }

  async remove(id: number): Promise<boolean> {
    this.logger.debug(`Removing user with id: ${id}`);

    const user = await this.findOne(id);
    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.delete(id);

    return true;
  }
}

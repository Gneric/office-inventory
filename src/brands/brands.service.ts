import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandsRepository.create(createBrandDto);
    return this.brandsRepository.save(brand);
  }

  async findAll() {
    return await this.brandsRepository.find();
  }

  async findOne(id: string) {
    const brand = await this.brandsRepository.findOneBy({ id })
    if ( !brand ) throw new NotFoundException(`Brand with id: ${id} not found`)
    return brand
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne(id)
    await this.brandsRepository.merge(brand, updateBrandDto);
    return this.brandsRepository.save(brand);
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.brandsRepository.remove(brand);
    return
  }
}

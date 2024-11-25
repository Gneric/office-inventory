import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces/payload.interface';


@Injectable()
export class AuthService {

  constructor( 
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,

    private readonly jwtService: JwtService
  ){}

  async findOne( id: string ){
    const user = await this.userRepository.findOneBy({ id })
    if ( !user ) throw new NotFoundException(`User with id: ${id} not found`)
    return user
  }
 
  async loginUser( loginUserDTO : LoginUserDTO ){
    const user = await this.userRepository.findOne({
      where: {
        username: loginUserDTO.username,
      },
      select: { 
        id: true, username: true, 
        password: true, isActive: true
      }
    })

    if ( !user || !bcrypt.compareSync( loginUserDTO.password, user.password ) ) 
      throw new UnauthorizedException(`User not found`)

    if ( !user.isActive )
      throw new UnauthorizedException(`User is inactive, please contact support`)

    delete user.password
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  async getJwtToken( payload : JwtPayload ) {
    const token = this.jwtService.sign( payload )
    return token
  }

  async updateJWT( user : User ) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  async createUser( createUserDTO : CreateUserDTO ) {
    try {
      const user = await this.userRepository.create(createUserDTO)
      await this.userRepository.save(user)
      
      delete user.password
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
    } 
    catch(error) { 
      this.handleErrorException(error) 
    }
  }

  async updateUser( id : string, updateUserDTO : UpdateUserDTO ){
    try {
      const user = this.findOne( id )
      await this.userRepository.update(id, updateUserDTO)

      return {
        ...user,
        ...updateUserDTO
      }

    }
    catch(error) { 
      this.handleErrorException(error) 
    }
  }

  async deleteUser( id : string ){
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
  }

  private handleErrorException( error : any ) {
    if ( error.code === '23505' ) 
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException(`Unexpected error, check logs`)
  }

}

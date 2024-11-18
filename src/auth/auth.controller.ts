import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto';
import { GetUser } from './decorators/getUser.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  login( @Body() loginUserDTO: LoginUserDTO ){
    return this.authService.loginUser(loginUserDTO)
  }

  @Auth()
  @Get('checkStatus')
  updateJWT(@GetUser() user : User) {
    return this.authService.updateJWT(user)
  }

  @Auth()
  @Post('register')
  register( @Body() createUserDTO: CreateUserDTO ){
    return this.authService.createUser(createUserDTO)
  }

  @Auth()
  @Patch('update/:id')
  update( @Param('id', ParseUUIDPipe) id : string, @Body() updateUserDTo: UpdateUserDTO ){
    return this.authService.updateUser(id, updateUserDTo)
  }

  @Auth()
  @Delete('delete/:id')
  delete( @Param('id', ParseUUIDPipe) id : string ){
    return this.authService.deleteUser(id)
  }

  
}

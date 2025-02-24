import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
   
    @Post('register')
    @ApiOperation({description: "Register new user"})
    register(@Body() registerUserDto:RegisterUserDto):Promise<User> {
        console.log('register api');
        console.log(registerUserDto)
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    @ApiOperation({
        summary: "Admin, user can use this Api",
        description: "Login"})
    @ApiResponse({status: 201, description: "Login successful"})
    @ApiResponse({status: 401, description: "Login fail"})
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto:LoginUserDto): Promise<any> {
        console.log('login api')
        console.log(loginUserDto)
        return this.authService.login(loginUserDto)
    }

    @Post('refresh-token')
    @ApiOperation({description: "require new refresh token"})
    refreshToken(@Body() {refresh_token}):Promise<any>{
        console.log('refresh_token api')
        return this.authService.refreshToken(refresh_token)
    }
}

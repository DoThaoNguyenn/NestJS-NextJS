import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard)
    @ApiOperation({description: "List all users"})
    @ApiQuery({name: "page"})
    @ApiQuery({name: "items_per_page"})
    @ApiQuery({name: "search"})
    @Get()
    findAll(@Query() query: FilterUserDto):Promise<User[]>{
        console.log(query)
        return this.userService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({description: "Get detail user"})
    @Get(':id')
    findOne(@Param('id') id:string): Promise<User> {
        return this.userService.findOne(Number(id));
    }

    @UseGuards(AuthGuard)
    @ApiOperation({description: "Create new user"})
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.userService.create(createUserDto)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({description: "Update user informations"})
    @Put(':id')
    update(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
        return this.userService.update(Number(id), updateUserDto)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({description: "Delete user"})
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(Number(id))
    }

    @Post("upload-avatar")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar',
    {
        storage: storageConfig('avatar'),
        fileFilter:(req, file, cb) => {
              const ext = extname(file.originalname);
              const allowedExtArr = ['.jpg', '.png', '.jpeg']
              if (!allowedExtArr.includes(ext)){
                req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
                cb(null, false)
              }else{
                const fileSize = parseInt(req.headers['content-length']);
                if(fileSize > 1024 * 1024 * 5){
                    req.fileValidationError = "File size is too large. Accepted file size is less than 5 MB";
                    cb(null,false)
                }else{
                    cb(null, true)
                }
              }
        }
    }))
    uploadAvatar(@Req() req:any, @UploadedFile() file: Express.Multer.File){
        console.log("filesize", req.headers['content-length'])
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException("File is required")
        }
        this.userService.updateAvatar(req.user_data.id, file.destination + "/" + file.filename)
    }

}

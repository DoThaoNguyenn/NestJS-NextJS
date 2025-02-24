import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { FilterPostDto } from './dto/filter-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>
    
    ){}
    async create(userId: number, createPostDto: CreatePostDto): Promise<PostEntity>{
        const user = await this.userRepository.findOneBy({id:userId});

        try{
            const res = await this.postRepository.save({
                ...createPostDto, user
            })
            return await this.postRepository.findOneBy({id:res.id});
        }catch (error){
            throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST)
        }
    
    }
    async findAll(query: FilterPostDto): Promise<any>{
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const search = query.search || ""

        const skip = (page-1)*items_per_page;
        const [res, total] = await this.postRepository.findAndCount({
            where: [
                {title: Like('%' + search + "%")},
                {description: Like('%' + search + "%")}
            ],
            order: {created_at: "DESC"},
            take: items_per_page,
            skip: skip,
            relations: {
                user: true
            },
            select:{
                user:{
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    avatar: true,
                }
            }
        })
        const lastPage = Math.ceil(total/items_per_page)
        const nextPage = page + 1 > lastPage ? null : page + 1
        const prevpage = page - 1 < 1 ? null : page - 1

        return {
            data: res,
            total,
            currentPage: page,
            lastPage,
            nextPage,
            prevpage
        }
    }

    async findDetail(id: number): Promise<PostEntity>{
        return await this.postRepository.findOne({
            where: {id},
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name:true,
                    avatar: true,
                }
            }
        })
    }
    async 
}

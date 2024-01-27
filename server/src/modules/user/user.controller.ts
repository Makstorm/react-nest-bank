import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  RequestWithUser,
  IUserService,
  UserServiceTag,
  UserModel,
  UpdateUserDto,
} from '@domain';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../core';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Inject(UserServiceTag) private readonly service: IUserService;

  @ApiResponse({ type: UserModel })
  @Get()
  @UseGuards(JwtGuard)
  public async findOne(@Req() req: RequestWithUser) {
    const entity = await this.service.findById(req.user.id);
    return UserModel.formEntity(entity);
  }

  @ApiResponse({ type: UserModel })
  @Patch()
  @UseGuards(JwtGuard)
  public async update(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    const entity = await this.service.update(req.user.id, dto);

    return UserModel.formEntity(entity);
  }
}

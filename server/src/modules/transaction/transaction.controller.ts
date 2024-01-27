import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ITransactionService,
  TransactionServiceTag,
  CreateTransactionDto,
  TransactionModel,
  RequestWithUser,
  AccountRemplenishmentDto,
} from '@domain';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../core';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  @Inject(TransactionServiceTag) private readonly service: ITransactionService;

  @ApiResponse({ type: TransactionModel })
  @Post()
  @UseGuards(JwtGuard)
  public async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: RequestWithUser,
  ) {
    const entity = await this.service.create(createTransactionDto, req.user);
    return TransactionModel.formEntity(entity);
  }

  @ApiResponse({ type: TransactionModel })
  @Post('replenishment')
  @UseGuards(JwtGuard)
  public async accountRemplenishment(
    @Body() accountRemplenishmentDto: AccountRemplenishmentDto,
    @Req() req: RequestWithUser,
  ) {
    const entity = await this.service.accountRemplenishment(
      accountRemplenishmentDto,
      req.user,
    );
    return TransactionModel.formEntity(entity);
  }

  @ApiResponse({ type: [TransactionModel] })
  @Get()
  @UseGuards(JwtGuard)
  public async findAll(@Req() req: RequestWithUser) {
    const entities = await this.service.findAll(req.user.id);

    const result = entities.map((el) => TransactionModel.formEntity(el));

    return result;
  }

  @ApiResponse({ type: TransactionModel })
  @Get(':id')
  @UseGuards(JwtGuard)
  public async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return TransactionModel.formEntity(entity);
  }

  @ApiResponse({ type: TransactionModel })
  @Delete(':id')
  @UseGuards(JwtGuard)
  public async remove(@Param('id') id: string) {
    const entity = await this.service.remove(id);
    return TransactionModel.formEntity(entity);
  }
}

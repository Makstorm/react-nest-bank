import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Req,
} from '@nestjs/common';
import {
  ITransactionService,
  TransactionServiceTag,
  CreateTransactionDto,
  TransactionModel,
  RequestWithUser,
} from '@domain';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  @Inject(TransactionServiceTag) private readonly service: ITransactionService;

  @ApiResponse({ type: TransactionModel })
  @Post()
  public async create(@Body() createTransactionDto: CreateTransactionDto) {
    const entity = await this.service.create(createTransactionDto);
    return TransactionModel.formEntity(entity);
  }

  @ApiResponse({ type: [TransactionModel] })
  @Get()
  public async findAll(@Req() req: RequestWithUser) {
    console.log(req.user);
    const entities = await this.service.findAll();
    return entities.map((el) => TransactionModel.formEntity(el));
  }

  @ApiResponse({ type: TransactionModel })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const entity = await this.service.findOne(id);
    return TransactionModel.formEntity(entity);
  }

  @ApiResponse({ type: TransactionModel })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    const entity = await this.service.remove(id);
    return TransactionModel.formEntity(entity);
  }
}

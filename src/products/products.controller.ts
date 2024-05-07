import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  @MessagePattern({ cmd: 'create_product' })
  create(/* @Body() */ @Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'findAll_product' })
  findAll(/* @Query() */ @Payload() paginationdto: PaginationDto) {
    return this.productsService.findAll(paginationdto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'findOne_product' })
  findOne(/* @Param('id') */ @Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  update(
    /* @Param('id')id: string,
    @Body() updateProductDto: UpdateProductDto, */
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(/* @Param('id') */ @Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}

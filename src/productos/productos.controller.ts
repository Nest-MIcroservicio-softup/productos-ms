import { Controller } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from 'src/common/dtos';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //@Post()
  @MessagePattern({cmd:'crear-producto'})
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  //@Get()
  @MessagePattern({cmd:'obtener-producto'})
  findAll(@Payload() paginacionDto:PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }

  //@Get(':id')
  @MessagePattern({cmd:'obtener-producto-por-id'})
  findOne(@Payload('id') id: number) {
    return this.productosService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern({cmd:'actualizar-producto'})
  update(
      @Payload() updateProductoDto: UpdateProductoDto
  ) {
    return this.productosService.update(updateProductoDto.id, updateProductoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'eliminar-producto'})
  remove(@Payload('id') id: number) {
    return this.productosService.remove(+id);
  }
}

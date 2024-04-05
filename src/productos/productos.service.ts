import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';
import { PaginacionDto } from '../common/dtos';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit  {

  private readonly logger = new Logger(ProductosService.name);
  
  onModuleInit() {
    this.$connect();
    this.logger.log('Base de datos conectada')
  }


  create(createProductoDto: CreateProductoDto) {
    return this.producto.create({
      data: createProductoDto
    });
  }

  async findAll(paginacionDto: PaginacionDto) {

    const { pagina, limite } = paginacionDto;
    const totalPaginas = await this.producto.count({where: {disponible: true}});
    const ultimaPagina = Math.ceil(totalPaginas / limite);

    return {
      meta:{
        totalProductos : totalPaginas,
        paginaActual: pagina,
        ultimaPagina
      },
      data: await this.producto.findMany({
        skip: (pagina - 1) * limite,
        take: limite,
        where: {disponible: true}
      }),
    }
  }

  async findOne(id: number) {
    const producto = await this.producto.findUnique({
      where: {id , disponible: true}
    })

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`)
    }

    return producto;

  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {

    const {id : __, ...data} = updateProductoDto;
 
    await this.findOne(id);
    return this.producto.update({
      where: {id},
      data: data
    });

  }

  async remove(id: number) {
    await this.findOne(id);
    //return this.producto.delete({where: {id}});

    return this.producto.update({
      where: {id},
      data: {
        disponible: false
      }
    });
  }
}

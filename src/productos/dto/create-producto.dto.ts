import { Type } from 'class-transformer';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProductoDto {

    @IsString()
    public nombre: string;

    @IsNumber({
        maxDecimalPlaces: 0
    },
    )
    @Min(0)
    @Type(() => Number)
    public precio: number;
}

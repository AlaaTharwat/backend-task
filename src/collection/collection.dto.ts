import { IsOptional, IsString,} from 'class-validator';

class CreateColeectionDto {

  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public group: string;

}

export default CreateColeectionDto;

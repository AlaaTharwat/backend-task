import { IsOptional, IsString,} from 'class-validator';

class CreateUserDto {

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string [];

}

export default CreateUserDto;

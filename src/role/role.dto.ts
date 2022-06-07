import { IsOptional, IsString,} from 'class-validator';

class CreateRoleDto {

  @IsString()
  public role: string;

  @IsOptional()
  @IsString()
  public groupId: string;

}

export default CreateRoleDto;

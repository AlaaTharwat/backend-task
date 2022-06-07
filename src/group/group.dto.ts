import { IsOptional, IsString,} from 'class-validator';

class CreateGroupDto {

  @IsString()
  public name: string;

  @IsString()
  public collectionIds: string;

}

export default CreateGroupDto;

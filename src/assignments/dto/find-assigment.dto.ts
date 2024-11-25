import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentDto } from './create-assignment.dto';

export class FindAssignmentDto extends PartialType(CreateAssignmentDto) {}

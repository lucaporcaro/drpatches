import { ApiProperty } from "@nestjs/swagger";

export class AssignStripeIdDto {
  @ApiProperty()
  stripeId: string;
}

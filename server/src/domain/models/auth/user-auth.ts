import { ApiProperty } from '@nestjs/swagger';

export class UserAuth {
  @ApiProperty({
    type: String,
    description: 'A jwt encrypted token used for user auth',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  public accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

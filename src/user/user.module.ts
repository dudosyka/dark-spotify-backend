import { Module } from '@nestjs/common';
import { PlaylistModule } from './playlist/playlist.module';
import { RbacModule } from './rbac/rbac.module';

@Module({
  imports: [PlaylistModule, RbacModule]
})
export class UserModule {}

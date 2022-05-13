import { SetMetadata } from '@nestjs/common';

export const Rules = (...args: number[]) => SetMetadata('rules_key', args);

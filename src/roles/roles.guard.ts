import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard {
  constructor(private readonly reflector: Reflector) {}
}
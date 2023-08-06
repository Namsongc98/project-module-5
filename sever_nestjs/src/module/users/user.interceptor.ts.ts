import { Exclude } from 'class-transformer';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from "rxjs/operators"
import { plainToInstance } from "class-transformer"

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, handle: CallHandler): Observable<any> {
        return handle.handle().pipe(map((data: any) => {
            return plainToInstance(this.dto, data, {
                excludeExtraneousValues: true,
            })
        }),
        );
    }
}

import { Controller } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {

    constructor(
        private serviceStatus: StatusService
    ) { }
    
}

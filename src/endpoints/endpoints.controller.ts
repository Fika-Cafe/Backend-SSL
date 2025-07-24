import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EndpointsService } from './endpoints.service'
import { CreateEndpointDto } from './dto/create-endpoint.dto'

@Controller('endpoints')
export class EndpointsController {
  constructor(private readonly endpointsService: EndpointsService) {}

  @Get("/getAllEndpoints")
  getAllEndpoints() {
    return this.endpointsService.getAllEndpoints()
  }

  @Get("/getEndpointById/:id")
  getEndpointById(@Param('id') id: number) {
    return this.endpointsService.getEndpointById(id)
  }

  @Post("/createEndpoint")
  createEndpoint(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointsService.createEndpoint(createEndpointDto)
  }
}

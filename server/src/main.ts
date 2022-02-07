import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule, {cors: true})

  const config = new DocumentBuilder()
        .setTitle('Електронний документообіг (ЕДО)')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('066den')
        .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs/', app, document);
  //app.useGlobalGuards(JwtAuthGuard);

    //app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
}

start()
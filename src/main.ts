import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { GlobalExceptionFilter } from './common/filters/globalException.filter';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	// app.useGlobalFilters(new GlobalExceptionFilter());		// global级别的filter
	await app.listen(3000);
}
bootstrap();

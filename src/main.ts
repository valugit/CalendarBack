import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	app.enableCors();
	
	let port = process.env.PORT;
	if (port == null || port == '') {
		port = '3001';
	}
	await app.listen(port);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();

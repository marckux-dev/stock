import { HttpClient } from '../interfaces/http-client.interface';
import { InternalServerErrorException } from '@nestjs/common';

export class FetchAdapter implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new InternalServerErrorException(`Fetch error: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

}
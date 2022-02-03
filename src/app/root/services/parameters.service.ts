import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  static AppName="Template"
  static FooterText="©Template - Radosław Taborski - 2022"

  constructor() { }
}

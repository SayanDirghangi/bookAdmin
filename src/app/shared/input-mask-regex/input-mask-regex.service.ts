import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputMaskRegexService {

  constructor() { }

  alphaNumericMaskFunc(value: string) {
    const pattern = /^[a-zA-Z0-9]*$/;
    return pattern.test(value);
  }
  alphaMaskFunc(value: string) {
    const pattern = /^[a-zA-Z]*$/;
    return pattern.test(value);
  }
  numericMaskFunc(value: string) {
    const pattern = /^[0-9]*$/;
    return pattern.test(value);
  }
}

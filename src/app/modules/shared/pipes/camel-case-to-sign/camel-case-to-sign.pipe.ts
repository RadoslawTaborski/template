import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSign'
})
export class CamelCaseToSignPipe implements PipeTransform {

  transform(expression: string, sign: any) {
    return expression
        .replace(/[A-Z]/g, function (val: string) {
            return sign + val.toLowerCase();
        });
}

}

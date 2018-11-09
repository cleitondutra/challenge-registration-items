import * as moment from 'moment';

export class FormatUtilsService {
  /**
   * @param date Data a ser formatada
   * @returns 'DD/MM/YYYY'
   */
  static getDateFormatBr(date: any, format: any = 'YYYY-MM-DD') {
    return date ? moment(date, format).format('L') : '';
  }
}

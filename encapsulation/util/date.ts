import { convert, LocalDateTime } from 'js-joda';

export class DateService {
  static convertLocalDateTime2JsDate(localDateTime: LocalDateTime) {
    return convert(localDateTime).toDate();
  }
}

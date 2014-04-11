package sevenguis.flightbooker;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Util {

    private static final DateTimeFormatter format = DateTimeFormatter.ISO_LOCAL_DATE;

    static String dateToString(LocalDate date) {
        return date.format(format);
    }

    static LocalDate stringToDate(String string) {
        return LocalDate.from(format.parse(string));
    }

    static boolean isDateString(String string) {
        try {
            format.parse(string);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

}


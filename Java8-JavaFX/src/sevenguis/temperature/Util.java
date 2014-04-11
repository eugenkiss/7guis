package sevenguis.temperature;

public class Util {

    static double cToF(double celsius) {
        return (9/5d * celsius) + 32;
    }

    static double fToC(double fahrenheit) {
        return 5/9d * (fahrenheit - 32);
    }

    static String cToF(String celsius) {
        return String.valueOf(Math.round(cToF(Double.parseDouble(celsius))));
    }

    static String fToC(String fahrenheit) {
        return String.valueOf(Math.round(fToC(Double.parseDouble(fahrenheit))));
    }

    static boolean isNumeric(String string) {
        try {
            Double.parseDouble(string);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

}


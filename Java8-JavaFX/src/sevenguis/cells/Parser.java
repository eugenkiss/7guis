package sevenguis.cells;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Parser {

    private static Parser instance = new Parser();
    private static Tokenizer tokenizer;
    static {
        tokenizer = new Tokenizer();
        tokenizer.add("[a-zA-Z_]\\d+", Token.CELL);
        tokenizer.add("[a-zA-Z_]\\w*", Token.IDENT);
        tokenizer.add("-?\\d+(\\.\\d*)?", Token.DECIMAL);
        tokenizer.add("=", Token.EQUALS);
        tokenizer.add(",", Token.COMMA);
        tokenizer.add(":", Token.COLON);
        tokenizer.add("\\(", Token.OPEN_BRACKET);
        tokenizer.add("\\)", Token.CLOSE_BRACKET);
    }

    public static Formula parse(String formulaString) {
        return instance.parseFormula(formulaString);
    }


    String formulaString;
    LinkedList<Token> tokens;
    Token lookahead;

    private Parser() {}

    private Formula parseFormula(String formulaString) {
        this.formulaString = formulaString;

        try {
            tokenizer.tokenize(formulaString.replaceAll("\\s+",""));
        } catch (ParseError e) {
            System.out.println(e.getMessage());
        }
        this.tokens = tokenizer.getTokens();
        if (tokens.isEmpty()) return Formula.Empty;
        lookahead = this.tokens.getFirst();

        return formula();
    }

    private Formula formula() {
        switch(lookahead.token) {
            case Token.DECIMAL:
                String n = lookahead.sequence;
                nextToken();
                return new Number(Double.parseDouble(n));
            case Token.EQUALS:
                nextToken();
                return expression();
            case Token.EPSILON:
                return Formula.Empty;
            default:
                return new Textual(formulaString);
        }
    }

    private Formula expression() {
        switch(lookahead.token) {
            case Token.CELL:
                int c = lookahead.sequence.charAt(0) - 'A';
                int r = Integer.parseInt(lookahead.sequence.substring(1));
                nextToken();
                if (lookahead.token == Token.COLON) { // Range
                    nextToken();
                    if (lookahead.token == Token.CELL) {
                        int c2 = lookahead.sequence.charAt(0) - 'A';
                        int r2 = Integer.parseInt(lookahead.sequence.substring(1));
                        nextToken();
                        return new Range(new Coord(r, c), new Coord(r2, c2));
                    } else {
                        throw new ParseError("Incorrect Range: " + lookahead.sequence);
                    }
                } else {
                    return new Coord(r, c);
                }
            case Token.DECIMAL:
                Double d = Double.parseDouble(lookahead.sequence);
                nextToken();
                return new Number(d);
            case Token.IDENT:
                return application();
            default:
                throw new ParseError("Incorrect Expression: " + lookahead.sequence);
        }
    }

    private Formula application() {
        String opName = lookahead.sequence;
        nextToken();
        if (lookahead.token != Token.OPEN_BRACKET)
            throw new ParseError("No opening bracket: " + opName);
        nextToken();
        List<Formula> args = new ArrayList<Formula>();
        while (true) {
            if (lookahead.token == Token.EPSILON)
                throw new ParseError("No closing bracket");
            args.add(expression());
            if (lookahead.token == Token.COMMA) nextToken();
            if (lookahead.token == Token.CLOSE_BRACKET)
                return new Application(opName, args);
        }
    }

    private void nextToken() {
        tokens.pop();
        if (tokens.isEmpty()) lookahead = new Token(Token.EPSILON, "");
        else lookahead = tokens.getFirst();
    }

}

class ParseError extends RuntimeException {

    ParseError(String message) {
        super(message);
    }

}

class Token {

    public static final int EPSILON = 0;
    public static final int EQUALS = 1;
    public static final int IDENT = 2;
    public static final int DECIMAL = 3;
    public static final int OPEN_BRACKET = 4;
    public static final int CLOSE_BRACKET = 5;
    public static final int COMMA = 6;
    public static final int COLON = 7;
    public static final int CELL = 8;

    public final int token;
    public final String sequence;

    public Token(int token, String sequence) {
        this.token = token;
        this.sequence = sequence;
    }

}

class Tokenizer {

    private LinkedList<TokenInfo> tokenInfos;
    private LinkedList<Token> tokens;

    public Tokenizer() {
        tokenInfos = new LinkedList<TokenInfo>();
        tokens = new LinkedList<Token>();
    }

    public void add(String regex, int token) {
        tokenInfos.add(new TokenInfo(Pattern.compile("^("+regex+")"), token));
    }

    public void tokenize(String s) {
        tokens.clear();
        while (!s.equals("")) {
            boolean match = false;
            for (TokenInfo info : tokenInfos) {
                Matcher m = info.regex.matcher(s);
                if (m.find()) {
                    match = true;
                    String tok = m.group().trim();
                    tokens.add(new Token(info.token, tok));
                    s = m.replaceFirst("");
                    break;
                }
            }
            if (!match) throw new ParseError("Unexpected char in input: " + s);
        }
    }

    public LinkedList<Token> getTokens() {
        return tokens;
    }

    private static class TokenInfo {

        public final Pattern regex;
        public final int token;

        public TokenInfo(Pattern regex, int token) {
            super();
            this.regex = regex;
            this.token = token;
        }

    }

}

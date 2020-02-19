module.exports = {
    calculate: function inputEvent(value) {
        // let value = document.getElementById("calcid").value;
        // const dom =  document.getElementById("result");
        let txt = "";
        if(value.indexOf("/0") !== -1) {
            return Infinity;
        }
        try {
            let c = expressionCalc(value);

            txt = value + "=" + c;
            return c;
        } catch (e) {
            txt = value + "=" + "SyntaxError";
            return "SyntaxError";
        }
    }
};

var expressionCalc = (function () {

    var operatorTable;

    operatorTable = {
        '-': {
            priority: 1,
            handle: function (a, b) {
                return a - b;
            }
        },
        '+': {
            priority: 1,
            handle: function (a, b) {
                return a + b;
            }
        },
        '*': {
            priority: 2,
            handle: function (a, b) {
                return a * b;
            }
        },
        '/': {
            priority: 2,
            handle: function (a, b) {
                return a / b;
            }
        }
    };

    function postfix(expression) {
        var i, op, stack, output, n, char;

        stack = [];
        output = [];

        //去空白
        expression = expression.replace(/\s/g, '');

        function getn() {
            var n, c;

            n = '';

            while ((c = expression[i]) && /\w/.test(c)) {
                n += c;
                i++;
            }

            i--;

            return n;
        }

        function popstack(tobrace) {
            var o;

            while (stack.length) {
                if (tobrace) {
                    o = stack.pop();
                    if (o == '(') {
                        break;
                    }
                    output.push(o);
                } else if (operatorTable[stack[stack.length - 1]] && operatorTable[stack[stack.length - 1]].priority >= op) {
                    output.push(stack.pop());
                } else {
                    break;
                }
            }
        }

        for (i = 0; i < expression.length; i++) {
            char = expression[i];

            if (char == ")") {
                popstack(true);
            } else if (char == "(") {
                stack.push(char);
            } else if (operatorTable[char] && (op = operatorTable[char].priority)) {
                popstack();
                stack.push(char);
            } else {
                output.push(getn());
            }
        }

        op = -1;
        popstack();

        return output;
    }

    function calcStack(stack) {

        var n1, n2, r, output;

        if (!stack.length) return;

        output = [];

        for (i = 0; i < stack.length; i++) {
            n = stack[i];

            if (operatorTable[n]) {
                n2 = new Number(output.pop());
                n1 = new Number(output.pop());

                output.push(operatorTable[n].handle(n1, n2));
            } else {
                output.push(stack[i]);
            }
        }

        return output[0];
    }

    return function (expression) {
        return calcStack(postfix(expression));
    }
})();


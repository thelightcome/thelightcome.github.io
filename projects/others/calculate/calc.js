class Calc {
  constructor() {
    this.expression = '';
    this.selectionStart = undefined;
    this.brackets = 0;
    this.out_exp = null;
    this.result = '';
  }

  init_calc(wrapper) {
    let wrap = document.getElementById(wrapper);
    
    let label_out_exp = document.createElement('label');
    label_out_exp.classList.add('label_out_exp');
    this.out_exp = document.createElement('input');
    this.out_exp.type = 'text';
    label_out_exp.append(this.out_exp);
    wrap.append(label_out_exp);

    let main_btns = ['C',   '()', '%', '/', 
                     '7',   '8',  '9', '*', 
                     '4',   '5',  '6', '-', 
                     '1',   '2',  '3', '+',
                     '+/-', '0',  ',', '='];
    let wrap_btns = document.createElement('div');
    wrap_btns.classList.add('wrap_btns');
    for(let i of main_btns) {
      let btn = document.createElement('input');
      btn.type = 'button';
      btn.innerText = i;
      btn.value = i;
      wrap_btns.append(btn);
    }

    let additional_btns = ['1', '2'];
    let wrap_additional_btns = document.createElement('div');
    wrap_additional_btns.classList.add('wrap_additional_btns');
    for(let i of additional_btns) {
      let btn = document.createElement('input');
      btn.type = 'button';
      btn.innerText = i;
      btn.value = i;
      wrap_additional_btns.append(btn);
    }
    wrap_btns.append(wrap_additional_btns);
    wrap.append(wrap_btns);
    wrap.addEventListener('click', (e)=>{this.handler_click(e, this)});
  }

  handler_click(e, self) {
    e.preventDefault();

    let target = e.target;

    if(target.tagName != 'INPUT') return;

    if(target.type == 'text') {
      self.selectionStart = target.selectionStart;
    }
    else {
      self.selectionStart = self.selectionStart || self.expression.length;
    }
    let btn = target.value;
    switch (btn) {
      case 'C':
        this.clear();
        break;
      case '<-':
        this.backspace();
        break;
      case '.':
        this.wr_point(btn);
        break;
      case '9':
      case '8':
      case '7':
      case '6':
      case '5':
      case '4':
      case '3':
      case '2':
      case '1':
      case '0':
        this.wr_number(btn);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.operators(btn);
        return;
        break;
      case '+/-':
        this.chg_sign();
        return;
        break;
      default:
        return;
    }
    this.evaluate();
  }

  clear() {
    this.expression = '';
    this.selectionStart = undefined;
    this.brackets = 0;
  }

  backspace() {
    this.expression = this.expression.slice(0, this.selectionStart - 1) + this.expression.slice(this.selectionStart + 1);
    if(this.expression.length >= 0) {
      this.selectionStart -= 1;
    }
  }

  wr_point(btn) {
    if(this.expression == '' || isNaN(this.expression[this.selectionStart - 1])) {
      this.expression += '0' + btn;
      this.selectionStart += 2;
    }
    else if(!isNaN(this.expression[this.selectionStart - 1])) {
      this.expression = this.expression.slice(0, this.selectionStart) + btn + this.expression.slice(this.selectionStart);
      this.selectionStart += 1;
    }
    else {
      return;
    }
  }

  wr_number(btn) {
    if(this.expression[this.selectionStart - 1] == ')') {
      this.expression += '*' + btn;
    }
    else if (this.expression[this.selectionStart - 1] == '0' && this.expression.length == 1 || this.expression[this.selectionStart - 1] == '0' && (isNaN(this.expression[this.selectionStart - 2] && this.expression[this.selectionStart - 2] != '.'))) {
      return;
    }
    this.expression = this.expression.slice(0, this.selectionStart) + btn + this.expression.slice(this.selectionStart, );
    this.selectionStart += 1;
  }

  operators(btn) {
    if(!isNaN(this.expression[this.selectionStart - 1])) {
      this.expression = this.expression.slice(0, this.selectionStart) + btn + this.expression.slice(this.selectionStart, );
      this.out_exp.value = this.expression;
      this.selectionStart += 1;
    }
  }

  chg_sign() {
    if(!isNaN(this.expression) && this.expression >= '0') {
      this.expression = '(-' + this.expression;
      this.selectionStart += 2;
    }
    else if(this.expression[this.selectionStart - 1] != '.' && isNaN(this.expression[this.selectionStart - 1])) {
      this.expression = this.expression.slice(0, this.selectionStart) + '(-' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 2;
    }
    this.out_exp.value = this.expression;
  }

  evaluate() {
    try {
      this.result = eval(this.expression);
    }
    catch(err) {
      return "Error";
    }
    
    this.out_exp.value = this.expression;
  }
}

let calc = new Calc();
calc.init_calc('wrapper');
calc.clear();
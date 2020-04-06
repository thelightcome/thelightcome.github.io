function sin(x) {
  return Math.round(Math.sin(Math.floor(Math.PI * 100) / 100 * x / 180) * 100) / 100;
}

function cos(x) {
  return Math.round(Math.cos(Math.floor(Math.PI * 100) / 100 * x / 180) * 100) / 100;
}

function tan(x) {
  return Math.round(Math.tan(Math.floor(Math.PI * 100) / 100 * x / 180) * 100) / 100;
}

function arcsin(x) {
  return Math.round(Math.asin(x) / Math.PI * 180);
}

function arccos(x) {
  return Math.round(Math.acos(x) / Math.PI * 180);
}

function arctan(x) {
  return Math.round(Math.atan(x) / Math.PI * 180);
}

function ln(x) {
  return Math.round(Math.log(x) * 1000) / 1000;
}

function log(x) {
  return Math.round(Math.log10(x) * 1000) / 1000;
}

function abs(x) {
  return Math.abs(x);
}

function fact(x) {
  let total = 1;
  for(let i = 1; i <= x; i += 1) {
    total *= i;
  }
  return total;
}

function isAlpha(x) {
  if(x === undefined){
    return false;
  }
  return /^[a-z]*$/gi.test(x);
}

let PI = Math.round(Math.PI * 1000) / 1000;
let e = Math.round(Math.E * 1000) / 1000;

class Calculator {
  constructor(name, coord) {
    this.expression = '';
    this.result = '';
    this.selectionStart = undefined;
    this.brackets = 0;
    this.name = name ? name.length < 8 ? name: 'TEMP': 'TEMP';
    this.coord = coord;
  }

  init(wrapper) {
    let w = document.getElementById(wrapper);
    
    let out_exp = document.createElement('textarea');
    out_exp.classList.add('out_exp');
    out_exp.onkeydown = (e) => {
      e.preventDefault();
      return;
    }
    w.append(out_exp);

    out_exp.addEventListener('clickBtns', (e) => {
      e.target.value = this.expression;
      e.target.setSelectionRange(this.selectionStart, this.selectionStart);
      e.target.focus();
    });

    let result = document.createElement('input');
    result.type = 'text';
    result.classList.add('result');
    result.onkeydown = (e) => {
      e.preventDefault();
      return;
    }
    w.append(result);

    result.addEventListener('result', (e) => {
      e.target.value = this.result;
    });

    let w_btns = document.createElement('div');
    w_btns.classList.add('w_btns');

    let opt_btns = ['Backspace', this.name,'>>>'],
        gr_opt_btns = document.createElement('div');
    gr_opt_btns.classList.add('gr_opt_btns');
    for(let i of opt_btns) {
      let btn = document.createElement('input');
      btn.type = 'button';
      btn.innerText = i;
      btn.value = i;
      gr_opt_btns.append(btn);
    }
    w_btns.append(gr_opt_btns);

    let main_btns = ['C',   '()', 'mod', '/', 
                     '7',   '8',  '9',   '*', 
                     '4',   '5',  '6',   '-', 
                     '1',   '2',  '3',   '+',
                     '+/-', '0',  '.',   '='],
        gr_main_btns = document.createElement('div');
    gr_main_btns.classList.add('gr_main_btns');
    for(let i of main_btns) {
      let btn = document.createElement('input');
      btn.type = 'button';
      btn.innerText = i;
      btn.value = i;
      gr_main_btns.append(btn);
    }
    w_btns.append(gr_main_btns);

    let additional_btns = ['sin',    'cos',    'tan',
                           'sin^-1', 'cos^-1', 'tan^-1',
                           'ln',     'log',    '1/x', 
                           'x^y',    '!x',     '|x|', 
                           'PI',     'e',      'var'],
        gr_additional_btns = document.createElement('div');
    gr_additional_btns.classList.add('gr_additional_btns');
    for(let i of additional_btns) {
      let btn = document.createElement('input');
      btn.type = 'button';
      btn.innerText = i;
      btn.value = i;
      gr_additional_btns.append(btn);
    }
    w_btns.append(gr_additional_btns);

    w.append(w_btns);

    w.addEventListener('click', (e)=>{this.handler_click(e, out_exp, result)});
  }

  handler_click(e, out_exp, result) {
    e.preventDefault();

    let target = e.target;

    // if(target.tagName != 'TEXTAREA' && target.tagName != 'INPUT') return;

    if(target.tagName == 'TEXTAREA') {
      if(isAlpha(target.value[target.selectionStart - 1])) {
        e.target.setSelectionRange(this.selectionStart, this.selectionStart);
      }
      else {
        this.selectionStart = target.selectionStart;
      }
    }
    else {
      if(this.selectionStart !== undefined){
        this.selectionStart = this.selectionStart;
      }
      else{
        this.selectionStart = this.expression.length;
      }
    }

    let btn = target.value;
    switch (btn) {
      case 'Backspace':
        this.backspace();
        break;
      case '>>>':
      case '<<<':
        this.show_additional_btns(target);
        break;
      case 'WoW':
        this.get_func();
        break;
      case 'C':
        this.clear();
        break;
      case '()':
        this.put_brackets();
        break;
      case 'mod':
        this.put_module();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.operators(btn);
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
      case '.':
        this.wr_point(btn);
        break;
      case '+/-':
        this.chg_sign();
        break;
      case '=':
        this.get_result();
        break;
      case 'sin':
        this.g_sin();
        break;
      case 'cos':
        this.g_cos();
        break;
      case 'tan':
        this.g_tan();
        break;
      case 'sin^-1':
        this.g_arcsin();
        break;
      case 'cos^-1':
        this.g_arccos();
        break;
      case 'tan^-1':
        this.g_arctan();
        break;
      case 'ln':
        this.g_ln();
        break;
      case 'log':
        this.g_log();
        break;
      case '1/x':
        this.b_f();
        break;
      case 'x^y':
        this.g_pow();
        break;
      case '|x|':
        this.abs();
        break;
      case 'PI':
        this.p_pi();
        break;
      case 'e':
        this.p_e();
        break;
      case '!x':
        this.factarial();
        break;
      case 'var':
        this.variable();
        break;
      default:
        break;
    }

    out_exp.dispatchEvent(new CustomEvent("clickBtns"));
    result.dispatchEvent(new CustomEvent("result"));
  }

  backspace() {
    if(this.expression.length > 0) {
      if(this.expression[this.selectionStart - 1] == ')'){
        this.brackets += 1;
      }
      else if(this.expression[this.selectionStart - 1] == '('){
        this.brackets -= 1;
      }
      this.expression = this.expression.slice(0, this.selectionStart - 1) + this.expression.slice(this.selectionStart);
      this.selectionStart -= 1;
    }
  }

  get_func() {
    this.coord.add_func(this.expression);
  }

  show_additional_btns(target) {
    let gr_additional_btns = document.getElementsByClassName("gr_additional_btns")[0];
    gr_additional_btns.classList.toggle('active');
    if(target.value == '>>>'){
      target.value = '<<<';
    }
    else{
      target.value = '>>>';
    }
  }

  clear() {
    this.expression = '';
    this.result = '';
    this.selectionStart = undefined;
    this.brackets = 0;
  }

  put_brackets() {
    if(!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == ')'){
      if(this.brackets != 0) {
        this.expression = this.expression.slice(0, this.selectionStart) + ')' + this.expression.slice(this.selectionStart, );
        this.brackets -= 1;
        this.selectionStart += 1;
      }
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + '(' + this.expression.slice(this.selectionStart, );
      this.brackets += 1;
      this.selectionStart += 1;
    }
  }

  put_module() {
    if(!isNaN(this.expression[this.selectionStart - 1])) {
      this.expression = this.expression.slice(0, this.selectionStart) + '%' + this.expression.slice(this.selectionStart);
      this.selectionStart += 1;
    }
  }

  operators(btn) {
    if(!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == ')') {
      this.expression = this.expression.slice(0, this.selectionStart) + btn + this.expression.slice(this.selectionStart, );
      this.selectionStart += 1;
    }
  }

  wr_number(btn) {
    if(this.expression[this.selectionStart - 1] == ')') {
      this.expression += '*' + btn;
      this.selectionStart += 2;
    }
    else if (this.expression[this.selectionStart - 1] == '0' && this.expression.length == 1 || this.expression[this.selectionStart - 1] == '0' && (isNaN(this.expression[this.selectionStart - 2] && this.expression[this.selectionStart - 2] != '.'))) {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + btn + this.expression.slice(this.selectionStart, );
      this.selectionStart += 1;
    }
  }

  wr_point(btn) {
    let str = this.expression.slice(0, this.selectionStart),
    i = str.length;
    do {
      if(this.expression[i - 1] == '.'){
        return;
      }
      i -= 1;
    }while((!isNaN(this.expression[i])))

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

  chg_sign() {
    // if(!isNaN(this.expression)) {
    //   this.expression = '(-' + this.expression;
    //   this.selectionStart += 2;
    //   this.brackets += 1;
    // }
    // else if(isNaN(this.expression[this.selectionStart - 1]) && (!isNaN(this.expression[this.selectionStart + 1]) || this.expression[this.selectionStart + 1] == undefined)) {
    //   this.expression = this.expression.slice(0, this.selectionStart) + '(-' + this.expression.slice(this.selectionStart, );
    //   this.selectionStart += 2;
    //   this.brackets += 1;
    // }
    let str = this.expression.slice(0, this.selectionStart),
        i = str.length;
    while((!isNaN(str[i - 1]) || str[i - 1] == '.')) {
      i -= 1;
    }
    this.expression = this.expression.slice(0, i) + '(-' + this.expression.slice(i, );
    this.selectionStart += 2;
    this.brackets += 1;
  }

  get_result() {
    if(!this.expression){
      return;
    }
    try{
      let result = eval(this.expression);
      if(!result && result === '0') {
        this.result = 'Не вычисляемое выражение!';
      }
      else{
        this.result = result;
      }
    }catch (e) {
      if(this.expression.indexOf('(x)') != -1) {
        this.result = 'Переменное (x) не объявлено!';
      } else{
        this.result = 'Выражение неправильное!';
      }
    }
  }

  g_sin() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*sin(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'sin(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
      this.brackets += 1;
    }
  }

  g_cos() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*cos(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'cos(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
      this.brackets += 1;
    }
  }

  g_tan() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*tan(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'tan(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
      this.brackets += 1;
    }
  }

  g_arcsin() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*arcsin(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 8;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'arcsin(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 7;
      this.brackets += 1;
    }
  }

  g_arccos() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*arccos(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 8;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'arccos(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 7;
      this.brackets += 1;
    }
  }

  g_arctan() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*arctan(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 8;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'arctan(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 7;
      this.brackets += 1;
    }
  }

  g_ln() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*ln(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'ln(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 3;
      this.brackets += 1;
    }
  }

  g_log() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*log(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) && this.expression[this.selectionStart - 1] != '(') || this.expression[this.selectionStart - 1] == '.') {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'log(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
      this.brackets += 1;
    }
  }

  b_f() {
    let str = this.expression.slice(0, this.selectionStart),
        i = str.length;
    while((!isNaN(str[i - 1]) || str[i - 1] == '.')) {
      i -= 1;
    }
    this.expression = this.expression.slice(0, i) + '(1/' + this.expression.slice(i, );
    this.selectionStart += 3;
    this.brackets += 1;
  }

  g_pow() {
    if(!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '**' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 2;
    }
  }

  abs() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*abs(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == '.')) {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'abs(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
      this.brackets += 1;
    }
  }

  p_pi() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*(PI)' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == '.')) {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + '(PI)' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
    }
  }

  p_e() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*(e)' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == '.')) {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + '(e)' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 3;
    }
  }

  factarial() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*fact(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 6;
      this.brackets += 1;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == '.')) {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + 'fact(' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 5;
      this.brackets += 1;
    }
  }

  variable() {
    if(this.expression[this.selectionStart - 1] == ')'){
      this.expression = this.expression.slice(0, this.selectionStart) + '*(x)' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 4;
    }
    else if((!isNaN(this.expression[this.selectionStart - 1]) || this.expression[this.selectionStart - 1] == '.')) {
      return;
    }
    else {
      this.expression = this.expression.slice(0, this.selectionStart) + '(x)' + this.expression.slice(this.selectionStart, );
      this.selectionStart += 3;
    }
  }
}
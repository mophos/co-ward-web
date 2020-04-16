import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEnNoSpace]'
})
export class EnNoSpaceDirective {

  private regex: RegExp = new RegExp(/^([a-z]*){0,1}$/g);
  // private regex: RegExp = new RegExp(/^[a-zA-Z]+$/g);
  // private regex: RegExp = new RegExp(/^[a-zA-Z]+$/);
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const e: any = event;
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: 0-9 numpad
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // // Allow: 0-9 numpad
      // (e.keyCode >= 96 && e.keyCode <= 105) ||
      // // Allow: 0-9
      // (e.keyCode >= 48 && e.keyCode <= 57) ||
      // // Allow: a-z
      // (e.keyCode >= 65 && e.keyCode <= 90)) {
      // let it happen, don't do anything
      return;
    }
    const ascii = e.key.charCodeAt(0);
    if (
      (ascii >= 97 && ascii <= 122) ||
      (ascii >= 48 && ascii <= 57)) {
      return;
    } else {
      e.preventDefault();
    }
    const ch = String.fromCharCode(e.keyCode);
    // const regEx = new RegExp(this.regex);
    // // // เช็คว่าเป็นตัวเลขหรือไม่
    // if (e.keyCode >= 65 && e.keyCode <= 122) {
    //   e.preventDefault();
    // if (regEx.test(ch)) {
    //   return;
    // } else {
    //   e.preventDefault();
    // }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: KeyboardEvent) {
    this.el.nativeElement.select();
  }
}

import { Injectable, HostListener } from '@angular/core';

// import { default as swal } from 'sweetalert2';
// import Swal from 'sweetalert2';
const Swal = require('sweetalert2')
@Injectable()
export class AlertService {

  btn: boolean;
  constructor() { }

  error(text: any = 'เกิดข้อผิดพลาด', title: any = '') {

    const option: any = {
      title,
      text,
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    Swal.fire(option);

  }

  success(title = 'ดำเนินการเสร็จเรียบร้อย', text = '') {

    const option: any = {
      title,
      text,
      timer: 3000,
      type: 'success',
      confirmButtonText: 'ตกลง'
    };
    Swal.fire(option);

  }

  serverError() {

    const option: any = {
      title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    Swal.fire(option);

  }

  async confirm(text = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?', ) {
    const option: any = {
      title: '',
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };

    return Swal.fire(option).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }

  async deleted(text = 'คุณต้องการลบ ใช่หรือไม่?') {

    const option: any = {
      title: '',
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };

    return Swal.fire(option).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const Swal = require('sweetalert2')

@Injectable({
  providedIn: 'root'
})
export class NewAlertService {

  constructor(
    private router: Router
  ) { }

  warningBedType (title, text) {
    const option: any = {
      title: `<p style="font-size: 28px; font-weight: 600;"> ${title} </p>`,
      html: `<p style="font-size: 24px;"> ${text} </p>`,
      icon: 'warning',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '<div style="font-size: 20px;"> ตกลง </div>',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<div style="font-size: 20px;"> ยกเลิก </div>',
      cancelButtonColor: '#d33',
      width: 600,
    }

    Swal.fire(option).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/staff2/setting/beds'])
      }
    })
  }

}

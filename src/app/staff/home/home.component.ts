import { BasicService } from './../services/basic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BedService } from './../bed.service';
import { Component, OnInit } from '@angular/core';
import { CovidCaseService } from './../services/covid-case.service';
import { AlertService } from './../../help/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  list: any = [];
  alertBed = false;
  // url: any = 'https://ops.moph.go.th/public/index.php/Portal_covid19_link_staff#';
  url: any = 'https://www.youtube.com/';

  gcsSum = [];
  BedsSum = [];
  medicalSuppliesSum = [];
  date: any;
  token: any;
  public jwtHelper = new JwtHelperService();
  isHospital = true;
  constructor(
    private alertService: AlertService,
    private basicService: BasicService,
    private covidCaseService: CovidCaseService,
    private bedService: BedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // const params = this.route.snapshot.params;
    // this.token = params.token;
    this.token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImZuYW1lIGxuYW1lIiwiZm5hbWUiOiJmbmFtZSIsImxuYW1lIjoibG5hbWUiLCJ0aXRsZV9uYW1lIjoi4LiULuC4ii4iLCJpZCI6MSwiaG9zcGl0YWxJZCI6NTIyNzksImhvc3BUeXBlQ29kZSI6IjE5IiwicHJvdmluY2VDb2RlIjoiNzQiLCJ0eXBlIjoiU1RBRkYiLCJob3NwY29kZSI6IkY1MDAzIiwiaG9zcG5hbWUiOiLguKjguLnguJnguKLguYzguKvguYjguKfguIfguYPguKLguITguJnguKrguLLguITguKMg4Lin4Lix4LiU4LmC4LiB4Lij4LiB4LiB4Lij4Liy4LiBIiwicG9zaXRpb24iOiLguJnguLLguKLguYHguJ7guJfguKLguYwiLCJlbWFpbCI6InRlc3QiLCJyaWdodHMiOlt7ImlkIjoxLCJ1c2VyX2lkIjoxLCJyaWdodF9pZCI6MSwidXBkYXRlX2RhdGUiOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYnkiOm51bGwsIm5hbWUiOiJTVEFGRl9DT1ZJRF9DQVNFIiwibmFtZV9tZW51Ijoi4LmA4Lih4LiZ4Li54Lia4Lix4LiZ4LiX4Li24LiB4Lic4Li54LmJ4Lib4LmI4Lin4Lii4LmD4Lir4Lih4LmIL-C4nOC4ueC5ieC4m-C5iOC4p-C4ouC5gOC4geC5iOC4si_guJzguLnguYnguJvguYjguKfguKLguJfguLHguYnguIfguKvguKHguJQiLCJjb21tZW50Ijoi4Lic4Li54LmJ4Lib4LmI4Lin4LiiIENPVklEIiwidHlwZSI6IlNUQUZGIn0seyJpZCI6MiwidXNlcl9pZCI6MSwicmlnaHRfaWQiOjIsInVwZGF0ZV9kYXRlIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJ1cGRhdGVkX2J5IjpudWxsLCJuYW1lIjoiU1RBRkZfQ09WSURfQ0FTRV9TVEFUVVMiLCJuYW1lX21lbnUiOiLguYDguKHguJnguLnguKrguJbguLLguJnguLDguJzguLnguYnguJvguYjguKfguKLguKPguLLguKLguKfguLHguJkiLCJjb21tZW50Ijoi4Liq4LiW4Liy4LiZ4Liw4Lic4Li54LmJ4Lib4LmI4Lin4LiiIENPVklEIiwidHlwZSI6IlNUQUZGIn0seyJpZCI6NiwidXNlcl9pZCI6MSwicmlnaHRfaWQiOjYsInVwZGF0ZV9kYXRlIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJ1cGRhdGVkX2J5IjpudWxsLCJuYW1lIjoiU1RBRkZfU1RPQ0tfU1VQUExJRVMiLCJuYW1lX21lbnUiOiLguYDguKHguJnguLnguKrguJbguLLguJnguLDguYDguKfguIrguKDguLHguJPguJHguYwiLCJjb21tZW50Ijoi4Liq4LiW4Liy4LiZ4Liw4LmA4Lin4LiK4Lig4Lix4LiT4LiR4LmMIiwidHlwZSI6IlNUQUZGIn0seyJpZCI6MTEsInVzZXJfaWQiOjEsInJpZ2h0X2lkIjoxMSwidXBkYXRlX2RhdGUiOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYnkiOm51bGwsIm5hbWUiOiJTVEFGRl9TRVRUSU5HX0JBU0lDIiwibmFtZV9tZW51Ijoi4LmA4Lih4LiZ4Li54LiV4Lix4LmJ4LiH4LiE4LmI4Liy4LiC4LmJ4Lit4Lih4Li54Lil4Lie4Li34LmJ4LiZ4LiQ4Liy4LiZIiwiY29tbWVudCI6IuC4leC4seC5ieC4h-C4hOC5iOC4suC4guC5ieC4reC4oeC4ueC4peC4nuC4t-C5ieC4meC4kOC4suC4mSIsInR5cGUiOiJTVEFGRiJ9LHsiaWQiOjEyLCJ1c2VyX2lkIjoxLCJyaWdodF9pZCI6MTIsInVwZGF0ZV9kYXRlIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJ1cGRhdGVkX2J5IjpudWxsLCJuYW1lIjoiU1RBRkZfU0VUVElOR19CRURTIiwibmFtZV9tZW51Ijoi4LmA4Lih4LiZ4Li54LiV4Lix4LmJ4LiH4LiE4LmI4Liy4LmA4LiV4Li14Lii4LiHIiwiY29tbWVudCI6IuC4leC4seC5ieC4h-C4hOC5iOC4suC4guC5ieC4reC4oeC4ueC4peC5gOC4leC4teC4ouC4h-C4nOC4ueC5ieC4m-C5iOC4p-C4oiIsInR5cGUiOiJTVEFGRiJ9LHsiaWQiOjIxLCJ1c2VyX2lkIjoxLCJyaWdodF9pZCI6MjEsInVwZGF0ZV9kYXRlIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJ1cGRhdGVkX2J5IjpudWxsLCJuYW1lIjoiU1RBRkZfQ09WSURfQ0FTRV9SRVFVSVNJVElPTiIsIm5hbWVfbWVudSI6IuC5gOC4oeC4meC4ueC4o-C4suC4ouC4geC4suC4o-C4iOC5iOC4suC4ouC4ouC4suC5geC4peC4sOC5gOC4p-C4iuC4oOC4seC4k-C4keC5jCIsImNvbW1lbnQiOiLguKPguLLguKLguIHguLLguKPguIjguYjguLLguKLguKLguLLguYHguKXguLDguYDguKfguIrguKDguLHguJPguJHguYwiLCJ0eXBlIjoiU1RBRkYifSx7ImlkIjoyMiwidXNlcl9pZCI6MSwicmlnaHRfaWQiOjIyLCJ1cGRhdGVfZGF0ZSI6bnVsbCwiY3JlYXRlZF9ieSI6bnVsbCwidXBkYXRlZF9ieSI6bnVsbCwibmFtZSI6IlNUQUZGX1NVUkdJQ0FMX1NQSFAiLCJuYW1lX21lbnUiOiLguYDguKHguJnguLnguJrguLHguJnguJfguLbguIHguKPguLLguKLguIHguLLguKPguIjguYjguLLguKLguYPguKvguYnguIHguLHguJog4Lij4Lie4Liq4LiVIiwiY29tbWVudCI6IuC4muC4seC4meC4l-C4tuC4geC4o-C4suC4ouC4geC4suC4o-C4iOC5iOC4suC4ouC5g-C4q-C5ieC4geC4seC4miDguKPguJ7guKrguJUiLCJ0eXBlIjoiU1RBRkYifSx7ImlkIjoyMywidXNlcl9pZCI6MSwicmlnaHRfaWQiOjIzLCJ1cGRhdGVfZGF0ZSI6bnVsbCwiY3JlYXRlZF9ieSI6bnVsbCwidXBkYXRlZF9ieSI6bnVsbCwibmFtZSI6IlNUQUZGX1NFVFRJTkdfTUVESUNBTF9TVVBQTElFIiwibmFtZV9tZW51Ijoi4LmA4Lih4LiZ4Li54LiV4Lix4LmJ4LiH4LiE4LmI4Liy4LiC4LmJ4Lit4Lih4Li54Lil4LmA4LiE4Lij4Li34LmI4Lit4LiH4Lih4Li34Lit4LiX4Liy4LiH4LiB4Liy4Lij4LmB4Lie4LiX4Lii4LmMIiwiY29tbWVudCI6IuC4leC4seC5ieC4h-C4hOC5iOC4suC4guC5ieC4reC4oeC4ueC4peC5gOC4hOC4o-C4t-C5iOC4reC4h-C4iuC5iOC4p-C4ouC4q-C4suC4ouC5g-C4iOC4nOC4ueC5ieC4m-C5iOC4p-C4oiIsInR5cGUiOiJTVEFGRiJ9LHsiaWQiOjI1LCJ1c2VyX2lkIjoxLCJyaWdodF9pZCI6MjUsInVwZGF0ZV9kYXRlIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJ1cGRhdGVkX2J5IjpudWxsLCJuYW1lIjoiU1RBRkZfU0VUVElOR19VU0VSUyIsIm5hbWVfbWVudSI6IuC5gOC4oeC4meC4ueC4leC4seC5ieC4h-C4hOC5iOC4suC4quC4tOC4l-C4mOC4tOC5jOC4nOC4ueC5ieC5g-C4iuC5ieC4h-C4suC4mSIsImNvbW1lbnQiOiLguIjguLHguJTguIHguLLguKMgdXNlciIsInR5cGUiOiJTVEFGRiJ9LHsiaWQiOjI2LCJ1c2VyX2lkIjoxLCJyaWdodF9pZCI6MjYsInVwZGF0ZV9kYXRlIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJ1cGRhdGVkX2J5IjpudWxsLCJuYW1lIjoiU1RBRkZfU0VUVElOR19QUk9GRVNTSU9OQUwiLCJuYW1lX21lbnUiOiLguYDguKHguJnguLnguJXguLHguYnguIfguITguYjguLLguJrguLjguITguKXguLLguIHguKMiLCJjb21tZW50Ijoi4LiV4Lix4LmJ4LiH4LiE4LmI4Liy4Lia4Li44LiE4Lil4Liy4LiB4LijIiwidHlwZSI6IlNUQUZGIn0seyJpZCI6MzgsInVzZXJfaWQiOjEsInJpZ2h0X2lkIjozOCwidXBkYXRlX2RhdGUiOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYnkiOm51bGwsIm5hbWUiOiJTVEFGRl9WSUVXX1BBVElFTlRfSU5GTyIsIm5hbWVfbWVudSI6IiIsImNvbW1lbnQiOiLguYDguKvguYfguJnguILguYnguK3guKHguLnguKXguITguJnguYTguILguYkiLCJ0eXBlIjpudWxsfV0sInpvbmVfY29kZSI6IjA1IiwiaG9zcGl0YWxUeXBlIjoiSE9TUElURUwiLCJtcXR0VG9waWMiOiJQUk9EXyIsInByb3ZpZGVyVHlwZSI6IkhPU1BJVEVMIiwiaWF0IjoxNjExNTYxMTgyLCJleHAiOjE2MTE2NDc1ODJ9.Hz18BHi7DxIoHtNBnDm7rb8nbhPc9hq0JmO7TPw-g6o`;
    console.log(this.token);
    // const decoded = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    // if (decoded.providerType === 'ZONE' || decoded.providerType === 'SSJ') {
    //   this.isHospital = false;
    // }

  }

  ngOnInit() {
    this.getDate();
    this.getList();
    this.getBed();
    this.getGCSSum();
    this.getBedSum();
    this.getMedicalSuppliesSum();
  }
  goToBed() {
    this.router.navigate(['/staff/setting/beds']);
  }

  async getDate() {
    try {
      const rs: any = await this.basicService.getDate(this.token);
      if (rs.ok) {
        this.date = rs.rows;
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  async getBed() {
    try {
      const rs: any = await this.bedService.getBeds(this.token);
      if (rs.ok) {
        if (!rs.rows.length) {
          this.alertBed = true;
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getList() {
    try {
      const rs: any = await this.covidCaseService.getListOldPatients(this.token);
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
  async getGCSSum() {
    try {
      const rs: any = await this.covidCaseService.getGCS(this.token);
      if (rs.ok) {
        this.gcsSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getBedSum() {
    try {
      const rs: any = await this.covidCaseService.getBeds(this.token);
      if (rs.ok) {
        this.BedsSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getMedicalSuppliesSum() {
    try {
      const rs: any = await this.covidCaseService.getVentilators(this.token);
      if (rs.ok) {
        this.medicalSuppliesSum = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

}

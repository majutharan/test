import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../_services/company.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Company} from '../_models/Company';
import {NgModel} from '@angular/forms';
import {close} from 'fs';
import {ModalDirective} from 'ngx-bootstrap';
import {ProjectService} from '../_services/project.service';
import {Project} from '../_models/Project';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'company-view.component.html',
  providers: [CompanyService, ProjectService, UserService],
})

export class CompanyViewComponent implements OnInit {
  submitted = false;
  isUpdateButtonClicked = false;
  isAddButtonClicked = false;
  model: Company = new Company();
  projectmodel: Project = new Project();
  loading = false;
  public isCollapsed = true;
  allCompanies: Company[];
  allProject: Project[];
  public alerts: any = [];
  dis = false;
  isCreateUser = false;
  isUpdateUser = false;
  isBackUser = false;
  usermodel: User = new User();

  createProjectForCompanyId: string;
  createUserForCompanyId: string;
  roleId: string;

  /*isShowingForm= false;*/
  /*@ViewChild('staticModal') public staticModal: ModalDirective;
  @ViewChild('staticModal1') public staticModal1: ModalDirective;
  @ViewChild('userModal') public userModal: ModalDirective;*/

  constructor(private router: Router,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private projectService: ProjectService,
              private userService: UserService,
              private _location: Location) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['cid']; // (+) converts string 'id' to a number
      console.log('Id..........' + id);
      this.companyService.view(id)
        .subscribe(
          data => {
            console.log('all_company');
            console.log(data);
            this.model = data;

          });
      // In a real app: dispatch action to load the details here.
    });

  }

 /* /!* deleteCompany(cid: number) {
     this.companyService.deleteCompany(cid).subscribe(data => {
         // set success message and pass true paramater to persist the message after redirecting to the login page
         console.log('load...');
         console.log(data);
       },
       error => {
         console.log('error...' + error);
       },
       () => {
         console.log('complete...');
         this.loadAllCompany();
       });

   }*!/

  /!* register() {
     this.dis = false;
     this.submitted = true;
     this.staticModal.hide();
     this.companyService.create(this.model)
       .subscribe(
         data => {
           // set success message and pass true paramater to persist the message after redirecting to the login page
           this.loadAllCompany();
           this.companyAlert();
         },
         error => {
           this.loading = false;
           this.companyError();
         });
   }*!/

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  viewBtn(cid: number) {


  }


  /!*closeform() {
      this.isShowingform = true;
  }*!/
  showUpdateCompany(company: Company) {
    this.isUpdateButtonClicked = true;
    this.isAddButtonClicked = false;
    this.model = company;
    this.staticModal.show();
    this.submitted = false;
  }

  openAddNewWindow() {
    this.model = new Company();
    this.staticModal.show();
    this.isAddButtonClicked = true;
    this.isUpdateButtonClicked = false;
  }

  createAccount() {
  }

  updateAccount() {
    this.staticModal.hide();
  }

  openAddProjectModal(id: string) {
    this.createProjectForCompanyId = id;
    this.projectmodel = new Project();
    this.staticModal1.show();
  }

  /!*registerProject() {
    this.projectService.create(this.projectmodel, this.createProjectForCompanyId).subscribe(data => {
        // Show success message
        this.loadAllCompany();
        this.projectAlert();
      },
      error => {
        // show error message..
        this.projectError();
      }
    );

    this.staticModal1.hide();
  }*!/

  loadAllProjects() {
    this.projectService.getAll().subscribe(
      data => {
        this.allProject = data;
      }
    );
  }

  openAddUserModal(id: string) {
    this.userModal.show();
    this.isUpdateUser = true;
    this.isBackUser = true;
    this.createUserForCompanyId = id;
    this.usermodel = new User();
    this.model = new Company();
  }

  /!*registerUser() {
    this.userService.create(this.usermodel, this.createUserForCompanyId).subscribe(data => {
      this.loadAllCompany();
      this.userAlert();
    }, error => {
      this.userError();
    });
    this.userModal.hide();

  }*!/

  setRole(id: string) {
    console.log('roleID..........' + id);
    this.roleId = id;
  }

  /!*!//alerts*!/
  projectAlert() {
    this.alerts.push({
      type: 'info',
      msg: `Project Successfully Created`,
      timeout: 1500
    });
  }

  public companyAlert(): void {
    this.alerts.push({
      type: 'info',
      msg: `Company Successfully Created`,
      timeout: 1500
    });
  }

  userAlert() {
    this.alerts.push({
      type: 'info',
      msg: `User Successfully Created`,
      timeout: 1500
    });
  }

  userError() {
    this.alerts.push({
      type: 'danger',
      msg: `User Server ERROR`,
      timeout: 1500
    });
  }

  companyError() {
    this.alerts.push({
      type: 'danger',
      msg: `Company server ERROR`,
      timeout: 1500
    });
  }

  projectError() {
    this.alerts.push({
      type: 'danger',
      msg: `Project Server ERROR`,
      timeout: 1500
    });
  }*/

  download() {
    console.log('Download.....');
    const elementToPrint = document.getElementById('view-container');
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save('application.pdf');
    });
  }
  backLoc() {
    this._location.back();
  }
}

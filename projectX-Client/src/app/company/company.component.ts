import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../_services/company.service';
import {Router} from '@angular/router';
import {Company} from '../_models/Company';
import {ModalDirective} from 'ngx-bootstrap';
import {ProjectService} from '../_services/project.service';
import {Project} from '../_models/Project';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {FormControl} from '@angular/forms';


@Component({
  templateUrl: 'company.component.html',
  providers: [CompanyService, ProjectService, UserService],
  styleUrls: ['company.style.css']
})

export class CompanyComponent implements OnInit {
  submitted = false;
  isUpdateButtonClicked = false;
  isAddButtonClicked = false;
  unto = false;
  form: FormControl;
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
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  addMessage = 'successfully added';
  createProjectForCompanyId: string;
  createUserForCompanyId: string;

  @ViewChild('staticModal') public staticModal: ModalDirective;
  @ViewChild('staticModal1') public staticModal1: ModalDirective;
  @ViewChild('userModal') public userModal: ModalDirective;

  constructor(private router: Router,
              private companyService: CompanyService,
              private projectService: ProjectService,
              private userService: UserService,
              ) {
  }

  ngOnInit(): void {

    this.dropdownList = [
      {'id': 1, 'itemName': 'ADMIN'},
      {'id': 2, 'itemName': 'USER'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Project',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: ''
    };
    this.loadAllCompany();
  }

  deleteCompany(cid: number) {
    this.companyService.deleteCompany(cid).subscribe(data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        console.log('load...');
        console.log(data);
        this.deleteAlert();
      },
      error => {
        console.log('error...' + error);
        if (error.status === 500) {
          this.errorFive();
        }
      },
      () => {
        console.log('complete...');
        this.loadAllCompany();
      });

  }

  register() {
    this.dis = false;
    this.submitted = true;
    this.companyService.create(this.model)
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.loadAllCompany();
          this.alertMsg();
        },
        error => {
          this.loading = false;
        });
    this.staticModal.hide();
  }

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  loadAllCompany() {

    this.companyService.getAll()
      .subscribe(
        data => {
          console.log('all_company');
          console.log(data);
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.allCompanies = data;
        });
  }

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
    this.unto = true;
  }

  openAddProjectModal(id: string) {
    this.createProjectForCompanyId = id;
    this.projectmodel = new Project();
    this.staticModal1.show();
  }

  registerProject() {
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
  }

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

  registerUser() {
    /*this.usermodel.role = this.selectedItems;*/
    this.userService.create(this.usermodel, this.createUserForCompanyId).subscribe(data => {
      this.loadAllCompany();
      this.userAlert();
    }, error => {
      this.userError();
    });
    this.userModal.hide();

  }

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
      msg: this.addMessage,
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
  }

  updateAlert() {
    this.alerts.push({
      type: 'info',
      msg: `update successfully`,
      timeout: 1500
    });
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

  errorFive() {
    this.alerts.push({
      type: 'danger',
      msg: `First Delete User & Projects`,
      timeout: 1500
    });
  }

  deleteAlert() {
    this.alerts.push({
      type: 'info',
      msg: `Company Successfully Deleted`,
      timeout: 1500
    });
  }

  alertMsg() {
    if (this.isUpdateButtonClicked === true && this.isAddButtonClicked === false) {
      this.alerts.push({
        type: 'info',
        msg: `update successfully`,
        timeout: 1500
      });
    }
    if (this.isAddButtonClicked === true && this.isUpdateButtonClicked === false) {
      this.alerts.push({
        type: 'info',
        msg: this.addMessage,
        timeout: 1500
      });
    }
  }

}

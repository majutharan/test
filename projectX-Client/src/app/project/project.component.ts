import {Component, ViewChild, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Project} from '../_models/Project';
import {ProjectService} from '../_services/project.service';
import {Router} from '@angular/router';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'project.component.html',
  styleUrls: ['project.style.css'],
  providers: [ProjectService, UserService]
})

export class ProjectComponent implements OnInit {
  projectForm: FormGroup;
  public alerts: any = [];
  public alertsupdate: any = [];
  model: Project = new Project();
  allProjects: Project [];
  danger;
  issave = false;
  iscreate = false;
  alluser: User[] = [];
  pro: any = [];
  @ViewChild('projectModal') public projectModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  assignUserForPrijectId: any;

  constructor(private router: Router,
              private projectService: ProjectService,
              private userService: UserService,
              ) {
  }

  ngOnInit() {
    this.loadAllProject();
    this.loadAllUser();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select users',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: ''
    };
  }

  openAddNewWindow() {
    this.model = new Project();
    this.staticModal.show();
    this.issave = true;
    this.iscreate = false;
  }

  register() {
    this.projectService.create(this.model, '3').subscribe(data => {
      this.loadAllProject();
    });
  }

  update() {
    this.projectService.update(this.model).subscribe(data => {
      this.loadAllProject();
      this.savechangesButtonClick();
    });
  }

  loadAllProject() {
    this.projectService.getAll().subscribe(data => {
      this.allProjects = data;
      console.log('project_info');
      console.log(data);
    });
  }

  openDeleteModal() {
    this.dangerModal.show();
  }

  deleteProject(pid: number) {
    this.projectService.deleteProject(pid).subscribe(data => {
        this.loadAllProject();
        this.deleteAlert();
      },
      error => {
        if (error.status === 500) {
          this.errorFive();
        }
      });
  }

  openUpdate(project: Project) {
    this.model = project;
    this.staticModal.show();
    this.issave = false;
    this.iscreate = true;
  }

  createButtonClick() {
    this.alerts.push({
      type: 'info',
      msg: `user assigned`,
      timeout: 1600
    });
  }

  savechangesButtonClick() {
    this.staticModal.hide();
    this.alertsupdate.push({
      type: 'info',
      msg: `Updated Successfull`,
      timeout: 1600
    });

  }

  openAssignProject(id: string) {
    this.selectedItems = [];
    this.projectModal.show();
    this.assignUserForPrijectId = id;
  }

  loadAllUser() {
    this.userService.getAll().subscribe(data => {
      this.alluser = data;
      console.log('proooo');
      console.log(data);
      let i: number;
      for (i = 0; i < this.alluser.length; i++) {
        this.dropdownList.push({
          'id': this.alluser[i].id,
          'itemName': this.alluser[i].username,
          'uid': this.alluser[i].id
        });
      }
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

  assignProject(id: string) {
    this.projectService.assignUser(this.selectedItems, this.assignUserForPrijectId).subscribe(data => {
      this.loadAllProject();
      this.projectModal.hide();
    });
  }

  errorFive() {
    this.alerts.push({
      type: 'danger',
      msg: `First Delete User`,
      timeout: 1500
    });
  }

  deleteAlert() {
    this.alerts.push({
      type: 'info',
      msg: `Project Successfully Deleted`,
      timeout: 1500
    });
  }
}

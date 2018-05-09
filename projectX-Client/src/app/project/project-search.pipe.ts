import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'projectsearch'})

export class ProjectSearchPipe implements PipeTransform {
  transform(projects: any, searchText: any): any {
    if (searchText == null) {
      return projects;
    }

    return projects.filter(function (projectsearch) {
      return projectsearch.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }
}

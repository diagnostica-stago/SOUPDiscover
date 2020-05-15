import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../service/project.service';
import { ProjectDto } from '../Model/Project';
import { RepositoryDto, RepositoryType } from '../Model/repository';
import { RepositoriesService } from '../service/repositories.service';
 
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  data: ProjectDto;
  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  openDialog(): void {
    this.data = { name: '', commandLinesBeforeParse: '', repositoryId: '', packegeTypes: [] };
    const dialogRef = this.dialog.open(CreateProjectDialog, {
      //width: '250px',
      //height: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data = result;
      this.projectService.AddProject(result);
    });
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'create-project-dialog',
  templateUrl: 'create-project-dialog.html',
})
export class CreateProjectDialog implements OnInit {
  repositories: RepositoryDto[];
  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialog>,
    public repositoriesService: RepositoriesService,
    @Inject(MAT_DIALOG_DATA) public data: ProjectDto) { }

  ngOnInit(): void {
    this.repositoriesService.GetRepositories().
      subscribe(result => this.repositories = result);     
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

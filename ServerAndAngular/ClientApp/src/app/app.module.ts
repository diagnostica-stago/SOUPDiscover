import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProjectComponent } from './project/project.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { CreateCredentialComponent, CreateCredentialDialog } from './create-credential/create-credential.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from './material-module';
import { CommonModule } from '@angular/common';
import { CreateRepositoryComponent, CreateRepositoryDialog } from './create-repository/create-repository.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ProjectComponent,
    RepositoriesComponent,
    CredentialsComponent,
    CreateCredentialComponent,
    CreateCredentialDialog,
    CreateRepositoryComponent,
    CreateRepositoryDialog,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: ProjectComponent, pathMatch: 'full' },
      { path: 'repositories', component: RepositoriesComponent },
      { path: 'credentials', component: CredentialsComponent },
    ]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  entryComponents: [
    CreateCredentialComponent,
    CreateCredentialDialog,
    CreateRepositoryComponent,
    CreateRepositoryDialog
    ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent]
})
export class AppModule { }